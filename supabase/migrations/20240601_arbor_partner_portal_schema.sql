-- Create profiles table to store user roles and information
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL CHECK (role IN ('admin', 'partner')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create partners table to store partner-specific information
CREATE TABLE IF NOT EXISTS partners (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  commission_rate DECIMAL NOT NULL DEFAULT 0.15,
  commission_min DECIMAL NOT NULL DEFAULT 50,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create leads table to store customer leads
CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  partner_id INTEGER REFERENCES partners(id) ON DELETE CASCADE,
  store_name TEXT NOT NULL,
  contact_name TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  postcode TEXT,
  status TEXT NOT NULL CHECK (status IN ('pending', 'spoken', 'closed', 'rejected')) DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create sales table to store completed sales
CREATE TABLE IF NOT EXISTS sales (
  id SERIAL PRIMARY KEY,
  lead_id INTEGER REFERENCES leads(id) ON DELETE SET NULL,
  partner_id INTEGER REFERENCES partners(id) ON DELETE SET NULL,
  amount DECIMAL NOT NULL,
  commission_amount DECIMAL NOT NULL,
  sale_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create uploads table to track CSV uploads
CREATE TABLE IF NOT EXISTS uploads (
  id SERIAL PRIMARY KEY,
  partner_id INTEGER REFERENCES partners(id) ON DELETE CASCADE,
  filename TEXT NOT NULL,
  lead_count INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE uploads ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));

-- Create policies for partners
DROP POLICY IF EXISTS "Partners can view their own record" ON partners;
CREATE POLICY "Partners can view their own record"
  ON partners FOR SELECT
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Admins can view all partners" ON partners;
CREATE POLICY "Admins can view all partners"
  ON partners FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));

DROP POLICY IF EXISTS "Admins can update partners" ON partners;
CREATE POLICY "Admins can update partners"
  ON partners FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));

-- Create policies for leads
DROP POLICY IF EXISTS "Partners can view their own leads" ON leads;
CREATE POLICY "Partners can view their own leads"
  ON leads FOR SELECT
  USING (partner_id IN (
    SELECT id FROM partners
    WHERE user_id = auth.uid()
  ));

DROP POLICY IF EXISTS "Partners can insert their own leads" ON leads;
CREATE POLICY "Partners can insert their own leads"
  ON leads FOR INSERT
  WITH CHECK (partner_id IN (
    SELECT id FROM partners
    WHERE user_id = auth.uid()
  ));

DROP POLICY IF EXISTS "Admins can view all leads" ON leads;
CREATE POLICY "Admins can view all leads"
  ON leads FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));

DROP POLICY IF EXISTS "Admins can update all leads" ON leads;
CREATE POLICY "Admins can update all leads"
  ON leads FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));

-- Create policies for sales
DROP POLICY IF EXISTS "Partners can view their own sales" ON sales;
CREATE POLICY "Partners can view their own sales"
  ON sales FOR SELECT
  USING (partner_id IN (
    SELECT id FROM partners
    WHERE user_id = auth.uid()
  ));

DROP POLICY IF EXISTS "Admins can view all sales" ON sales;
CREATE POLICY "Admins can view all sales"
  ON sales FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));

DROP POLICY IF EXISTS "Admins can insert sales" ON sales;
CREATE POLICY "Admins can insert sales"
  ON sales FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));

-- Create policies for uploads
DROP POLICY IF EXISTS "Partners can view their own uploads" ON uploads;
CREATE POLICY "Partners can view their own uploads"
  ON uploads FOR SELECT
  USING (partner_id IN (
    SELECT id FROM partners
    WHERE user_id = auth.uid()
  ));

DROP POLICY IF EXISTS "Partners can insert their own uploads" ON uploads;
CREATE POLICY "Partners can insert their own uploads"
  ON uploads FOR INSERT
  WITH CHECK (partner_id IN (
    SELECT id FROM partners
    WHERE user_id = auth.uid()
  ));

DROP POLICY IF EXISTS "Admins can view all uploads" ON uploads;
CREATE POLICY "Admins can view all uploads"
  ON uploads FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));

-- Enable realtime for all tables
alter publication supabase_realtime add table profiles;
alter publication supabase_realtime add table partners;
alter publication supabase_realtime add table leads;
alter publication supabase_realtime add table sales;
alter publication supabase_realtime add table uploads;
