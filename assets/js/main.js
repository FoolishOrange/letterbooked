/**
 * EntreLinhas / LoreShelf - Biblioteca Digital
 * Script principal de interatividade nativa
 */

document.addEventListener('DOMContentLoaded', () => {
  initFavoritesSystem();
  initSearchAndFilters();
  initPasswordToggles();
  initBootstrapComponents();
});

// Chave para armazenamento no localStorage
const STORAGE_KEY_FAVS = 'entrelinhas_favorite_books';

// Livros padrão favoritados se o usuário for novo
const defaultFavorites = [
  'Dom Casmurro',
  '1984',
  'Memórias Póstumas de Brás Cubas',
  'Duna'
];

/**
 * Retorna os títulos favoritos salvos ou valores padrão
 */
function getFavorites() {
  const stored = localStorage.getItem(STORAGE_KEY_FAVS);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      return defaultFavorites;
    }
  }
  return defaultFavorites;
}

/**
 * Salva a lista de favoritos no localStorage
 */
function saveFavorites(favs) {
  localStorage.setItem(STORAGE_KEY_FAVS, JSON.stringify(favs));
}

/**
 * Atualiza o badge do contador no cabeçalho
 */
function updateHeaderBadge(count) {
  const badge = document.getElementById('nav-fav-badge');
  if (badge) {
    badge.textContent = count;
  }
}

/**
 * Exibe notificação Toast
 */
function showToast(message, isSuccess = true) {
  let toastEl = document.getElementById('global-toast');
  if (!toastEl) {
    toastEl = document.createElement('div');
    toastEl.id = 'global-toast';
    toastEl.className = 'toast-custom d-none';
    toastEl.innerHTML = `
      <span class="material-symbols-outlined text-warning" id="toast-icon">favorite</span>
      <span id="toast-msg">Notificação</span>
      <button type="button" class="btn btn-sm text-white p-0 ms-2" onclick="dismissToast()" aria-label="Fechar">
        <span class="material-symbols-outlined fs-6">close</span>
      </button>
    `;
    document.body.appendChild(toastEl);
  }

  const msgEl = document.getElementById('toast-msg');
  const iconEl = document.getElementById('toast-icon');
  if (msgEl) msgEl.textContent = message;
  if (iconEl) iconEl.textContent = isSuccess ? 'favorite' : 'info';

  toastEl.classList.remove('d-none');

  if (window.toastTimeout) clearTimeout(window.toastTimeout);
  window.toastTimeout = setTimeout(() => {
    dismissToast();
  }, 3500);
}

function dismissToast() {
  const toastEl = document.getElementById('global-toast');
  if (toastEl) {
    toastEl.classList.add('d-none');
  }
}

/**
 * Inicializa o sistema de favoritos sincronizado
 */
function initFavoritesSystem() {
  const favs = getFavorites();
  updateHeaderBadge(favs.length);

  // Inicializa botões flutuantes de favoritos (nos cards de catálogo)
  document.querySelectorAll('.btn-floating-fav').forEach(btn => {
    const bookTitle = btn.getAttribute('data-book-title');
    if (!bookTitle) return;

    const icon = btn.querySelector('.material-symbols-outlined');
    const isFav = favs.includes(bookTitle);

    if (isFav) {
      btn.classList.add('favorited');
      if (icon) {
        icon.classList.add('fill');
        icon.style.color = 'var(--color-primary)';
      }
    } else {
      btn.classList.remove('favorited');
      if (icon) {
        icon.classList.remove('fill');
        icon.style.color = '';
      }
    }

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleFavorite(bookTitle, btn);
    });
  });

  // Inicializa botão da tela de detalhes
  const detailFavBtn = document.getElementById('detail-fav-btn');
  if (detailFavBtn) {
    const bookTitle = detailFavBtn.getAttribute('data-book-title') || 'Dom Casmurro';
    const isFav = favs.includes(bookTitle);
    updateDetailFavBtnUI(detailFavBtn, isFav);

    detailFavBtn.addEventListener('click', () => {
      const currentFavs = getFavorites();
      const nowFav = !currentFavs.includes(bookTitle);
      if (nowFav) {
        currentFavs.push(bookTitle);
        showToast(`'${bookTitle}' adicionado aos seus favoritos!`);
      } else {
        const idx = currentFavs.indexOf(bookTitle);
        if (idx !== -1) currentFavs.splice(idx, 1);
        showToast(`'${bookTitle}' removido dos seus favoritos!`, false);
      }
      saveFavorites(currentFavs);
      updateHeaderBadge(currentFavs.length);
      updateDetailFavBtnUI(detailFavBtn, nowFav);
    });
  }

  // Inicializa botões de remoção na tela de Favoritos
  document.querySelectorAll('.btn-remove-fav').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const article = this.closest('.fav-item-card');
      const bookTitle = this.getAttribute('data-book-title');

      if (confirm(`Deseja remover "${bookTitle}" da sua estante de favoritos?`)) {
        if (article) {
          article.style.opacity = '0';
          article.style.transform = 'scale(0.95)';
          article.style.transition = 'all 0.3s ease';
          setTimeout(() => {
            article.remove();
            // Atualiza storage
            const currentFavs = getFavorites();
            const idx = currentFavs.indexOf(bookTitle);
            if (idx !== -1) currentFavs.splice(idx, 1);
            saveFavorites(currentFavs);
            updateHeaderBadge(currentFavs.length);

            // Atualiza contadores na página de favoritos
            const totalFavCount = document.getElementById('fav-total-count');
            if (totalFavCount) totalFavCount.textContent = currentFavs.length;

            showToast(`"${bookTitle}" removido dos favoritos.`, false);
          }, 300);
        }
      }
    });
  });
}

