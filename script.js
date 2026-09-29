const seasonData = {
  2024: [
    ['.284', 'AVG'], ['18', 'HR'], ['61', 'RBI'], ['.862', 'OPS']
  ],
  2023: [
    ['.271', 'AVG'], ['14', 'HR'], ['48', 'RBI'], ['.817', 'OPS']
  ],
  2022: [
    ['.259', 'AVG'], ['9', 'HR'], ['36', 'RBI'], ['.763', 'OPS']
  ]
};

const statsGrid = document.querySelector('#statsGrid');
const seasonSelect = document.querySelector('#seasonSelect');
const seasonLabel = document.querySelector('#seasonLabel');
const favoriteButton = document.querySelector('#favoriteButton');
const toast = document.querySelector('#toast');

function renderStats(year) {
  statsGrid.innerHTML = seasonData[year].map(([value, label]) => `
    <div class="stat"><span class="stat-value">${value}</span><span class="stat-label">${label}</span></div>
  `).join('');
  seasonLabel.textContent = `${year} regular season`;
}

seasonSelect.addEventListener('change', (event) => renderStats(event.target.value));

favoriteButton.addEventListener('click', () => {
  const active = favoriteButton.classList.toggle('active');
  favoriteButton.textContent = active ? '♥' : '♡';
  favoriteButton.setAttribute('aria-pressed', active);
  favoriteButton.setAttribute('aria-label', active ? 'Remove Mateo Reyes from favorites' : 'Add Mateo Reyes to favorites');
  showToast(active ? 'Added to your favorites' : 'Removed from favorites');
});

document.querySelector('#shareButton').addEventListener('click', async () => {
  const shareData = { title: 'Mateo Reyes — Player Card', text: 'Meet Mateo Reyes of the Harbor City Hawks.', url: window.location.href };
  try {
    if (navigator.share) await navigator.share(shareData);
    else { await navigator.clipboard.writeText(window.location.href); showToast('Profile link copied!'); }
  } catch (error) { if (error.name !== 'AbortError') showToast('Unable to share right now'); }
});

document.querySelector('#themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

renderStats('2024');
