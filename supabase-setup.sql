-- ====================================
-- L1-TRIANGLE SUPABASE SETUP COMPLET
-- ====================================
-- Exécutez ce fichier dans le SQL Editor de Supabase
-- https://app.supabase.com/project/YOUR_PROJECT/sql

-- 1. CRÉER LES TABLES
-- ====================

-- Table produits
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  title TEXT,
  description TEXT,
  category TEXT,
  price NUMERIC DEFAULT 0,
  image TEXT,
  badge TEXT,
  meta TEXT
);

-- Table commandes
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  items JSONB,
  total NUMERIC DEFAULT 0,
  customer_email TEXT,
  customer_phone TEXT,
  status TEXT DEFAULT 'pending'
);

-- 2. ACTIVER RLS (Row Level Security)
-- ====================================

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- 3. SUPPRIMER LES ANCIENNES POLICIES (si elles existent)
-- =======================================================

DROP POLICY IF EXISTS "public_read_products" ON products;
DROP POLICY IF EXISTS "public_insert_products" ON products;
DROP POLICY IF EXISTS "public_update_products" ON products;
DROP POLICY IF EXISTS "public_delete_products" ON products;

DROP POLICY IF EXISTS "public_read_orders" ON orders;
DROP POLICY IF EXISTS "public_insert_orders" ON orders;
DROP POLICY IF EXISTS "public_update_orders" ON orders;
DROP POLICY IF EXISTS "public_delete_orders" ON orders;

-- 4. CRÉER LES POLICIES PUBLIQUES
-- ================================

-- Policies pour PRODUCTS (accès public complet)
CREATE POLICY "public_read_products" 
  ON products FOR SELECT 
  USING (true);

CREATE POLICY "public_insert_products" 
  ON products FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "public_update_products" 
  ON products FOR UPDATE 
  USING (true);

CREATE POLICY "public_delete_products" 
  ON products FOR DELETE 
  USING (true);

-- Policies pour ORDERS (accès public complet)
CREATE POLICY "public_read_orders" 
  ON orders FOR SELECT 
  USING (true);

CREATE POLICY "public_insert_orders" 
  ON orders FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "public_update_orders" 
  ON orders FOR UPDATE 
  USING (true);

CREATE POLICY "public_delete_orders" 
  ON orders FOR DELETE 
  USING (true);

-- 5. VÉRIFICATION
-- ================

-- Vérifier les tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('products', 'orders');

-- Vérifier les policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies
WHERE tablename IN ('products', 'orders')
ORDER BY tablename, policyname;

-- Compter les produits et commandes
SELECT 
  (SELECT COUNT(*) FROM products) as total_products,
  (SELECT COUNT(*) FROM orders) as total_orders;

-- ====================================
-- SETUP TERMINÉ !
-- ====================================
-- Votre base de données est maintenant configurée avec :
-- ✅ Tables products et orders
-- ✅ RLS activé
-- ✅ Policies publiques pour toutes les opérations
-- ✅ Le site peut maintenant lire/écrire librement
