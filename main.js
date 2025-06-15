document.addEventListener("DOMContentLoaded", () => {

  // --- DICCIONARIO DE TRADUCCIONES ---
  const translations = {
    es: {
      sidebarTitle: "Modelos",
      searchPlaceholder: "Buscar modelo...",
      searchButton: "Buscar",
      aboutTitle: "Sobre Nosotros",
      aboutParagraph: "En Yuniel's Upholstery LLC, nos especializamos en tapicería para embarcaciones en Miami. Con más de 10 años de experiencia, ofrecemos restauración y personalización de interiores marinos con materiales de la más alta calidad.",
      servicesTitle: "Nuestros Servicios",
      service1: "✓ Tapicería para botes, yates y lanchas",
      service2: "✓ Reemplazo de cojines y asientos",
      service3: "✓ Costura personalizada y bordado",
      service4: "✓ Reparaciones de vinilo, lona y cuero marino",
      reviewsTitle: "Opiniones de Clientes",
      testimonial1: "\"Trabajo impecable en mi yate. El acabado es de lujo y entregado a tiempo. ¡Recomendado al 100%!\"",
      testimonial2: "\"Muy profesionales. El diseño personalizado superó mis expectativas.\"",
      contactTitle: "Contáctanos",
      formName: "Tu nombre",
      formEmail: "Tu correo electrónico",
      formMessage: "Tu mensaje...",
      formSend: "Enviar Mensaje",
      copyright: "© 2025 Yuniel'S Upholstery LLC. Todos los derechos reservados.",
      galleryEmpty: "No hay imágenes para este modelo.",
      lightboxCounter: (current, total) => `Imagen ${current} de ${total}`,
      lightboxPrev: "Anterior",
      lightboxNext: "Siguiente"
    },
    en: {
      sidebarTitle: "Models",
      searchPlaceholder: "Search model...",
      searchButton: "Search",
      aboutTitle: "About Us",
      aboutParagraph: "At Yuniel's Upholstery LLC, we specialize in boat upholstery in Miami. With over 10 years of experience, we offer restoration and customization of marine interiors with the highest quality materials.",
      servicesTitle: "Our Services",
      service1: "✓ Upholstery for boats, yachts, and launches",
      service2: "✓ Replacement of cushions and seats",
      service3: "✓ Custom stitching and embroidery",
      service4: "✓ Vinyl, canvas, and marine leather repairs",
      reviewsTitle: "Customer Reviews",
      testimonial1: "\"Impeccable work on my yacht. The finish is luxurious and delivered on time. 100% recommended!\"",
      testimonial2: "\"Very professional. The custom design exceeded my expectations.\"",
      contactTitle: "Contact Us",
      formName: "Your name",
      formEmail: "Your email address",
      formMessage: "Your message...",
      formSend: "Send Message",
      copyright: "© 2025 Yuniel'S Upholstery LLC. All rights reserved.",
      galleryEmpty: "No images found for this model.",
      lightboxCounter: (current, total) => `Image ${current} of ${total}`,
      lightboxPrev: "Previous",
      lightboxNext: "Next"
    },
    fr: {
      sidebarTitle: "Modèles",
      searchPlaceholder: "Rechercher un modèle...",
      searchButton: "Rechercher",
      aboutTitle: "À propos de nous",
      aboutParagraph: "Chez Yuniel's Upholstery LLC, nous sommes spécialisés dans la sellerie de bateaux à Miami. Avec plus de 10 ans d'expérience, nous offrons la restauration et la personnalisation d'intérieurs marins avec des matériaux de la plus haute qualité.",
      servicesTitle: "Nos Services",
      service1: "✓ Sellerie pour bateaux, yachts et vedettes",
      service2: "✓ Remplacement de coussins et de sièges",
      service3: "✓ Couture et broderie personnalisées",
      service4: "✓ Réparations de vinyle, toile et cuir marin",
      reviewsTitle: "Avis des clients",
      testimonial1: "\"Travail impeccable sur mon yacht. La finition est luxueuse et livrée à temps. Recommandé à 100%!\"",
      testimonial2: "\"Très professionnels. Le design personnalisé a dépassé mes attentes.\"",
      contactTitle: "Contactez-nous",
      formName: "Votre nom",
      formEmail: "Votre adresse e-mail",
      formMessage: "Votre message...",
      formSend: "Envoyer le message",
      copyright: "© 2025 Yuniel'S Upholstery LLC. Tous droits réservés.",
      galleryEmpty: "Aucune image trouvée pour ce modèle.",
      lightboxCounter: (current, total) => `Image ${current} sur ${total}`,
      lightboxPrev: "Précédent",
      lightboxNext: "Suivant"
    },
    pt: {
      sidebarTitle: "Modelos",
      searchPlaceholder: "Procurar modelo...",
      searchButton: "Procurar",
      aboutTitle: "Sobre Nós",
      aboutParagraph: "Na Yuniel's Upholstery LLC, especializamo-nos em estofamento de barcos em Miami. Com mais de 10 anos de experiência, oferecemos restauração e personalização de interiores marinhos com materiais da mais alta qualidade.",
      servicesTitle: "Nossos Serviços",
      service1: "✓ Estofamento para barcos, iates e lanchas",
      service2: "✓ Substituição de almofadas e assentos",
      service3: "✓ Costura e bordado personalizados",
      service4: "✓ Reparos de vinil, lona e couro marinho",
      reviewsTitle: "Opiniões de Clientes",
      testimonial1: "\"Trabalho impecável no meu iate. O acabamento é luxuoso e entregue no prazo. 100% recomendado!\"",
      testimonial2: "\"Muito profissionais. O design personalizado superou minhas expectativas.\"",
      contactTitle: "Contate-nos",
      formName: "Seu nome",
      formEmail: "Seu endereço de e-mail",
      formMessage: "Sua mensagem...",
      formSend: "Enviar Mensagem",
      copyright: "© 2025 Yuniel'S Upholstery LLC. Todos os direitos reservados.",
      galleryEmpty: "Nenhuma imagem encontrada para este modelo.",
      lightboxCounter: (current, total) => `Imagem ${current} de ${total}`,
      lightboxPrev: "Anterior",
      lightboxNext: "Próximo"
    },
    it: {
      sidebarTitle: "Modelli",
      searchPlaceholder: "Cerca modello...",
      searchButton: "Cerca",
      aboutTitle: "Chi Siamo",
      aboutParagraph: "Da Yuniel's Upholstery LLC, siamo specializzati in tappezzeria per barche a Miami. Con oltre 10 anni di esperienza, offriamo restauro e personalizzazione di interni marini con materiali di altissima qualità.",
      servicesTitle: "I Nostri Servizi",
      service1: "✓ Tappezzeria per barche, yacht e motoscafi",
      service2: "✓ Sostituzione di cuscini e sedili",
      service3: "✓ Cuciture e ricami personalizzati",
      service4: "✓ Riparazioni di vinile, tela e pelle marina",
      reviewsTitle: "Recensioni dei Clienti",
      testimonial1: "\"Lavoro impeccabile sul mio yacht. La finitura è lussuosa e consegnata in tempo. Raccomandato al 100%!\"",
      testimonial2: "\"Molto professionali. Il design personalizzato ha superato le mie aspettative.\"",
      contactTitle: "Contattaci",
      formName: "Il tuo nome",
      formEmail: "Il tuo indirizzo email",
      formMessage: "Il tuo messaggio...",
      formSend: "Invia Messaggio",
      copyright: "© 2025 Yuniel'S Upholstery LLC. Tutti i diritti riservati.",
      galleryEmpty: "Nessuna immagine trovata per questo modello.",
      lightboxCounter: (current, total) => `Immagine ${current} di ${total}`,
      lightboxPrev: "Precedente",
      lightboxNext: "Successivo"
    },
    de: {
      sidebarTitle: "Modelle",
      searchPlaceholder: "Modell suchen...",
      searchButton: "Suchen",
      aboutTitle: "Über Uns",
      aboutParagraph: "Bei Yuniel's Upholstery LLC sind wir auf Bootspolsterung in Miami spezialisiert. Mit über 10 Jahren Erfahrung bieten wir Restaurierung und Anpassung von Marine-Interieurs mit den hochwertigsten Materialien.",
      servicesTitle: "Unsere Dienstleistungen",
      service1: "✓ Polsterung für Boote, Yachten und Schnellboote",
      service2: "✓ Austausch von Kissen und Sitzen",
      service3: "✓ Maßgeschneiderte Näharbeiten und Stickereien",
      service4: "✓ Reparaturen von Vinyl, Segeltuch und Marineleder",
      reviewsTitle: "Kundenbewertungen",
      testimonial1: "\"Einwandfreie Arbeit an meiner Yacht. Das Finish ist luxuriös und pünktlich geliefert. 100% empfehlenswert!\"",
      testimonial2: "\"Sehr professionell. Das individuelle Design hat meine Erwartungen übertroffen.\"",
      contactTitle: "Kontaktieren Sie uns",
      formName: "Ihr Name",
      formEmail: "Deine E-Mail-Adresse",
      formMessage: "Ihre Nachricht...",
      formSend: "Nachricht senden",
      copyright: "© 2025 Yuniel'S Upholstery LLC. Alle Rechte vorbehalten.",
      galleryEmpty: "Keine Bilder für dieses Modell gefunden.",
      lightboxCounter: (current, total) => `Bild ${current} von ${total}`,
      lightboxPrev: "Bisherige",
      lightboxNext: "Nächste"
    }
  };

  const langSelect = document.getElementById("langSelect");
  let currentLang = 'es'; // Idioma por defecto

  // --- FUNCIÓN PARA CAMBIAR IDIOMA ---
  function setLanguage(lang) {
    if (!translations[lang]) return; // No hace nada si el idioma no existe
    currentLang = lang;
    document.body.setAttribute('data-lang', lang);
    localStorage.setItem('userLanguage', lang); // Guarda la preferencia del usuario

    document.querySelectorAll('[data-key]').forEach(element => {
      const key = element.dataset.key;
      const translation = translations[lang][key];

      if (translation) {
        if (typeof translation === 'function') {
          // No hacemos nada aquí, es para funciones especiales como el contador
        } else if (element.placeholder !== undefined) {
          element.placeholder = translation;
        } else if (element.title !== undefined && (element.classList.contains('lightbox-btn') || element.id === 'langSelect')) {
            element.title = translation;
        } else {
          element.innerHTML = translation;
        }
      }
    });
  }
  
  // --- LÓGICA DE LA PÁGINA ---

  // Menú lateral
  const sidebar = document.getElementById("sidebar");
  const menuBtn = document.getElementById("menuBtn");
  const closeSidebar = document.getElementById("closeSidebar");
  menuBtn.addEventListener("click", e => { e.stopPropagation(); sidebar.classList.add("open"); });
  closeSidebar.addEventListener("click", () => sidebar.classList.remove("open"));
  document.addEventListener("click", e => {
    if (sidebar.classList.contains("open") && !sidebar.contains(e.target) && e.target !== menuBtn) {
      sidebar.classList.remove("open");
    }
  });

  // Acordeones
  document.querySelectorAll(".accordion").forEach(btn => {
    btn.addEventListener("click", function() {
      this.classList.toggle("active");
      const panel = this.nextElementSibling;
      panel.classList.toggle("open");
      this.querySelector("span").textContent = panel.classList.contains("open") ? "▲" : "▼";
    });
  });

  // Galería y Búsqueda
  const galleryData = { "northtech": ["gallery/northtech/foto1.jpg"], "yellowfin42": ["gallery/yellowfin42/foto1.jpg"], "yellowfin36": [], "225 conquest": [], "360 outrage": [] };
  const suggestions = Object.keys(galleryData);
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
  
  // Lightbox
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
    // Usamos la función de traducción para el contador
    lightboxCounter.textContent = translations[currentLang].lightboxCounter(currentIndex + 1, currentImages.length);
  }

  function closeLightbox() { lightbox.classList.remove("open"); }
  document.getElementById("lightboxClose").onclick = closeLightbox;
  document.getElementById("lightboxPrev").onclick = () => { currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length; showLightbox(); };
  document.getElementById("lightboxNext").onclick = () => { currentIndex = (currentIndex + 1) % currentImages.length; showLightbox(); };
  lightbox.onclick = e => { if (e.target === lightbox) closeLightbox(); };
  document.addEventListener("keydown", e => { if (e.key === "Escape" && lightbox.classList.contains("open")) closeLightbox(); });

  // --- INICIALIZACIÓN DE IDIOMA ---
  langSelect.addEventListener("change", (e) => setLanguage(e.target.value));

  // Comprueba si el usuario ya tiene un idioma guardado
  const savedLang = localStorage.getItem('userLanguage');
  // O detecta el idioma del navegador
  const browserLang = navigator.language.split('-')[0];

  // Establece el idioma final (guardado > navegador > por defecto 'es')
  const initialLang = savedLang || (translations[browserLang] ? browserLang : 'es');
  langSelect.value = initialLang;
  setLanguage(initialLang);
});
