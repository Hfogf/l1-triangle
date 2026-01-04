/**
 * L1-TRIANGLE API - Backend Local + Firebase
 * Fonctionne avec le serveur Node.js local
 */

class L1TriangleAPI {
  constructor() {
    // Déterminer l'URL du serveur
    this.localURL = 'http://localhost:3000';
    this.firebaseURL = 'https://l1-triangle-default-rtdb.firebaseio.com';
    
    this.API_PREFIX = '/api';
    
    // Test connexion au serveur local
    this.testConnection();
    
    console.log('✅ L1-TRIANGLE API initialisé');
  }

  async testConnection() {
    try {
      const response = await fetch(`${this.localURL}/api/products`);
      if (response.ok) {
        console.log('✅ Serveur Local connecté:', this.localURL);
        this.useLocal = true;
        this.useFallback = false;
      } else {
        throw new Error('Serveur indisponible');
      }
    } catch (e) {
      console.warn('⚠️ Serveur Local indisponible');
      console.warn('📖 Lancez: node server.js');
      // Essayer Firebase en fallback
      this.useLocal = false;
      this.testFirebase();
    }
  }

  async testFirebase() {
    try {
      const response = await fetch(`${this.firebaseURL}/.json`);
      if (response.ok) {
        console.log('✅ Firebase connecté:', this.firebaseURL);
        this.useFallback = false;
      } else {
        console.warn('⚠️ Firebase non disponible');
        this.useFallback = true;
      }
    } catch (e) {
      console.warn('⚠️ Mode LOCAL (localStorage) activé');
      this.useFallback = true;
    }
  }

  // ========== PRODUITS ==========
  
  async getProducts() {
    if (this.useLocal) {
      try {
        const response = await fetch(`${this.localURL}/api/products`);
        if (!response.ok) throw new Error('Erreur serveur');
        const data = await response.json();
        console.log(`✅ ${data.length} produits chargés du serveur local`);
        return data;
      } catch (error) {
        console.error('Erreur getProducts (local):', error);
        // Si le serveur échoue, utiliser les produits par défaut
        if (window.DEFAULT_PRODUCTS && window.DEFAULT_PRODUCTS.length > 0) {
          console.log('✅ Chargement des produits par défaut');
          return window.DEFAULT_PRODUCTS;
        }
        return [];
      }
    }

    if (this.useFallback) {
      const data = localStorage.getItem('l1_products');
      if (data && JSON.parse(data).length > 0) {
        return JSON.parse(data);
      }
      // Si localStorage est vide, utiliser les produits par défaut
      if (window.DEFAULT_PRODUCTS && window.DEFAULT_PRODUCTS.length > 0) {
        console.log('✅ Chargement des produits par défaut');
        return window.DEFAULT_PRODUCTS;
      }
      return [];
    }
    
    // Firebase fallback
    try {
      const response = await fetch(`${this.firebaseURL}/products.json`);
      if (!response.ok) throw new Error('Erreur réseau');
      
      const data = await response.json();
      if (!data) return [];
      
      const products = Object.entries(data).map(([key, value]) => ({
        ...value,
        firebaseKey: key
      }));
      
      console.log(`✅ ${products.length} produits chargés depuis Firebase`);
      return products;
    } catch (error) {
      console.error('❌ Erreur getProducts:', error);
      // Si tout échoue, utiliser les produits par défaut
      if (window.DEFAULT_PRODUCTS && window.DEFAULT_PRODUCTS.length > 0) {
        console.log('✅ Chargement des produits par défaut');
        return window.DEFAULT_PRODUCTS;
      }
      return [];
    }
  }

  async addProduct(product) {
    if (this.useLocal) {
      try {
        const response = await fetch(`${this.localURL}/api/products`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(product)
        });
        if (!response.ok) throw new Error('Erreur serveur');
        const result = await response.json();
        console.log('✅ Produit ajouté au serveur local');
        return { success: true, data: result };
      } catch (error) {
        console.error('Erreur addProduct (local):', error);
        return { success: false, error: error.message };
      }
    }

    if (this.useFallback) {
      try {
        const products = await this.getProducts();
        const newProduct = {
          id: Date.now().toString(),
          ...product,
          createdAt: new Date().toISOString(),
          status: 'active'
        };
        products.push(newProduct);
        localStorage.setItem('l1_products', JSON.stringify(products));
        console.log('✅ Produit ajouté (LOCAL)');
        return { success: true, data: newProduct };
      } catch (error) {
        return { success: false, error: error.message };
      }
    }
    
