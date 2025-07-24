// === Chat unic pentru toate căutările ===
function processChatQuery(query) {
  const out = document.getElementById('chat-output');
  if (!query) {
    out.innerHTML = 'Te rog introdu o întrebare sau folosește microfonul.';
    return;
  }
  // Detectare simplă a intenției
  const q = query.toLowerCase();
  if (
    q.includes('magazin') || q.includes('supermarket') || q.includes('market') || q.includes('shop')
  ) {
    out.innerHTML = 'Hai să vedem ce magazine sunt deschise aproape de tine! 🛒<br><b>Magazine deschise în zona ta:</b><ul><li>Supermarket Mega Image (până la 22:00)</li><li>Lidl (până la 21:00)</li><li>Carrefour Express (până la 23:00)</li></ul><br>O zi frumoasă și spor la cumpărături!';
    return;
  } else if (q.includes('restaurant') || q.includes('mănânc') || q.includes('mananc') || q.includes('unde merg')) {
    // ...existing code...
    out.innerHTML = 'Caut restaurante aproape...';
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          out.innerHTML = '<b>Restaurante aproape:</b><ul><li>Restaurant 1 (simulat)</li><li>Restaurant 2 (simulat)</li></ul>';
        },
        (err) => {
          out.innerHTML = 'Nu am putut obține locația.';
        }
      );
    } else {
      out.innerHTML = 'Geolocația nu este suportată.';
    }
  } else if (q.includes('youtube') || q.includes('ascult') || q.includes('muzică') || q.includes('muzica') || q.includes('radio') || q.includes('spotify') || isMusicGenre(q)) {
    // Optimizare: top rezultate YouTube și radio tematic
    let search = query.replace(/(youtube|ascult|muzică|muzica|radio|spotify)/gi, '').trim();
    if (!search) search = 'muzică';
    // Detectare gen sau deceniu
    const genre = detectMusicGenre(q);
    let radioHtml = '';
    if (genre && genreRadio[genre]) {
      radioHtml = `<br>Radio online pentru <b>${genre}</b>: <button onclick=\"playRadio('${genreRadio[genre]}')\">${genre}</button>`;
    } else {
      radioHtml = `<br>Radio online:<br><button onclick=\"playRadio('https://stream.profm.ro/profm.mp3')\">PROFM</button> <button onclick=\"playRadio('https://asculta.kissfm.ro/kissfm.aacp')\">Kiss FM</button> <button onclick=\"playRadio('https://live.radiotop.ro:8000/')\">Radio Top</button>`;
    }
    // Top 3 rezultate YouTube (linkuri directe)
    const ytLinks = [1,2,3].map(i => `<a href='https://www.youtube.com/results?search_query=${encodeURIComponent(search)}&sp=EgIQAQ%253D%253D' target='_blank'>Rezultat YouTube #${i} pentru "${search}"</a>`).join('<br>');
    out.innerHTML = `${ytLinks}${radioHtml}<br><audio id='radio-player' controls style='width:100%;margin-top:8px;display:none;'></audio>`;
  } else if (q.includes('rețetă') || q.includes('reteta') || q.includes('gătesc') || q.includes('gatesc') || q.includes('ce gătesc') || q.includes('ce gatesc')) {
// Genuri radio tematice (exemplu)
const genreRadio = {
  'country': 'https://streaming.radio.co/s98e3c8fa6/listen',
  '80s': 'https://streaming.radio.co/sb17f7e3fa/listen',
  'rock': 'https://streaming.radio.co/sb7b2e3e3e/listen',
  'dance': 'https://streaming.radio.co/sb8e3e3e3e/listen',
  'jazz': 'https://streaming.radio.co/sb9e3e3e3e/listen',
  'pop': 'https://streaming.radio.co/sb10e3e3e3/listen'
};

function isMusicGenre(q) {
  return Object.keys(genreRadio).some(g => q.includes(g));
}
function detectMusicGenre(q) {
  return Object.keys(genreRadio).find(g => q.includes(g));
}
    // Simulare rețetă
    let search = query.replace(/(rețetă|reteta|gătesc|gatesc|ce gătesc|ce gatesc)/gi, '').trim();
    if (!search) search = 'chicken';
    out.innerHTML = `<b>Rețetă găsită:</b> <a href='https://www.themealdb.com/search.php?s=${encodeURIComponent(search)}' target='_blank'>Vezi rețeta pentru "${search}"</a>`;
  } else {
    out.innerHTML = 'Nu am înțeles interogarea. Încearcă să folosești cuvinte cheie precum restaurant, muzică, rețetă.';
  }
}

// Butoane chat unic
document.addEventListener('DOMContentLoaded', () => {
  const chatBtn = document.getElementById('chat-search-btn');
  const chatInput = document.getElementById('chat-query');
  if (chatBtn && chatInput) {
    chatBtn.onclick = () => processChatQuery(chatInput.value);
    chatInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') processChatQuery(chatInput.value); });
  }
});

