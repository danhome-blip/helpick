const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

function startListening() {
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    document.getElementById("userInput").value = transcript;
    sendMessage();
  };

  recognition.onerror = (event) => {
    console.error("Eroare recunoaștere:", event.error);
    alert("Eroare la microfon: " + event.error);
  };

  recognition.start();
}

function sendMessage() {
  const userInput = document.getElementById("userInput");
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