function toggleFavorite(bookTitle, btn) {
  let favs = getFavorites();
  const icon = btn.querySelector('.material-symbols-outlined');
  const isCurrentlyFav = favs.includes(bookTitle);

  if (isCurrentlyFav) {
    favs = favs.filter(t => t !== bookTitle);
    btn.classList.remove('favorited');
    if (icon) {
      icon.classList.remove('fill');
      icon.style.color = '';
    }
    showToast(`'${bookTitle}' removido dos seus favoritos!`, false);
  } else {
    favs.push(bookTitle);
    btn.classList.add('favorited');
    if (icon) {
      icon.classList.add('fill');
      icon.style.color = 'var(--color-primary)';
    }
    showToast(`❤️ '${bookTitle}' adicionado aos seus favoritos!`);
  }

  saveFavorites(favs);
  updateHeaderBadge(favs.length);
}

function updateDetailFavBtnUI(btn, isFav) {
  const icon = btn.querySelector('.material-symbols-outlined');
  const textSpan = btn.querySelector('.btn-label-text');

  if (isFav) {
    btn.classList.add('btn-primary-custom');
    btn.classList.remove('btn-outline-custom');
    if (icon) {
      icon.textContent = 'favorite';
      icon.classList.add('fill');
    }
    if (textSpan) textSpan.textContent = 'Favoritado ♡';
  } else {
    btn.classList.remove('btn-primary-custom');
    btn.classList.add('btn-outline-custom');
    if (icon) {
      icon.textContent = 'favorite_border';
      icon.classList.remove('fill');
    }
    if (textSpan) textSpan.textContent = 'Adicionar aos Favoritos';
  }
}

/**
 * Barra de pesquisa e filtros por chip
 */
function initSearchAndFilters() {
  const clearBtn = document.getElementById('clear-search-btn');
  const searchInput = document.getElementById('main-search-input');
  const bookCards = document.querySelectorAll('.catalog-book-col');

  if (clearBtn && searchInput) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchInput.focus();
      filterCards('');
    });

    searchInput.addEventListener('input', (e) => {
      filterCards(e.target.value.toLowerCase().trim());
    });
  }

  // Filtros por chips
  const chips = document.querySelectorAll('.filter-chip');
  chips.forEach(chip => {
    chip.addEventListener('click', (e) => {
      e.preventDefault();
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filterCategory = chip.getAttribute('data-filter') || '';
      filterCardsByCategory(filterCategory);
    });
  });

  function filterCards(query) {
    let count = 0;
    bookCards.forEach(col => {
      const title = (col.getAttribute('data-title') || '').toLowerCase();
      const author = (col.getAttribute('data-author') || '').toLowerCase();
      const cat = (col.getAttribute('data-category') || '').toLowerCase();

      if (!query || title.includes(query) || author.includes(query) || cat.includes(query)) {
        col.style.display = '';
        count++;
      } else {
        col.style.display = 'none';
      }
    });

    const resultsCount = document.getElementById('results-count');
    if (resultsCount) resultsCount.textContent = count;
  }

  function filterCardsByCategory(category) {
    let count = 0;
    bookCards.forEach(col => {
      const cat = (col.getAttribute('data-category') || '').toLowerCase();
      if (!category || category === 'all' || cat.includes(category.toLowerCase())) {
        col.style.display = '';
        count++;
      } else {
        col.style.display = 'none';
      }
    });

    const resultsCount = document.getElementById('results-count');
    if (resultsCount) resultsCount.textContent = count;
  }
}

/**
 * Alternar visibilidade de senhas nas páginas de login e registro
 */
function initPasswordToggles() {
  document.querySelectorAll('.toggle-password-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetInputId = btn.getAttribute('data-target');
      const input = document.getElementById(targetInputId);
      const icon = btn.querySelector('.material-symbols-outlined');

      if (input) {
        if (input.type === 'password') {
          input.type = 'text';
          if (icon) icon.textContent = 'visibility_off';
        } else {
          input.type = 'password';
          if (icon) icon.textContent = 'visibility';
        }
      }
    });
  });
}

/**
 * Inicialização de tooltips do Bootstrap
 */
function initBootstrapComponents() {
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
}