    // Firebase fallback
    try {
      if (!product.title || !product.desc || !product.category || !product.image) {
        throw new Error('Données incomplètes');
      }

      const newProduct = {
        id: Date.now().toString(),
        ...product,
        createdAt: new Date().toISOString(),
        status: 'active'
      };

      const response = await fetch(`${this.firebaseURL}/products.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });

      if (!response.ok) throw new Error('Échec ajout');

      const result = await response.json();
      console.log('✅ Produit sauvegardé sur Firebase:', newProduct.id);
      
      return { 
        success: true, 
        data: { ...newProduct, firebaseKey: result.name }
      };
    } catch (error) {
      console.error('❌ Erreur addProduct:', error);
      return { success: false, error: error.message };
    }
  }

  async updateProduct(id, updates) {
    if (this.useFallback) {
      try {
        const products = await this.getProducts();
        const index = products.findIndex(p => p.id === id);
        if (index === -1) throw new Error('Produit introuvable');
        products[index] = { ...products[index], ...updates };
        localStorage.setItem('l1_products', JSON.stringify(products));
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    }
    
    try {
      const products = await this.getProducts();
      const product = products.find(p => p.id === id);
      
      if (!product) {
        return { success: false, error: 'Produit non trouvé' };
      }

      const updatedProduct = {
        ...product,
        ...updates,
        updatedAt: new Date().toISOString()
      };

      const { firebaseKey, ...productData } = updatedProduct;

      const response = await fetch(
        `${this.firebaseURL}${this.PRODUCTS_PATH}/${firebaseKey}.json`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData)
        }
      );

      if (!response.ok) throw new Error('Échec mise à jour');

      console.log('✅ Produit mis à jour sur Firebase:', id);
      return { success: true, data: updatedProduct };
    } catch (error) {
      console.error('❌ Erreur updateProduct:', error);
      return { success: false, error: error.message };
    }
  }

  async deleteProduct(id) {
    if (this.useFallback) {
      try {
        const products = await this.getProducts();
        const filtered = products.filter(p => p.id !== id);
        localStorage.setItem('l1_products', JSON.stringify(filtered));
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    }
    
    try {
      const products = await this.getProducts();
      const product = products.find(p => p.id === id);
      
      if (!product) {
        return { success: false, error: 'Produit non trouvé' };
      }

      const response = await fetch(
        `${this.firebaseURL}${this.PRODUCTS_PATH}/${product.firebaseKey}.json`,
        { method: 'DELETE' }
      );

      if (!response.ok) throw new Error('Échec suppression');

      console.log('✅ Produit supprimé de Firebase:', id);
      return { success: true };
    } catch (error) {
      console.error('❌ Erreur deleteProduct:', error);
      return { success: false, error: error.message };
    }
  }

  // ========== COMMANDES ==========

  async getOrders() {
    if (this.useFallback) {
      const data = localStorage.getItem('l1_orders');
      return data ? JSON.parse(data) : [];
    }
    
    try {
      const response = await fetch(`${this.firebaseURL}${this.ORDERS_PATH}.json`);
      if (!response.ok) throw new Error('Erreur réseau');
      
      const data = await response.json();
      if (!data) return [];
      
      const orders = Object.entries(data).map(([key, value]) => ({
        ...value,
        firebaseKey: key
      }));
      
      console.log(`✅ ${orders.length} commandes chargées depuis Firebase`);
      return orders;
    } catch (error) {
      console.error('❌ Erreur getOrders:', error);
      return [];
    }
  }

  async createOrder(order) {
    if (this.useFallback) {
      try {
        const orders = await this.getOrders();
        const newOrder = {
          id: Date.now().toString(),
          ...order,
          createdAt: new Date().toISOString(),
          status: order.status || 'pending'
        };
        orders.push(newOrder);
        localStorage.setItem('l1_orders', JSON.stringify(orders));
        return { success: true, data: newOrder };
      } catch (error) {
        return { success: false, error: error.message };
      }
    }
    
    try {
      const newOrder = {
        id: Date.now().toString(),
        ...order,
        createdAt: new Date().toISOString(),
        status: order.status || 'pending'
      };

      const response = await fetch(`${this.firebaseURL}${this.ORDERS_PATH}.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder)
      });

      if (!response.ok) throw new Error('Échec création');

      const result = await response.json();
      console.log('✅ Commande sauvegardée sur Firebase:', newOrder.id);
      
      return { 
        success: true, 
        data: { ...newOrder, firebaseKey: result.name }
      };
    } catch (error) {
      console.error('❌ Erreur createOrder:', error);
      return { success: false, error: error.message };
    }
  }

  async updateOrder(id, updates) {
    if (this.useFallback) {
      try {
        const orders = await this.getOrders();
        const index = orders.findIndex(o => o.id === id);
        if (index === -1) throw new Error('Commande introuvable');
        orders[index] = { ...orders[index], ...updates };
        localStorage.setItem('l1_orders', JSON.stringify(orders));
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    }
    
    try {
      const orders = await this.getOrders();
      const order = orders.find(o => o.id === id);
      
      if (!order) {
        return { success: false, error: 'Commande non trouvée' };
      }

      const updatedOrder = {
        ...order,
        ...updates,
        updatedAt: new Date().toISOString()
      };

      const { firebaseKey, ...orderData } = updatedOrder;

      const response = await fetch(
        `${this.firebaseURL}${this.ORDERS_PATH}/${firebaseKey}.json`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData)
        }
      );

      if (!response.ok) throw new Error('Échec mise à jour');

      console.log('✅ Commande mise à jour sur Firebase:', id);
      return { success: true, data: updatedOrder };
    } catch (error) {
      console.error('❌ Erreur updateOrder:', error);
      return { success: false, error: error.message };
    }
  }
}

// Instance globale
window.L1API = new L1TriangleAPI();
