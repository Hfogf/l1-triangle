# L1-TRIANGLE — Guide rapide

Site vitrine/shop statique (HTML/CSS/JS) connecté à Supabase (REST). Pas de serveur Node requis. L’admin gère les produits directement via l’API Supabase. Un fallback localStorage assure la continuité si Supabase est indisponible (utilisation locale uniquement).

## Structure
- index.html — Site public (affiche les produits, panier, checkout WhatsApp/Email)
- admin.html — Dashboard admin (code: `L1_TRIANGLE`)
- css/styles.css — Styles
- js/api.js — Client API (Supabase + fallback)
- js/site.js — Logique UI côté site

## Pré-requis Supabase
1) Créez un projet sur https://supabase.com
2) Tables (en SQL simple) :

```sql
-- produits
create table if not exists products (
	id uuid primary key default gen_random_uuid(),
	created_at timestamp with time zone default now(),
	title text not null,
	description text,
	category text,
	price numeric,
	image text
);

-- commandes
create table if not exists orders (
	id uuid primary key default gen_random_uuid(),
	created_at timestamp with time zone default now(),
	items jsonb,
	total numeric,
	customer_email text,
	customer_phone text,
	status text default 'pending'
);

-- RLS (selon besoin) : pour un site public, autoriser les opérations nécessaires
-- Exemple minimaliste (à adapter en production) :
alter table products enable row level security;
create policy "public read" on products for select using (true);
create policy "public write" on products for insert with check (true);
create policy "public update" on products for update using (true);
create policy "public delete" on products for delete using (true);

alter table orders enable row level security;
create policy "public read" on orders for select using (true);
create policy "public write" on orders for insert with check (true);
create policy "public update" on orders for update using (true);
create policy "public delete" on orders for delete using (true);
```

3) Copiez l’URL de votre projet et la clé anonyme (anon) et remplacez-les dans `js/api.js` si nécessaire.

## Vidéo de fond
- Placez votre fichier vidéo à la racine sous le nom `hero-video.mp4` pour l’utiliser.
- Un fallback vidéo CC0 et un `poster` sont déjà configurés pour un rendu propre.

## Déploiement (GitHub Pages)
1) Poussez le repo sur GitHub (branche `main`).
2) Activez GitHub Pages (Settings → Pages → Deploy from branch → `main`/root).
3) L’URL publique affichera `index.html`. L’admin est accessible via `/admin.html`.

## Notes sur les images produits
- L’admin supporte deux modes :
	- URL d’image (conseillé si l’image est hébergée publiquement).
	- Upload local (converti en DataURL et sauvegardé dans le champ `image`).
- Pour un stockage d’images optimisé, utilisez Supabase Storage (politiques requises) et sauvegardez l’URL publique dans `image`.

## Développement local
Il suffit d’ouvrir `index.html` et `admin.html` dans le navigateur. Pas de build/serveur requis.
