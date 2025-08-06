// Toggle bară laterală
document.getElementById("toggleMenu").addEventListener("click", () => {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("hidden");
});

// Trimite mesaj text
function sendMessage(text) {
  if (!text.trim()) return;
  const chatFeed = document.getElementById("chatFeed");
  const message = document.createElement("div");
  message.textContent = text;
  chatFeed.appendChild(message);
  document.getElementById("userInput").value = "";
  chatFeed.scrollTop = chatFeed.scrollHeight;
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

// Microfon
document.getElementById("micButton").addEventListener("click", () => {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Browserul tău nu suportă Speech Recognition.");
    return;
  }

  const recognition = new webkitSpeechRecognition();
  recognition.lang = "ro-RO";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    document.getElementById("userInput").value = transcript;
  };

  recognition.onerror = (event) => {
    alert("Eroare la recunoaștere vocală: " + event.error);
  };

  recognition.start();
});
