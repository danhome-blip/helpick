document.addEventListener("DOMContentLoaded", function () {
  const chatForm = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input");
  const chatLog = document.getElementById("chat-log");

  chatForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const message = chatInput.value.trim();
    if (message === "") return;

    addMessage("user", message);
    chatInput.value = "";

    // Simulare răspuns Helpick (demo) – înlocuiești cu apel API ulterior
    setTimeout(() => {
      const response = getHelpickResponse(message);
      addMessage("bot", response);
    }, 600);
  });

  function addMessage(sender, text) {
    const messageElem = document.createElement("div");
    messageElem.classList.add(sender === "user" ? "user-message" : "bot-message");
    messageElem.innerText = text;
    chatLog.appendChild(messageElem);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  function getHelpickResponse(userMessage) {
    // Aici poți adăuga logică mai complexă sau un API call
    const responses = {
      "unde mănânc": "Îți recomand ceva în zona ta. Vrei restaurante italiene sau românești?",
      "ce muzică ascult": "Deschid un playlist relaxant pe YouTube. Îți place mai calm sau energic?",
      "ce gătesc": "Ai în frigider ouă, brânză sau legume? Îți dau o rețetă imediat."
    };

    const lowerMessage = userMessage.toLowerCase();
    for (let key in responses) {
      if (lowerMessage.includes(key)) return responses[key];
    }

    return "Încă învăț să fiu util. Reformulează sau întreabă altceva 🙏";
  }
});
