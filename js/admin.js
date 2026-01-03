(function(){
  const ACCESS_CODE = 'L1_TRIANGLE';
  const loginSection = document.getElementById('admin-login');
  const dashboard = document.getElementById('admin-dashboard');
  const codeInput = document.getElementById('admin-code');
  const submitBtn = document.getElementById('admin-submit');
  const errorEl = document.getElementById('admin-error');
  const productForm = document.getElementById('product-form');
  const productList = document.getElementById('product-list');
  const orderList = document.getElementById('order-list');

  let drafts = loadDrafts();

  function loadDrafts(){
    try {
      const raw = localStorage.getItem('l1_admin_products');
      return raw ? JSON.parse(raw) : [];
    } catch(err){
      console.warn('Impossible de charger les brouillons', err);
      return [];
    }
  }

  function saveDrafts(){
    try {
      localStorage.setItem('l1_admin_products', JSON.stringify(drafts));
    } catch(err){
      console.warn('Impossible de sauvegarder les brouillons', err);
    }
  }

  function renderDrafts(){
    if(!productList) return;
    productList.innerHTML = '';
    if(!drafts.length){
      productList.innerHTML = '<p class="admin-hint">Aucun produit en brouillon. Ajoutez-en un ci-dessus.</p>';
      return;
    }

    drafts.forEach((p, idx) => {
      const item = document.createElement('div');
      item.className = 'admin-item';
      item.innerHTML = `
        <strong>${p.title}</strong> — ${p.category || ''}<br />
        <span class="admin-hint">${p.meta || ''}</span><br />
        <span class="admin-hint">${Number(p.price || 0).toLocaleString('fr-FR', { minimumFractionDigits: 2 })} HTG · ${p.badge || 'Badge'}</span><br />
        <button type="button" data-idx="${idx}" class="btn-ghost">Supprimer</button>
      `;
      item.querySelector('button').addEventListener('click', () => {
        drafts.splice(idx, 1);
        saveDrafts();
        renderDrafts();
      });
      productList.appendChild(item);
    });
  }

  function renderOrdersPlaceholder(){
    if(!orderList) return;
    orderList.innerHTML = `
      <div class="admin-item">
        <strong>En attente d'API</strong><br />
        <span class="admin-hint">Connectez l'endpoint commandes pour afficher les statuts en direct.</span>
      </div>
    `;
  }

  function unlock(){
    if(!loginSection || !dashboard) return;
    loginSection.classList.add('admin-hidden');
    dashboard.classList.remove('admin-hidden');
    dashboard.setAttribute('aria-hidden', 'false');
  }

  function checkPersistedAccess(){
    const token = sessionStorage.getItem('l1_admin_access');
    if(token === ACCESS_CODE){
      unlock();
      renderDrafts();
      renderOrdersPlaceholder();
    }
  }

  function handleLogin(){
    const code = (codeInput?.value || '').trim();
    if(code !== ACCESS_CODE){
      if(errorEl) errorEl.textContent = 'Code invalide.';
      return;
    }
    sessionStorage.setItem('l1_admin_access', ACCESS_CODE);
    unlock();
    renderDrafts();
    renderOrdersPlaceholder();
  }

  function handleSubmitProduct(e){
    e.preventDefault();
    const formData = new FormData(productForm);
    const product = Object.fromEntries(formData.entries());
    product.price = Number(product.price || 0);
    product.badgeAlt = formData.get('badgeAlt') === 'on';
    drafts.push(product);
    saveDrafts();
    renderDrafts();
    productForm.reset();
  }

  if(submitBtn) submitBtn.addEventListener('click', handleLogin);
  if(productForm) productForm.addEventListener('submit', handleSubmitProduct);
  if(codeInput) codeInput.addEventListener('keydown', (e) => { if(e.key === 'Enter') handleLogin(); });

  checkPersistedAccess();
})();
