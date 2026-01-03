(function(){
  const productsGrid = document.getElementById('products-grid');
  const countEl = document.getElementById('product-count');
  const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));
  const sectionProducts = document.getElementById('produits');
  const cartToggle = document.getElementById('cart-toggle');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartClose = document.getElementById('cart-close');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalEl = document.getElementById('cart-total');
  const cartCountEl = document.getElementById('cart-count');

  const cart = [];

  // Pas de fallback pour ne plus afficher de produits statiques
  const fallbackProducts = [];

  async function fetchProducts() {
    // Placeholder pour future API : remplacer l\'URL par votre endpoint
    const API_URL = '/api/products';
    try {
      const res = await fetch(API_URL, { headers:{ 'Accept':'application/json' } });
      if(!res.ok) throw new Error('API non disponible');
      const data = await res.json();
      if(!Array.isArray(data) || !data.length) throw new Error('Données vides');
      return data.map(normalizeFromApi);
    } catch(err){
      console.warn('Fallback produits utilisé:', err.message);
      return fallbackProducts;
    }
  }

  function normalizeFromApi(item){
    return {
      id: item.id || crypto.randomUUID(),
      title: item.title || item.name || 'Produit',
      desc: item.description || 'Description indisponible.',
      meta: item.meta || item.stock || 'Disponibilité à confirmer',
      category: (item.category || 'autres').toLowerCase(),
      badge: item.badge || 'Nouveau',
      badgeAlt: item.badgeAlt || false,
      link: item.link || 'https://wa.me/50939945794',
      price: Number(item.price) || 0
    };
  }

  function formatPrice(value){
    const num = Number(value) || 0;
    return num.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function renderProducts(list){
    productsGrid.innerHTML = '';

    if(!list.length){
      const empty = document.createElement('div');
      empty.className = 'empty-products';
      empty.innerHTML = `
        <p class="empty-eyebrow">Bientôt connecté à l'API</p>
        <h3 class="empty-title">Les produits arriveront ici dès l'activation de l'API.</h3>
        <p class="empty-desc">Gardez ce design, il se remplira automatiquement quand les données seront disponibles.</p>
      `;
      productsGrid.appendChild(empty);
      countEl.textContent = '0';
      return;
    }

    list.forEach(p => {
      const card = document.createElement('article');
      card.className = 'product-card';
      const badgeClass = p.badgeAlt ? 'product-badge alt' : 'product-badge';
      card.innerHTML = `
        <div class="${badgeClass}">${p.badge || 'Nouveau'}</div>
        <h3 class="product-title">${p.title}</h3>
        <p class="product-desc">${p.desc}</p>
        <div class="product-meta">${p.meta}</div>
        <div class="product-actions">
          <button class="btn-chip" type="button" aria-label="Ajouter au panier">🛒</button>
          <a class="btn-ghost" href="${p.link || 'https://wa.me/50939945794'}" target="_blank" rel="noreferrer">En savoir plus</a>
        </div>
      `;

      const addBtn = card.querySelector('.btn-chip');
      addBtn.addEventListener('click', () => addToCart(p));

      productsGrid.appendChild(card);
    });
    countEl.textContent = list.length;
  }

  function applyFilter(all, filter){
    if(filter === 'all') return all;
    return all.filter(p => p.category === filter);
  }

  function activateFilterButton(target){
    filterButtons.forEach(btn => btn.classList.toggle('active', btn === target));
  }

  function scrollToProducts(){
    if(sectionProducts) sectionProducts.scrollIntoView({ behavior:'smooth', block:'start' });
  }

  function renderCart(){
    if(!cartItemsContainer || !cartTotalEl || !cartCountEl) return;

    cartItemsContainer.innerHTML = '';
    if(!cart.length){
      cartItemsContainer.innerHTML = '<div class="cart-empty">Votre panier est vide.</div>';
      cartTotalEl.textContent = '0';
      cartCountEl.textContent = '0';
      return;
    }

    cart.forEach((item, index) => {
      const wrap = document.createElement('div');
      wrap.className = 'cart-item';
      wrap.innerHTML = `
        <div class="cart-item-title">${item.title}</div>
        <div class="cart-item-meta">${item.meta || ''}</div>
        <div class="cart-item-meta">${formatPrice(item.price)} HTG</div>
        <button class="cart-remove" type="button">Retirer</button>
      `;
      wrap.querySelector('.cart-remove').addEventListener('click', () => removeFromCart(index));
      cartItemsContainer.appendChild(wrap);
    });

    const total = cart.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
    cartTotalEl.textContent = formatPrice(total);
    cartCountEl.textContent = String(cart.length);
  }

  function addToCart(product){
    cart.push(product);
    renderCart();
    openCart();
  }

  function removeFromCart(index){
    cart.splice(index, 1);
    renderCart();
  }

  function openCart(){
    if(!cartDrawer || !cartOverlay) return;
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('open');
    cartDrawer.setAttribute('aria-hidden', 'false');
    cartOverlay.setAttribute('aria-hidden', 'false');
  }

  function closeCart(){
    if(!cartDrawer || !cartOverlay) return;
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('open');
    cartDrawer.setAttribute('aria-hidden', 'true');
    cartOverlay.setAttribute('aria-hidden', 'true');
  }

  async function init(){
    const products = await fetchProducts();
    renderProducts(products);

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter') || 'all';
        activateFilterButton(btn);
        const filtered = applyFilter(products, filter);
        renderProducts(filtered);
        scrollToProducts();
      });
    });

    renderCart();

    if(cartToggle) cartToggle.addEventListener('click', openCart);
    if(cartClose) cartClose.addEventListener('click', closeCart);
    if(cartOverlay) cartOverlay.addEventListener('click', closeCart);
    document.addEventListener('keydown', (e) => {
      if(e.key === 'Escape') closeCart();
    });
  }

  // Optimisation mobile : pause/masquer la vidéo si data saver ou petit écran
  function optimizeMedia(){
    const video = document.querySelector('.hero-video');
    const isSmall = window.matchMedia('(max-width: 768px)').matches;
    const isDataSaver = navigator.connection && navigator.connection.saveData;
    if(video && (isSmall || isDataSaver)){
      video.pause();
      video.removeAttribute('autoplay');
      video.style.display = 'none';
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    init();
    optimizeMedia();
    window.addEventListener('resize', optimizeMedia);
  });
})();