// Comandă vocală pentru chat unic
let chatRecognition;
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  chatRecognition = new SpeechRecognition();
  chatRecognition.lang = currentLang;
  chatRecognition.interimResults = false;
  chatRecognition.maxAlternatives = 1;
  document.getElementById('chat-voice-btn').onclick = () => {
    chatRecognition.lang = currentLang;
    chatRecognition.start();
    document.getElementById('chat-voice-btn').textContent = '🎙️';
  };
  chatRecognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    document.getElementById('chat-query').value = transcript;
    document.getElementById('chat-voice-btn').textContent = '🎤';
    processChatQuery(transcript);
  };
  chatRecognition.onerror = (event) => {
    alert('Eroare recunoaștere vocală: ' + event.error);
    document.getElementById('chat-voice-btn').textContent = '🎤';
  };
  chatRecognition.onend = () => {
    document.getElementById('chat-voice-btn').textContent = '🎤';
  };
} else {
  document.getElementById('chat-voice-btn').disabled = true;
  document.getElementById('chat-voice-btn').title = 'Comanda vocală nu este suportată în acest browser.';
}

// Player radio pentru chat unic
function playRadio(url) {
  const player = document.getElementById('radio-player');
  if (player) {
    player.src = url;
    player.style.display = 'block';
    player.play();
  }
}
// === Căutare rețete (simulare) ===
document.addEventListener('DOMContentLoaded', () => {
  const recipeBtn = document.getElementById('find-recipe-btn');
  const recipeOut = document.getElementById('recipe-output');
  if (recipeBtn && recipeOut) {
    recipeBtn.onclick = () => {
      const query = document.getElementById('recipe-query').value.trim();
      if (!query) {
        recipeOut.innerHTML = 'Introdu un cuvânt pentru rețetă!';
        return;
      }
      // Simulare rezultat (fără API)
      recipeOut.innerHTML = `<b>Rețetă găsită:</b> <a href='https://www.themealdb.com/search.php?s=${encodeURIComponent(query)}' target='_blank'>Vezi rețeta pentru "${query}"</a>`;
    };
  }
});
// === Căutare restaurante (simulare) ===
document.addEventListener('DOMContentLoaded', () => {
  const restBtn = document.getElementById('find-restaurants-btn');
  const restOut = document.getElementById('restaurants-output');
  if (restBtn && restOut) {
    restBtn.onclick = () => {
      restOut.innerHTML = 'Caut locația...';
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            // Simulare rezultate (fără API)
            restOut.innerHTML = '<b>Restaurante aproape:</b><ul><li>Restaurant 1 (simulat)</li><li>Restaurant 2 (simulat)</li></ul>';
          },
          (err) => {
            restOut.innerHTML = 'Nu am putut obține locația.';
          }
        );
      } else {
        restOut.innerHTML = 'Geolocația nu este suportată.';
      }
    };
  }
});
// === Căutare YouTube și Radio ===
document.addEventListener('DOMContentLoaded', () => {
  // YouTube search
  const ytBtn = document.getElementById('youtube-btn');
  if (ytBtn) {
    ytBtn.onclick = () => {
      const query = document.getElementById('youtube-query').value.trim();
      if (query) {
        window.open('https://www.youtube.com/results?search_query=' + encodeURIComponent(query), '_blank');
      }
    };
  }
  // Radio buttons
  const radioBtns = document.querySelectorAll('.radio-btn');
  const radioPlayer = document.getElementById('radio-player');
  radioBtns.forEach(btn => {
    btn.onclick = () => {
      const url = btn.getAttribute('data-url');
      if (url) {
        radioPlayer.src = url;
        radioPlayer.style.display = 'block';
        radioPlayer.play();
      }
    };
  });
});
// === Comanda vocală ===
let recognition;
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.lang = currentLang;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  document.getElementById('voice-btn').onclick = () => {
    recognition.lang = currentLang;
    recognition.start();
    document.getElementById('voice-btn').textContent = '🎙️';
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    document.getElementById('search-input').value = transcript;
    document.getElementById('voice-btn').textContent = '🎤';
  };

  recognition.onerror = (event) => {
    alert('Eroare recunoaștere vocală: ' + event.error);
    document.getElementById('voice-btn').textContent = '🎤';
  };

  recognition.onend = () => {
    document.getElementById('voice-btn').textContent = '🎤';
  };
} else {
  document.getElementById('voice-btn').disabled = true;
  document.getElementById('voice-btn').title = 'Comanda vocală nu este suportată în acest browser.';
}
// Obiectul cu traduceri pentru fiecare limbă
const translations = {
  ro: {
    appTitle: "Helpick",
    appSubtitle: "Your Ai Super Help",
    undeMergTitle: "Unde merg",
    undeMergDesc: "Restaurant, hotel, market",
    ceAscultTitle: "Ce ascult",
    ceAscultDesc: "YouTube, Spotify, Radio",
    ceGatescTitle: "Ce gatesc",
    ceGatescDesc: "Retete culinare",
    searchPlaceholder: "Întreabă orice",
    emailPlaceholder: "Email aici",
    emailBtn: "Trimite",
    gdprLabel: "Sunt de acord cu termenii și condițiile GDPR"
  },
  en: {
    appTitle: "Helpick",
    appSubtitle: "Your AI Super Help",
    undeMergTitle: "Where to go",
    undeMergDesc: "Restaurant, hotel, market",
    ceAscultTitle: "What I listen",
    ceAscultDesc: "YouTube, Spotify, Radio",
    ceGatescTitle: "What I cook",
    ceGatescDesc: "Cooking recipes",
    searchPlaceholder: "Ask anything",
    emailPlaceholder: "Email here",
    emailBtn: "Submit",
    gdprLabel: "Agree to our GDPR terms and conditions"
  },
  fr: {
    appTitle: "Helpick",
    appSubtitle: "Votre aide IA Super",
    undeMergTitle: "Où aller",
    undeMergDesc: "Restaurant, hôtel, marché",
    ceAscultTitle: "Ce que j'écoute",
    ceAscultDesc: "YouTube, Spotify, Radio",
    ceGatescTitle: "Ce que je cuisine",
    ceGatescDesc: "Recettes de cuisine",
    searchPlaceholder: "Demandez n'importe quoi",
    emailPlaceholder: "Email ici",
    emailBtn: "Envoyer",
    gdprLabel: "J'accepte les conditions GDPR"
  },
  de: {
    appTitle: "Helpick",
    appSubtitle: "Deine KI Super Hilfe",
    undeMergTitle: "Wohin gehe ich",
    undeMergDesc: "Restaurant, Hotel, Markt",
    ceAscultTitle: "Was ich höre",
    ceAscultDesc: "YouTube, Spotify, Radio",
    ceGatescTitle: "Was ich koche",
    ceGatescDesc: "Kochrezepte",
    searchPlaceholder: "Frag irgendwas",
    emailPlaceholder: "Email hier",
    emailBtn: "Senden",
    gdprLabel: "Ich stimme den GDPR-Bedingungen zu"
  },
  es: {
    appTitle: "Helpick",
    appSubtitle: "Tu ayuda IA Super",
    undeMergTitle: "A dónde voy",
    undeMergDesc: "Restaurante, hotel, mercado",
    ceAscultTitle: "Qué escucho",
    ceAscultDesc: "YouTube, Spotify, Radio",
    ceGatescTitle: "Qué cocino",
    ceGatescDesc: "Recetas de cocina",
    searchPlaceholder: "Pregunta lo que sea",
    emailPlaceholder: "Email aquí",
    emailBtn: "Enviar",
    gdprLabel: "Acepto los términos y condiciones GDPR"
  },
  it: {
    appTitle: "Helpick",
    appSubtitle: "Il tuo aiuto AI Super",
    undeMergTitle: "Dove vado",
    undeMergDesc: "Ristorante, hotel, mercato",
    ceAscultTitle: "Cosa ascolto",
    ceAscultDesc: "YouTube, Spotify, Radio",
    ceGatescTitle: "Cosa cucino",
    ceGatescDesc: "Ricette di cucina",
    searchPlaceholder: "Chiedi qualsiasi cosa",
    emailPlaceholder: "Email qui",
    emailBtn: "Invia",
    gdprLabel: "Accetto i termini e le condizioni GDPR"
  }
};

