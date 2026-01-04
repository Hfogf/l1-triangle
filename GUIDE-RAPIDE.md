# 🎮 GUIDE DE DÉMARRAGE RAPIDE - L1-TRIANGLE

## 1️⃣ DÉMARRER LE SERVEUR

### Windows (.bat)
Double-cliquez sur `START-SERVER.bat`
```
✅ L1-TRIANGLE Server sur http://localhost:3000
```

### Mac/Linux (.sh)
```bash
chmod +x START-SERVER.sh
./START-SERVER.sh
```

### Ou directement avec Node.js
```bash
node server.js
```

## 2️⃣ ACCÉDER AU SITE

Ouvrez dans votre navigateur:

| Lien | Description |
|------|-------------|
| `index.html` | 🛍️ **Shop** - Voir et acheter les produits |
| `admin.html` | 🛠️ **Admin** - Ajouter/gérer les produits |
| `test-api.html` | ✅ **Test** - Vérifier la connexion API |

## 3️⃣ CODES D'ACCÈS

```
Admin Dashboard: L1_TRIANGLE
```

## 4️⃣ CE QUI EST INCLUS

✅ **Serveur Node.js** - API REST complète  
✅ **6 Produits par défaut** - Manettes, casques, moniteurs, souris, vape, console  
✅ **Dashboard Admin** - Ajouter/modifier/supprimer des produits  
✅ **Shop Frontend** - Affichage et panier  
✅ **Checkout WhatsApp** - Intégration WhatsApp complète  
✅ **Mobile Responsive** - Fonctionne sur tous les appareils  

## 5️⃣ STRUCTURE DES FICHIERS

```
L1-triangle/
├── server.js          ← Serveur API (NODE.JS)
├── index.html         ← Shop
├── admin.html         ← Dashboard admin
├── test-api.html      ← Page de test
├── css/styles.css     ← Styles
├── js/
│   ├── api.js         ← Client API
│   └── site.js        ← Logique boutique
├── data/
│   ├── products.json  ← Sauvegarde produits
│   └── orders.json    ← Sauvegarde commandes
└── README.md          ← Documentation complète
```

## 6️⃣ AJOUTER DES PRODUITS

1. Ouvrez `admin.html`
2. Entrez le code: **L1_TRIANGLE**
3. Cliquez **"+ Ajouter Produit"**
4. Remplissez le formulaire
5. Uploadez une image (URL ou fichier)
6. Cliquez **"✨ Ajouter"**

✅ Le produit s'affiche immédiatement sur le shop!

## 7️⃣ TESTER SANS LE SERVEUR

Si Node.js n'est pas installé, le site utilise un **fallback localStorage**:
- Les produits sont sauvegardés localement
- Les données disparaissent au refresh du cache

✅ **SOLUTION**: Installez Node.js depuis https://nodejs.org/

## 8️⃣ DÉPANNAGE

### ❌ "Serveur indisponible"
- Vérifiez que `START-SERVER.bat` ou `node server.js` tourne
- Vérifiez que le port 3000 n'est pas utilisé
- Les produits sauvegardés disparaissent? C'est normal sans le serveur - utilisez les données JSON

### ❌ "Admin.html ne s'ouvre pas"
- Le code est **L1_TRIANGLE** (majuscules)
- Vérifiez le code de l'onglet admin

### ❌ Les images ne s'affichent pas
- Utilisez des URLs complètes (https://...)
- Les images en base64 prennent beaucoup d'espace

## 9️⃣ DÉPLOIEMENT

### Déployer sur GitHub (déjà fait ✅)
```bash
git push origin main
```

### Déployer sur un serveur
```bash
npm install -g pm2
pm2 start server.js
```

### Déployer sur Vercel/Heroku
Lisez le `README.md` pour les instructions complètes

## 🔟 SUPPORT

- 📧 Email: l1triangle.info@gmail.com
- 📱 WhatsApp: +509 39 94 57 94
- 🌐 Site: index.html

---

**Le site est prêt! 🚀 Lancez `START-SERVER.bat` et commencez!**
