// ============================================================
//  HUMNGAMA — App Module
// ============================================================

let currentCategory = 'all';
let currentSearch   = '';

function formatINR(amount) {
  return '₹' + amount.toLocaleString('en-IN');
}

// ── Page routing ──────────────────────────────────────────
function showPage(page, data) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(`page-${page}`).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (page === 'cart')   renderCart();
  if (page === 'detail' && data) renderDetail(data);
}

// ── Toast ─────────────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2800);
}

// ── Product grid ──────────────────────────────────────────
function renderProducts(list) {
  const grid  = document.getElementById('productGrid');
  const count = document.getElementById('productCount');
  count.textContent = `${list.length} product${list.length !== 1 ? 's' : ''}`;

  if (!list.length) {
    grid.innerHTML = `<div class="empty-state">
      <div class="empty-icon">🔍</div>
      <p>No products found.</p>
      <button class="btn-primary" onclick="clearSearch()">Clear Filters</button>
    </div>`;
    return;
  }

  grid.innerHTML = list.map((p) => {
    const discount = p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : 0;
    const imgContent = p.image
      ? `<img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.style.display='none'; this.parentElement.style.background='${p.gradient}'; this.parentElement.innerHTML+='<span class=card-emoji>${p.emoji || '🛍️'}</span>';" />`
      : `<span class="card-emoji">${p.emoji || '🛍️'}</span>`;
    return `
    <article class="product-card" onclick="openDetail(${p.id})">
      <div class="card-img-wrap">
        <div class="card-img" style="${p.image ? '' : 'background:' + p.gradient}">
          ${imgContent}
        </div>
        ${discount ? `<span class="discount-badge">${discount}% OFF</span>` : ''}
        ${p.tag && !discount ? `<span class="card-tag tag-${p.tag.toLowerCase().replace(' ','-')}">${p.tag}</span>` : ''}
        <button class="card-add-btn" onclick="event.stopPropagation(); quickAdd(${p.id})" aria-label="Add to cart">
          🛒 Add to Cart
        </button>
      </div>
      <div class="card-body">
        <span class="card-category">${p.category}</span>
        <h3 class="card-name">${p.name}</h3>
        <div class="card-price-row">
          <span class="card-price">${formatINR(p.price)}</span>
          ${p.originalPrice ? `<span class="card-orig">${formatINR(p.originalPrice)}</span>` : ''}
        </div>
      </div>
    </article>`;
  }).join('');
}

function quickAdd(id) {
  const p = PRODUCTS.find(p => p.id === id);
  Cart.add(id);
  showToast(`✓ ${p.name} added to cart`);
}

function openDetail(id) {
  showPage('detail', id);
}

// ── Product Detail ────────────────────────────────────────
function renderDetail(id) {
  const p = PRODUCTS.find(p => p.id === id);
  if (!p) return;
  const discount = p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : 0;
  const imgContent = p.image
    ? `<img src="${p.image}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;" />`
    : `<span class="detail-emoji">${p.emoji || '🛍️'}</span>`;

  document.getElementById('detailContent').innerHTML = `
    <div class="detail-visual">
      <div class="detail-img" style="${p.image ? '' : 'background:' + p.gradient}">
        ${imgContent}
      </div>
    </div>
    <div class="detail-info">
      <span class="detail-cat">${p.category}</span>
      <h1 class="detail-title">${p.name}</h1>
      <div class="detail-price-row">
        <span class="detail-price">${formatINR(p.price)}</span>
        ${p.originalPrice ? `<span class="detail-orig">${formatINR(p.originalPrice)}</span>` : ''}
        ${discount ? `<span class="detail-discount">${discount}% off</span>` : ''}
        ${p.tag && !discount ? `<span class="card-tag tag-${p.tag.toLowerCase().replace(' ','-')}">${p.tag}</span>` : ''}
      </div>
      <p class="detail-desc">${p.description}</p>
      <ul class="detail-specs">
        ${p.details.map(d => `<li>✓ ${d}</li>`).join('')}
      </ul>
      <div class="detail-actions">
        <div class="qty-row">
          <span class="qty-label">Quantity</span>
          <div class="qty-ctrl">
            <button class="qty-btn" onclick="changeDetailQty(-1)">−</button>
            <input type="number" id="detailQty" value="1" min="1" max="99" class="qty-input" />
            <button class="qty-btn" onclick="changeDetailQty(1)">+</button>
          </div>
        </div>
        <div class="detail-btn-row">
          <button class="btn-primary" onclick="addDetailToCart(${p.id})">🛒 Add to Cart</button>
          <button class="btn-buy" onclick="addDetailToCart(${p.id}); showPage('cart')">Buy Now →</button>
        </div>
      </div>
    </div>
  `;
}

function changeDetailQty(delta) {
  const input = document.getElementById('detailQty');
  if (!input) return;
  input.value = Math.max(1, parseInt(input.value || 1) + delta);
}

