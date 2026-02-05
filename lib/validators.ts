/**
 * Input Validation Schemas (Zod)
 * 
 * Why this file exists:
 * - Single source of truth for input validation rules
 * - Runtime type checking with automatic TypeScript inference
 * - Prevents SQL injection and malformed data
 * 
 * Security decisions:
 * - Strict email regex validation
 * - Phone number sanitization
 * - Enum-based ticket types (no arbitrary strings)
 * - Max length limits to prevent storage abuse
 */

import { z } from 'zod';

// ============================================
// Constants
// ============================================

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254; // RFC 5321
const MAX_PHONE_LENGTH = 20;
const MAX_COLLEGE_LENGTH = 200;
const MAX_DEPARTMENT_LENGTH = 100;

// ============================================
// Registration Schema
// ============================================

export const registrationSchema = z.object({
    name: z
        .string()
        .min(2, 'Name must be at least 2 characters')
        .max(MAX_NAME_LENGTH, `Name cannot exceed ${MAX_NAME_LENGTH} characters`)
        .trim()
        .regex(/^[a-zA-Z\s.'"-]+$/, 'Name contains invalid characters'),

    email: z
        .string()
        .email('Invalid email address')
        .max(MAX_EMAIL_LENGTH, 'Email address too long')
        .toLowerCase()
        .trim(),

    phone: z
        .string()
        .max(MAX_PHONE_LENGTH, 'Phone number too long')
        .regex(/^[+]?[\d\s()-]*$/, 'Invalid phone number format')
        .transform((val) => val.replace(/\s/g, '')) // Remove spaces
        .optional()
        .or(z.literal('')),

    college: z
        .string()
        .max(MAX_COLLEGE_LENGTH, 'College name too long')
        .trim()
        .optional()
        .or(z.literal('')),

    year: z
        .enum(['1st Year', '2nd Year', '3rd Year', '4th Year', 'Faculty', 'Other'])
        .optional(),

    department: z
        .string()
        .max(MAX_DEPARTMENT_LENGTH, 'Department name too long')
        .trim()
        .optional()
        .or(z.literal('')),

    ticketType: z
        .enum(['standard', 'vip', 'student'], {
            errorMap: () => ({ message: 'Invalid ticket type' }),
        })
        .default('standard'),
});

// ============================================
// Inferred Types
// ============================================

export type RegistrationInput = z.infer<typeof registrationSchema>;

// ============================================
// Validation Helper
// ============================================

export interface ValidationResult<T> {
    success: boolean;
    data?: T;
    errors?: string[];
}

/**
 * Validate registration input with detailed error messages
 */
export function validateRegistration(
    input: unknown
): ValidationResult<RegistrationInput> {
    const result = registrationSchema.safeParse(input);

    if (result.success) {
        return { success: true, data: result.data };
    }

    // Extract user-friendly error messages
    const errors = result.error.errors.map((err) => {
        const field = err.path.join('.');
        return field ? `${field}: ${err.message}` : err.message;
    });

    return { success: false, errors };
}
