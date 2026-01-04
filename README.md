# 🎮 L1-TRIANGLE — Gaming Store Platform

Site e-commerce gaming complet avec dashboard admin et backend API.

## ⚡ DÉMARRAGE RAPIDE

### 1. Lancer le serveur
```bash
node server.js
```

Vous verrez:
```
✅ L1-TRIANGLE Server sur http://localhost:3000
📁 Données sauvegardées dans: ./data
```

### 2. Accéder au site
- **Shop**: Ouvrez `index.html` dans votre navigateur
- **Admin**: Ouvrez `admin.html` → Code: **L1_TRIANGLE**

### 3. Ajouter des produits
1. Allez sur `admin.html`
2. Entrez: **L1_TRIANGLE**
3. Cliquez "+ Ajouter Produit"
4. Remplissez les infos et l'image
5. Cliquez "✨ Ajouter"

Les produits apparaissent **immédiatement** sur le shop!

---

## 📁 Structure des fichiers

```
L1-triangle/
├── server.js              ← Backend Node.js (PORT 3000)
├── package.json           ← Dépendances (aucune!)
├── index.html             ← Shop frontend
├── admin.html             ← Dashboard admin
├── css/
│   └── styles.css         ← Tous les styles
├── js/
│   ├── api.js             ← Client API (Local + Firebase)
│   └── site.js            ← Logique du shop
├── data/                  ← Créé automatiquement
│   ├── products.json      ← Sauvegarde produits
│   └── orders.json        ← Sauvegarde commandes
└── README.md              ← Ce fichier
```

---

## 🔧 API REST

Le serveur expose ces endpoints:

### PRODUITS

**GET** `/api/products`
- Récupère tous les produits
```bash
curl http://localhost:3000/api/products
```

**POST** `/api/products`
- Ajoute un produit
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","price":100,"category":"test"}'
```

**PUT** `/api/products/{id}`
- Met à jour un produit

**DELETE** `/api/products/{id}`
- Supprime un produit

### COMMANDES

**GET** `/api/orders`
- Récupère toutes les commandes

**POST** `/api/orders`
- Crée une commande

**PUT** `/api/orders/{id}`
- Met à jour le statut d'une commande

---

## 🎯 Fonctionnalités

✅ **Shop Frontend**
- Affichage des produits en grille
- Filtrage par catégorie
- Panier avec quantités
- Checkout WhatsApp/Email
- Responsive design

✅ **Admin Dashboard**
- Formulaire CRUD produits
- Upload image (URL ou fichier)
- Gestion des commandes
- Statistiques en temps réel
- Protection par code d'accès

✅ **Backend API**
- Sauvegarde JSON locale
- Pas de base de données complexe
- CORS activé pour localhost
- Logs de toutes les opérations

✅ **Multi-mode**
- Serveur local (recommandé)
- Firebase fallback (si configuré)
- localStorage fallback (offline)

---

## 🔐 Codes et accès

### Admin Dashboard
- **Code d'accès**: `L1_TRIANGLE`

### WhatsApp
- **Lien**: https://wa.me/50939945794

---

## 📦 Déploiement sur GitHub

### 1. Initialiser Git (si pas déjà fait)
```bash
git init
git add .
git commit -m "Initial commit - L1-TRIANGLE"
```

### 2. Créer un repo sur GitHub
https://github.com/new

### 3. Pousser le code
```bash
git remote add origin https://github.com/VotreUsername/L1-TRIANGLE.git
git branch -M main
git push -u origin main
```

### 4. Déployer sur un serveur

#### Option A: Vercel (Recommandé pour Node.js)
```bash
npm install -g vercel
vercel
```

#### Option B: Heroku
```bash
git push heroku main
```

#### Option C: Serveur VPS personnel
```bash
scp -r . user@votre-serveur:/app/l1-triangle
ssh user@votre-serveur "cd /app/l1-triangle && node server.js"
```

---

## 🐛 Troubleshooting

### Les produits ne s'affichent pas?
1. Vérifiez que le serveur tourne: `node server.js`
2. Console du navigateur (F12): Cherchez les erreurs
3. Vérifiez que http://localhost:3000/api/products répond

### Admin.html demande un code?
- Code: **L1_TRIANGLE** (exact, majuscules)

### Les produits sauvegardés disparaissent?
- C'est normal si le serveur redémarre
- Créez les produits à nouveau avec `admin.html`
- Ou mettez à jour `data/products.json` directement

### Comment ajouter des produits par défaut?
Modifiez `data/products.json`:
```json
{
  "1": {
    "id": "1",
    "title": "Manette PS5",
    "price": 3500,
    "category": "Manettes",
    "desc": "Manette officielle PlayStation 5",
    "meta": "En stock",
    "badge": "Nouveau",
    "image": "https://via.placeholder.com/280x200?text=Manette+PS5"
  }
}
```

---

## 📞 Support

- **Email**: l1triangle.info@gmail.com
- **WhatsApp**: +509 39 94 57 94

---

**Site prêt à l'emploi!** 🚀
