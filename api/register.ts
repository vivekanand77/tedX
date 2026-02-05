/**
 * POST /api/register - Event Registration Endpoint
 * 
 * Why this file exists:
 * - Handles event registration submissions
 * - Validates, rate-limits, and securely inserts data
 * 
 * Security measures:
 * - Input validation via Zod schemas
 * - IP-based rate limiting (10 req/min)
 * - Service Role Key never exposed to client
 * - Generic error messages (no stack traces)
 * - CORS configured for production domain
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSupabaseAdmin, Tables } from '../lib/supabase';
import { validateRegistration } from '../lib/validators';
import { getClientIp, checkRateLimit, getRateLimitHeaders } from '../lib/rateLimit';
import { isProduction } from '../lib/env';
import type { RegistrationResponse, ApiErrorResponse, ApiErrorCode } from '../types/api';

// ============================================
// CORS Configuration
// ============================================

const ALLOWED_ORIGINS = [
    'https://tedxsrkr.com',
    'https://www.tedxsrkr.com',
    'https://tedxsrkr.vercel.app',
];

// Allow localhost in development
if (!isProduction) {
    ALLOWED_ORIGINS.push('http://localhost:3000', 'http://localhost:5173');
}

function setCorsHeaders(req: VercelRequest, res: VercelResponse): boolean {
    const origin = req.headers.origin;

    if (origin && ALLOWED_ORIGINS.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    } else if (!isProduction) {
        // Permissive in development
        res.setHeader('Access-Control-Allow-Origin', '*');
    }

    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours

    // Handle preflight
    if (req.method === 'OPTIONS') {
        res.status(204).end();
        return false; // Signal to stop processing
    }

    return true; // Continue processing
}

// ============================================
// Error Response Helper
// ============================================

function sendError(
    res: VercelResponse,
    status: number,
    message: string,
    code: ApiErrorCode
): void {
    const response: ApiErrorResponse = {
        success: false,
        error: message,
        code,
    };
    res.status(status).json(response);
}

// ============================================
// Main Handler
// ============================================

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
): Promise<void> {
    // Set CORS headers and handle preflight
    if (!setCorsHeaders(req, res)) {
        return;
    }

    // Only allow POST
    if (req.method !== 'POST') {
        sendError(res, 405, 'Method not allowed', 'METHOD_NOT_ALLOWED');
        return;
    }

    // Rate limiting
    const clientIp = getClientIp(req);
    const rateLimitResult = checkRateLimit(clientIp);

    // Add rate limit headers to all responses
    const rateLimitHeaders = getRateLimitHeaders(rateLimitResult);
    Object.entries(rateLimitHeaders).forEach(([key, value]) => {
        res.setHeader(key, value);
    });

    if (!rateLimitResult.allowed) {
        sendError(
            res,
            429,
            'Too many requests. Please try again later.',
            'RATE_LIMIT_EXCEEDED'
        );
        return;
    }

    // Validate request body
    const validation = validateRegistration(req.body);

    if (!validation.success) {
        sendError(
            res,
            400,
            validation.errors?.join('; ') || 'Invalid request data',
            'VALIDATION_ERROR'
        );
        return;
    }

    const data = validation.data!;

    try {
        // Insert into Supabase
        const supabase = getSupabaseAdmin();

        const { data: insertedRow, error } = await supabase
            .from(Tables.REGISTRATIONS)
            .insert({
                name: data.name,
                email: data.email,
                phone: data.phone || null,
                college: data.college || null,
                year: data.year || null,
                department: data.department || null,
                ticket_type: data.ticketType,
            })
            .select('id')
            .single();

        if (error) {
            // Log full error server-side only
            console.error('[REGISTER] Supabase error:', {
                code: error.code,
                message: error.message,
                hint: error.hint,
                // Do NOT log user data
            });

            // Check for unique constraint violation (duplicate email)
            if (error.code === '23505') {
                sendError(
                    res,
                    409,
                    'This email is already registered for the event.',
                    'VALIDATION_ERROR'
                );
                return;
            }

            sendError(
                res,
                500,
                'Unable to process registration. Please try again.',
                'DATABASE_ERROR'
            );
            return;
        }

        // Success response
        const response: RegistrationResponse = {
            success: true,
            message: 'Registration successful! Check your email for confirmation.',
            registrationId: insertedRow.id,
        };

        res.status(201).json(response);

    } catch (err) {
        // Catch-all for unexpected errors
        console.error('[REGISTER] Unexpected error:', err);

        sendError(
            res,
            500,
            'An unexpected error occurred. Please try again.',
            'INTERNAL_ERROR'
        );
    }
}
