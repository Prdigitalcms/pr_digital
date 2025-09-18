/*
  # PR Digital CMS Database Schema

  1. New Tables
    - `users` - System users (admin, managers, artists)
    - `artists` - Music artists and their information
    - `labels` - Record labels
    - `releases` - Music releases with metadata
    - `uploads` - File upload tracking

  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access control
    - Secure file upload tracking

  3. Features
    - User authentication and role management
    - Complete music release management
    - Artist and label management
    - File upload tracking
    - Release status workflow
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username varchar(255) UNIQUE NOT NULL,
  email varchar(255) UNIQUE NOT NULL,
  password varchar(255) NOT NULL,
  role varchar(50) NOT NULL DEFAULT 'artist' CHECK (role IN ('admin', 'manager', 'artist')),
  is_active boolean DEFAULT true,
  last_login timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create artists table
CREATE TABLE IF NOT EXISTS artists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar(255) NOT NULL,
  bio text,
  email varchar(255),
  phone varchar(50),
  social_links jsonb DEFAULT '{}',
  created_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create labels table
CREATE TABLE IF NOT EXISTS labels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar(255) NOT NULL,
  description text,
  contact_email varchar(255),
  website varchar(255),
  created_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create releases table
CREATE TABLE IF NOT EXISTS releases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title varchar(255) NOT NULL,
  artist_id uuid NOT NULL REFERENCES artists(id),
  label_id uuid REFERENCES labels(id),
  upc varchar(50) UNIQUE NOT NULL,
  genre varchar(100),
  release_date date,
  description text,
  cover_art_url varchar(500),
  audio_file_url varchar(500),
  status varchar(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'delivered', 'takedown', 'rejected')),
  approved_at timestamptz,
  approved_by uuid REFERENCES users(id),
  created_by uuid NOT NULL REFERENCES users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create uploads table
CREATE TABLE IF NOT EXISTS uploads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  original_name varchar(255) NOT NULL,
  filename varchar(255) NOT NULL,
  file_path varchar(500) NOT NULL,
  file_url varchar(500) NOT NULL,
  mime_type varchar(100),
  file_size bigint,
  uploaded_by uuid NOT NULL REFERENCES users(id),
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_artists_name ON artists(name);
CREATE INDEX IF NOT EXISTS idx_labels_name ON labels(name);
CREATE INDEX IF NOT EXISTS idx_releases_upc ON releases(upc);
CREATE INDEX IF NOT EXISTS idx_releases_status ON releases(status);
CREATE INDEX IF NOT EXISTS idx_releases_artist_id ON releases(artist_id);
CREATE INDEX IF NOT EXISTS idx_releases_label_id ON releases(label_id);
CREATE INDEX IF NOT EXISTS idx_uploads_uploaded_by ON uploads(uploaded_by);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE labels ENABLE ROW LEVEL SECURITY;
ALTER TABLE releases ENABLE ROW LEVEL SECURITY;
ALTER TABLE uploads ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can read own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id::text);

CREATE POLICY "Admins can read all users"
  ON users FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role = 'admin'
    )
  );

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = id::text);

CREATE POLICY "Admins can manage all users"
  ON users FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role = 'admin'
    )
  );

-- Artists policies
CREATE POLICY "Authenticated users can read artists"
  ON artists FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins and managers can manage artists"
  ON artists FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role IN ('admin', 'manager')
    )
  );

-- Labels policies
CREATE POLICY "Authenticated users can read labels"
  ON labels FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins and managers can manage labels"
  ON labels FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role IN ('admin', 'manager')
    )
  );

-- Releases policies
CREATE POLICY "Authenticated users can read releases"
  ON releases FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins and managers can manage releases"
  ON releases FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role IN ('admin', 'manager')
    )
  );

-- Uploads policies
CREATE POLICY "Users can read own uploads"
  ON uploads FOR SELECT
  TO authenticated
  USING (uploaded_by::text = auth.uid()::text);

CREATE POLICY "Admins can read all uploads"
  ON uploads FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role = 'admin'
    )
  );

CREATE POLICY "Authenticated users can create uploads"
  ON uploads FOR INSERT
  TO authenticated
  WITH CHECK (uploaded_by::text = auth.uid()::text);

CREATE POLICY "Users can delete own uploads"
  ON uploads FOR DELETE
  TO authenticated
  USING (uploaded_by::text = auth.uid()::text);

CREATE POLICY "Admins can delete any uploads"
  ON uploads FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND role = 'admin'
    )
  );

-- Insert default admin user (password: admin123)
INSERT INTO users (username, email, password, role) 
VALUES (
  'admin', 
  'admin@prdigitalcms.com', 
  '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj3QJgupsqHK', 
  'admin'
) ON CONFLICT (email) DO NOTHING;

-- Insert sample artists
INSERT INTO artists (name, bio, email) VALUES 
  ('Prem Raja', 'Talented artist from the music industry', 'prem@example.com'),
  ('Param Mundi', 'Rising star in the music scene', 'param@example.com')
ON CONFLICT DO NOTHING;

-- Insert sample labels
INSERT INTO labels (name, description, contact_email) VALUES 
  ('PY Manjar', 'Independent music label', 'contact@pymanjar.com'),
  ('P4 Records', 'Modern music production house', 'info@p4records.com')
ON CONFLICT DO NOTHING;