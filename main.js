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
    "gallery/northtech/IMG-20250226-WA0027.jpg"
  ],
  yellowfin42: [
    "gallery/yellowfin42/IMG20250403123239.jpg"
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
  es: { placeholder: "Buscar modelo...", services: "Nuestros Servicios", reviews: "Opiniones de Clientes", contact: "Contáctanos", location: "Nuestra Ubicación", name: "Tu nombre", email: "Tu correo electrónico", message: "Tu mensaje...", send: "Enviar" },
  en: { placeholder: "Search model...", services: "Our Services", reviews: "Client Testimonials", contact: "Contact Us", location: "Our Location", name: "Your name", email: "Your email", message: "Your message...", send: "Send" },
  pt: { placeholder: "Procurar modelo...", services: "Nossos Serviços", reviews: "Depoimentos de Clientes", contact: "Contate-nos", location: "Nossa Localização", name: "Seu nome", email: "Seu email", message: "Sua mensagem...", send: "Enviar" },
  fr: { placeholder: "Rechercher un modèle...", services: "Nos Services", reviews: "Avis des Clients", contact: "Contactez-nous", location: "Notre Emplacement", name: "Votre nom", email: "Votre e-mail", message: "Votre message...", send: "Envoyer" },
  de: { placeholder: "Modell suchen...", services: "Unsere Dienstleistungen", reviews: "Kundenmeinungen", contact: "Kontaktieren Sie uns", location: "Unser Standort", name: "Ihr Name", email: "Ihre E-Mail", message: "Ihre Nachricht...", send: "Senden" },
  it: { placeholder: "Cerca modello...", services: "I Nostri Servizi", reviews: "Recensioni dei Clienti", contact: "Contattaci", location: "La Nostra Posizione", name: "Il tuo nome", email: "La tua email", message: "Il tuo messaggio...", send: "Invia" },
  ru: { placeholder: "Поиск модели...", services: "Наши услуги", reviews: "Отзывы клиентов", contact: "Связаться с нами", location: "Наше местоположение", name: "Ваше имя", email: "Ваш email", message: "Ваше сообщение...", send: "Отправить" },
  ar: { placeholder: "ابحث عن نموذج...", services: "خدماتنا", reviews: "آراء العملاء", contact: "اتصل بنا", location: "موقعنا", name: "اسمك", email: "بريدك الإلكتروني", message: "رسالتك...", send: "إرسال" },
  zh: { placeholder: "搜索型号...", services: "我们的服务", reviews: "客户评价", contact: "联系我们", location: "我们的地址", name: "你的名字", email: "你的邮箱", message: "你的信息...", send: "发送" },
  ja: { placeholder: "モデルを検索...", services: "サービス一覧", reviews: "お客様の声", contact: "お問い合わせ", location: "所在地", name: "お名前", email: "メール", message: "メッセージ...", send: "送信" },
  pl: { placeholder: "Szukaj modelu...", services: "Nasze Usługi", reviews: "Opinie klientów", contact: "Skontaktuj się z nami", location: "Nasza lokalizacja", name: "Twoje imię", email: "Twój email", message: "Twoja wiadomość...", send: "Wyślij" },
  tr: { placeholder: "Model ara...", services: "Hizmetlerimiz", reviews: "Müşteri Yorumları", contact: "Bize Ulaşın", location: "Konumumuz", name: "Adınız", email: "E-posta", message: "Mesajınız...", send: "Gönder" },
  uk: { placeholder: "Пошук моделі...", services: "Наші послуги", reviews: "Відгуки клієнтів", contact: "Зв'язатися з нами", location: "Наша локація", name: "Ваше ім'я", email: "Ваш email", message: "Ваше повідомлення...", send: "Відправити" },
  nl: { placeholder: "Model zoeken...", services: "Onze Diensten", reviews: "Klantbeoordelingen", contact: "Contact", location: "Onze Locatie", name: "Je naam", email: "Je e-mail", message: "Je bericht...", send: "Verstuur" }
};
  if (val === "en") searchInput.placeholder = "Search model...";
  else if (val === "pt") searchInput.placeholder = "Buscar modelo...";
  else searchInput.placeholder = "Buscar modelo...";
};
