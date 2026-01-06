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

    // localStorage fallback keys
    this.localKeys = {
      products: 'l1_products',
      orders: 'l1_orders'
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
        let errorMsg = data.message || data.error || `HTTP ${response.status}`;
        if (response.status === 403) {
          errorMsg = '🚫 RLS bloque l\'accès. Exécutez supabase-setup.sql !';
        }
        console.error(`❌ Erreur API [${endpoint}]:`, errorMsg, data);
        throw new Error(errorMsg);
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

    try {
      const products = await this.request(`/products?${params.toString()}`);
      // Merge with any local fallback entries to avoid losing locally added items
      const local = this._loadLocal(this.localKeys.products) || [];
      const byId = new Map();
      [...products, ...local].forEach(item => {
        if (!item || !item.id) return;
        byId.set(item.id, { ...item });
      });
      const merged = Array.from(byId.values());

      this.cache.products = merged;
      this.cache.lastUpdate = Date.now();
      console.log(`✅ ${merged.length} produits chargés (fusion remote + local)`);
      this._saveLocal(this.localKeys.products, merged);
      return merged;
    } catch (err) {
      const local = this._loadLocal(this.localKeys.products) || [];
      console.warn('⚠️ Fallback produits (localStorage):', local.length);
      return local;
    }
  }

  async getProduct(id) {
    const items = await this.request(`/products?id=eq.${id}&select=*`);
    return items[0] || null;
  }

  async createProduct(product) {
    // Normalize fields: ensure 'name' and avoid unknown columns
    const payload = { ...product };
    if (payload.title && !payload.name) payload.name = payload.title;
    // Supabase table uses 'name'; we drop extra keys to avoid insert errors
    const { name, description, category, price, image, badge, meta } = payload;
    const cleanPayload = { name, description, category, price, image, badge, meta };
    try {
      const result = await this.request('/products', {
        method: 'POST',
        body: JSON.stringify(cleanPayload)
      });
      this.cache.products = null;
      const created = result[0];
      // Mirror success to local fallback so UI remains consistent if SELECT is blocked
      const list = this._loadLocal(this.localKeys.products) || [];
      list.push(created);
      this._saveLocal(this.localKeys.products, list);
      return created;
    } catch (err) {
      // Fallback to localStorage
      const list = this._loadLocal(this.localKeys.products) || [];
      const id = crypto.randomUUID();
      const now = new Date().toISOString();
      const localItem = { id, created_at: now, ...cleanPayload };
      list.push(localItem);
      this._saveLocal(this.localKeys.products, list);
      this.cache.products = null;
      return localItem;
    }
  }

  async updateProduct(id, updates) {
    try {
      const result = await this.request(`/products?id=eq.${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updates)
      });
      this.cache.products = null;
      const updated = result[0];
      // Mirror success to local fallback
      const list = this._loadLocal(this.localKeys.products) || [];
      const idx = list.findIndex(p => p.id === id);
      if (idx >= 0) { list[idx] = { ...list[idx], ...updated }; this._saveLocal(this.localKeys.products, list); }
      return updated;
    } catch (err) {
      const list = this._loadLocal(this.localKeys.products) || [];
      const idx = list.findIndex(p => p.id === id);
      if (idx >= 0) {
        list[idx] = { ...list[idx], ...updates };
        this._saveLocal(this.localKeys.products, list);
        this.cache.products = null;
        return list[idx];
      }
      throw err;
    }
  }

  async deleteProduct(id) {
    try {
      await this.request(`/products?id=eq.${id}`, {
        method: 'DELETE'
      });
      this.cache.products = null;
      // Mirror success to local fallback
      const list = this._loadLocal(this.localKeys.products) || [];
      const filtered = list.filter(p => p.id !== id);
      this._saveLocal(this.localKeys.products, filtered);
      return { success: true };
    } catch (err) {
      const list = this._loadLocal(this.localKeys.products) || [];
      const filtered = list.filter(p => p.id !== id);
      this._saveLocal(this.localKeys.products, filtered);
      this.cache.products = null;
      return { success: true };
    }
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

    try {
      const orders = await this.request(`/orders?${params.toString()}`);
      this.cache.orders = orders;
      this._saveLocal(this.localKeys.orders, orders);
      console.log(`✅ ${orders.length} commandes chargées`);
      return orders;
    } catch (err) {
      const local = this._loadLocal(this.localKeys.orders) || [];
      console.warn('⚠️ Fallback commandes (localStorage):', local.length);
      return local;
    }
  }

  async getOrder(id) {
    const orders = await this.request(`/orders?id=eq.${id}&select=*`);
    return orders[0] || null;
  }

  async createOrder(order) {
    try {
      const result = await this.request('/orders', {
        method: 'POST',
        body: JSON.stringify(order)
      });
      this.cache.orders = null;
      const created = result[0];
      // Mirror success to local
      const list = this._loadLocal(this.localKeys.orders) || [];
      list.push(created);
      this._saveLocal(this.localKeys.orders, list);
      return created;
    } catch (err) {
      const list = this._loadLocal(this.localKeys.orders) || [];
      const id = crypto.randomUUID();
      const now = new Date().toISOString();
      const localItem = { id, created_at: now, ...order };
      list.push(localItem);
      this._saveLocal(this.localKeys.orders, list);
      this.cache.orders = null;
      return localItem;
    }
  }

  async updateOrder(id, updates) {
    try {
      const result = await this.request(`/orders?id=eq.${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updates)
      });
      this.cache.orders = null;
      const updated = result[0];
      const list = this._loadLocal(this.localKeys.orders) || [];
      const idx = list.findIndex(o => o.id === id);
      if (idx >= 0) { list[idx] = { ...list[idx], ...updated }; this._saveLocal(this.localKeys.orders, list); }
      return updated;
    } catch (err) {
      const list = this._loadLocal(this.localKeys.orders) || [];
      const idx = list.findIndex(o => o.id === id);
      if (idx >= 0) {
        list[idx] = { ...list[idx], ...updates };
        this._saveLocal(this.localKeys.orders, list);
        this.cache.orders = null;
        return list[idx];
      }
      throw err;
    }
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

  // ========== LOCAL STORAGE HELPERS ==========
  _loadLocal(key) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  }
  _saveLocal(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }
}

// Créer l'instance globale
window.api = new L1TriangleAPI();
