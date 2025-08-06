// Toggle bară laterală
document.getElementById("toggleMenu").addEventListener("click", () => {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("hidden");
});

// Trimite mesaj text
function sendMessage() {
  const input = document.getElementById('input');
  const text = input.value.trim();
  if (text !== '') {
    const chat = document.getElementById('chat');
    const newMsg = document.createElement('div');
    newMsg.className = 'message';
    newMsg.innerText = text;
    chat.appendChild(newMsg);
    input.value = '';
  }
}

function handleEnter(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
}
window.handleEnter = handle Enter;
let recognition;
function toggleMic() {
  if (!('webkitSpeechRecognition' in window)) {
    alert('Microfonul nu este suportat în acest browser.');
    return;
  }

  if (!recognition) {
    recognition = new webkitSpeechRecognition();
    recognition.lang = 'ro-RO';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = function (event) {
      const transcript = event.results[0][0].transcript;
      document.getElementById('input').value += transcript + ' ';
    };

    recognition.onerror = function (event) {
      console.error('Eroare microfon:', event.error);
    };

    recognition.onend = function () {
      // Poți adăuga animație sau feedback dacă vrei
    };
  }

  recognition.start();
}

function handleEnter(event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault(); // oprește linia nouă
    const input = document.getElementById("input");
    sendMessage(input.value);
    input.value = ""; // curăță după trimitere
  }
}

// Buton Trimite
document.getElementById("sendButton").addEventListener("click", () => {
  const text = document.getElementById("userInput").value;
  sendMessage(text);
});

// Enter în textarea
document.getElementById("userInput").addEventListener("keydown", (e) => {
  const textarea = e.target;
  textarea.style.height = "auto";
  textarea.style.height = Math.min(textarea.scrollHeight, 100) + "px";

  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage(textarea.value);
  }
});

function startListening() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'ro-RO';
  recognition.interimResults = false;

  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    const input = document.getElementById('input');
    input.value = transcript;
    sendMessage();
  };

  recognition.onerror = function(event) {
    alert("Eroare la microfon: " + event.error);
  };

  recognition.start();
}
