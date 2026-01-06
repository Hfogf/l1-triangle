# 🚀 GUIDE SETUP SUPABASE RAPIDE

## Étape 1 : Accéder à Supabase SQL Editor

1. Va sur https://app.supabase.com
2. Ouvre ton projet **fiofrgaiwosyzrddlhln**
3. Dans le menu gauche, clique sur **SQL Editor**

## Étape 2 : Exécuter le script SQL

1. Clique sur **New Query**
2. Copie TOUT le contenu du fichier `supabase-setup.sql`
3. Colle-le dans l'éditeur SQL
4. Clique sur **RUN** (bouton vert en bas à droite)

## Étape 3 : Vérifier que ça marche

Tu devrais voir dans les résultats :
```
✅ Tables créées
✅ RLS activé
✅ 8 policies créées (4 pour products, 4 pour orders)
```

## Étape 4 : Tester le site

1. Ouvre `admin.html` dans ton navigateur
2. Entre le code : `L1_TRIANGLE`
3. Clique "+ Ajouter Produit"
4. Remplis le formulaire et ajoute un produit
5. **Le produit doit apparaître immédiatement après le rechargement**

## ❌ Si ça ne marche toujours pas

Ouvre la console du navigateur (F12) et cherche :
- Des erreurs `403 Forbidden` → RLS bloque encore
- Des erreurs `401 Unauthorized` → Problème de clé API
- `📦 Produits chargés: 0` → Aucun produit dans la base

## 🆘 Besoin d'aide ?

Si tu vois des erreurs, copie-moi exactement ce qui s'affiche dans la console et je corrigerai.
