/* ============================================================
   CampusFind - app.js
   Shared utilities: nav, hamburger, toast, modal, auth state,
   card renderer, home page initialization
   ============================================================ */

/* ── Toast System ──────────────────────────────────────────── */
function showToast(title, message, type = 'info', duration = 4000) {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
    <span class="toast-icon">${icons[type] || icons.info}</span>
    <div class="toast-body">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
    <button class="toast-close" onclick="this.closest('.toast').remove()">✕</button>
  `;
    container.appendChild(toast);
    requestAnimationFrame(() => { requestAnimationFrame(() => { toast.classList.add('show'); }); });
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 400); }, duration);
}

/* ── Modal System ──────────────────────────────────────────── */
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) { modal.classList.add('open'); document.body.style.overflow = 'hidden'; }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) { modal.classList.remove('open'); document.body.style.overflow = ''; }
}

// Close modal on backdrop click or Escape key
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
        e.target.classList.remove('open');
        document.body.style.overflow = '';
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop.open').forEach(m => m.classList.remove('open'));
        const hamburger = document.getElementById('hamburger');
        const mobileNav = document.getElementById('mobile-nav');
        const overlay = document.getElementById('nav-overlay');
        if (mobileNav && mobileNav.classList.contains('open')) {
            mobileNav.classList.remove('open');
            hamburger?.classList.remove('open');
            hamburger?.setAttribute('aria-expanded', 'false');
            mobileNav.setAttribute('aria-hidden', 'true');
            overlay?.classList.remove('visible');
        }
        document.body.style.overflow = '';
    }
});

/* ── Copy to Clipboard Helper ──────────────────────────────── */
function copyToClipboard(text, label = 'Text') {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('Copied!', `${label} copied to clipboard.`, 'success', 2500);
        }).catch(() => {
            fallbackCopy(text, label);
        });
    } else {
        fallbackCopy(text, label);
    }
}

function fallbackCopy(text, label) {
    const temp = document.createElement('textarea');
    temp.value = text;
    temp.style.position = 'fixed';
    temp.style.opacity = '0';
    document.body.appendChild(temp);
    temp.focus();
    temp.select();
    try {
        document.execCommand('copy');
        showToast('Copied!', `${label} copied to clipboard.`, 'success', 2500);
    } catch {
        showToast('Copy Failed', 'Please copy manually.', 'warning');
    }
    document.body.removeChild(temp);
}

/* ── LocalStorage Helpers ──────────────────────────────────── */
const LS = {
    get: (key) => { try { return JSON.parse(localStorage.getItem('campusfind_' + key)); } catch { return null; } },
    set: (key, val) => { try { localStorage.setItem('campusfind_' + key, JSON.stringify(val)); } catch { } },
    remove: (key) => { try { localStorage.removeItem('campusfind_' + key); } catch { } }
};

/* ── Auth State ────────────────────────────────────────────── */
function getCurrentUser() { return LS.get('user'); }

function setCurrentUser(user) { LS.set('user', user); }

function logout() {
    LS.remove('user');
    showToast('Logged Out', 'You have been logged out successfully.', 'info');
    setTimeout(() => { window.location.href = 'index.html'; }, 1200);
}

function isLoggedIn() { return !!getCurrentUser(); }

/* ── Update Navbar based on auth state ─────────────────────── */
function updateNavAuth() {
    const user = getCurrentUser();
    const guestBtns = document.getElementById('nav-guest-btns');
    const userInfo = document.getElementById('nav-user-info');
    const mobileGuestBtns = document.getElementById('mobile-guest-btns');
    const mobileUserInfo = document.getElementById('mobile-user-info');

    if (user) {
        if (guestBtns) guestBtns.classList.add('hidden');
        if (userInfo) {
            userInfo.classList.remove('hidden');
            const nameEl = userInfo.querySelector('.user-name');
            const avatarEl = userInfo.querySelector('.nav-avatar');
            if (nameEl) nameEl.textContent = (user.name || 'User').split(' ')[0];
            if (avatarEl) avatarEl.textContent = (user.name || 'U').charAt(0).toUpperCase();
        }
        if (mobileGuestBtns) mobileGuestBtns.classList.add('hidden');
        if (mobileUserInfo) {
            mobileUserInfo.classList.remove('hidden');
            const nameEl = mobileUserInfo.querySelector('.user-name');
            if (nameEl) nameEl.textContent = user.name || 'User';
        }
    } else {
        if (guestBtns) guestBtns.classList.remove('hidden');
        if (userInfo) userInfo.classList.add('hidden');
        if (mobileGuestBtns) mobileGuestBtns.classList.remove('hidden');
        if (mobileUserInfo) mobileUserInfo.classList.add('hidden');
    }
}

/* ── Hamburger Menu ────────────────────────────────────────── */
function initHamburger() {
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');
    const overlay = document.getElementById('nav-overlay');

    if (!hamburger || !mobileNav) return;

    function toggleMenu(open) {
        hamburger.classList.toggle('open', open);
        hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
        mobileNav.classList.toggle('open', open);
        mobileNav.setAttribute('aria-hidden', open ? 'false' : 'true');
        if (overlay) overlay.classList.toggle('visible', open);
        document.body.style.overflow = open ? 'hidden' : '';
    }

    hamburger.addEventListener('click', () => toggleMenu(!hamburger.classList.contains('open')));
    if (overlay) overlay.addEventListener('click', () => toggleMenu(false));

    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });
}

/* ── Active Nav Link ───────────────────────────────────────── */
function setActiveNavLink() {
    const path = window.location.pathname;
    let page = path.split('/').pop().split('?')[0].split('#')[0];
    if (!page || page === '') page = 'index.html';

    document.querySelectorAll('.navbar-links a, .mobile-nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href && (href === page || (page === 'index.html' && (href === './' || href === 'index.html')))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/* ── Item Card Renderer ────────────────────────────────────── */
function renderItemCard(item) {
    const isLost = item.type === 'lost' || item.status === 'lost';
    const badgeClass = isLost ? 'badge-lost' : 'badge-found';
    const badgeText = isLost ? 'Lost' : 'Found';
    const emoji = ITEM_EMOJIS[item.category] || '📦';
    const imgClass = ITEM_IMG_CLASSES[item.category] || 'img-other';
    const saved = getSavedItems().includes(item.id);

    return `
    <div class="item-card" data-id="${item.id}" data-type="${item.type || (isLost ? 'lost' : 'found')}">
      <div class="item-card-image">
        <div class="item-img-placeholder ${imgClass}">
          <span>${emoji}</span>
        </div>
        <span class="item-card-badge badge ${badgeClass}">
          <span class="badge-dot"></span> ${badgeText}
        </span>
        <button class="item-card-save ${saved ? 'saved' : ''}" 
          onclick="toggleSave('${item.id}', this)" title="Save item">
          ${saved ? '❤️' : '🤍'}
        </button>
      </div>
      <div class="item-card-body">
        <div class="item-card-meta">
          <span class="item-card-category">${CATEGORIES.find(c => c.id === item.category)?.name || 'Other'}</span>
        </div>
        <h3 class="item-card-title">${item.name}</h3>
        <p class="item-card-desc">${item.description}</p>
        <div class="item-card-info">
          <div class="item-card-info-row">
            <span class="icon">📍</span>
            <span>${item.location}</span>
          </div>
          <div class="item-card-info-row">
            <span class="icon">📅</span>
            <span>${formatDate(item.date)}</span>
          </div>
          <div class="item-card-info-row">
            <span class="icon">👤</span>
            <span>${item.postedBy}</span>
          </div>
        </div>
        <div class="item-card-footer">
          <a href="item-details.html?id=${item.id}&type=${item.type || (isLost ? 'lost' : 'found')}" class="btn btn-primary btn-sm">
            View Details
          </a>
          <button class="btn btn-ghost btn-sm btn-icon" onclick="toggleSave('${item.id}', this)" title="Save" data-save-id="${item.id}">${saved ? '❤️' : '🤍'}</button>
        </div>
      </div>
    </div>
  `;
}

/* ── Saved Items ───────────────────────────────────────────── */
function getSavedItems() { return LS.get('saved_items') || []; }

function toggleSave(id, btn) {
    const saved = getSavedItems();
    const idx = saved.indexOf(id);
    if (idx === -1) {
        saved.push(id);
        showToast('Saved', 'Item added to your saved list.', 'success', 2500);
    } else {
        saved.splice(idx, 1);
        showToast('Removed', 'Item removed from saved list.', 'info', 2000);
    }
    LS.set('saved_items', saved);
    const nowSaved = idx === -1;
    // Update image overlay save buttons
    document.querySelectorAll(`.item-card[data-id="${id}"] .item-card-save`).forEach(b => {
        b.classList.toggle('saved', nowSaved);
        b.textContent = nowSaved ? '❤️' : '🤍';
    });
    // Update footer save buttons
    document.querySelectorAll(`[data-save-id="${id}"]`).forEach(b => {
        b.textContent = nowSaved ? '❤️' : '🤍';
    });
}

/* ── Home Page: Render Sections ────────────────────────────── */
function renderHomeRecentItems() {
    const lostGrid = document.getElementById('recent-lost-grid');
    const foundGrid = document.getElementById('recent-found-grid');

    if (lostGrid) {
        const recent = getAllItems('lost').slice(0, 3);
        lostGrid.innerHTML = recent.map(renderItemCard).join('');
    }
    if (foundGrid) {
        const recent = getAllItems('found').slice(0, 3);
        foundGrid.innerHTML = recent.map(renderItemCard).join('');
    }
}

function renderCategories() {
    const grid = document.getElementById('categories-grid');
    if (!grid) return;
    grid.innerHTML = CATEGORIES.map(cat => `
    <div class="category-card" onclick="window.location.href='lost-items.html?category=${cat.id}'">
      <div class="category-icon">${cat.icon}</div>
      <span class="category-name">${cat.name}</span>
    </div>
  `).join('');
}

/* ── Home Search ───────────────────────────────────────────── */
function initHomeSearch() {
    const form = document.getElementById('home-search-form');
    if (!form) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const q = document.getElementById('home-search-input')?.value.trim();
        if (q) window.location.href = `search.html?q=${encodeURIComponent(q)}`;
    });
}

/* ── Animated Counters ─────────────────────────────────────── */
function animateCounter(el, target) {
    let current = 0;
    const step = Math.max(1, Math.floor(target / 60));
    const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current + (el.dataset.suffix || '');
        if (current >= target) clearInterval(timer);
    }, 20);
}

function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target, parseInt(entry.target.dataset.count));
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => obs.observe(counter));
}

/* ── Init ──────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    initHamburger();
    setActiveNavLink();
    updateNavAuth();
    renderCategories();
    renderHomeRecentItems();
    initHomeSearch();
    initCounters();

    // Logout button
    document.querySelectorAll('[data-action="logout"]').forEach(btn => {
        btn.addEventListener('click', logout);
    });
});