function addDetailToCart(id) {
  const qty = parseInt(document.getElementById('detailQty').value || 1);
  const p = PRODUCTS.find(p => p.id === id);
  Cart.add(id, qty);
  showToast(`✓ ${p.name} × ${qty} added to cart`);
}

// ── Cart Page ─────────────────────────────────────────────
function renderCart() {
  const items = Cart.getAll();
  const itemsEl   = document.getElementById('cartItems');
  const summaryEl = document.getElementById('cartSummary');

  if (!items.length) {
    itemsEl.innerHTML = `<div class="empty-state">
      <div class="empty-icon">🛒</div>
      <p>Your cart is empty.</p>
      <button class="btn-primary" onclick="showPage('home')">Continue Shopping</button>
    </div>`;
    summaryEl.innerHTML = '';
    return;
  }

  itemsEl.innerHTML = items.map(item => {
    const p = PRODUCTS.find(p => p.id === item.id);
    if (!p) return '';
    const imgContent = p.image
      ? `<img src="${p.image}" alt="${p.name}" />`
      : `<span>${p.emoji || '🛍️'}</span>`;
    return `
      <div class="cart-item" id="ci-${p.id}">
        <div class="ci-img" style="${p.image ? '' : 'background:' + p.gradient}">${imgContent}</div>
        <div class="ci-info">
          <span class="ci-cat">${p.category}</span>
          <h4 class="ci-name">${p.name}</h4>
          <span class="ci-unit">${formatINR(p.price)} each</span>
        </div>
        <div class="ci-right">
          <div class="qty-ctrl compact">
            <button class="qty-btn" onclick="updateCartQty(${p.id}, ${item.qty - 1})">−</button>
            <span class="qty-display">${item.qty}</span>
            <button class="qty-btn" onclick="updateCartQty(${p.id}, ${item.qty + 1})">+</button>
          </div>
          <span class="ci-total">${formatINR(p.price * item.qty)}</span>
          <button class="ci-remove" onclick="removeFromCart(${p.id})" aria-label="Remove">✕</button>
        </div>
      </div>`;
  }).join('');

  const subtotal = Cart.total();
  const shipping = subtotal > 499 ? 0 : 49;
  const total    = subtotal + shipping;

  summaryEl.innerHTML = `
    <div class="summary-card">
      <h3 class="summary-title">Price Details</h3>
      <div class="summary-row"><span>Subtotal (${Cart.count()} items)</span><span>${formatINR(subtotal)}</span></div>
      <div class="summary-row"><span>Delivery Charges</span><span>${shipping === 0 ? '<em class="free-tag">FREE</em>' : formatINR(shipping)}</span></div>
      ${subtotal > 0 && subtotal <= 499 ? `<p class="free-ship-note">Add ${formatINR(500 - subtotal)} more for free delivery</p>` : ''}
      <div class="summary-divider"></div>
      <div class="summary-row total-row"><span>Total Amount</span><span>${formatINR(total)}</span></div>
      <button class="btn-primary btn-full checkout-btn" onclick="handleCheckout()">Place Order 🎉</button>
      <p class="secure-note">🔒 Safe and Secure Payments</p>
    </div>
  `;
}

function updateCartQty(id, qty) {
  Cart.setQty(id, qty);
  renderCart();
}

function removeFromCart(id) {
  const ci = document.getElementById(`ci-${id}`);
  if (ci) {
    ci.style.opacity = '0';
    ci.style.transform = 'translateX(20px)';
    setTimeout(() => { Cart.remove(id); renderCart(); }, 300);
  }
}

function handleCheckout() {
  showToast('🎉 Order placed successfully!');
  localStorage.removeItem('hungama_cart');
  Cart.updateBadge();
  setTimeout(() => renderCart(), 300);
}

// ── Filters ───────────────────────────────────────────────
function filterCategory(cat, btn) {
  currentCategory = cat;
  document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
  if (btn) btn.classList.add('active');
  applyFilters();
}

function handleSearch() {
  currentSearch = document.getElementById('searchInput').value.toLowerCase().trim();
  applyFilters();
}

function clearSearch() {
  currentSearch   = '';
  currentCategory = 'all';
  document.getElementById('searchInput').value = '';
  document.querySelectorAll('.cat-pill').forEach((p, i) => p.classList.toggle('active', i === 0));
  applyFilters();
}

function applyFilters() {
  let list = PRODUCTS;
  if (currentCategory !== 'all') list = list.filter(p => p.category === currentCategory);
  if (currentSearch) list = list.filter(p =>
    p.name.toLowerCase().includes(currentSearch) ||
    p.description.toLowerCase().includes(currentSearch) ||
    p.category.toLowerCase().includes(currentSearch)
  );
  renderProducts(list);
}

// ── Navbar ────────────────────────────────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ── Init ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  Cart.updateBadge();
  setTimeout(() => renderProducts(PRODUCTS), 600);
});
