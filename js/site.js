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
    // Charger les produits depuis l'API
    if(window.L1API){
      try {
        const products = await window.L1API.getProducts();
        return products.map(normalizeFromApi);
      } catch(err){
        console.warn('Erreur chargement produits:', err);
        return [];
      }
    }
    return [];
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
        <p class="empty-eyebrow">Aucun produit pour le moment</p>
        <h3 class="empty-title">Revenez bientôt pour découvrir nos produits gaming !</h3>
        <p class="empty-desc">L'administrateur ajoutera des produits depuis le dashboard admin.</p>
      `;
      productsGrid.appendChild(empty);
      countEl.textContent = '0';
      return;
    }

    list.forEach(p => {
      const card = document.createElement('article');
      card.className = 'product-card';
      const badgeClass = p.badgeAlt ? 'product-badge alt' : 'product-badge';
      
      // Image si disponible
      const imageHtml = p.image ? `<img src="${p.image}" alt="${p.title}" class="product-image" onerror="this.style.display='none'" />` : '';
      
      card.innerHTML = `
        ${imageHtml}
        <div class="${badgeClass}">${p.badge || 'Nouveau'}</div>
        <h3 class="product-title">${p.title}</h3>
        <p class="product-desc">${p.desc}</p>
        <div class="product-meta">${p.meta}</div>
        <div class="product-price">${formatPrice(p.price)} HTG</div>
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
      const itemTotal = (item.price || 0) * (item.quantity || 1);
      wrap.innerHTML = `
        <div class="cart-item-title">${item.title}</div>
        <div class="cart-item-meta">${item.meta || ''}</div>
        <div class="cart-item-meta">
          <div style="display:flex;align-items:center;gap:0.5rem;margin:0.5rem 0">
            <button class="qty-btn" data-action="decrease" data-index="${index}">−</button>
            <span style="font-weight:700;min-width:2rem;text-align:center">${item.quantity || 1}</span>
            <button class="qty-btn" data-action="increase" data-index="${index}">+</button>
          </div>
          <div style="font-weight:700;color:var(--accent-orange)">${formatPrice(itemTotal)} HTG</div>
        </div>
        <button class="cart-remove" type="button">Retirer</button>
      `;
      wrap.querySelector('.cart-remove').addEventListener('click', () => removeFromCart(index));
      wrap.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', () => updateQuantity(index, btn.dataset.action));
      });
      cartItemsContainer.appendChild(wrap);
    });

    const total = cart.reduce((sum, item) => sum + ((Number(item.price) || 0) * (item.quantity || 1)), 0);
    cartTotalEl.textContent = formatPrice(total);
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    cartCountEl.textContent = String(totalItems);
  }

  function addToCart(product){
    const existingIndex = cart.findIndex(item => item.id === product.id);
    if(existingIndex >= 0){
      cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
    } else {
      cart.push({...product, quantity: 1});
    }
    renderCart();
    openCart();
  }

  function removeFromCart(index){
    cart.splice(index, 1);
    renderCart();
  }

  function updateQuantity(index, action){
    if(action === 'increase'){
      cart[index].quantity = (cart[index].quantity || 1) + 1;
    } else if(action === 'decrease'){
      const newQty = (cart[index].quantity || 1) - 1;
      if(newQty <= 0){
        cart.splice(index, 1);
      } else {
        cart[index].quantity = newQty;
      }
    }
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

  // Sauvegarder la commande lors du checkout
  async function saveOrderToAPI(){
    if(!window.L1API || !cart.length) return false;
    
    const total = cart.reduce((sum, item) => sum + ((Number(item.price) || 0) * (item.quantity || 1)), 0);
    
    const order = {
      items: cart.map(item => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity || 1
      })),
      total: total,
      customerName: 'Client Web',
      customerEmail: '',
      customerPhone: '',
      status: 'pending'
    };
    
    try {
      const result = await window.L1API.createOrder(order);
      if(result.success){
        // Vider le panier après commande réussie
        cart.length = 0;
        renderCart();
        return true;
      }
    } catch(err){
      console.error('Erreur sauvegarde commande:', err);
    }
    return false;
  }

  // Gérer le checkout WhatsApp
  async function handleWhatsAppCheckout(e){
    e.preventDefault();
    
    if(!cart.length){
      alert('Votre panier est vide!');
      return;
    }
    
    // Construire le message WhatsApp avec quantités et prix AVANT de vider le panier
    const message = cart.map(item => {
      const qty = item.quantity || 1;
      const itemTotal = (item.price || 0) * qty;
      return `• ${item.title} x${qty} - ${formatPrice(item.price)} HTG = ${formatPrice(itemTotal)} HTG`;
    }).join('%0A');
    
    const total = cart.reduce((sum, item) => sum + ((Number(item.price) || 0) * (item.quantity || 1)), 0);
    const whatsappUrl = `https://wa.me/50939945794?text=Bonjour, je voudrais commander:%0A%0A${message}%0A%0ATotal: ${formatPrice(total)} HTG`;
    
    // Sauvegarder dans l'API après avoir construit le message
    await saveOrderToAPI();
    
    window.open(whatsappUrl, '_blank');
  }

  // Gérer le checkout Email
  async function handleEmailCheckout(e){
    e.preventDefault();
    
    if(!cart.length){
      alert('Votre panier est vide!');
      return;
    }
    
    // Construire le message email avec quantités AVANT de vider le panier
    const message = cart.map(item => {
      const qty = item.quantity || 1;
      const itemTotal = (item.price || 0) * qty;
      return `${item.title} x${qty} - ${formatPrice(item.price)} HTG = ${formatPrice(itemTotal)} HTG`;
    }).join('%0A');
    
    const total = cart.reduce((sum, item) => sum + ((Number(item.price) || 0) * (item.quantity || 1)), 0);
    
    // Sauvegarder dans l'API après avoir construit le message
    await saveOrderToAPI();
    const subject = 'Commande L1-TRIANGLE';
    const body = `Bonjour,%0A%0AJe voudrais commander:%0A%0A${message}%0A%0ATotal: ${formatPrice(total)} HTG%0A%0AMerci`;
    
    window.location.href = `mailto:l1triangle.info@gmail.com?subject=${subject}&body=${body}`;
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
    
    // Attacher les événements aux boutons de commande
    const whatsappBtn = document.querySelector('.cart-btn-whatsapp');
    const emailBtn = document.querySelector('.cart-btn-email');
    if(whatsappBtn) whatsappBtn.addEventListener('click', handleWhatsAppCheckout);
    if(emailBtn) emailBtn.addEventListener('click', handleEmailCheckout);
    
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
