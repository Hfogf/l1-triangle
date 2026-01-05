# L1-TRIANGLE Gaming Store

Une plateforme e-commerce premium pour la vente de produits gaming en Haïti.

## 🚀 Démarrage Rapide

### Prérequis
- Node.js v14+
- npm ou yarn

### Installation

```bash
# Cloner le repository
git clone https://github.com/yourusername/l1-triangle.git
cd l1-triangle

# Installer les dépendances (optionnel, pas de dépendances NPM)
npm install

# Démarrer le serveur
node server.js
```

Le site sera accessible à: `http://localhost:3000`

## 📁 Structure du Projet

```
l1-triangle/
├── index.html              # Page principale
├── admin.html              # Dashboard admin
├── server.js              # Serveur Node.js
├── test-api.js            # Tests API
├── package.json           # Configuration NPM
│
├── css/
│   └── styles.css         # Styles optimisés
│
├── js/
│   ├── api.js            # Classe API client
│   ├── site.js           # Script principal du site
│   └── products-data.js  # Données des produits
│
└── data/
    ├── products.json     # Base de produits
    └── orders.json       # Base de commandes
```

## 🔌 API REST

### Produits

**GET /api/products**
```bash
curl http://localhost:3000/api/products
```

**POST /api/products**
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Produit Test",
    "price": 2500,
    "category": "manettes",
    "desc": "Description",
    "meta": "En stock"
  }'
```

### Commandes

**GET /api/orders**
```bash
curl http://localhost:3000/api/orders
```

**POST /api/orders**
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [{"title": "Produit", "price": 100, "quantity": 1}],
    "total": 100,
    "customerName": "Jean Dupont",
    "status": "pending"
  }'
```

## 🔐 Admin Dashboard

Accédez à: `http://localhost:3000/admin.html`

Code d'accès: `L1_TRIANGLE`

Fonctionnalités:
- ✅ Ajouter/modifier/supprimer les produits
- ✅ Voir les commandes
- ✅ Gérer les statistiques
- ✅ Upload d'images

## 🎨 Personnalisation

### Variables CSS
Les couleurs principales se trouvent dans `css/styles.css`:
```css
:root {
  --accent-orange: #ff6b3d;
  --bg-primary: #0f1419;
  --text-primary: #ffffff;
}
```

### Configuration Serveur
Modifiez le port dans `server.js`:
```javascript
const PORT = 3000; // Changer ici
```

## 🚢 Déploiement

### Option 1: Heroku
```bash
git push heroku main
```

### Option 2: Vercel
Créer un fichier `api/` pour le serverless

### Option 3: VPS / Dedicated Server
```bash
npm install -g pm2
pm2 start server.js
pm2 save
```

## 🧪 Tests

Lancer les tests API:
```bash
node test-api.js
```

## 📝 Modifications Récentes (v1.0)

- ✅ Correction du format téléphone mobile
- ✅ Vidéo de fond fixée (chemin corrigé)
- ✅ Design simplifié et optimisé
- ✅ Responsivité mobile complète
- ✅ API REST fonctionnelle

## 📞 Support

- **WhatsApp**: [+509 3994 5794](https://wa.me/50939945794)
- **Email**: l1triangle.info@gmail.com
- **Adresse**: Morne Hercule, Petion-Ville, Port-au-Prince

## 📄 License

MIT License - Voir LICENSE pour plus de détails

---

**Crée par**: L1-TRIANGLE Team  
**Dernière mise à jour**: Janvier 2026
