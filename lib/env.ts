/**
 * Environment Variable Validation
 * 
 * Why this file exists:
 * - Fail-fast on missing configuration (don't wait for runtime errors)
 * - Type-safe access to environment variables
 * - Single source of truth for required env vars
 * 
 * Security decision:
 * - Validates at module load time, not per-request
 * - Throws immediately if secrets are missing
 */

interface EnvConfig {
    SUPABASE_URL: string;
    SUPABASE_SERVICE_ROLE_KEY: string;
    NODE_ENV: 'development' | 'production' | 'test';
}

function getEnvVar(name: string, required: boolean = true): string {
    const value = process.env[name];

    if (required && !value) {
        throw new Error(
            `[ENV] Missing required environment variable: ${name}. ` +
            `Ensure it is set in your .env.local or Vercel dashboard.`
        );
    }

    return value || '';
}

/**
 * Validated environment configuration.
 * Accessing this will throw if required vars are missing.
 */
export const env: EnvConfig = {
    SUPABASE_URL: getEnvVar('SUPABASE_URL'),
    SUPABASE_SERVICE_ROLE_KEY: getEnvVar('SUPABASE_SERVICE_ROLE_KEY'),
    NODE_ENV: (process.env.NODE_ENV as EnvConfig['NODE_ENV']) || 'development',
};

/**
 * Check if running in production
 */
export const isProduction = env.NODE_ENV === 'production';