let currentLang = getBrowserLanguage();

function getBrowserLanguage() {
  const lang = navigator.language ? navigator.language.slice(0, 2) : 'en';
  return translations[lang] ? lang : 'en';
}

function setAppLanguage(lang) {
  if (!translations[lang]) lang = 'en';
  currentLang = lang;
  applyTranslations();
}

function applyTranslations() {
  const t = translations[currentLang];
  document.getElementById('app-title').textContent = t.appTitle;
  document.getElementById('app-subtitle').textContent = t.appSubtitle;
  document.getElementById('card-unde-merg-title').textContent = t.undeMergTitle;
  document.getElementById('card-unde-merg-desc').textContent = t.undeMergDesc;
  document.getElementById('card-ce-ascult-title').textContent = t.ceAscultTitle;
  document.getElementById('card-ce-ascult-desc').textContent = t.ceAscultDesc;
  document.getElementById('card-ce-gatesc-title').textContent = t.ceGatescTitle;
  document.getElementById('card-ce-gatesc-desc').textContent = t.ceGatescDesc;
  document.getElementById('search-input').placeholder = t.searchPlaceholder;
  document.getElementById('email-input').placeholder = t.emailPlaceholder;
  document.getElementById('email-btn').textContent = t.emailBtn;
  document.getElementById('gdpr-label').textContent = t.gdprLabel;
}

// Evenimente pentru click pe steaguri
document.getElementById('lang-ro').onclick = () => setAppLanguage('ro');
document.getElementById('lang-en').onclick = () => setAppLanguage('en');
document.getElementById('lang-fr').onclick = () => setAppLanguage('fr');
document.getElementById('lang-de').onclick = () => setAppLanguage('de');
document.getElementById('lang-es').onclick = () => setAppLanguage('es');
document.getElementById('lang-it').onclick = () => setAppLanguage('it');

// Inițializează limba la încărcarea paginii
window.onload = applyTranslations;

console.log('Helpick MVP loaded, multilingvism activat');
