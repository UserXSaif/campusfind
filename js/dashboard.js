/* ============================================================
   CampusFind - dashboard.js
   Dashboard tabs, stats, user reports, delete/resolve actions
   ============================================================ */

/* ── Redirect if not logged in ─────────────────────────────── */
function requireAuth() {
    if (!isLoggedIn()) {
        showToast('Login Required', 'Please log in to view your dashboard.', 'warning');
        setTimeout(() => { window.location.href = 'login.html'; }, 1200);
        return false;
    }
    return true;
}

/* ── Populate user profile section ────────────────────────── */
function populateProfile() {
    const user = getCurrentUser();
    if (!user) return;

    const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    setEl('dash-user-name', user.name || 'Student');
    setEl('dash-user-email', user.email || 'student@uni.edu');
    setEl('dash-user-id', user.studentId || 'STD-2026-001');
    setEl('dash-joined', user.joinedAt ? new Date(user.joinedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'August 2026');

    const avatarEl = document.getElementById('dash-avatar');
    if (avatarEl) avatarEl.textContent = (user.name || 'U').charAt(0).toUpperCase();
}

/* ── Get user's own reports ────────────────────────────────── */
function getUserItems() {
    const user = getCurrentUser();
    const email = user?.email;

    // Get items user submitted via forms
    const storedLost = LS.get('lost_items') || [];
    const storedFound = LS.get('found_items') || [];

    let userLost = storedLost.filter(i => !email || i.contactEmail === email);
    let userFound = storedFound.filter(i => !email || i.contactEmail === email);

    // If user has no personal items in local storage, seed with 3 sample items for demo
    if (userLost.length === 0 && userFound.length === 0) {
        userLost = LOST_ITEMS.slice(0, 3).map(i => ({ ...i, contactEmail: email || i.contactEmail }));
        userFound = FOUND_ITEMS.slice(0, 1).map(i => ({ ...i, contactEmail: email || i.contactEmail }));
    }

    const activeLost = userLost.filter(i => i.status !== 'resolved');
    const activeFound = userFound.filter(i => i.status !== 'resolved');
    const resolved = [
        ...userLost.filter(i => i.status === 'resolved'),
        ...userFound.filter(i => i.status === 'resolved')
    ];

    return {
        lostItems: activeLost,
        foundItems: activeFound,
        resolved: resolved,
        allUserLost: userLost,
        allUserFound: userFound
    };
}

/* ── Render a report row ───────────────────────────────────── */
function renderReportRow(item) {
    const emoji = ITEM_EMOJIS[item.category] || '📦';
    const imgClass = ITEM_IMG_CLASSES[item.category] || 'img-other';
    const isResolved = item.status === 'resolved';
    const isLost = item.type === 'lost';
    const badgeClass = isResolved ? 'badge-resolved' : (isLost ? 'badge-lost' : 'badge-found');
    const badgeText = isResolved ? 'Resolved ✓' : (isLost ? 'Lost' : 'Found');

    return `
    <div class="report-row" data-id="${item.id}" data-type="${item.type}">
      <div class="report-icon ${imgClass}">${emoji}</div>
      <div class="report-info">
        <div class="report-name">${item.name}</div>
        <div class="report-meta">
          📍 ${item.location} &nbsp;|&nbsp; 📅 ${formatDate(item.date)}
        </div>
      </div>
      <span class="badge ${badgeClass}">${badgeText}</span>
      <div class="report-actions">
        <a href="item-details.html?id=${item.id}&type=${item.type}" 
           class="btn btn-ghost btn-sm">View</a>
        ${!isResolved ? `
        <button class="btn btn-secondary btn-sm" onclick="markReportResolved('${item.id}', '${item.type}')" title="Mark as recovered/returned">
          ✓ Resolve
        </button>` : ''}
        <button class="btn btn-danger btn-sm" onclick="deleteReport('${item.id}', '${item.type}', this)" title="Delete report">
          Delete
        </button>
      </div>
    </div>
  `;
}

/* ── Render empty state in panel ───────────────────────────── */
function renderPanelEmpty(message) {
    return `
    <div class="empty-state" style="padding: 2.5rem 1.5rem;">
      <div class="empty-icon">📭</div>
      <h3 class="empty-title">No reports in this category</h3>
      <p class="empty-desc" style="max-width: 420px; margin: 0 auto 1.5rem;">${message}</p>
    </div>
  `;
}

/* ── Update dashboard stats ────────────────────────────────── */
function updateDashStats() {
    const { lostItems, foundItems, resolved } = getUserItems();
    const total = lostItems.length + foundItems.length + resolved.length;

    const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    setEl('stat-total', total);
    setEl('stat-lost', lostItems.length);
    setEl('stat-found', foundItems.length);
    setEl('stat-resolved', resolved.length);

    // Update sidebar nav counts
    setEl('nav-count-lost', lostItems.length);
    setEl('nav-count-found', foundItems.length);
}

/* ── Tab switching ─────────────────────────────────────────── */
function refreshCurrentTab() {
    const activeTab = document.querySelector('.dashboard-nav-item.active')?.getAttribute('data-tab') || 'tab-my-lost';
    activateTab(activeTab);
    updateDashStats();
}

function activateTab(tabId) {
    const { lostItems, foundItems, resolved } = getUserItems();

    const panels = {
        'tab-my-lost': {
            bodyId: 'panel-my-lost',
            items: lostItems,
            emptyMsg: 'You currently have no active lost item reports. Have you misplaced something on campus?<br><br><a href="report-lost.html" class="btn btn-primary btn-sm">📝 Report Lost Item</a>'
        },
        'tab-my-found': {
            bodyId: 'panel-my-found',
            items: foundItems,
            emptyMsg: 'You haven\'t reported any found items yet. Found something on campus?<br><br><a href="report-found.html" class="btn btn-success btn-sm">🟢 Report Found Item</a>'
        },
        'tab-resolved': {
            bodyId: 'panel-resolved',
            items: resolved,
            emptyMsg: 'No resolved items yet. When you recover your lost belongings or return found items, mark them as resolved here!'
        }
    };

    document.querySelectorAll('.dashboard-nav-item').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.dashboard-panel').forEach(p => p.classList.add('hidden'));

    const tabEl = document.getElementById(tabId) || document.querySelector(`[data-tab="${tabId}"]`);
    if (tabEl) tabEl.classList.add('active');

    const panelConfig = panels[tabId];
    if (!panelConfig) return;

    const panel = document.getElementById(panelConfig.bodyId);
    if (!panel) return;
    panel.classList.remove('hidden');

    const body = panel.querySelector('.dashboard-panel-body');
    if (!body) return;

    if (panelConfig.items.length === 0) {
        body.innerHTML = renderPanelEmpty(panelConfig.emptyMsg);
    } else {
        body.innerHTML = panelConfig.items.map(renderReportRow).join('');
    }
}

function initTabs() {
    document.querySelectorAll('.dashboard-nav-item[data-tab]').forEach(tabEl => {
        tabEl.addEventListener('click', () => activateTab(tabEl.getAttribute('data-tab')));
    });
    activateTab('tab-my-lost');
}

/* ── Mark a report as resolved ─────────────────────────────── */
function markReportResolved(id, type) {
    const key = `${type}_items`;
    let stored = LS.get(key) || [];
    let foundInStorage = false;

    stored = stored.map(i => {
        if (i.id === id) {
            foundInStorage = true;
            return { ...i, status: 'resolved' };
        }
        return i;
    });

    if (!foundInStorage) {
        // If it was a demo item from initial sample data, save it as resolved in LS
        const source = (type === 'lost' ? LOST_ITEMS : FOUND_ITEMS).find(i => i.id === id);
        if (source) {
            stored.unshift({ ...source, status: 'resolved' });
        }
    }

    LS.set(key, stored);
    showToast('Marked Resolved', 'Item report status updated to resolved.', 'success', 2500);
    refreshCurrentTab();
}

/* ── Delete a report ───────────────────────────────────────── */
function deleteReport(id, type, btn) {
    if (!confirm('Are you sure you want to delete this report? This action cannot be undone.')) return;

    const key = `${type}_items`;
    const saved = LS.get(key) || [];
    const idx = saved.findIndex(i => i.id === id);
    if (idx !== -1) {
        saved.splice(idx, 1);
        LS.set(key, saved);
    }

    const row = btn.closest('.report-row');
    if (row) {
        row.style.transition = 'opacity 0.3s, transform 0.3s';
        row.style.opacity = '0';
        row.style.transform = 'translateX(-10px)';
    }

    setTimeout(() => {
        showToast('Deleted', 'Report has been removed.', 'info', 2500);
        refreshCurrentTab();
    }, 300);
}

/* ── Init dashboard ────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    if (!requireAuth()) return;

    populateProfile();
    updateDashStats();
    initTabs();
});
