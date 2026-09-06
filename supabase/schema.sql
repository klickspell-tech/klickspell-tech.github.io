-- ==============================================================================
-- Klickspell: 5-Minute Video Code Audit Leads Table & Security Policies
-- Paste this script into your Supabase SQL Editor (https://app.supabase.com) and click "Run".
-- ==============================================================================

-- 1. Create the video_audits table
CREATE TABLE IF NOT EXISTS public.video_audits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    store_url TEXT NOT NULL,
    contact_info TEXT NOT NULL,
    channel TEXT NOT NULL DEFAULT 'email', -- 'email' or 'whatsapp'
    detected_apps JSONB DEFAULT '[]'::jsonb,
    performance_score INTEGER,
    status TEXT DEFAULT 'pending' -- 'pending', 'loom_recorded', 'contacted', 'closed'
);

-- 2. Enable Row-Level Security (RLS) so data is private
ALTER TABLE public.video_audits ENABLE ROW LEVEL SECURITY;

-- 3. Allow anonymous public visitors to INSERT their lead info only (zero read/update permissions)
CREATE POLICY "Allow public insert only" 
ON public.video_audits 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- 4. Only authenticated users (you, in your Supabase dashboard) can SELECT / READ / UPDATE leads
CREATE POLICY "Allow authenticated read and manage" 
ON public.video_audits 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- Indexes for fast searching in the dashboard
CREATE INDEX IF NOT EXISTS idx_video_audits_created_at ON public.video_audits (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_video_audits_store_url ON public.video_audits (store_url);
