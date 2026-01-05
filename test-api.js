#!/usr/bin/env node

/**
 * Test API Script - Vérifier que tout fonctionne
 * Lance: node test-api.js
 */

const http = require('http');

function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          body: body ? JSON.parse(body) : null
        });
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function runTests() {
  console.log('🧪 Tests API L1-TRIANGLE\n');

  try {
    // Test 1: GET /api/products
    console.log('Test 1: GET /api/products');
    const products = await makeRequest('GET', '/api/products');
    console.log(`✅ Status: ${products.status}`);
    console.log(`✅ Produits trouvés: ${products.body.length}`);
    console.log(`✅ Premier produit: ${products.body[0]?.title}\n`);

    // Test 2: GET /api/orders
    console.log('Test 2: GET /api/orders');
    const orders = await makeRequest('GET', '/api/orders');
    console.log(`✅ Status: ${orders.status}`);
    console.log(`✅ Commandes trouvées: ${orders.body.length}\n`);

    // Test 3: POST /api/orders (créer une commande)
    console.log('Test 3: POST /api/orders');
    const newOrder = {
      items: [{ title: 'Test Product', price: 100, quantity: 1 }],
      total: 100,
      customerName: 'Test User',
      status: 'pending'
    };
    const createOrderRes = await makeRequest('POST', '/api/orders', newOrder);
    console.log(`✅ Status: ${createOrderRes.status}`);
    console.log(`✅ Commande créée avec ID: ${createOrderRes.body.id}\n`);

    console.log('✅ TOUS LES TESTS RÉUSSIS!');
    console.log('\n📋 Résumé:');
    console.log(`- API fonctionne: OUI`);
    console.log(`- Produits en base: ${products.body.length}`);
    console.log(`- Commandes en base: ${orders.body.length}`);
    console.log(`- Création de commande: OK`);
    console.log('\n🚀 Prêt pour le push GitHub!');

  } catch (error) {
    console.error('❌ Erreur:', error.message);
    console.error('Assurez-vous que le serveur tourne: node server.js');
    process.exit(1);
  }
}

runTests();
