-- Drop existing policies first to avoid conflicts
DROP POLICY IF EXISTS "Users can insert their own profile." ON profiles;
DROP POLICY IF EXISTS "Users can view their own profile." ON profiles;
DROP POLICY IF EXISTS "Users can update own profile." ON profiles;

-- Enable RLS on profiles table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies that allow proper access
CREATE POLICY "Users can insert their own profile." ON profiles FOR INSERT WITH CHECK (auth.uid() = user_id OR auth.jwt()->>'role' = 'service_role');
CREATE POLICY "Users can view their own profile." ON profiles FOR SELECT USING (auth.uid() = user_id OR auth.jwt()->>'role' = 'service_role');
CREATE POLICY "Users can update own profile." ON profiles FOR UPDATE USING (auth.uid() = user_id OR auth.jwt()->>'role' = 'service_role') WITH CHECK (auth.uid() = user_id OR auth.jwt()->>'role' = 'service_role');

-- Create policy for admins to view all profiles
DROP POLICY IF EXISTS "Admins can view all profiles." ON profiles;
CREATE POLICY "Admins can view all profiles." ON profiles FOR SELECT USING (auth.jwt()->>'role' = 'admin' OR auth.jwt()->>'role' = 'service_role');
