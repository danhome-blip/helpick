const userInput = document.getElementById('userInput');

function startListening() {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Browserul tău nu suportă recunoașterea vocală.");
    return;
  }

  const recognition = new webkitSpeechRecognition();
  recognition.lang = 'ro-RO';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onstart = () => {
    console.log("🎤 Ascult...");
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    console.log("✅ Recunoscut:", transcript);
    userInput.value = transcript;
    sendMessage(); // poți comenta asta dacă nu vrei să trimită automat
  };

  recognition.onerror = (event) => {
    console.error("❌ Eroare:", event.error);
    alert("Eroare microfon: " + event.error);
  };

  recognition.start();
}

function sendMessage() {
  const input = userInput.value.trim();
  if (input === "") return;

  console.log("📩 Trimis:", input);

  // Aici pui ce vrei să facă: afișare răspuns, query, etc.
  const responseBox = document.querySelector('.helpick-response');
  responseBox.innerHTML = "Am primit: " + input;

  userInput.value = "";
}
