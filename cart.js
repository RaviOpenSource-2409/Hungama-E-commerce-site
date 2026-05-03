// ============================================================
//  HUNGAMA — Cart Module
// ============================================================

const Cart = (() => {
  const KEY = 'hungama_cart';

  function getAll() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch { return []; }
  }

  function save(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
  }

  function add(productId, qty = 1) {
    const items = getAll();
    const existing = items.find(i => i.id === productId);
    if (existing) {
      existing.qty += qty;
    } else {
      items.push({ id: productId, qty });
    }
    save(items);
    updateBadge();
  }

  function remove(productId) {
    save(getAll().filter(i => i.id !== productId));
    updateBadge();
  }

  function setQty(productId, qty) {
    const items = getAll();
    const item = items.find(i => i.id === productId);
    if (item) {
      if (qty <= 0) return remove(productId);
      item.qty = qty;
      save(items);
    }
    updateBadge();
  }

  function total() {
    return getAll().reduce((sum, i) => {
      const p = PRODUCTS.find(p => p.id === i.id);
      return p ? sum + p.price * i.qty : sum;
    }, 0);
  }

  function count() {
    return getAll().reduce((s, i) => s + i.qty, 0);
  }

  function updateBadge() {
    const el = document.getElementById('cartCount');
    if (el) {
      const n = count();
      el.textContent = n;
      el.style.display = n > 0 ? 'flex' : 'none';
    }
  }

  return { getAll, add, remove, setQty, total, count, updateBadge };
})();
