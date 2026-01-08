const chatArea = document.getElementById("chat-area");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

addBotMessage(
  "Merhaba 👋 Ben Mersin Üniversitesi Hastanesi yönlendirme chatbotuyum.\n" +
  "• Şikayet / Geri bildirim\n" +
  "• Randevu & Poliklinik (MHRS / 182)\n" +
  "• Laboratuvar & Sonuçlar\n\n" +
  "Nasıl yardımcı olabilirim?"
);

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  addUserMessage(text);
  userInput.value = "";

  const reply = analyzeMessage(text);
  addBotMessage(reply);
}

function analyzeMessage(text) {
  const msg = normalize(text);
  const clinic = detectClinic(msg);
  if (clinic) {
    return (
      `Bu şikayet için **${clinic}** polikliniği uygun olabilir.\n\n` +
      `Randevu için **MHRS** veya **182** üzerinden "${clinic}" seçebilirsiniz.\n` +
      `📌 MHRS: https://www.mhrs.gov.tr`
    );
  }

  /* =========================
     1️⃣ TEMİZLİK / HİJYEN
     ========================= */
  const cleaningKeywords = [
    "pis", "kirli", "temiz degil", "temizlik", "hijyen",
    "tuvalet", "lavabo", "kotu koku", "cop", "yerler pisti"
  ];
  if (containsAny(msg, cleaningKeywords)) {
    return (
      "Bu bir **temizlik / hijyen** şikayeti gibi görünüyor.\n\n" +
      "**Hasta Hakları Birimi / Temizlik Birimi** ile paylaşabilirsiniz.Gerekli birimlere danışmadan ulaşabilirsiniz.\n\n" +
      "İlgili birime gidebilir veya 'hastahaklari@mersin.edu.tr' mail adresinden şikayet oluşturabilirsiniz."
    );
  }

  /* =========================
     2️⃣ PERSONEL DAVRANIŞI
     ========================= */
  const staffKeywords = [
    "personel", "doktor", "hemsire", "sekreter",
    "kaba", "saygisiz", "ilgisiz", "davranis", "bagirdi"
  ];
  if (containsAny(msg, staffKeywords)) {
    return (
      "Bu bir **personel davranışı** ile ilgili şikayet gibi görünüyor.\n\n" +
      "**Hasta Hakları Birimi** veya **Başhekimlik** üzerinden iletilebilir.\n\n" +
      "hastahaklari@mersin.edu.tr mail adresinden ve +903242410000 hastane santral hattından sorun bildirebilirsiniz.\n" 
    );
  }

  /* =========================
     3️⃣ GÜRÜLTÜ / DÜZEN
     ========================= */
  const noiseKeywords = [
    "gurultu", "kalabalik", "duzensiz",
    "bagirma", "ses", "rahatsiz"
  ];
  if (containsAny(msg, noiseKeywords)) {
    return (
      "Bu bir **gürültü / düzen** ile ilgili geri bildirim gibi görünüyor.\n\n" +
      "**İdari Hizmetler / Kat Sorumlusu** ile paylaşılabilir.\n\n" +
      "Bulunduğunuz kattaki danışmadan kat sorumlusu ile görüşebilir  veya 'hastahaklari@mersin.edu.tr' mail adresinden sorun bildirebilirsiniz"
    );
  }

  /* =========================
     4️⃣ YÖNLENDİRME / BİLGİ ALAMAMA
     ========================= */
  const infoKeywords = [
    "kimse yardimci olmadi", "yonlendirme",
    "bilgi alamadim", "danisma", "sormama ragmen"
  ];
  if (containsAny(msg, infoKeywords)) {
    return (
      "Bu bir **yönlendirme / bilgilendirme** ile ilgili geri bildirim gibi görünüyor.\n\n" +
      "➡️ **Danışma / Hasta İletişim Birimi** ile paylaşabilirsiniz.\n\n" +
      "📍 Ana girişte bulunan danışma noktası bu konuda yardımcı olur."
    );
  }

  /* =========================
     5️⃣ RANDEVU
     ========================= */
  const appointmentKeywords = ["randevu", "mhrs", "182", "randevu alamiyorum"];
  if (containsAny(msg, appointmentKeywords)) {
    return (
      "Randevu işlemleri için **MHRS** veya **182** hattını kullanabilirsiniz.\n\n" +
      "Şikayetinizi yazarsanız uygun polikliniği önerebilirim."
    );
  }

  /* =========================
     6️⃣ SONUÇLAR
     ========================= */
  const resultKeywords = ["tahlil", "sonuc", "laboratuvar", "kan sonucu", "mr"];
  if (containsAny(msg, resultKeywords)) {
    return (
      "Tahlil ve görüntüleme sonuçlarınıza **E-Nabız** üzerinden ulaşabilirsiniz.\n\n" +
      "E-Nabız > Tahlillerim / Görüntüleme Sonuçlarım"
    );
  }

  /* =========================
     FALLBACK
     ========================= */
  return (
    "Size daha doğru yardımcı olabilmem için şikayetinizi kısaca yazabilir misiniz?\n\n" +
    "Örnekler:\n" +
    "• Yerler pisti\n" +
    "• Hemşire çok ilgisizdi\n" +
    "• Gürültü vardı\n" +
    "• Randevu alamıyorum"
  );
}

/* ==== Yardımcı fonksiyonlar ==== */
function addBotMessage(text) {
  const div = document.createElement("div");
  div.className = "message bot";
  div.textContent = text;
  chatArea.appendChild(div);
  chatArea.scrollTop = chatArea.scrollHeight;
}

function addUserMessage(text) {
  const div = document.createElement("div");
  div.className = "message user";
  div.textContent = text;
  chatArea.appendChild(div);
  chatArea.scrollTop = chatArea.scrollHeight;
}

function containsAny(text, keywords) {
  return keywords.some(k => text.includes(k));
}

function normalize(s) {
  return (s || "")
    .toLowerCase()
    .replace(/[ç]/g,"c").replace(/[ğ]/g,"g").replace(/[ı]/g,"i")
    .replace(/[ö]/g,"o").replace(/[ş]/g,"s").replace(/[ü]/g,"u")
    .replace(/[^a-z0-9\s]/g," ")
    .replace(/\s+/g," ")
    .trim();
}
function detectClinic(msg) {
  // KBB
  if (containsAny(msg, ["kulak", "kulagim", "bogaz", "burun", "sinuzit", "geniz", "isitme"])) {
    return "Kulak Burun Boğaz (KBB)";
  }

  // Baş ağrısı → Nöroloji
  if (containsAny(msg, ["basim agriyor", "bas agrisi", "migren", "bas donmesi"])) {
    return "Nöroloji";
  }

  // Dahiliye
  if (containsAny(msg, ["ates", "halsizlik", "oksuruk", "grip", "nezle","karin","karnim"])) {
    return "Dahiliye (İç Hastalıkları)";
  }

  // Ortopedi
  if (containsAny(msg, ["omuz", "diz", "bel", "bilek", "ayak", "kol"])) {
    return "Ortopedi ve Travmatoloji";
  }

  // Göz
  if (containsAny(msg, ["goz", "gozum", "bulan", "kizarik", "goz agrisi"])) {
    return "Göz Hastalıkları";
  }

  return null;
}
