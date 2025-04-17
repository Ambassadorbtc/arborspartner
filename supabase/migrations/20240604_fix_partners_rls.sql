-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow users to manage their own partner records" ON partners;

-- Create a more permissive policy for partners table
CREATE POLICY "Allow users to manage their own partner records"
ON partners
FOR ALL
USING (auth.uid() = user_id OR auth.role() = 'service_role');

-- Enable RLS on partners table
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;

-- Add policy for public insert to partners during signup
DROP POLICY IF EXISTS "Allow public insert to partners" ON partners;
CREATE POLICY "Allow public insert to partners"
ON partners
FOR INSERT
WITH CHECK (true);

-- Create policy for admins to view all partners
DROP POLICY IF EXISTS "Admins can view all partners" ON partners;
CREATE POLICY "Admins can view all partners"
ON partners
FOR SELECT
USING (auth.jwt()->>'role' = 'admin' OR auth.jwt()->>'role' = 'service_role');