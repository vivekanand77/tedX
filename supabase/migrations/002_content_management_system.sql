-- ============================================
-- TEDxSRKR Content Management System Schema
-- Migration 002 - Admin & Content Management
-- ============================================

-- ============================================
-- ENUM Types
-- ============================================

-- Admin roles enum
CREATE TYPE admin_role AS ENUM ('super_admin', 'content_admin', 'viewer');

-- Content status enum
CREATE TYPE content_status AS ENUM ('draft', 'published', 'archived');

-- ============================================
-- Admin Users Table
-- ============================================

CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    role admin_role NOT NULL DEFAULT 'viewer',
    avatar_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_admin_users_user_id ON admin_users(user_id);
CREATE INDEX idx_admin_users_role ON admin_users(role);
CREATE INDEX idx_admin_users_is_active ON admin_users(is_active);

-- ============================================
-- Speakers Table (Database-driven content)
-- ============================================

CREATE TABLE IF NOT EXISTS speakers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    
    -- Basic info
    name TEXT NOT NULL CHECK (char_length(name) >= 2 AND char_length(name) <= 100),
    title TEXT NOT NULL CHECK (char_length(title) <= 200),
    topic TEXT NOT NULL CHECK (char_length(topic) <= 300),
    bio TEXT,
    
    -- Media
    image_url TEXT NOT NULL,
    thumbnail_url TEXT,
    
    -- Social links
    linkedin_url TEXT,
    instagram_url TEXT,
    twitter_url TEXT,
    website_url TEXT,
    
    -- Expertise tags (stored as JSONB array)
    expertise JSONB DEFAULT '[]'::jsonb,
    
    -- Content status
    status content_status NOT NULL DEFAULT 'draft',
    is_featured BOOLEAN NOT NULL DEFAULT false,
    display_order INTEGER NOT NULL DEFAULT 0,
    
    -- Metadata
    created_by UUID REFERENCES admin_users(id),
    updated_by UUID REFERENCES admin_users(id),
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_speakers_slug ON speakers(slug);
CREATE INDEX idx_speakers_status ON speakers(status);
CREATE INDEX idx_speakers_is_featured ON speakers(is_featured);
CREATE INDEX idx_speakers_display_order ON speakers(display_order);
CREATE INDEX idx_speakers_published_at ON speakers(published_at DESC);

-- ============================================
-- Talks Table (Videos & Content)
-- ============================================

CREATE TABLE IF NOT EXISTS talks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    speaker_id UUID NOT NULL REFERENCES speakers(id) ON DELETE CASCADE,
    
    -- Talk info
    title TEXT NOT NULL CHECK (char_length(title) >= 2 AND char_length(title) <= 300),
    description TEXT,
    short_description TEXT CHECK (char_length(short_description) <= 500),
    
    -- Video content
    video_url TEXT,
    video_platform TEXT CHECK (video_platform IS NULL OR video_platform IN ('youtube', 'vimeo', 'custom')),
    video_embed_id TEXT, -- YouTube/Vimeo video ID
    duration_seconds INTEGER,
    
    -- Thumbnail
    thumbnail_url TEXT,
    
    -- Tags (stored as JSONB array)
    tags JSONB DEFAULT '[]'::jsonb,
    
    -- Access control
    is_public BOOLEAN NOT NULL DEFAULT true,
    requires_registration BOOLEAN NOT NULL DEFAULT false,
    
    -- Content status
    status content_status NOT NULL DEFAULT 'draft',
    is_featured BOOLEAN NOT NULL DEFAULT false,
    display_order INTEGER NOT NULL DEFAULT 0,
    
    -- Stats (denormalized for performance)
    view_count INTEGER NOT NULL DEFAULT 0,
    
    -- Metadata
    created_by UUID REFERENCES admin_users(id),
    updated_by UUID REFERENCES admin_users(id),
    published_at TIMESTAMPTZ,
    recorded_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_talks_slug ON talks(slug);
CREATE INDEX idx_talks_speaker_id ON talks(speaker_id);
CREATE INDEX idx_talks_status ON talks(status);
CREATE INDEX idx_talks_is_featured ON talks(is_featured);
CREATE INDEX idx_talks_is_public ON talks(is_public);
CREATE INDEX idx_talks_published_at ON talks(published_at DESC);
CREATE INDEX idx_talks_view_count ON talks(view_count DESC);

-- ============================================
-- Video Views Analytics Table
-- ============================================

