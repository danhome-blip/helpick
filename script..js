document.getElementById("chat-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const input = document.getElementById("user-input");
  const text = input.value.trim();
  if (text === "") return;

  const chatLog = document.getElementById("chat-log");

  const userMsg = document.createElement("div");
  userMsg.className = "user-message";
  userMsg.textContent = text;
  chatLog.appendChild(userMsg);

  const botMsg = document.createElement("div");
  botMsg.className = "bot-message";
  botMsg.innerHTML = `Îți răspund imediat pentru: <strong>${text}</strong>`;
  chatLog.appendChild(botMsg);

  input.value = "";
});
