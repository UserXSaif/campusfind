/* ============================================================
   CampusFind - search.js
   Search, filter, sort logic for lost-items, found-items,
   and search results pages
   ============================================================ */

let allDisplayedItems = [];
let currentType = 'lost';

/* ── Render grid of items ──────────────────────────────────── */
function renderItemGrid(items, gridId = 'items-grid') {
    const grid = document.getElementById(gridId);
    if (!grid) return;

    if (items.length === 0) {
        grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <h3 class="empty-title">No items match your criteria</h3>
        <p class="empty-desc">Try adjusting your keywords, selecting a different category, or resetting all filters.</p>
        <div style="display:inline-flex;gap:0.75rem;flex-wrap:wrap;justify-content:center;">
          <button class="btn btn-primary" onclick="clearAllFilters()">✕ Clear All Filters</button>
          <a href="report-lost.html" class="btn btn-secondary">📝 Report Lost Item</a>
          <a href="report-found.html" class="btn btn-ghost">🟢 Report Found Item</a>
        </div>
      </div>
    `;
    } else {
        grid.innerHTML = items.map(renderItemCard).join('');
    }

    // Update results count
    const countEl = document.getElementById('results-count');
    if (countEl) {
        countEl.innerHTML = `Showing <strong>${items.length}</strong> ${items.length === 1 ? 'item' : 'items'}`;
    }
}

/* ── Apply filters and search ──────────────────────────────── */
function applyFilters() {
    const searchVal = (document.getElementById('filter-search')?.value || '').toLowerCase().trim();
    const categoryVal = document.getElementById('filter-category')?.value || '';
    const locationVal = (document.getElementById('filter-location')?.value || '').toLowerCase().trim();
    const dateVal = document.getElementById('filter-date')?.value || '';
    const sortVal = document.getElementById('filter-sort')?.value || 'newest';

    let filtered = allDisplayedItems.filter(item => {
        const matchSearch = !searchVal || (
            (item.name && item.name.toLowerCase().includes(searchVal)) ||
            (item.description && item.description.toLowerCase().includes(searchVal)) ||
            (item.location && item.location.toLowerCase().includes(searchVal)) ||
            (item.category && item.category.toLowerCase().includes(searchVal)) ||
            (CATEGORIES.find(c => c.id === item.category)?.name.toLowerCase().includes(searchVal))
        );
        const matchCategory = !categoryVal || item.category === categoryVal;
        const matchLocation = !locationVal || (item.location && (item.location.toLowerCase().includes(locationVal) || item.location.toLowerCase() === locationVal));
        const matchDate = !dateVal || item.date === dateVal;
        return matchSearch && matchCategory && matchLocation && matchDate;
    });

    // Sort
    filtered.sort((a, b) => {
        const dateA = new Date(a.createdAt || a.date).getTime();
        const dateB = new Date(b.createdAt || b.date).getTime();
        if (sortVal === 'newest') return dateB - dateA;
        if (sortVal === 'oldest') return dateA - dateB;
        if (sortVal === 'name-az') return (a.name || '').localeCompare(b.name || '');
        if (sortVal === 'name-za') return (b.name || '').localeCompare(a.name || '');
        return 0;
    });

    renderItemGrid(filtered);
}

/* ── Populate filter dropdowns ─────────────────────────────── */
function populateFilters() {
    const catSel = document.getElementById('filter-category');
    if (catSel && catSel.options.length <= 1) {
        CATEGORIES.forEach(cat => {
            const opt = document.createElement('option');
            opt.value = cat.id;
            opt.textContent = `${cat.icon} ${cat.name}`;
            catSel.appendChild(opt);
        });
    }

    const locSel = document.getElementById('filter-location');
    if (locSel && locSel.options.length <= 1) {
        LOCATIONS.forEach(loc => {
            const opt = document.createElement('option');
            opt.value = loc;
            opt.textContent = loc;
            locSel.appendChild(opt);
        });
    }
}

/* ── Clear all filters ─────────────────────────────────────── */
function clearAllFilters() {
    ['filter-search', 'filter-category', 'filter-location', 'filter-date', 'filter-sort'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = el.tagName === 'SELECT' ? (id === 'filter-sort' ? 'newest' : '') : '';
    });
    applyFilters();
}

/* ── Attach filter event listeners ────────────────────────── */
function attachFilterListeners() {
    ['filter-search', 'filter-category', 'filter-location', 'filter-date', 'filter-sort'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', applyFilters);
            el.addEventListener('change', applyFilters);
        }
    });

    const clearBtn = document.getElementById('btn-clear-filters');
    if (clearBtn) clearBtn.addEventListener('click', clearAllFilters);
}

/* ── Init Lost/Found listing page ──────────────────────────── */
function initListingPage(type) {
    currentType = type;
    allDisplayedItems = getAllItems(type);
    populateFilters();
    attachFilterListeners();

    // Check URL params for pre-set filters
    const urlParams = new URLSearchParams(window.location.search);
    const preCategory = urlParams.get('category');
    if (preCategory) {
        const catSel = document.getElementById('filter-category');
        if (catSel) catSel.value = preCategory;
    }

    const preLocation = urlParams.get('location');
    if (preLocation) {
        const locSel = document.getElementById('filter-location');
        if (locSel) locSel.value = preLocation;
    }

    const preQuery = urlParams.get('q');
    if (preQuery) {
        const searchInput = document.getElementById('filter-search');
        if (searchInput) searchInput.value = preQuery;
    }

    applyFilters();
}

/* ── Init Search Results page ──────────────────────────────── */
function initSearchPage() {
    const urlParams = new URLSearchParams(window.location.search);
    let query = urlParams.get('q') || '';

    const searchInput = document.getElementById('main-search-input');
    if (searchInput) searchInput.value = query;

    function searchItems(items, q) {
        if (!q) return items;
        const ql = q.toLowerCase().trim();
        return items.filter(item =>
            (item.name && item.name.toLowerCase().includes(ql)) ||
            (item.description && item.description.toLowerCase().includes(ql)) ||
            (item.location && item.location.toLowerCase().includes(ql)) ||
            (item.category && item.category.toLowerCase().includes(ql)) ||
            (CATEGORIES.find(c => c.id === item.category)?.name.toLowerCase().includes(ql))
        );
    }

    let activeTab = 'all';

    function runSearch(currentQuery) {
        const allLost = getAllItems('lost');
        const allFound = getAllItems('found');
        const combined = [...allLost, ...allFound];

        const searchTitle = document.getElementById('search-query-display');
        if (searchTitle) searchTitle.textContent = currentQuery ? `"${currentQuery}"` : 'All Campus Items';

        const lostResults = searchItems(allLost, currentQuery);
        const foundResults = searchItems(allFound, currentQuery);
        allDisplayedItems = searchItems(combined, currentQuery);

        const tabCounts = {
            all: allDisplayedItems.length,
            lost: lostResults.length,
            found: foundResults.length
        };

        document.querySelectorAll('.search-tab').forEach(t => {
            const tabKey = t.dataset.tab;
            const count = tabCounts[tabKey] ?? 0;
            const existingBadge = t.querySelector('.tab-count');
            if (!existingBadge) {
                t.insertAdjacentHTML('beforeend', ` <span class="tab-count">(${count})</span>`);
            } else {
                existingBadge.textContent = `(${count})`;
            }
        });

        if (activeTab === 'all') renderItemGrid(allDisplayedItems);
        else if (activeTab === 'lost') renderItemGrid(lostResults);
        else renderItemGrid(foundResults);
    }

    function switchTab(tab) {
        activeTab = tab;
        document.querySelectorAll('.search-tab').forEach(t => {
            t.classList.toggle('active', t.dataset.tab === tab);
        });
        runSearch(searchInput ? searchInput.value.trim() : query);
    }

    document.querySelectorAll('.search-tab').forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    });

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            runSearch(searchInput.value.trim());
        });
    }

    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const q = searchInput?.value.trim() || '';
            runSearch(q);
            const newUrl = q ? `search.html?q=${encodeURIComponent(q)}` : 'search.html';
            window.history.replaceState(null, '', newUrl);
        });
    }

    switchTab('all');
}
