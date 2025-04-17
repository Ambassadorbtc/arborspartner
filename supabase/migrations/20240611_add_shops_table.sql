-- Create shops table if it doesn't exist
CREATE TABLE IF NOT EXISTS shops (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT,
  address TEXT,
  city TEXT,
  postcode TEXT,
  contact_name TEXT,
  phone TEXT,
  email TEXT,
  status TEXT DEFAULT 'active',
  type TEXT,
  commission_type TEXT DEFAULT 'Percentage',
  commission_value TEXT DEFAULT '15%',
  leads_count INTEGER DEFAULT 0,
  last_contact TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  notes TEXT,
  partner_id INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert dummy shop data
INSERT INTO shops (name, location, address, city, postcode, contact_name, phone, email, status, type, commission_type, commission_value, leads_count, notes)
VALUES
('Coffee Haven', 'London', '123 High Street', 'London', 'EC1A 1BB', 'James Wilson', '+44 7700 900123', 'james@coffeehaven.com', 'active', 'Cafe', 'Percentage', '15%', 8, 'Premium coffee shop with high foot traffic. Interested in expanding their digital presence.'),
('Bakery Delight', 'Manchester', '45 Market Square', 'Manchester', 'M1 1AE', 'Sarah Johnson', '+44 7700 900456', 'sarah@bakerydelight.com', 'active', 'Bakery', 'Percentage', '12%', 5, 'Family-owned bakery with multiple locations. Looking for loyalty program solutions.'),
('Gourmet Burgers', 'Birmingham', '78 Castle Road', 'Birmingham', 'B1 1AA', 'Michael Brown', '+44 7700 900789', 'michael@gourmetburgers.com', 'pending', 'Restaurant', 'Fixed', '£100', 3, 'Fast-growing burger chain. Initial meeting scheduled for next week.'),
('Fashion Boutique', 'Glasgow', '12 Style Avenue', 'Glasgow', 'G1 1AB', 'Emma Wilson', '+44 7700 900101', 'emma@fashionboutique.com', 'inactive', 'Retail', 'Percentage', '18%', 0, 'Upscale clothing store. Currently reviewing our proposal.'),
('Tech Gadgets', 'Edinburgh', '56 Digital Lane', 'Edinburgh', 'EH1 1YZ', 'David Chen', '+44 7700 900202', 'david@techgadgets.com', 'active', 'Electronics', 'Percentage', '15%', 12, 'Electronics retailer with strong online presence. Interested in in-store analytics.'),
('Healthy Eats', 'Bristol', '89 Nutrition Road', 'Bristol', 'BS1 1AA', 'Lisa Green', '+44 7700 900303', 'lisa@healthyeats.com', 'pending', 'Restaurant', 'Percentage', '14%', 2, 'Health food restaurant chain. Looking for delivery integration solutions.');

-- Enable realtime for shops table
alter publication supabase_realtime add table shops;
