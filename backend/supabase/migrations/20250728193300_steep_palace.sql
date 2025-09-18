/*
  # Add Form Submissions Table

  1. New Tables
    - `form_submissions` - Track all form submissions with metadata
    
  2. Updates to existing tables
    - Add metadata column to releases table for additional form data
    
  3. Security
    - Enable RLS on form_submissions table
    - Add policies for user access control
*/

-- Add metadata column to releases table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'releases' AND column_name = 'metadata'
  ) THEN
    ALTER TABLE releases ADD COLUMN metadata jsonb DEFAULT '{}';
  END IF;
END $$;

-- Create form_submissions table
CREATE TABLE IF NOT EXISTS form_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id),
  release_id uuid REFERENCES releases(id),
  form_type varchar(100) NOT NULL DEFAULT 'release_creation',
  form_data jsonb NOT NULL DEFAULT '{}',
  submission_date timestamptz DEFAULT now(),
  admin_notes text,
  reviewed_by uuid REFERENCES users(id),
  reviewed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_form_submissions_user_id ON form_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_form_submissions_release_id ON form_submissions(release_id);
CREATE INDEX IF NOT EXISTS idx_form_submissions_form_type ON form_submissions(form_type);
CREATE INDEX IF NOT EXISTS idx_form_submissions_submission_date ON form_submissions(submission_date);
CREATE INDEX IF NOT EXISTS idx_releases_metadata ON releases USING gin(metadata);

-- Enable Row Level Security
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- Form submissions policies
CREATE POLICY "Users can read own form submissions"
  ON form_submissions FOR SELECT
  TO authenticated
  USING (user_id::text = auth.uid()::text);

CREATE POLICY "Admins and managers can read all form submissions"
  ON form_submissions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role IN ('admin', 'manager')
    )
  );

CREATE POLICY "Authenticated users can create form submissions"
  ON form_submissions FOR INSERT
  TO authenticated
  WITH CHECK (user_id::text = auth.uid()::text);

CREATE POLICY "Admins and managers can update form submissions"
  ON form_submissions FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role IN ('admin', 'manager')
    )
  );

CREATE POLICY "Users can update own form submissions"
  ON form_submissions FOR UPDATE
  TO authenticated
  USING (user_id::text = auth.uid()::text);