-- Drop existing policies that might be causing recursion
DROP POLICY IF EXISTS "Profiles are viewable by users who created them." ON profiles;
DROP POLICY IF EXISTS "Profiles are editable by users who created them." ON profiles;
DROP POLICY IF EXISTS "Profiles are insertable by authenticated users." ON profiles;

-- Disable RLS on profiles table to simplify access
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- Drop existing policies that might be causing recursion for partners
DROP POLICY IF EXISTS "Partners are viewable by users who created them." ON partners;
DROP POLICY IF EXISTS "Partners are editable by users who created them." ON partners;
DROP POLICY IF EXISTS "Partners are insertable by authenticated users." ON partners;

-- Disable RLS on partners table to simplify access
ALTER TABLE public.partners DISABLE ROW LEVEL SECURITY;

-- Fix users table foreign key constraint
ALTER TABLE public.users DROP CONSTRAINT IF EXISTS users_id_fkey;
ALTER TABLE public.users ADD CONSTRAINT users_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;
