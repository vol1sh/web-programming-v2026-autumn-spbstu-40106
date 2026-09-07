import {Game} from './model.js';

const STORAGE_KEY = 'lab4_games_catalog';
const asyncDelay = (ms = 50) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const games = loadGames();

function loadGames() {
  const rawData = localStorage.getItem(STORAGE_KEY);
  if (!rawData) {
    return [
      new Game('The Witcher 3', ['PC', 'PS5', 'Xbox'], 2015),
      new Game('Half-Life 2', ['PC'], 2004),
    ];
  }
  try {
    const parsed = JSON.parse(rawData);
    return parsed.map(
      (item) => new Game(item.title, item.platforms, item.releaseYear),
    );
  } catch {
    return [];
  }
}

function saveGames() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(games));
}

function renderGames() {
  const container = document.querySelector('[data-testid="entity-list"]');
  if (!container) {
    return;
  }

  container.innerHTML = '';

  games.forEach((game, gameIndex) => {
    const card = document.createElement('article');
    card.className = 'entity-card';
    card.setAttribute('data-testid', 'entity-card');

    const header = document.createElement('div');
    header.className = 'card-header';

    const title = document.createElement('h3');
    title.className = 'card-title';
    title.textContent = game.title;

    const year = document.createElement('div');
    year.className = 'card-year';
    year.textContent = `Год выпуска: ${game.releaseYear}`;

    header.appendChild(title);
    header.appendChild(year);
    card.appendChild(header);

    const platformsSection = document.createElement('div');
    platformsSection.className = 'card-platforms';

    const platformsTitle = document.createElement('span');
    platformsTitle.className = 'platforms-title';
    platformsTitle.textContent = `Платформы (${game.platformCount}):`;
    platformsSection.appendChild(platformsTitle);

    const tagsContainer = document.createElement('div');
    tagsContainer.className = 'platforms-tags';

    game.platforms.forEach((platform) => {
      const tag = document.createElement('span');
      tag.className = 'platform-tag';
      tag.textContent = platform;

      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.className = 'btn-remove-platform';
      removeBtn.textContent = '×';
      removeBtn.title = 'Удалить платформу';
      removeBtn.addEventListener('click', async () => {
        await asyncDelay(50);
        game.removePlatform(platform);
        saveGames();
        renderGames();
      });

      tag.appendChild(removeBtn);
      tagsContainer.appendChild(tag);
    });

    platformsSection.appendChild(tagsContainer);

    const addPlatformForm = document.createElement('div');
    addPlatformForm.className = 'platform-add-form';

    const addPlatformInput = document.createElement('input');
    addPlatformInput.type = 'text';
    addPlatformInput.className = 'platform-add-input';
    addPlatformInput.placeholder = 'Новая платформа';

    const addPlatformBtn = document.createElement('button');
    addPlatformBtn.type = 'button';
    addPlatformBtn.className = 'btn btn-secondary';
    addPlatformBtn.textContent = '+';
    addPlatformBtn.addEventListener('click', async () => {
      const val = addPlatformInput.value.trim();
      if (val) {
        await asyncDelay(50);
        game.addPlatform(val);
        saveGames();
        renderGames();
      }
    });

    addPlatformForm.appendChild(addPlatformInput);
    addPlatformForm.appendChild(addPlatformBtn);
    platformsSection.appendChild(addPlatformForm);

    card.appendChild(platformsSection);

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'btn btn-danger';
    deleteBtn.setAttribute('data-testid', 'delete-entity');
    deleteBtn.textContent = 'Удалить игру';
    deleteBtn.addEventListener('click', async () => {
      await asyncDelay(50);
      games.splice(gameIndex, 1);
      saveGames();
      renderGames();
    });

    card.appendChild(deleteBtn);
    container.appendChild(card);
  });
}

const form = document.querySelector('form[data-testid="entity-form"]');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const title = formData.get('title');
    const releaseYear = formData.get('releaseYear');
    const platform = formData.get('platform');

    const platforms =
      platform && String(platform).trim() ? [String(platform).trim()] : [];
    const newGame = new Game(title, platforms, releaseYear);

    await asyncDelay(50);
    games.push(newGame);
    saveGames();
    renderGames();
    form.reset();
  });
}

renderGames();
