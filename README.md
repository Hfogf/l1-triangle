# L1-TRIANGLE - Guide Rapide

## 🎯 C'est quoi?
Site e-commerce gaming avec:
- **Backend**: Node.js + Supabase (base de données cloud)
- **Frontend**: HTML/CSS/JS
- **Admin**: Tableau de bord pour gérer les produits directement sur le serveur

## 📁 Fichiers (9 total):
```
.env              → Clés Supabase
.gitignore        → Exclure node_modules
admin.html        → Interface admin (Supabase direct)
index.html        → Site public
package.json      → npm install
server.js         → API Node.js
SETUP.md          → Comment configurer
css/styles.css    → Design
js/api.js         → Client API
js/site.js        → Logique du site
```

## ⚡ Démarrer:

### 1. Supabase (5 min)
```bash
# Créer compte sur https://supabase.com
# Copier PROJECT_URL et ANON_KEY
# Exécuter le SQL dans SETUP.md
```

### 2. .env
```
PORT=3000
SUPABASE_URL=https://...supabase.co
SUPABASE_KEY=eyJ...
```

### 3. Lancer
```bash
npm install
npm start
```

### 4. Utiliser
- **Site public**: `index.html`
- **Admin**: `admin.html` (code: `L1_TRIANGLE`)

## ✅ Avantages
- ✨ Zéro localhost-dépendance
- 🗄️ Base de données cloud Supabase
- ⚡ Modifications en temps réel
- 📦 9 fichiers seulement
- 🔒 Sécurité Supabase intégrée
