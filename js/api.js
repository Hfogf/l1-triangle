/**
 * L1-TRIANGLE API CLIENT
 * Client JavaScript moderne pour communiquer avec le serveur Node.js
 */

const SUPABASE_URL = 'https://fiofrgaiwosyzrddlhln.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpb2ZyZ2Fpd29zeXpyZGRsaGxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU1MTE0ODIsImV4cCI6MjA4MTA4NzQ4Mn0.Aj5H-tAA5TVcywF2GY2pO409UbCd0jw7lTdZE6LVpSU';

class L1TriangleAPI {
  constructor() {
    this.baseURL = `${SUPABASE_URL}/rest/v1`;

    this.cache = {
      products: null,
      orders: null,
      lastUpdate: null
    };

    console.log('✅ L1-TRIANGLE API initialisé (Supabase direct)');
    console.log('🌐 Server:', this.baseURL);
  }

  // ========== HELPERS ==========
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Prefer: 'return=representation',
        ...options.headers
      }
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error(`❌ Erreur API [${endpoint}]:`, error.message);
      throw error;
    }
  }

  // ========== PRODUITS ==========
  async getProducts(options = {}) {
    const params = new URLSearchParams();
    params.set('select', '*');

    if (options.category) {
      params.set('category', `eq.${options.category}`);
    } else if (options.search) {
      const q = options.search;
      // Recherche sur title/description/category
      params.set('or', `title.ilike.%${q}%,description.ilike.%${q}%,category.ilike.%${q}%`);
    }

    const products = await this.request(`/products?${params.toString()}`);
    this.cache.products = products;
    this.cache.lastUpdate = Date.now();
    
    console.log(`✅ ${products.length} produits chargés`);
    return products;
  }

  async getProduct(id) {
    const items = await this.request(`/products?id=eq.${id}&select=*`);
    return items[0] || null;
  }

  async createProduct(product) {
    const result = await this.request('/products', {
      method: 'POST',
      body: JSON.stringify(product)
    });
    this.cache.products = null;
    return result[0];
  }

  async updateProduct(id, updates) {
    const result = await this.request(`/products?id=eq.${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates)
    });
    this.cache.products = null;
    return result[0];
  }

  async deleteProduct(id) {
    await this.request(`/products?id=eq.${id}`, {
      method: 'DELETE'
    });
    this.cache.products = null;
    return { success: true };
  }

  async bulkUpdateProducts(updates) {
    // Non utilisé avec Supabase direct
    throw new Error('bulkUpdateProducts non supporté en mode Supabase direct');
  }

  // ========== COMMANDES ==========
  async getOrders(status = null) {
    const params = new URLSearchParams();
    params.set('select', '*');
    if (status) params.set('status', `eq.${status}`);

    const orders = await this.request(`/orders?${params.toString()}`);
    this.cache.orders = orders;
    console.log(`✅ ${orders.length} commandes chargées`);
    return orders;
  }

  async getOrder(id) {
    const orders = await this.request(`/orders?id=eq.${id}&select=*`);
    return orders[0] || null;
  }

  async createOrder(order) {
    const result = await this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(order)
    });
    this.cache.orders = null;
    return result[0];
  }

  async updateOrder(id, updates) {
    const result = await this.request(`/orders?id=eq.${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates)
    });
    this.cache.orders = null;
    return result[0];
  }

  async deleteOrder(id) {
    await this.request(`/orders?id=eq.${id}`, {
      method: 'DELETE'
    });
    this.cache.orders = null;
    return { success: true };
  }

  // ========== STATISTIQUES ==========
  async getStats() {
    const products = await this.request('/products?select=*');
    const orders = await this.request('/orders?select=*');

    return {
      totalProducts: products.length,
      totalOrders: orders.length,
      pendingOrders: orders.filter(o => o.status === 'pending').length,
      completedOrders: orders.filter(o => o.status === 'completed').length
    };
  }

  // ========== CACHE ==========
  getCachedProducts() {
    if (this.cache.products && Date.now() - this.cache.lastUpdate < 60000) {
      return this.cache.products;
    }
    return null;
  }

  clearCache() {
    this.cache = {
      products: null,
      orders: null,
      lastUpdate: null
    };
    console.log('🗑️ Cache vidé');
  }
}

// Créer l'instance globale
window.api = new L1TriangleAPI();
