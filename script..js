const userInput = document.getElementById("userInput");
const responseBox = document.querySelector(".helpick-response");

function startListening() {
  if (!("webkitSpeechRecognition" in window)) {
    alert("Browserul tău nu suportă recunoașterea vocală.");
    return;
  }

  const recognition = new webkitSpeechRecognition();
  recognition.lang = "ro-RO";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onstart = () => {
    console.log("Ascult...");
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    console.log("Recunoscut:", transcript);
    userInput.value = transcript;
    sendMessage(); // trimite automat după recunoaștere
  };

  recognition.onerror = (event) => {
    console.error("Eroare recunoaștere:", event.error);
  };

  recognition.start();
}

function sendMessage() {
  const message = userInput.value.trim();
  if (message === "") return;

  const userDiv = document.createElement("div");
  userDiv.className = "user-question";
  userDiv.textContent = message;

  const botDiv = document.createElement("div");
  botDiv.className = "helpick-response";
  botDiv.textContent = "Am primit mesajul tău: " + message;

  const chatBox = document.querySelector(".chat-box");
  chatBox.appendChild(userDiv);
  chatBox.appendChild(botDiv);

  userInput.value = "";
}
