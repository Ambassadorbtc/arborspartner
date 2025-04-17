-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow users to manage their own profiles" ON profiles;

-- Create a more permissive policy for profiles table
CREATE POLICY "Allow users to manage their own profiles"
ON profiles
FOR ALL
USING (auth.uid() = id OR auth.role() = 'service_role');

-- Enable RLS on profiles table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Add policy for public access to profiles during signup
DROP POLICY IF EXISTS "Allow public insert to profiles" ON profiles;
CREATE POLICY "Allow public insert to profiles"
ON profiles
FOR INSERT
WITH CHECK (true);

-- Enable realtime for profiles
alter publication supabase_realtime add table profiles;