document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.getElementById("menu-button");
  const sidebar = document.getElementById("sidebar");
  const form = document.getElementById("chat-form");
  const input = document.getElementById("chat-input");
  const feed = document.getElementById("chat-feed");

  menuButton.addEventListener("click", () => {
    sidebar.style.display = sidebar.style.display === "block" ? "none" : "block";
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = input.value.trim();
    if (!message) return;

    // Afișează mesajul utilizatorului
    const userMsg = document.createElement("div");
    userMsg.className = "user-msg";
    userMsg.textContent = message;
    feed.appendChild(userMsg);

    // Golește inputul
    input.value = "";
    input.style.height = "auto";

    // Simulare răspuns (poți înlocui cu fetch către un backend)
    const botMsg = document.createElement("div");
    botMsg.className = "bot-msg";
    botMsg.textContent = "Caut răspuns pentru: " + message;
    feed.appendChild(botMsg);

    // Scroll în jos
    feed.scrollTop = feed.scrollHeight;
  });

  // Auto-resize pentru input
  input.addEventListener("input", () => {
    input.style.height = "auto";
    input.style.height = Math.min(input.scrollHeight, 100) + "px";
  });
});
