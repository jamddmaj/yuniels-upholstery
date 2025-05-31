// Menú hamburguesa y sidebar
const sidebar = document.getElementById("sidebar");
const menuBtn = document.getElementById("menuBtn");
const closeSidebar = document.getElementById("closeSidebar");

menuBtn.onclick = e => { e.stopPropagation(); sidebar.classList.add("open"); };
closeSidebar.onclick = () => sidebar.classList.remove("open");
document.addEventListener("click", e => {
  if (sidebar.classList.contains('open') &&
    !sidebar.contains(e.target) && e.target !== menuBtn && !menuBtn.contains(e.target)) {
    sidebar.classList.remove("open");
  }
});

// Acordeón
document.querySelectorAll(".accordion").forEach(btn => {
  btn.onclick = function () {
    this.classList.toggle("active");
    let panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
      this.querySelector("span").textContent = "▼";
    } else {
      panel.style.display = "block";
      this.querySelector("span").textContent = "▲";
    }
  };
});

// Traducción dinámica
const langSelect = document.getElementById('langSelect');
const searchInput = document.getElementById('searchInput');

const translations = {
  es: {
    placeholder: "Buscar modelo...",
    services: "Nuestros Servicios",
    reviews: "Opiniones de Clientes",
    contact: "Contáctanos",
    location: "Nuestra Ubicación",
    name: "Tu nombre",
    email: "Tu correo electrónico",
    message: "Tu mensaje...",
    send: "Enviar"
  },
  en: {
    placeholder: "Search model...",
    services: "Our Services",
    reviews: "Client Testimonials",
    contact: "Contact Us",
    location: "Our Location",
    name: "Your name",
    email: "Your email",
    message: "Your message...",
    send: "Send"
  },
  pt: {
    placeholder: "Procurar modelo...",
    services: "Nossos Serviços",
    reviews: "Depoimentos de Clientes",
    contact: "Contate-nos",
    location: "Nossa Localização",
    name: "Seu nome",
    email: "Seu email",
    message: "Sua mensagem...",
    send: "Enviar"
  },
  fr: {
    placeholder: "Rechercher un modèle...",
    services: "Nos Services",
    reviews: "Avis des Clients",
    contact: "Contactez-nous",
    location: "Notre Emplacement",
    name: "Votre nom",
    email: "Votre e-mail",
    message: "Votre message...",
    send: "Envoyer"
  },
  de: {
    placeholder: "Modell suchen...",
    services: "Unsere Dienstleistungen",
    reviews: "Kundenmeinungen",
    contact: "Kontaktieren Sie uns",
    location: "Unser Standort",
    name: "Ihr Name",
    email: "Ihre E-Mail",
    message: "Ihre Nachricht...",
    send: "Senden"
  }
};

if (langSelect) {
  langSelect.onchange = () => {
    const lang = langSelect.value;
    const t = translations[lang] || translations["es"];
    if (searchInput) searchInput.placeholder = t.placeholder;

    const elements = document.querySelectorAll("[data-key]");
    elements.forEach(el => {
      const key = el.getAttribute("data-key");
      if (t[key]) el.textContent = t[key];
    });

    const inputMap = {
      name: "name",
      email: "email",
      message: "message"
    };
    Object.keys(inputMap).forEach(name => {
      const input = document.querySelector(`[name='${name}']`);
      if (input && t[name]) input.placeholder = t[name];
    });

    const btn = document.querySelector("button[type='submit']");
    if (btn && t.send) btn.textContent = t.send;
  };
}