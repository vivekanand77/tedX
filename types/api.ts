/**
 * API Types - Request/Response structures for serverless endpoints
 * 
 * Why this file exists:
 * - Single source of truth for API contracts
 * - Enables type-safe frontend-backend communication
 * - Documents expected payloads without API docs
 */

// ============================================
// Registration Endpoint Types
// ============================================

export interface RegistrationRequest {
    name: string;
    email: string;
    phone?: string;
    college?: string;
    year?: string;
    department?: string;
    ticketType: 'standard' | 'vip' | 'student';
}

export interface RegistrationResponse {
    success: true;
    message: string;
    registrationId: string;
}

// ============================================
// Error Response Types
// ============================================

export interface ApiErrorResponse {
    success: false;
    error: string;
    code: ApiErrorCode;
}

export type ApiErrorCode =
    | 'VALIDATION_ERROR'
    | 'RATE_LIMIT_EXCEEDED'
    | 'DATABASE_ERROR'
    | 'INTERNAL_ERROR'
    | 'METHOD_NOT_ALLOWED';

// ============================================
// Unified API Response
// ============================================

export type ApiResponse<T> = T | ApiErrorResponse;

// ============================================
// Database Row Types (mirrors Supabase schema)
// ============================================

export interface RegistrationRow {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    college: string | null;
    year: string | null;
    department: string | null;
    ticket_type: string;
    created_at: string;
}
