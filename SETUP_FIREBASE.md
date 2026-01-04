# 🔥 SETUP FIREBASE - API CENTRALISÉE

## POURQUOI FIREBASE?
✅ **Serveur centralisé** - Les produits sont accessibles à TOUS
✅ **Gratuit** - Jusqu'à 100 connexions simultanées
✅ **Temps réel** - Les changements s'affichent instantanément
✅ **Aucun backend à maintenir** - Google gère tout

---

## 📋 ÉTAPES D'INSTALLATION

### 1️⃣ CRÉER UN PROJET FIREBASE

1. Aller à [console.firebase.google.com](https://console.firebase.google.com)
2. Cliquer **"Create a project"**
3. Nom: `L1Triangle`
4. Accepter tous les termes
5. Créer le projet

### 2️⃣ CRÉER UNE BASE DE DONNÉES REALTIME

1. Dans la console Firebase
2. Menu gauche → **"Realtime Database"**
3. Cliquer **"Create Database"**
4. Localisation: **United States** (ou proche de vous)
5. Règles: **Start in test mode** (important!)
6. Cliquer **"Enable"**

### 3️⃣ COPIER VOS IDENTIFIANTS

1. Menu gauche → **"Project Settings"** (engrenage)
2. Onglet **"Service Accounts"**
3. Descendre jusqu'à **"Database secrets"**
4. Copier l'URL (ressemble à `https://l1triangle-123.firebaseio.com`)

OU si vous êtes sur Web:
1. Cliquer sur **"</>"** (Web App)
2. Copier la config Firebase

### 4️⃣ CONFIGURER L'API

Ouvrir [js/api.js](js/api.js) ligne 4-13 et remplacer:

```javascript
this.firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT.firebaseio.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

**Exemple complet:**
```javascript
this.firebaseConfig = {
  apiKey: "AIzaSyDxxxxxxxxxxxxxxxxx",
  authDomain: "l1triangle-12345.firebaseapp.com",
  databaseURL: "https://l1triangle-12345.firebaseio.com",
  projectId: "l1triangle-12345",
  storageBucket: "l1triangle-12345.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:xxxxxxxxxxxxx"
};
```

### 5️⃣ CONFIGURER LES RÈGLES FIREBASE

**⚠️ TRÈS IMPORTANT - Sécurité**

1. Firebase Console → **"Realtime Database"**
2. Onglet **"Rules"**
3. Remplacer le code par:

```json
{
  "rules": {
    "products": {
      ".read": true,
      ".write": true,
      ".indexOn": ["id"]
    },
    "orders": {
      ".read": true,
      ".write": true,
      ".indexOn": ["id"]
    }
  }
}
```

4. Cliquer **"Publish"**

---

## 🧪 TESTER

### Admin Dashboard
1. Ouvrir [admin.html](admin.html)
2. Code: `L1_TRIANGLE`
3. Ajouter un produit
4. Vérifier dans Firebase Console → **Data**

### Site Principal
1. Ouvrir [index.html](index.html)
2. Le produit doit apparaître instantanément
3. Ajouter au panier
4. Commander

### Vérifier les données
1. Firebase Console → **Realtime Database**
2. Vous devriez voir:
```
├── orders/
│   └── 1234567890/
│       ├── id: "1234567890"
│       ├── items: [...]
│       └── createdAt: "2024-..."
└── products/
    └── 1234567890/
        ├── id: "1234567890"
        ├── title: "Manette Xbox"
        ├── image: "..."
        └── price: 2500
```

---

## 🚀 DÉPLOYER

### Option 1: NETLIFY (Recommandé)
1. Créer compte [netlify.com](https://netlify.com)
2. Drag & drop le dossier `L1 triangle`
3. Votre site est live!

### Option 2: VERCEL
1. Créer compte [vercel.com](https://vercel.com)
2. Importer le projet
3. Déployer

### Option 3: GitHub Pages
1. Créer repo GitHub
2. Push les fichiers
3. Settings → Pages → Déployer

---

## ⚙️ FALLBACK (Si Firebase ne fonctionne pas)

L'API utilise **localStorage en local** si Firebase n'est pas configuré.
- Données stockées localement
- Pas de synchronisation avec autres appareils
- Parfait pour tester

Vérifier la console:
```javascript
console.log(window.L1API.useLocalStorage)
// true = localStorage, false = Firebase
```

---

## 📞 TROUBLESHOOTING

### "Produits n'apparaissent pas"
1. Vérifier databaseURL dans [js/api.js](js/api.js)
2. Vérifier règles Firebase sont publiées
3. Ouvrir console (F12) → voir les erreurs

### "Erreur CORS"
1. Firebase REST API n'a pas de CORS issues
2. Vérifier URL format: `https://project.firebaseio.com`

### "Données pas synchronisées"
1. Attendre 2-3 secondes (réseau)
2. Rafraîchir la page
3. Vérifier databaseURL

---

## 💰 COÛTS

**Gratuit pour:**
- 100 connexions simultanées
- 1 Go de stockage
- 10 Go de bande passante/mois

**Au-delà:** ~1$ par 1 million d'opérations

---

## ✅ RÉSUMÉ

```
Firebase Realtime Database
    ↓
Synchronisation temps réel
    ↓
Admin ajoute produit → Visible à TOUS instantanément
    ↓
Clients voient produits et peuvent commander
    ↓
Commandes sauvegardées dans Firebase
```

C'est simple, rapide, et gratuit! 🚀
