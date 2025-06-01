// === Menú lateral ===
const sidebar = document.getElementById("sidebar");
const menuBtn = document.getElementById("menuBtn");
const closeSidebar = document.getElementById("closeSidebar");

menuBtn.onclick = e => {
  e.stopPropagation();
  sidebar.classList.add("open");
};

closeSidebar.onclick = () => sidebar.classList.remove("open");

document.addEventListener("click", e => {
  if (sidebar.classList.contains("open") &&
      !sidebar.contains(e.target) &&
      e.target !== menuBtn &&
      !menuBtn.contains(e.target)) {
    sidebar.classList.remove("open");
  }
});

// === Acordeones ===
document.querySelectorAll(".accordion").forEach(btn => {
  btn.onclick = function () {
    this.classList.toggle("active");
    const panel = this.nextElementSibling;
    const arrow = this.querySelector("span");
    const isOpen = panel.style.display === "block";
    panel.style.display = isOpen ? "none" : "block";
    arrow.textContent = isOpen ? "▼" : "▲";
  };
});

// === Galería de imágenes ===
const galleryData = {
  northtech: [
    "gallery/northtech/IMG-20250226-WA0023.jpg",
    "gallery/northtech/IMG-20250226-WA0024.jpg",
    "gallery/northtech/IMG-20250226-WA0026.jpg",
    "gallery/northtech/IMG-20250226-WA0027.jpg",
    "gallery/northtech/foto1.jpg",
    "gallery/northtech/foto2.jpg"
  ],
  yellowfin42: [
    "gallery/yellowfin42/foto3.png.jpg"
  ],
  yellowfin36: []
};

let suggestions = Object.keys(galleryData);
let searchHistory = [];
const galleryEl = document.getElementById("gallery");
let currentImages = [], currentModel = "";

// Renderizar galería
function renderGallery(images) {
  galleryEl.innerHTML = "";
  if (!images.length) {
    galleryEl.innerHTML = '<div style="color:#b6eaff; padding: 22px;">No hay imágenes para este modelo.</div>';
    return;
  }
  images.forEach((src, i) => {
    const el = document.createElement("img");
    el.src = src;
    el.className = "gallery-img";
    el.alt = "Foto " + (i + 1);
    el.loading = "lazy";
    el.onclick = () => openLightbox(i);
    galleryEl.appendChild(el);
  });
}

// === Sugerencias y búsqueda ===
const searchInput = document.getElementById("searchInput");
const suggestionsBox = document.getElementById("suggestions");

searchInput.addEventListener("input", function () {
  const val = this.value.trim().toLowerCase();
  if (!val) return suggestionsBox.style.display = "none";
  let matches = suggestions.concat(searchHistory).filter(item => item.includes(val));
  matches = [...new Set(matches)];
  if (!matches.length) return suggestionsBox.style.display = "none";
  suggestionsBox.innerHTML = matches.map(m => `<div class="suggestion-item">${m}</div>`).join("");
  suggestionsBox.style.display = "block";
  document.querySelectorAll(".suggestion-item").forEach(item => {
    item.onclick = () => {
      searchInput.value = item.textContent;
      suggestionsBox.style.display = "none";
    };
  });
});

document.addEventListener("click", function (e) {
  if (!suggestionsBox.contains(e.target) && e.target !== searchInput) {
    suggestionsBox.style.display = "none";
  }
});

function buscar(modelo) {
  modelo = (modelo || searchInput.value.trim()).toLowerCase();
  if (!modelo) return;
  currentModel = modelo;
  currentImages = galleryData[modelo] || [];
  if (currentImages.length && !searchHistory.includes(modelo)) {
    searchHistory.unshift(modelo);
  }
  renderGallery(currentImages);
  suggestionsBox.style.display = "none";
  searchInput.value = modelo;
}

document.getElementById("searchForm").onsubmit = function (e) {
  e.preventDefault();
  buscar();
};

searchInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    buscar();
  }
});

// === Lightbox ===
let currentIndex = 0;

function openLightbox(i) {
  currentIndex = i;
  showLightbox();
}

function showLightbox() {
  if (!currentImages.length) return;
  document.getElementById("lightboxImg").src = currentImages[currentIndex];
  document.getElementById("lightbox").classList.add("open");
  document.getElementById("lightboxCounter").textContent =
    "Imagen " + (currentIndex + 1) + " de " + currentImages.length;
}

function closeLightbox() {
  document.getElementById("lightbox").classList.remove("open");
}

document.getElementById("lightboxClose").onclick = closeLightbox;

document.getElementById("lightboxPrev").onclick = function () {
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  showLightbox();
};

document.getElementById("lightboxNext").onclick = function () {
  currentIndex = (currentIndex + 1) % currentImages.length;
  showLightbox();
};

document.getElementById("lightbox").onclick = function (e) {
  if (e.target === this) closeLightbox();
};

// === Idiomas ===
document.getElementById("langSelect").onchange = function () {
  const val = this.value;
  if (val === "en") searchInput.placeholder = "Search model...";
  else if (val === "pt") searchInput.placeholder = "Buscar modelo...";
  else searchInput.placeholder = "Buscar modelo...";
};
