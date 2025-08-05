function sendMessage() {
  const input = document.getElementById("userInput").value;
  if (input.trim() === "") return;

  alert("Ai scris: " + input);
}

// Voice input – Web Speech API
function startListening() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'ro-RO';

  recognition.onstart = () => {
    console.log("🎤 Ascult...");
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    document.getElementById("userInput").value = transcript;
  };

  recognition.onerror = (event) => {
    alert("Eroare la recunoaștere vocală: " + event.error);
  };

  recognition.start();
}
