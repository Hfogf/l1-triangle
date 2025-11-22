// produits.js - standalone product listing + simple cart (localStorage)
(function(){
  // Static product data
  const PRODUCTS = [
    { id: 'm1', title: 'Manette L1 TRIANGLE Pro', category: 'Manettes', price: 59.99, image: 'https://picsum.photos/seed/manette1/400/240', description: 'Manette ergonomique, latence réduite, compatible PC/console.' },
    { id: 'm2', title: 'Manette Sans Fil V2', category: 'Manettes', price: 44.90, image: 'https://picsum.photos/seed/manette2/400/240', description: 'Sans fil, autonomie 30h, recharge rapide.' },
    { id: 'm3', title: 'Mini Gamepad Mobile', category: 'Manettes', price: 24.50, image: 'https://picsum.photos/seed/manette3/400/240', description: 'Compact pour gaming mobile, Bluetooth, léger.' },
    { id: 'm4', title: 'Manette Elite Pro', category: 'Manettes', price: 129.99, image: 'https://picsum.photos/seed/manette4/400/240', description: 'Manette premium avec palettes arrière et réglages avancés.' },
    { id: 'm5', title: 'Manette Mobile Fold', category: 'Manettes', price: 34.99, image: 'https://picsum.photos/seed/manette5/400/240', description: 'Se plie pour transport, ergonomique pour mobile.' },

    { id: 'mon1', title: 'Moniteur 144Hz 27"', category: 'Moniteurs', price: 249.00, image: 'https://picsum.photos/seed/monitor1/400/240', description: '27 pouces, 144Hz, faible latence, parfait pour FPS.' },
    { id: 'mon2', title: 'Moniteur 240Hz 24"', category: 'Moniteurs', price: 399.00, image: 'https://picsum.photos/seed/monitor2/400/240', description: 'Écran pro 240Hz, dalle IPS, design borderless.' },
    { id: 'mon3', title: 'Moniteur 60Hz 22"', category: 'Moniteurs', price: 129.00, image: 'https://picsum.photos/seed/monitor3/400/240', description: 'Écran bureautique 22", excellent rendu couleur.' },
    { id: 'mon4', title: 'Moniteur Ultrawide 34"', category: 'Moniteurs', price: 579.00, image: 'https://picsum.photos/seed/monitor4/400/240', description: 'Écran ultrawide 34" 144Hz, immersion totale.' },

    { id: 'v1', title: 'Vape Starter Kit', category: 'Vape', price: 29.99, image: 'https://picsum.photos/seed/vape1/400/240', description: 'Kit débutant, batterie intégrée, saveurs variées.' },
    { id: 'v2', title: 'E-liquide 50ml', category: 'Vape', price: 12.50, image: 'https://picsum.photos/seed/vape2/400/240', description: 'E-liquide, plusieurs arômes, nicotine optionnelle.' },
    { id: 'v3', title: 'Pod Vape Compact', category: 'Vape', price: 19.99, image: 'https://picsum.photos/seed/vape3/400/240', description: 'Pod compact, usage facile, recharge USB-C.' },
    { id: 'v4', title: 'Vape Pro 2000 puffs', category: 'Vape', price: 39.99, image: 'https://picsum.photos/seed/vape4/400/240', description: 'Grande capacité 2000 puffs, pack saveurs tropicales.' },
    { id: 'v5', title: 'E-liquide Menthe 50ml', category: 'Vape', price: 12.50, image: 'https://picsum.photos/seed/vape5/400/240', description: 'Saveur menthe fraîche, base de qualité.' },

    { id: 'a1', title: 'Casque Gaming RGB', category: 'Accessoires', price: 69.99, image: 'https://picsum.photos/seed/headset1/400/240', description: 'Son surround, micro amovible, lumières RGB.', poster: 'Son Surround' },
    { id: 'a2', title: 'Tapis de souris XL', category: 'Accessoires', price: 19.90, image: 'https://picsum.photos/seed/mousepad1/400/240', description: 'Surface lisse, base antidérapante, grand format.', poster: 'XL Surface' },
    { id: 'a3', title: 'Clavier Mécanique', category: 'Accessoires', price: 89.00, image: 'https://picsum.photos/seed/keyboard1/400/240', description: 'Switchs tactiles, rétroéclairage RGB, durable.', poster: 'Switchs' },
    { id: 'a4', title: 'Microphone USB', category: 'Accessoires', price: 39.50, image: 'https://picsum.photos/seed/mic1/400/240', description: 'Micro pour streaming et appels, plug & play.', poster: 'Micro USB' },
    { id: 'a5', title: 'Support Casque', category: 'Accessoires', price: 12.50, image: 'https://picsum.photos/seed/stand1/400/240', description: 'Support élégant pour ranger votre casque.', poster: 'Support' },
    { id: 'a6', title: 'Filtre Antipoussière PC', category: 'Accessoires', price: 9.99, image: 'https://picsum.photos/seed/filter1/400/240', description: 'Filtre réutilisable facile à installer.', poster: 'Filtre' },
    { id: 'a7', title: 'Repos Poignets Ergonomique', category: 'Accessoires', price: 14.90, image: 'https://picsum.photos/seed/wrist1/400/240', description: 'Confort pour longues sessions, anti-dérapant.', poster: 'Confort' },
    { id: 'a8', title: 'Station de Charge 3-en-1', category: 'Accessoires', price: 34.99, image: 'https://picsum.photos/seed/chargerstation1/400/240', description: 'Charge simultanément téléphone, montre et écouteurs.', poster: 'Station 3-en-1' },
    { id: 'a9', title: 'Support Écran Réglable', category: 'Accessoires', price: 29.99, image: 'https://picsum.photos/seed/stand2/400/240', description: 'Support réglable pour améliorer ergonomie écran.', poster: 'Ergonomie' },
    { id: 'a10', title: 'Lampe LED Bureau', category: 'Accessoires', price: 22.50, image: 'https://picsum.photos/seed/lamp1/400/240', description: 'Lampe LED à intensité variable, design moderne.', poster: 'Lumière' },

    { id: 'ap1', title: 'AirPods Pro (Gen 1)', category: 'AirPods', price: 149.99, image: 'https://picsum.photos/seed/airpods1/400/240', description: 'ANC, boîtier de charge, son haute fidélité.' },
    { id: 'ap2', title: 'AirPods (Gen 2)', category: 'AirPods', price: 99.99, image: 'https://picsum.photos/seed/airpods2/400/240', description: 'Connexion rapide, son clair, autonomie solide.' },
    { id: 'ap3', title: 'AirPods Pro (Gen 2)', category: 'AirPods', price: 199.99, image: 'https://picsum.photos/seed/airpods3/400/240', description: 'Nouvelle génération, meilleure autonomie et ANC.' },

    { id: 'c1', title: 'Câble USB-C 2m', category: 'Câbles & Chargeurs', price: 8.99, image: 'https://picsum.photos/seed/cable1/400/240', description: 'Câble renforcé, charge rapide 60W.' },
    { id: 'c2', title: 'Chargeur Rapide 30W', category: 'Câbles & Chargeurs', price: 24.90, image: 'https://picsum.photos/seed/charger1/400/240', description: 'Chargeur compact 30W USB-C, PD.' },
    { id: 'c3', title: 'Hub USB Multi-port', category: 'Câbles & Chargeurs', price: 34.50, image: 'https://picsum.photos/seed/hub1/400/240', description: 'Hub 4 ports, HDMI, USB-A, carte SD.' },
    { id: 'c4', title: 'Câble Lightning 1m', category: 'Câbles & Chargeurs', price: 9.99, image: 'https://picsum.photos/seed/cable2/400/240', description: 'Câble Apple Lightning, durable et rapide.' }
  ];

  // Persisted products support
  function loadProducts(){
    try{ const raw = localStorage.getItem('products'); return raw ? JSON.parse(raw) : PRODUCTS.slice(); }catch(e){ return PRODUCTS.slice(); }
  }
  function saveProducts(list){ try{ localStorage.setItem('products', JSON.stringify(list)); }catch(e){} }

  // Cart utils
  function loadCart(){ try{ return JSON.parse(localStorage.getItem('cart') || '{}'); }catch(e){ return {}; } }
  function saveCart(cart){ try{ localStorage.setItem('cart', JSON.stringify(cart)); }catch(e){} }
  function cartCount(){ return Object.values(loadCart()).reduce((s,i)=>s + (i.qty||0),0); }

  function renderCartCount(){ const btn = document.getElementById('open-cart'); if(btn) btn.textContent = `Panier (${cartCount()})`; }

  function addToCart(id, qty=1){ const prod = PRODUCTS.find(p=>p.id===id); if(!prod) return; const cart = loadCart(); if(cart[id]) cart[id].qty += qty; else cart[id] = { product: prod, qty }; saveCart(cart); renderCartCount(); }

  function openCart(){ const drawer = document.getElementById('cart-drawer'); drawer.classList.add('open'); drawer.setAttribute('aria-hidden','false'); renderCartItems(); }
  function closeCart(){ const drawer = document.getElementById('cart-drawer'); drawer.classList.remove('open'); drawer.setAttribute('aria-hidden','true'); }

  function renderCartItems(){ const itemsEl = document.getElementById('cart-items'); const cart = loadCart(); itemsEl.innerHTML = ''; let total = 0; Object.values(cart).forEach(item=>{
    const row = document.createElement('div'); row.className = 'cart-item';
  row.innerHTML = `<img src="${item.product.image}" alt="" /><div style="flex:1"><div style="display:flex; justify-content:space-between"><div><strong>${item.product.title}</strong></div><div class="small">$${(item.product.price*item.qty).toFixed(2)}</div></div><div class="small">Prix unité: $${item.product.price.toFixed(2)}</div><div style="margin-top:6px; display:flex; gap:6px"><button class="btn" data-decr="${item.product.id}">-</button><div style="padding:0.5rem 0.75rem; border:1px solid #eee; border-radius:6px">${item.qty}</div><button class="btn" data-incr="${item.product.id}">+</button><button class="btn" data-rem="${item.product.id}">Supprimer</button></div></div>`;
    itemsEl.appendChild(row);
    total += item.qty * item.product.price;
  });
  document.getElementById('cart-total').textContent = '$' + total.toFixed(2);
    // attach handlers
    itemsEl.querySelectorAll('[data-incr]').forEach(b=> b.addEventListener('click', e=>{ const id = e.currentTarget.getAttribute('data-incr'); const cart=loadCart(); cart[id].qty++; saveCart(cart); renderCartItems(); renderCartCount(); }));
    itemsEl.querySelectorAll('[data-decr]').forEach(b=> b.addEventListener('click', e=>{ const id = e.currentTarget.getAttribute('data-decr'); const cart=loadCart(); cart[id].qty--; if(cart[id].qty<=0) delete cart[id]; saveCart(cart); renderCartItems(); renderCartCount(); }));
    itemsEl.querySelectorAll('[data-rem]').forEach(b=> b.addEventListener('click', e=>{ const id = e.currentTarget.getAttribute('data-rem'); const cart=loadCart(); delete cart[id]; saveCart(cart); renderCartItems(); renderCartCount(); }));
    // update mailto / whatsapp
    const mailto = document.getElementById('mailto-btn'); const wa = document.getElementById('whatsapp-btn');
    const bodyLines = [];
  Object.values(cart).forEach(i=> {
    bodyLines.push(`- ${i.product.title} x${i.qty} : $${(i.product.price*i.qty).toFixed(2)}`);
    if(i.product.image) bodyLines.push(`${i.product.image}`);
  });
  const body = encodeURIComponent(bodyLines.join('\n') + `\nTotal: $${total.toFixed(2)}`);
    try{
      const be = localStorage.getItem('business_email') || 'senatmike78@gmail.com';
      const bw = localStorage.getItem('business_whatsapp');
      if(mailto) mailto.href = `mailto:${encodeURIComponent(be)}?subject=${encodeURIComponent('Nouvelle commande')}&body=${body}`;
      if(wa){ if(bw) wa.href = `https://wa.me/${encodeURIComponent(bw)}?text=${body}`; else wa.href = `https://wa.me/?text=${body}`; }
    }catch(e){}
  }

  // Render products grouped by category
  function renderProducts(){ const root = document.getElementById('products-root'); root.innerHTML = '';
    const PRODUCTS_SRC = loadProducts();
    const grouped = PRODUCTS_SRC.reduce((acc,p)=>{ acc[p.category]=acc[p.category]||[]; acc[p.category].push(p); return acc; }, {});
    Object.keys(grouped).forEach(cat=>{
      const section = document.createElement('section'); section.style.marginBottom='24px';
      const h = document.createElement('h2'); h.textContent = cat; h.style.marginBottom='8px'; section.appendChild(h);
      const grid = document.createElement('div'); grid.className = 'grid';
      grouped[cat].forEach(p=>{
        const art = document.createElement('article'); art.className='card';
  art.innerHTML = `<div class="card-media"><img src="${p.image}" alt="${p.title}" /><div class="poster-badge">${p.poster || ''}</div></div><div class="card-body"><div style="display:flex; justify-content:space-between; align-items:center"><div><strong>${p.title}</strong><div class="small">${p.category}</div></div><div class="price">$${p.price.toFixed(2)}</div></div><div class="small">${p.description}</div><div class="actions"><button class="btn view-btn">Voir</button><button class="btn primary add-btn" data-id="${p.id}">Ajouter au panier</button></div></div>`;
        grid.appendChild(art);
      });
      section.appendChild(grid);
      root.appendChild(section);
    });
  // attach add handlers
  document.querySelectorAll('.add-btn').forEach(b=> b.addEventListener('click', e=>{ addToCart(e.currentTarget.getAttribute('data-id')); }));
    // view buttons open a simple scroll-to
    document.querySelectorAll('.view-btn').forEach((b,idx)=> b.addEventListener('click', e=>{
      const all = document.querySelectorAll('.card'); const card = all[idx]; window.scrollTo({top: card.offsetTop-20, behavior:'smooth'});
    }));
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    renderProducts(); renderCartCount();
    const openBtn = document.getElementById('open-cart'); if(openBtn) openBtn.addEventListener('click', openCart);
    const closeBtn = document.getElementById('close-cart'); if(closeBtn) closeBtn.addEventListener('click', closeCart);

    // Contact CTA: open cart from contact section
    const contactOpen = document.getElementById('contact-open-cart'); if(contactOpen) contactOpen.addEventListener('click', ()=>{
      openCart(); // open drawer
      // visual hint on checkout buttons
      setTimeout(()=>{
        const mail = document.getElementById('mailto-btn'); const wa = document.getElementById('whatsapp-btn');
        [mail, wa].forEach(el=>{ if(!el) return; const prev = el.style.boxShadow; el.style.boxShadow = '0 0 0 4px rgba(0,170,120,0.18)'; setTimeout(()=> el.style.boxShadow = prev, 900); });
      }, 220);
    });

    // If opened from home or external link with ?open=cart or #openCart, auto-open
    try{
      const params = new URLSearchParams(window.location.search);
      if(params.get('open') === 'cart' || window.location.hash === '#openCart'){
        // clean URL
        try{ history.replaceState(null,'', window.location.pathname + window.location.search.replace(/([?&])open=cart(&|$)/,'$1').replace(/\?$/,'') + window.location.hash.replace('#openCart','')); }catch(e){}
        setTimeout(()=> openCart(), 250);
      }
    }catch(e){}

  // ensure admin email and whatsapp defaults are set, then reflect saved settings
  try{ if(!localStorage.getItem('business_email')) localStorage.setItem('business_email','senatmike78@gmail.com'); }catch(e){}
  try{ if(!localStorage.getItem('business_whatsapp')) localStorage.setItem('business_whatsapp','50943771408'); }catch(e){}
  try{ if(!localStorage.getItem('business_whatsapp_2')) localStorage.setItem('business_whatsapp_2','50935254241'); }catch(e){}
  updateFooterContacts();

    // Admin UI
    const adminBtn = document.getElementById('open-admin');
    const adminModal = document.getElementById('admin-modal');
    const adminList = document.getElementById('admin-list');
    const adminClose = document.getElementById('admin-close');
    const adminNew = document.getElementById('admin-new');
    const adminExport = document.getElementById('admin-export');
    const adminImportBtn = document.getElementById('admin-import-btn');
    const adminImportFile = document.getElementById('admin-import-file');

    function renderAdmin(){
      const list = loadProducts();
      adminList.innerHTML = '';
      // Admin settings: contact info
      const waVal = localStorage.getItem('business_whatsapp') || '';
      const emVal = localStorage.getItem('business_email') || '';
      const settings = document.createElement('div'); settings.style.marginBottom='12px'; settings.innerHTML = `<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:6px"><label class="small">WhatsApp (international, sans +):</label><input id="admin-wa-input" value="${waVal}" placeholder="50937000000" style="padding:6px"/><label class="small">Email:</label><input id="admin-email-input" value="${emVal}" placeholder="contact@..." style="padding:6px"/><button id="admin-save-contacts" class="btn">Sauvegarder contacts</button></div>`;
      adminList.appendChild(settings);
      adminList.querySelector('#admin-save-contacts').addEventListener('click', ()=>{
        const w = adminList.querySelector('#admin-wa-input').value.trim();
        const e = adminList.querySelector('#admin-email-input').value.trim();
        if(w) localStorage.setItem('business_whatsapp', w); else localStorage.removeItem('business_whatsapp');
        if(e) localStorage.setItem('business_email', e); else localStorage.removeItem('business_email');
        updateFooterContacts();
        alert('Contacts sauvegardés');
      });
      list.forEach((p,idx)=>{
        const row = document.createElement('div'); row.className = 'admin-row';
        const imgCol = document.createElement('div'); imgCol.innerHTML = `<img src="${p.image}" class="thumb" />`;
        const fieldsCol = document.createElement('div');
        fieldsCol.innerHTML = `<input type="text" data-field="title" value="${escapeHtml(p.title)}" /><textarea data-field="description">${escapeHtml(p.description)}</textarea><input type="text" data-field="category" value="${escapeHtml(p.category)}" class="admin-small" />`;
        const rightCol = document.createElement('div'); rightCol.innerHTML = `<input type="number" step="0.01" data-field="price" value="${p.price}" /><div style="margin-top:8px" class="admin-actions"><button class="btn save-btn" data-idx="${idx}">Sauvegarder</button><button class="btn del-btn" data-idx="${idx}">Supprimer</button><label class="btn">Image<input type="file" accept="image/*" data-idx="${idx}" style="display:none" class="img-input" /></label></div>`;
        row.appendChild(imgCol); row.appendChild(fieldsCol); row.appendChild(rightCol);
        // attach events later
        adminList.appendChild(row);
      });
      // wire events
      adminList.querySelectorAll('.save-btn').forEach(b=> b.addEventListener('click', e=>{
        const i = Number(e.currentTarget.getAttribute('data-idx'));
        const row = adminList.children[i];
        const title = row.querySelector('[data-field="title"]').value;
        const desc = row.querySelector('[data-field="description"]').value;
        const cat = row.querySelector('[data-field="category"]').value;
        const price = parseFloat(row.querySelector('[data-field="price"]').value) || 0;
        const products = loadProducts();
        products[i].title = title; products[i].description = desc; products[i].category = cat; products[i].price = price;
        saveProducts(products); renderProducts(); renderAdmin();
      }));
      adminList.querySelectorAll('.del-btn').forEach(b=> b.addEventListener('click', e=>{
        const i = Number(e.currentTarget.getAttribute('data-idx'));
        const products = loadProducts(); products.splice(i,1); saveProducts(products); renderProducts(); renderAdmin();
      }));
      adminList.querySelectorAll('.img-input').forEach(inp=> inp.addEventListener('change', e=>{
        const i = Number(e.currentTarget.getAttribute('data-idx'));
        const file = e.currentTarget.files[0]; if(!file) return;
        const reader = new FileReader(); reader.onload = function(ev){ const data = ev.target.result; const products = loadProducts(); products[i].image = data; saveProducts(products); renderProducts(); renderAdmin(); }; reader.readAsDataURL(file);
      }));
    }

      function updateFooterContacts(){
        try{
          const w = localStorage.getItem('business_whatsapp');
          const w2 = localStorage.getItem('business_whatsapp_2');
          const e = localStorage.getItem('business_email');
          const waAnch = document.getElementById('footer-wa-link');
          const waAnch2 = document.getElementById('footer-wa-link-2');
          const emAnch = document.getElementById('footer-email-link');
          if(waAnch){ if(w){ waAnch.href = 'https://wa.me/' + w; waAnch.textContent = formatPhoneForDisplay(w); } }
          if(waAnch2){ if(w2){ waAnch2.href = 'https://wa.me/' + w2; waAnch2.textContent = formatPhoneForDisplay(w2); } }
          if(emAnch){ if(e){ emAnch.href = 'mailto:' + e; emAnch.textContent = e; } }
        }catch(err){}
      }

      function formatPhoneForDisplay(num){
        // naive formatting: + and group
        if(!num) return '';
        if(num.startsWith('+')) return num;
        // insert spaces every 2-3 chars for readability (very simple)
        return '+' + num.replace(/(\d{2,3})(?=\d)/g, '$1 ').trim();
      }

    function escapeHtml(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

    // --- Admin authentication helpers
    function getAdminPass(){ try{ let p = localStorage.getItem('admin_pass'); if(!p){ p = 'admin123'; localStorage.setItem('admin_pass', p); } return p; }catch(e){ return 'admin123'; } }
    function isAuthenticated(){ return sessionStorage.getItem('adminAuth') === '1'; }
    function setAuthenticated(v){ if(v) sessionStorage.setItem('adminAuth','1'); else sessionStorage.removeItem('adminAuth'); }

    function ensureLoginModal(){ if(document.getElementById('admin-login-modal')) return document.getElementById('admin-login-modal');
      const wrap = document.createElement('div'); wrap.id = 'admin-login-modal'; wrap.className = 'modal'; wrap.style.display='none'; wrap.style.zIndex='170';
      wrap.innerHTML = `<div class="panel" style="max-width:420px;width:95%"><div style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.03)"><h3 style="margin:0">Connexion Admin</h3><button id="admin-login-cancel" class="btn">Annuler</button></div><div style="padding:12px 16px"><p class="small">Saisissez le mot de passe administrateur pour accéder à l'éditeur.</p><input id="admin-pass-input" type="password" placeholder="Mot de passe" style="width:100%;margin-bottom:8px;padding:8px"/><div style="display:flex;gap:8px"><label class="small" style="display:flex;align-items:center"><input id="admin-remember" type="checkbox" checked style="margin-right:8px"/>Se souvenir (session)</label><div style="flex:1"></div><button id="admin-login-submit" class="btn primary">Connexion</button></div><div style="margin-top:8px" class="small">Mot de passe par défaut : <strong>admin123</strong>. Changez-le après la première connexion.</div></div></div>`;
      document.body.appendChild(wrap);
      // wire buttons
      wrap.querySelector('#admin-login-cancel').addEventListener('click', ()=> wrap.style.display='none');
      wrap.querySelector('#admin-login-submit').addEventListener('click', ()=>{
        const val = wrap.querySelector('#admin-pass-input').value || '';
        const remember = wrap.querySelector('#admin-remember').checked;
        if(val === getAdminPass()){
          setAuthenticated(true);
          if(!remember) { /* session only — nothing to do, we already use sessionStorage */ }
          wrap.style.display='none';
          adminModal.style.display='flex'; renderAdmin();
        } else { alert('Mot de passe incorrect'); }
      });
      return wrap;
    }

    // Replace admin button click to require authentication
    if(adminBtn){ adminBtn.addEventListener('click', ()=>{
      if(isAuthenticated()){ adminModal.style.display='flex'; renderAdmin(); return; }
      const lm = ensureLoginModal(); lm.style.display='flex'; lm.querySelector('#admin-pass-input').value=''; lm.querySelector('#admin-pass-input').focus();
    }); }
    if(adminClose){ adminClose.addEventListener('click', ()=>{ adminModal.style.display='none'; }); }
    // add change-password button to admin header (visible when admin opens)
    try{
      const exportBtn = document.getElementById('admin-export'); if(exportBtn){
        const ch = document.createElement('button'); ch.className='btn'; ch.id='admin-change-pass'; ch.textContent='Changer mot de passe'; exportBtn.parentNode.insertBefore(ch, exportBtn.nextSibling);
        ch.addEventListener('click', ()=>{
          const cur = prompt('Saisir le mot de passe actuel:'); if(cur === null) return; if(cur !== getAdminPass()){ alert('Mot de passe actuel incorrect'); return; }
          const n1 = prompt('Nouveau mot de passe:'); if(n1===null || n1.trim()==='') return alert('Mot de passe non modifié'); const n2 = prompt('Confirmer le nouveau mot de passe:'); if(n1 !== n2){ return alert('Les mots de passe ne correspondent pas'); }
          try{ localStorage.setItem('admin_pass', n1); alert('Mot de passe mis à jour'); }catch(e){ alert('Impossible d\'enregistrer le mot de passe'); }
        });
      }
    }catch(e){}
    if(adminNew){ adminNew.addEventListener('click', ()=>{
      const products = loadProducts(); products.unshift({ id: 'new_'+Date.now(), title: 'Nouveau produit', category: 'Divers', price: 0.00, image: 'https://picsum.photos/seed/new/400/240', description: '' }); saveProducts(products); renderProducts(); renderAdmin();
    }); }
    if(adminExport){ adminExport.addEventListener('click', ()=>{
      const data = JSON.stringify(loadProducts(), null, 2); const blob = new Blob([data], {type:'application/json'}); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'products.json'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
    }); }
    if(adminImportBtn){ adminImportBtn.addEventListener('click', ()=> adminImportFile.click()); }
    if(adminImportFile){ adminImportFile.addEventListener('change', e=>{
      const f = e.target.files[0]; if(!f) return; const r = new FileReader(); r.onload = ev=>{ try{ const parsed = JSON.parse(ev.target.result); if(Array.isArray(parsed)){ saveProducts(parsed); renderProducts(); renderAdmin(); alert('Importé avec succès'); } else alert('Format invalide'); }catch(err){ alert('Erreur JSON'); } }; r.readAsText(f);
    }); }

    // small helper to reset to built-in products (CTRL+R while admin open)
    document.addEventListener('keydown', e=>{
      if(e.ctrlKey && e.key.toLowerCase()==='r'){ if(adminModal.style.display==='flex'){ localStorage.removeItem('products'); renderProducts(); renderAdmin(); alert('Restauré au catalogue par défaut'); } }
    });
  });

})();
