const searchInput = document.getElementById('searchInput');
const langSelect = document.getElementById('langSelect');

// Elementos que vamos a traducir
const labels = {
  titleServicios: document.querySelector("h2[data-key='services']"),
  titleOpiniones: document.querySelector("h2[data-key='reviews']"),
  titleContacto: document.querySelector("h2[data-key='contact']"),
  titleUbicacion: document.querySelector("h2[data-key='location']"),
  labelNombre: document.querySelector("input[name='name']"),
  labelCorreo: document.querySelector("input[name='email']"),
  labelMensaje: document.querySelector("textarea[name='message']"),
  btnEnviar: document.querySelector("button[type='submit']")
};

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
    searchInput.placeholder = t.placeholder;

    if (labels.titleServicios) labels.titleServicios.textContent = t.services;
    if (labels.titleOpiniones) labels.titleOpiniones.textContent = t.reviews;
    if (labels.titleContacto) labels.titleContacto.textContent = t.contact;
    if (labels.titleUbicacion) labels.titleUbicacion.textContent = t.location;
    if (labels.labelNombre) labels.labelNombre.placeholder = t.name;
    if (labels.labelCorreo) labels.labelCorreo.placeholder = t.email;
    if (labels.labelMensaje) labels.labelMensaje.placeholder = t.message;
    if (labels.btnEnviar) labels.btnEnviar.textContent = t.send;
  };
}