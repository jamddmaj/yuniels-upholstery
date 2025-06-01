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
  if (
    sidebar.classList.contains("open") &&
    !sidebar.contains(e.target) &&
    e.target !== menuBtn &&
    !menuBtn.contains(e.target)
  ) {
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
    "gallery/northtech/IMG-20250226-WA0027.jpg"
  ],
  yellowfin42: ["gallery/yellowfin42/IMG20250403123239.jpg"],
  yellowfin36: [],
  "225 conquest": [],
  "360 outrage": []
};

let suggestions = Object.keys(galleryData);
let searchHistory = [];
const galleryEl = document.getElementById("gallery");
let currentImages = [],
  currentModel = "";

// Renderizar galería
function renderGallery(images) {
  galleryEl.innerHTML = "";
  if (!images.length) {
    galleryEl.innerHTML =
      '<div style="color:#b6eaff; padding: 22px;">No hay imágenes para este modelo.</div>';
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
  if (!val) return (suggestionsBox.style.display = "none");
  let matches = suggestions.concat(searchHistory).filter(item => item.includes(val));
  matches = [...new Set(matches)];
  if (!matches.length) return (suggestionsBox.style.display = "none");
  suggestionsBox.innerHTML = matches
    .map(m => `<div class="suggestion-item">${m}</div>`)
    .join("");
  suggestionsBox.style.display = "block";
  document.querySelectorAll(".suggestion-item").forEach(item => {
    item.onclick = () => {
      searchInput.value = item.textContent;
      suggestionsBox.style.display = "none";
      buscar(item.textContent);
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

// === Traducción multi-idioma ===
const langSelect = document.getElementById("langSelect");

const translations = {
  es: {
    title: "Yuniel'S Upholstery LLC",
    models: "Modelos",
    search: "Buscar",
    aboutUs: "Sobre Nosotros",
    aboutText:
      "En Yuniel's Upholstery LLC, nos especializamos en tapicería para embarcaciones en Miami. Con más de 10 años de experiencia, ofrecemos restauración y personalización de interiores marinos con materiales de la más alta calidad.",
    services: "Nuestros Servicios",
    service1: "✓ Tapicería para botes, yates y lanchas",
    service2: "✓ Reemplazo de cojines y asientos",
    service3: "✓ Costura personalizada y bordado",
    service4: "✓ Reparaciones de vinilo, lona y cuero marino",
    reviews: "Opiniones de Clientes",
    review1:
      '"Trabajo impecable en mi yate. El acabado es de lujo y entregado a tiempo. Recomendado al 100%!" – Carlos R.',
    review2:
      '"Muy profesionales. El diseño personalizado superó mis expectativas." – Andrea M.',
    contact: "Contáctanos",
    name: "Tu nombre",
    email: "Tu correo electrónico",
    message: "Tu mensaje...",
    send: "Enviar"
  },
  en: {
    title: "Yuniel'S Upholstery LLC",
    models: "Models",
    search: "Search",
    aboutUs: "About Us",
    aboutText:
      "At Yuniel's Upholstery LLC, we specialize in marine upholstery in Miami. With over 10 years of experience, we offer restoration and customization of marine interiors with high-quality materials.",
    services: "Our Services",
    service1: "✓ Upholstery for boats, yachts, and launches",
    service2: "✓ Cushion and seat replacement",
    service3: "✓ Custom sewing and embroidery",
    service4: "✓ Vinyl, canvas, and marine leather repairs",
    reviews: "Client Testimonials",
    review1:
      '"Impeccable work on my yacht. The finish is luxurious and delivered on time. Highly recommended!" – Carlos R.',
    review2:
      '"Very professional. The custom design exceeded my expectations." – Andrea M.',
    contact: "Contact Us",
    name: "Your name",
    email: "Your email",
    message: "Your message...",
    send: "Send"
  },
  // Puedes agregar más idiomas aquí de forma similar
};

function applyLanguage(lang)
