/**
 * L1-TRIANGLE SERVER - Backend Node.js simple et robuste
 * Sauvegarde JSON locale - Pas de dépendances externes
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;
const DATA_DIR = path.join(__dirname, 'data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');

// Créer le dossier data s'il n'existe pas
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialiser les fichiers JSON
function initDataFiles() {
  if (!fs.existsSync(PRODUCTS_FILE)) {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify({}, null, 2));
  }
  if (!fs.existsSync(ORDERS_FILE)) {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify({}, null, 2));
  }
}

// Lire les produits
function getProducts() {
  try {
    const data = fs.readFileSync(PRODUCTS_FILE, 'utf8');
    const obj = JSON.parse(data || '{}');
    return Object.entries(obj).map(([id, product]) => ({ id, ...product }));
  } catch (err) {
    console.error('Erreur lecture produits:', err);
    return [];
  }
}

// Ajouter un produit
function addProduct(product) {
  try {
    const data = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8') || '{}');
    const id = Date.now().toString();
    data[id] = { ...product, createdAt: new Date().toISOString() };
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(data, null, 2));
    return { id, ...data[id] };
  } catch (err) {
    throw new Error('Erreur ajout produit: ' + err.message);
  }
}

// Mettre à jour un produit
function updateProduct(id, updates) {
  try {
    const data = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8') || '{}');
    if (!data[id]) throw new Error('Produit non trouvé');
    data[id] = { ...data[id], ...updates };
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(data, null, 2));
    return data[id];
  } catch (err) {
    throw new Error('Erreur mise à jour: ' + err.message);
  }
}

// Supprimer un produit
function deleteProduct(id) {
  try {
    const data = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8') || '{}');
    if (!data[id]) throw new Error('Produit non trouvé');
    delete data[id];
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (err) {
    throw new Error('Erreur suppression: ' + err.message);
  }
}

// Lire les commandes
function getOrders() {
  try {
    const data = fs.readFileSync(ORDERS_FILE, 'utf8');
    const obj = JSON.parse(data || '{}');
    return Object.entries(obj).map(([id, order]) => ({ id, ...order }));
  } catch (err) {
    console.error('Erreur lecture commandes:', err);
    return [];
  }
}

// Créer une commande
function createOrder(order) {
  try {
    const data = JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8') || '{}');
    const id = Date.now().toString();
    data[id] = { ...order, createdAt: new Date().toISOString(), status: 'pending' };
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(data, null, 2));
    return { id, ...data[id] };
  } catch (err) {
    throw new Error('Erreur création commande: ' + err.message);
  }
}

// Mettre à jour une commande
function updateOrder(id, updates) {
  try {
    const data = JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8') || '{}');
    if (!data[id]) throw new Error('Commande non trouvée');
    data[id] = { ...data[id], ...updates };
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(data, null, 2));
    return data[id];
  } catch (err) {
    throw new Error('Erreur mise à jour: ' + err.message);
  }
}

// Serveur HTTP
const server = http.createServer((req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  try {
    // PRODUCTS
    if (pathname === '/api/products' && req.method === 'GET') {
      const products = getProducts();
      res.writeHead(200);
      res.end(JSON.stringify(products));

    } else if (pathname === '/api/products' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        const product = JSON.parse(body);
        const result = addProduct(product);
        res.writeHead(201);
        res.end(JSON.stringify(result));
      });

    } else if (pathname.match(/^\/api\/products\/[^/]+$/) && req.method === 'PUT') {
      const id = pathname.split('/').pop();
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        const updates = JSON.parse(body);
        const result = updateProduct(id, updates);
        res.writeHead(200);
        res.end(JSON.stringify(result));
      });

    } else if (pathname.match(/^\/api\/products\/[^/]+$/) && req.method === 'DELETE') {
      const id = pathname.split('/').pop();
      deleteProduct(id);
      res.writeHead(200);
      res.end(JSON.stringify({ success: true }));

    // ORDERS
    } else if (pathname === '/api/orders' && req.method === 'GET') {
      const orders = getOrders();
      res.writeHead(200);
      res.end(JSON.stringify(orders));

    } else if (pathname === '/api/orders' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        const order = JSON.parse(body);
        const result = createOrder(order);
        res.writeHead(201);
        res.end(JSON.stringify(result));
      });

    } else if (pathname.match(/^\/api\/orders\/[^/]+$/) && req.method === 'PUT') {
      const id = pathname.split('/').pop();
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        const updates = JSON.parse(body);
        const result = updateOrder(id, updates);
        res.writeHead(200);
        res.end(JSON.stringify(result));
      });

    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Route not found' }));
    }
  } catch (err) {
    console.error('Erreur serveur:', err);
    res.writeHead(500);
    res.end(JSON.stringify({ error: err.message }));
  }
});

initDataFiles();

server.listen(PORT, () => {
  console.log(`✅ L1-TRIANGLE Server sur http://localhost:${PORT}`);
  console.log('📁 Données sauvegardées dans: ' + DATA_DIR);
});
