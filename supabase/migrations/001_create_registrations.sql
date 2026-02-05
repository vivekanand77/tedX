-- ============================================
-- TEDxSRKR Registration Database Schema
-- Supabase Migration
-- ============================================

-- Create registrations table
CREATE TABLE IF NOT EXISTS registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Required fields
    name TEXT NOT NULL CHECK (char_length(name) >= 2 AND char_length(name) <= 100),
    email TEXT NOT NULL UNIQUE,
    
    -- Optional fields
    phone TEXT CHECK (phone IS NULL OR char_length(phone) <= 20),
    college TEXT CHECK (college IS NULL OR char_length(college) <= 200),
    year TEXT CHECK (year IS NULL OR year IN ('1st Year', '2nd Year', '3rd Year', '4th Year', 'Faculty', 'Other')),
    department TEXT CHECK (department IS NULL OR char_length(department) <= 100),
    
    -- Ticket info
    ticket_type TEXT NOT NULL DEFAULT 'standard' CHECK (ticket_type IN ('standard', 'vip', 'student')),
    
    -- Metadata
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- Indexes for performance
-- ============================================

-- Email lookup (for duplicate checking)
CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);

-- Ticket type for reporting
CREATE INDEX IF NOT EXISTS idx_registrations_ticket_type ON registrations(ticket_type);

-- Created at for time-based queries
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON registrations(created_at DESC);

-- ============================================
-- Row Level Security (RLS)
-- ============================================

-- Enable RLS
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Policy: Service role can do everything (used by API)
CREATE POLICY "Service role full access" ON registrations
    FOR ALL
    USING (auth.role() = 'service_role');

-- Policy: Authenticated admins can read (for admin dashboard)
CREATE POLICY "Admins can read registrations" ON registrations
    FOR SELECT
    USING (
        auth.role() = 'authenticated' AND 
        auth.jwt() ->> 'role' = 'admin'
    );

-- ============================================
-- Function: Auto-update updated_at
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Update timestamp on row update
DROP TRIGGER IF EXISTS update_registrations_updated_at ON registrations;
CREATE TRIGGER update_registrations_updated_at
    BEFORE UPDATE ON registrations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Sample queries for admin dashboard
-- ============================================

-- Count by ticket type:
-- SELECT ticket_type, COUNT(*) FROM registrations GROUP BY ticket_type;

-- Recent registrations:
-- SELECT * FROM registrations ORDER BY created_at DESC LIMIT 20;

-- Today's registrations:
-- SELECT * FROM registrations WHERE created_at >= CURRENT_DATE;

-- Export for CSV:
-- SELECT name, email, phone, college, year, department, ticket_type, created_at 
-- FROM registrations ORDER BY created_at;
