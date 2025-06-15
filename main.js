document.addEventListener("DOMContentLoaded", async () => {

  const translations = {
    es: {
      sidebarTitle: "Modelos", searchPlaceholder: "Buscar modelo...", searchButton: "Buscar", aboutTitle: "Sobre Nosotros",
      aboutParagraph: "En Yuniel's Upholstery LLC, nos especializamos en tapicería para embarcaciones en Miami. Con más de 10 años de experiencia, ofrecemos restauración y personalización de interiores marinos con materiales de la más alta calidad.",
      servicesTitle: "Nuestros Servicios", service1: "✓ Tapicería para botes, yates y lanchas", service2: "✓ Reemplazo de cojines y asientos", service3: "✓ Costura personalizada y bordado", service4: "✓ Reparaciones de vinilo, lona y cuero marino",
      reviewsTitle: "Opiniones de Clientes", testimonial1: "\"Trabajo impecable en mi yate. El acabado es de lujo y entregado a tiempo. ¡Recomendado al 100%!\"", testimonial2: "\"Muy profesionales. El diseño personalizado superó mis expectativas.\"",
      contactTitle: "Contáctanos", formName: "Tu nombre", formEmail: "Tu correo electrónico", formMessage: "Tu mensaje...", formSend: "Enviar Mensaje",
      copyright: "© 2025 Yuniel'S Upholstery LLC. Todos los derechos reservados.", galleryEmpty: "No hay imágenes para este modelo.", lightboxCounter: (c, t) => `Imagen ${c} de ${t}`, lightboxPrev: "Anterior", lightboxNext: "Siguiente"
    },
    en: {
      sidebarTitle: "Models", searchPlaceholder: "Search model...", searchButton: "Search", aboutTitle: "About Us",
      aboutParagraph: "At Yuniel's Upholstery LLC, we specialize in boat upholstery in Miami. With over 10 years of experience, we offer restoration and customization of marine interiors with the highest quality materials.",
      servicesTitle: "Our Services", service1: "✓ Upholstery for boats, yachts, and launches", service2: "✓ Replacement of cushions and seats", service3: "✓ Custom stitching and embroidery", service4: "✓ Vinyl, canvas, and marine leather repairs",
      reviewsTitle: "Customer Reviews", testimonial1: "\"Impeccable work on my yacht. The finish is luxurious and delivered on time. 100% recommended!\"", testimonial2: "\"Very professional. The custom design exceeded my expectations.\"",
      contactTitle: "Contact Us", formName: "Your name", formEmail: "Your email address", formMessage: "Your message...", formSend: "Send Message",
      copyright: "© 2025 Yuniel'S Upholstery LLC. All rights reserved.", galleryEmpty: "No images found for this model.", lightboxCounter: (c, t) => `Image ${c} of ${t}`, lightboxPrev: "Previous", lightboxNext: "Next"
    },
    // Añade aquí más traducciones (fr, pt, it, de) si lo deseas.
  };

  let currentLang = 'es';
  const langSelect = document.getElementById("langSelect");

  function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    document.body.setAttribute('data-lang', lang);
    localStorage.setItem('userLanguage', lang);
    document.querySelectorAll('[data-key]').forEach(el => {
      const key = el.dataset.key;
      const translation = translations[lang][key];
      if (translation && typeof translation !== 'function') {
        if (el.placeholder !== undefined) el.placeholder = translation;
        else el.innerHTML = translation;
      }
    });
  }

  let galleryData = {};
  const sidebar = document.getElementById("sidebar");
  const sidebarModelsContainer = document.getElementById("sidebar-models");

  async function loadGalleryData() {
    try {
      // Esta es una forma de obtener una lista de archivos de un directorio si tu hosting lo permite.
      // Para GitHub Pages/Netlify, necesitamos una lista manual o un archivo de índice.
      const manifest = ['northtech.json', 'yellowfin42.json']; // Lista manual de modelos
      const data = {};
      const modelsForSidebar = [];

      for (const fileName of manifest) {
        const response = await fetch(`src/gallery/${fileName}?v=${new Date().getTime()}`); // Cache-busting
        if (!response.ok) continue;
        const modelData = await response.json();
        data[modelData.id] = modelData.images;
        modelsForSidebar.push({ id: modelData.id, title: modelData.title });
      }
      
      galleryData = data;
      updateSidebar(modelsForSidebar);
    } catch (error) {
      console.error("No se pudieron cargar los datos de la galería:", error);
    }
  }
  
  function updateSidebar(models) {
    sidebarModelsContainer.innerHTML = ''; // Limpia el menú
    models.forEach(model => {
      const modelButton = document.createElement('a');
      modelButton.href = '#';
      modelButton.textContent = model.title;
      modelButton.className = 'sidebar-model-link';
      modelButton.onclick = (e) => {
        e.preventDefault();
        window.buscar(model.id);
      };
      sidebarModelsContainer.appendChild(modelButton);
    });
  }

  // Lógica de UI (Menú, Lightbox, etc.)
  const menuBtn = document.getElementById("menuBtn");
  const closeSidebar = document.getElementById("closeSidebar");
  menuBtn.addEventListener("click", e => { e.stopPropagation(); sidebar.classList.add("open"); });
  closeSidebar.addEventListener("click", () => sidebar.classList.remove("open"));
  document.addEventListener("click", e => {
    if (sidebar.classList.contains("open") && !sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
      sidebar.classList.remove("open");
    }
  });

  const galleryEl = document.getElementById("gallery");
  const searchInput = document.getElementById("searchInput");

  function renderGallery(images, modelName) {
    galleryEl.innerHTML = "";
    if (!images || !images.length) {
      galleryEl.innerHTML = `<div class="gallery-empty">${translations[currentLang].galleryEmpty}</div>`;
      return;
    }
    images.forEach((src, i) => {
      const el = document.createElement("img");
      el.src = src;
      el.className = "gallery-img";
      el.alt = `Tapicería para ${modelName}, imagen ${i + 1}`;
      el.loading = "lazy";
      el.onclick = () => openLightbox(i, images);
      galleryEl.appendChild(el);
    });
  }

  window.buscar = function(modelo) {
    const searchTerm = (modelo || searchInput.value.trim()).toLowerCase();
    if (!searchTerm) return;
    const images = galleryData[searchTerm] || [];
    renderGallery(images, searchTerm);
    searchInput.value = searchTerm;
    sidebar.classList.remove("open");
  };

  document.getElementById("searchForm").onsubmit = e => { e.preventDefault(); window.buscar(); };
  
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCounter = document.getElementById("lightboxCounter");
  let currentImages = [];
  let currentIndex = 0;

  function openLightbox(i, images) {
    currentImages = images;
    currentIndex = i;
    showLightbox();
  }

  function showLightbox() {
    if (!currentImages.length) return;
    lightboxImg.src = currentImages[currentIndex];
    lightbox.classList.add("open");
    lightboxCounter.textContent = translations[currentLang].lightboxCounter(currentIndex + 1, currentImages.length);
  }

  function closeLightbox() { lightbox.classList.remove("open"); }
  document.getElementById("lightboxClose").onclick = closeLightbox;
  document.getElementById("lightboxPrev").onclick = () => { currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length; showLightbox(); };
  document.getElementById("lightboxNext").onclick = () => { currentIndex = (currentIndex + 1) % currentImages.length; showLightbox(); };
  lightbox.onclick = e => { if (e.target === lightbox) closeLightbox(); };
  document.addEventListener("keydown", e => { if (e.key === "Escape" && lightbox.classList.contains("open")) closeLightbox(); });

  // INICIALIZACIÓN
  await loadGalleryData();
  
  const savedLang = localStorage.getItem('userLanguage');
  const browserLang = navigator.language.split('-')[0];
  const initialLang = savedLang || (translations[browserLang] ? browserLang : 'es');
  langSelect.value = initialLang;
  setLanguage(initialLang);
});
