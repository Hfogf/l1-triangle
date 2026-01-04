# 🔥 CRÉER VOTRE BASE FIREBASE

## PROBLÈME ACTUEL
❌ Le serveur Firebase n'existe pas encore !
❌ Les produits ne peuvent pas être sauvegardés

## SOLUTION EN 5 ÉTAPES

### 1️⃣ Allez sur Firebase Console
🌐 Ouvrez: https://console.firebase.google.com

### 2️⃣ Créez un Projet
- Cliquez "Ajouter un projet"
- Nom: **L1-Triangle** (ou autre)
- Acceptez les conditions
- Désactivez Google Analytics (pas nécessaire)
- Cliquez "Créer le projet"

### 3️⃣ Créez la Base de Données
- Dans le menu à gauche: **"Realtime Database"**
- Cliquez "Créer une base de données"
- Localisation: **United States (us-central1)**
- Mode: **"Commencer en mode test"**
- Cliquez "Activer"

### 4️⃣ Copiez l'URL de votre Base
Vous verrez une URL comme:
```
https://l1-triangle-abc123.firebaseio.com
```
**📋 COPIEZ CETTE URL !**

### 5️⃣ Mettez l'URL dans votre Code
Ouvrez le fichier: **js/api.js**

À la ligne 10, remplacez:
```javascript
this.firebaseURL = 'https://l1-triangle-default-rtdb.firebaseio.com';
```

Par VOTRE URL:
```javascript
this.firebaseURL = 'https://l1-triangle-abc123.firebaseio.com';
```

## ✅ TERMINÉ !
Rafraîchissez admin.html - vos produits seront maintenant sauvegardés sur Firebase !

---

**Questions?** Suivez ce guide étape par étape.
