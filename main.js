document.addEventListener("DOMContentLoaded", () => {

  // === Menú lateral ===
  const sidebar = document.getElementById("sidebar");
  const menuBtn = document.getElementById("menuBtn");
  const closeSidebar = document.getElementById("closeSidebar");

  menuBtn.addEventListener("click", e => {
    e.stopPropagation();
    sidebar.classList.add("open");
  });

  closeSidebar.addEventListener("click", () => sidebar.classList.remove("open"));

  document.addEventListener("click", e => {
    if (sidebar.classList.contains("open") && !sidebar.contains(e.target) && e.target !== menuBtn) {
      sidebar.classList.remove("open");
    }
  });

  // === Acordeones con animación CSS ===
  document.querySelectorAll(".accordion").forEach(btn => {
    btn.addEventListener("click", function() {
      this.classList.toggle("active");
      const panel = this.nextElementSibling;
      const arrow = this.querySelector("span");

      panel.classList.toggle("open"); // Solo cambiamos la clase para que CSS haga la animación

      const isOpen = panel.classList.contains("open");
      arrow.textContent = isOpen ? "▲" : "▼";
    });
  });

  // === Galería de imágenes ===
  const galleryData = {
    "northtech": ["gallery/northtech/foto1.jpg", "gallery/northtech/foto2.jpg", "gallery/northtech/foto3.jpg", "gallery/northtech/foto4.jpg", "gallery/northtech/foto5.jpg", "gallery/northtech/foto6.jpg", "gallery/northtech/foto7.jpg", "gallery/northtech/foto8.jpg", "gallery/northtech/foto9.jpg", "gallery/northtech/foto10.jpg"],
    "northtech 38": ["gallery/northtech/foto1.jpg", "gallery/northtech/foto2.jpg", "gallery/northtech/foto3.jpg"],
    "northtech 45": ["gallery/northtech/foto4.jpg", "gallery/northtech/foto5.jpg"],
    "yellowfin42": ["gallery/yellowfin42/foto1.jpg", "gallery/yellowfin42/foto2.jpg", "gallery/yellowfin42/foto3.jpg", "gallery/yellowfin42/foto4.jpg", "gallery/yellowfin42/foto5.jpg"],
    "yellowfin 36": [],
    "225 conquest": [],
    "360 outrage": []
  };

  const suggestions = Object.keys(galleryData);
  let searchHistory = [];
  const galleryEl = document.getElementById("gallery");
  const searchInput = document.getElementById("searchInput");
  const suggestionsBox = document.getElementById("suggestions");
  
  let currentImages = [];
  let currentModel = "";

  // Renderizar galería con 'alt' tags descriptivos
  function renderGallery(images, modelName) {
    galleryEl.innerHTML = "";
    if (!images || !images.length) {
      galleryEl.innerHTML = '<div class="gallery-empty">No hay imágenes para este modelo.</div>';
      return;
    }
    images.forEach((src, i) => {
      const imgContainer = document.createElement("div");
      const el = document.createElement("img");
      el.src = src;
      el.className = "gallery-img";
      // ACCESIBILIDAD: 'alt' tag mejorado
      el.alt = `Tapicería para ${modelName}, imagen ${i + 1}`;
      el.loading = "lazy";
      el.onclick = () => openLightbox(i);
      galleryEl.appendChild(el);
    });
  }

  window.buscar = function(modelo) {
    modelo = (modelo || searchInput.value.trim()).toLowerCase();
    if (!modelo) return;

    currentModel = modelo;
    currentImages = galleryData[modelo] || [];

    if (currentImages.length > 0 && !searchHistory.includes(modelo)) {
      searchHistory.unshift(modelo);
      if(searchHistory.length > 5) searchHistory.pop(); // Limita el historial
    }
    
    renderGallery(currentImages, currentModel);
    suggestionsBox.style.display = "none";
    searchInput.value = currentModel;
    sidebar.classList.remove("open"); // Cierra el menú al seleccionar un modelo
  }

  // === Sugerencias y búsqueda ===
  searchInput.addEventListener("input", function() {
    const val = this.value.trim().toLowerCase();
    if (!val) {
      suggestionsBox.style.display = "none";
      return;
    }
    let matches = suggestions.concat(searchHistory).filter(item => item.toLowerCase().includes(val));
    matches = [...new Set(matches)]; // Elimina duplicados
    
    if (!matches.length) {
      suggestionsBox.style.display = "none";
      return;
    }

    suggestionsBox.innerHTML = matches.map(m => `<div class="suggestion-item">${m}</div>`).join("");
    suggestionsBox.style.display = "block";
    
    document.querySelectorAll(".suggestion-item").forEach(item => {
      item.onclick = () => {
        searchInput.value = item.textContent;
        buscar();
      };
    });
  });

  document.addEventListener("click", function(e) {
    if (!suggestionsBox.contains(e.target) && e.target !== searchInput) {
      suggestionsBox.style.display = "none";
    }
  });

  document.getElementById("searchForm").onsubmit = function(e) {
    e.preventDefault();
    buscar();
  };
  
  // === Lightbox ===
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCounter = document.getElementById("lightboxCounter");
  let currentIndex = 0;

  function openLightbox(i) {
    currentIndex = i;
    showLightbox();
  }

  function showLightbox() {
    if (!currentImages.length) return;
    lightboxImg.src = currentImages[currentIndex];
    lightbox.classList.add("open");
    lightboxCounter.textContent = `Imagen ${currentIndex + 1} de ${currentImages.length}`;
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
  }

  document.getElementById("lightboxClose").onclick = closeLightbox;

  document.getElementById("lightboxPrev").onclick = function() {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    showLightbox();
  };

  document.getElementById("lightboxNext").onclick = function() {
    currentIndex = (currentIndex + 1) % currentImages.length;
    showLightbox();
  };
  
  // Cerrar lightbox con click afuera o tecla Escape
  lightbox.onclick = function(e) {
    if (e.target === this) closeLightbox();
  };
  
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lightbox.classList.contains("open")) {
      closeLightbox();
    }
  });
  
  // === Idiomas (Placeholder) ===
  document.getElementById("langSelect").onchange = function() {
    const lang = this.value;
    searchInput.placeholder = lang === "en" ? "Search model..." : "Buscar modelo...";
  };

});
