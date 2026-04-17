// app.js - lógica principal de DevJobs
// no es el código más limpio pero funciona
// TODO: agregar paginación en algún momento

let allJobs = [];
let activeFilter = 'all';
let searchQuery = '';

const grid = document.getElementById('jobsGrid');
const searchInput = document.getElementById('searchInput');
const resultsCount = document.getElementById('resultsCount');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalContent = document.getElementById('modalContent');

// cargar los trabajos desde el json
async function loadJobs() {
  try {
    const res = await fetch('data/jobs.json');
    allJobs = await res.json();
    renderJobs(allJobs);
  } catch (err) {
    console.error('error al cargar los trabajos:', err);
    grid.innerHTML = '<p class="empty-state">// error cargando los trabajos. revisar la consola.</p>';
  }
}

// filtrar + buscar
function getFilteredJobs() {
  return allJobs.filter(job => {
    const matchesFilter = activeFilter === 'all' || job.category === activeFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      job.title.toLowerCase().includes(q) ||
      job.company.toLowerCase().includes(q) ||
      job.tags.some(tag => tag.toLowerCase().includes(q));
    return matchesFilter && matchesSearch;
  });
}

function renderJobs(jobs) {
  if (jobs.length === 0) {
    grid.innerHTML = '<p class="empty-state">// ningún trabajo encontrado. intenta otra búsqueda.</p>';
    resultsCount.textContent = '0 resultados';
    return;
  }

  resultsCount.textContent = `${jobs.length} trabajo${jobs.length !== 1 ? 's' : ''} encontrado${jobs.length !== 1 ? 's' : ''}`;

  grid.innerHTML = jobs.map((job, i) => `
    <div
      class="job-card"
      data-id="${job.id}"
      style="animation-delay: ${i * 0.05}s"
    >
      <div class="card-top">
        <h3 class="job-title">${job.title}</h3>
        <span class="job-badge badge-${job.category}">${job.category}</span>
      </div>

      <p class="job-company">${job.company}</p>

      <div class="card-meta">
        <span class="meta-item">📍 <span>${job.location}</span></span>
        <span class="meta-item">💼 <span class="modality-${job.modality}">${job.modality}</span></span>
      </div>

      <div class="card-tags">
        ${job.tags.slice(0, 4).map(t => `<span class="tech-tag">${t}</span>`).join('')}
        ${job.tags.length > 4 ? `<span class="tech-tag">+${job.tags.length - 4}</span>` : ''}
      </div>

      <p class="card-salary">${job.salary}</p>
    </div>
  `).join('');

  // agregar eventos de click después de renderizar
  document.querySelectorAll('.job-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = parseInt(card.dataset.id);
      openModal(id);
    });
  });
}

// modal de detalle
function openModal(id) {
  const job = allJobs.find(j => j.id === id);
  if (!job) return;

  modalContent.innerHTML = `
    <h2 class="modal-title">${job.title}</h2>
    <p class="modal-company">${job.company}</p>

    <div class="modal-meta-row">
      <div class="modal-meta-item">
        <strong>Ubicación</strong>
        ${job.location}
      </div>
      <div class="modal-meta-item">
        <strong>Modalidad</strong>
        ${job.modality}
      </div>
      <div class="modal-meta-item">
        <strong>Salario</strong>
        ${job.salary}
      </div>
      <div class="modal-meta-item">
        <strong>Categoría</strong>
        ${job.category}
      </div>
    </div>

    <div class="modal-section">
      <h4>Sobre el rol</h4>
      <p>${job.description}</p>
    </div>

    <div class="modal-section">
      <h4>Stack tecnológico</h4>
      <div class="modal-tags">
        ${job.tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}
      </div>
    </div>

    <button class="modal-apply-btn" onclick="alert('Función de aplicar próximamente!')">
      Aplicar ahora →
    </button>
  `;

  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

// eventos del DOM
searchInput.addEventListener('input', e => {
  searchQuery = e.target.value;
  renderJobs(getFilteredJobs());
});

document.getElementById('filterButtons').addEventListener('click', e => {
  if (!e.target.classList.contains('filter-btn')) return;

  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  e.target.classList.add('active');

  activeFilter = e.target.dataset.filter;
  renderJobs(getFilteredJobs());
});

modalClose.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', e => {
  // cerrar si se hace click fuera del modal
  if (e.target === modalOverlay) closeModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// arrancar la app
loadJobs();
