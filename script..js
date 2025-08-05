const chatContainer = document.getElementById("chatContainer");
const userInput = document.getElementById("userInput");
const sidebar = document.getElementById("sidebar");
const menuButton = document.getElementById("menuButton");

let recognition;

if ('webkitSpeechRecognition' in window) {
  recognition = new webkitSpeechRecognition();
  recognition.lang = 'ro-RO';
  recognition.continuous = false;
  recognition.interimResults = false;
} else {
  console.warn("Speech Recognition nu este suportat în acest browser.");
}

menuButton.onclick = () => {
  sidebar.classList.toggle("active");
};

function appendMessage(sender, text) {
  const message = document.createElement("div");
  message.className = "message " + sender;
  message.innerHTML = `<span class="${sender}">${sender === 'user' ? 'Tu' : 'Helpick'}:</span> ${text}`;
  chatContainer.appendChild(message);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function sendMessage() {
  const text = userInput.value.trim();
  if (text === "") return;

  appendMessage("user", text);

  // Simulează răspuns bot (înlocuiește aici cu backend când ai)
  let reply = getBotReply(text);
  appendMessage("bot", reply);

  userInput.value = "";
  userInput.style.height = "auto";
}

function startListening() {
  if (!recognition) return;
  recognition.start();

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    userInput.value = transcript;
    sendMessage();
  };

  recognition.onerror = (event) => {
    console.error("Eroare la recunoașterea vocală:", event.error);
  };
}

function handleMenu(opt) {
  let msg = "";
  if (opt === "muzica") {
    msg = 'Playlist recomandat: <a href="https://www.youtube.com/results?search_query=muzică+relaxantă" target="_blank">YouTube - muzică relaxantă</a>';
  } else if (opt === "locuri") {
    msg = 'Caută locații: <a href="https://www.google.com/maps/search/restaurante+în+apropiere" target="_blank">Google Maps - restaurante</a>';
  } else if (opt === "retete") {
    msg = 'Rețete originale: <a href="https://www.jamieoliver.com/recipes/" target="_blank">Jamie Oliver</a>';
  }

  appendMessage("bot", msg);
  sidebar.classList.remove("active");
}

// Auto-extindere textarea (maxim 4 rânduri)
userInput.addEventListener("input", () => {
  userInput.style.height = "auto";
  const maxHeight = 4 * 24; // 4 rânduri * 24px aproximativ
  userInput.style.height = Math.min(userInput.scrollHeight, maxHeight) + "px";
});
