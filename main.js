// MENÚ Y ACORDEÓN
const sidebar = document.getElementById("sidebar");
const menuBtn = document.getElementById("menuBtn");
const closeSidebar = document.getElementById("closeSidebar");
if(menuBtn) menuBtn.onclick = e => { e.stopPropagation(); sidebar.classList.add("open"); };
if(closeSidebar) closeSidebar.onclick = () => sidebar.classList.remove("open");
document.addEventListener("click", e => {
  if (sidebar && sidebar.classList.contains('open') &&
    !sidebar.contains(e.target) && e.target !== menuBtn && !menuBtn.contains(e.target)) {
    sidebar.classList.remove("open");
  }
});
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
// TRADUCCIÓN MULTI-IDIOMA
const langSelect = document.getElementById('langSelect');
const searchInput = document.getElementById('searchInput');
const translations = {
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
function applyLanguage(lang) {
  const t = translations[lang] || translations["es"];
  if (searchInput) searchInput.placeholder = t.placeholder;
  document.querySelectorAll("[data-key]").forEach(el => {
    const key = el.getAttribute("data-key");
    if (t[key]) el.textContent = t[key];
  });
  ["name", "email", "message"].forEach(name => {
    const input = document.querySelector(`[name='${name}']`);
    if (input && t[name]) input.placeholder = t[name];
  });
  const btn = document.querySelector("button[type='submit']");
  if (btn && t.send) btn.textContent = t.send;
}
function saveLang(lang) { try { localStorage.setItem("lang", lang); } catch {} }
function getLang() {
  try { return localStorage.getItem("lang") || "es"; } catch { return "es"; }
}
if (langSelect) {
  langSelect.value = getLang();
  applyLanguage(langSelect.value);
  langSelect.onchange = () => {
    const lang = langSelect.value;
    saveLang(lang);
    applyLanguage(lang);
  };
} else {
  applyLanguage(getLang());
}