CREATE TABLE IF NOT EXISTS video_views (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    talk_id UUID NOT NULL REFERENCES talks(id) ON DELETE CASCADE,
    
    -- Viewer info (anonymous tracking)
    session_id TEXT NOT NULL,
    user_email TEXT, -- If registered user
    
    -- Viewing data
    watch_duration_seconds INTEGER NOT NULL DEFAULT 0,
    completed BOOLEAN NOT NULL DEFAULT false,
    
    -- Device info
    device_type TEXT CHECK (device_type IS NULL OR device_type IN ('desktop', 'mobile', 'tablet')),
    browser TEXT,
    
    -- Location (optional, for analytics)
    country TEXT,
    region TEXT,
    
    -- Timestamps
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_video_views_talk_id ON video_views(talk_id);
CREATE INDEX idx_video_views_session_id ON video_views(session_id);
CREATE INDEX idx_video_views_started_at ON video_views(started_at DESC);
CREATE INDEX idx_video_views_user_email ON video_views(user_email) WHERE user_email IS NOT NULL;

-- ============================================
-- Content Audit Log
-- ============================================

CREATE TABLE IF NOT EXISTS content_audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_user_id UUID REFERENCES admin_users(id),
    
    -- What changed
    entity_type TEXT NOT NULL CHECK (entity_type IN ('speaker', 'talk', 'registration')),
    entity_id UUID NOT NULL,
    action TEXT NOT NULL CHECK (action IN ('create', 'update', 'delete', 'publish', 'archive', 'restore')),
    
    -- Change details
    old_values JSONB,
    new_values JSONB,
    
    -- Metadata
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_audit_log_admin_user ON content_audit_log(admin_user_id);
CREATE INDEX idx_audit_log_entity ON content_audit_log(entity_type, entity_id);
CREATE INDEX idx_audit_log_created_at ON content_audit_log(created_at DESC);

-- ============================================
-- Row Level Security (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE speakers ENABLE ROW LEVEL SECURITY;
ALTER TABLE talks ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_audit_log ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS Policies: admin_users
-- ============================================

-- Service role full access
CREATE POLICY "Service role full access on admin_users" ON admin_users
    FOR ALL USING (auth.role() = 'service_role');

-- Admins can view other admins
CREATE POLICY "Admins can view admin_users" ON admin_users
    FOR SELECT USING (
        auth.role() = 'authenticated' AND
        EXISTS (
            SELECT 1 FROM admin_users au 
            WHERE au.user_id = auth.uid() 
            AND au.is_active = true
        )
    );

-- Super admins can manage admin users
CREATE POLICY "Super admins can manage admin_users" ON admin_users
    FOR ALL USING (
        auth.role() = 'authenticated' AND
        EXISTS (
            SELECT 1 FROM admin_users au 
            WHERE au.user_id = auth.uid() 
            AND au.role = 'super_admin'
            AND au.is_active = true
        )
    );

-- ============================================
-- RLS Policies: speakers
-- ============================================

-- Public can view published speakers
CREATE POLICY "Public can view published speakers" ON speakers
    FOR SELECT USING (status = 'published');

-- Service role full access
CREATE POLICY "Service role full access on speakers" ON speakers
    FOR ALL USING (auth.role() = 'service_role');

-- Content admins and super admins can manage speakers
CREATE POLICY "Admins can manage speakers" ON speakers
    FOR ALL USING (
        auth.role() = 'authenticated' AND
        EXISTS (
            SELECT 1 FROM admin_users au 
            WHERE au.user_id = auth.uid() 
            AND au.role IN ('super_admin', 'content_admin')
            AND au.is_active = true
        )
    );

-- Viewers can read all speakers
CREATE POLICY "Viewers can read speakers" ON speakers
    FOR SELECT USING (
        auth.role() = 'authenticated' AND
        EXISTS (
            SELECT 1 FROM admin_users au 
            WHERE au.user_id = auth.uid() 
            AND au.is_active = true
        )
    );

-- ============================================
-- RLS Policies: talks
-- ============================================

-- Public can view published public talks
CREATE POLICY "Public can view published talks" ON talks
    FOR SELECT USING (status = 'published' AND is_public = true);

-- Registered users can view registration-required talks
CREATE POLICY "Registered users can view protected talks" ON talks
    FOR SELECT USING (
        status = 'published' AND 
        (is_public = true OR auth.role() = 'authenticated')
    );

-- Service role full access
CREATE POLICY "Service role full access on talks" ON talks
    FOR ALL USING (auth.role() = 'service_role');

-- Admins can manage talks
CREATE POLICY "Admins can manage talks" ON talks
    FOR ALL USING (
        auth.role() = 'authenticated' AND
        EXISTS (
            SELECT 1 FROM admin_users au 
            WHERE au.user_id = auth.uid() 
            AND au.role IN ('super_admin', 'content_admin')
            AND au.is_active = true
        )
    );

-- Viewers can read all talks
CREATE POLICY "Viewers can read talks" ON talks
    FOR SELECT USING (
        auth.role() = 'authenticated' AND
        EXISTS (
            SELECT 1 FROM admin_users au 
            WHERE au.user_id = auth.uid() 
            AND au.is_active = true
        )
    );

-- ============================================
-- RLS Policies: video_views
-- ============================================

-- Anyone can create views (anonymous tracking)
CREATE POLICY "Anyone can create video views" ON video_views
    FOR INSERT WITH CHECK (true);

-- Only admins and service role can read views
CREATE POLICY "Service role full access on video_views" ON video_views
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Admins can view analytics" ON video_views
    FOR SELECT USING (
        auth.role() = 'authenticated' AND
        EXISTS (
            SELECT 1 FROM admin_users au 
            WHERE au.user_id = auth.uid() 
            AND au.is_active = true
        )
    );

-- ============================================
-- RLS Policies: content_audit_log
-- ============================================

-- Service role full access
CREATE POLICY "Service role full access on audit_log" ON content_audit_log
    FOR ALL USING (auth.role() = 'service_role');

-- Super admins can view audit log
CREATE POLICY "Super admins can view audit_log" ON content_audit_log
    FOR SELECT USING (
        auth.role() = 'authenticated' AND
        EXISTS (
            SELECT 1 FROM admin_users au 
            WHERE au.user_id = auth.uid() 
            AND au.role = 'super_admin'
            AND au.is_active = true
        )
    );

-- ============================================
-- Triggers: Auto-update timestamps
-- ============================================

-- Speakers updated_at trigger
DROP TRIGGER IF EXISTS update_speakers_updated_at ON speakers;
CREATE TRIGGER update_speakers_updated_at
    BEFORE UPDATE ON speakers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Talks updated_at trigger
DROP TRIGGER IF EXISTS update_talks_updated_at ON talks;
CREATE TRIGGER update_talks_updated_at
    BEFORE UPDATE ON talks
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Admin users updated_at trigger
DROP TRIGGER IF EXISTS update_admin_users_updated_at ON admin_users;
CREATE TRIGGER update_admin_users_updated_at
    BEFORE UPDATE ON admin_users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Function: Increment video view count
-- ============================================

CREATE OR REPLACE FUNCTION increment_view_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE talks 
    SET view_count = view_count + 1 
    WHERE id = NEW.talk_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trigger_increment_view_count ON video_views;
CREATE TRIGGER trigger_increment_view_count
    AFTER INSERT ON video_views
    FOR EACH ROW
    EXECUTE FUNCTION increment_view_count();

-- ============================================
-- Function: Auto-set published_at
-- ============================================

CREATE OR REPLACE FUNCTION set_published_at()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'published' AND OLD.status != 'published' THEN
        NEW.published_at = NOW();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_speakers_published_at ON speakers;
CREATE TRIGGER trigger_speakers_published_at
    BEFORE UPDATE ON speakers
    FOR EACH ROW
    EXECUTE FUNCTION set_published_at();

DROP TRIGGER IF EXISTS trigger_talks_published_at ON talks;
CREATE TRIGGER trigger_talks_published_at
    BEFORE UPDATE ON talks
    FOR EACH ROW
    EXECUTE FUNCTION set_published_at();

-- ============================================
-- Views for Analytics Dashboard
-- ============================================

-- Registration stats by date
CREATE OR REPLACE VIEW registration_stats_by_date AS
SELECT 
    DATE(created_at) as date,
    COUNT(*) as count,
    COUNT(*) FILTER (WHERE ticket_type = 'standard') as standard_count,
    COUNT(*) FILTER (WHERE ticket_type = 'vip') as vip_count,
    COUNT(*) FILTER (WHERE ticket_type = 'student') as student_count
FROM registrations
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Video view stats
CREATE OR REPLACE VIEW video_view_stats AS
SELECT 
    t.id as talk_id,
    t.title as talk_title,
    s.name as speaker_name,
    t.view_count,
    COUNT(vv.id) as total_views,
    COUNT(vv.id) FILTER (WHERE vv.completed = true) as completed_views,
    ROUND(AVG(vv.watch_duration_seconds)) as avg_watch_duration,
    COUNT(DISTINCT vv.session_id) as unique_viewers
FROM talks t
JOIN speakers s ON t.speaker_id = s.id
LEFT JOIN video_views vv ON t.id = vv.talk_id
GROUP BY t.id, t.title, s.name, t.view_count
ORDER BY t.view_count DESC;

-- Daily video views
CREATE OR REPLACE VIEW video_views_by_date AS
SELECT 
    DATE(started_at) as date,
    COUNT(*) as total_views,
    COUNT(DISTINCT session_id) as unique_viewers,
    COUNT(*) FILTER (WHERE completed = true) as completed_views
FROM video_views
GROUP BY DATE(started_at)
ORDER BY date DESC;

-- ============================================
-- Sample data migration helper
-- ============================================

-- Function to migrate existing speakers from constants.ts
-- This should be run manually after initial setup
COMMENT ON TABLE speakers IS 'Database-driven speakers. Migrate data from constants.ts using admin dashboard or API.';
COMMENT ON TABLE talks IS 'Talk videos and content. Each talk belongs to a speaker.';
COMMENT ON TABLE video_views IS 'Anonymous video view tracking for analytics.';
COMMENT ON TABLE admin_users IS 'Admin users with role-based access control.';
COMMENT ON TABLE content_audit_log IS 'Audit trail for all content changes.';
