document.getElementById("chat-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const input = document.getElementById("user-input").value.trim();
  if (input) {
    addMessage("user", input);
    addMessage("bot", "Funcționalitatea completă vine în curând.");
    document.getElementById("user-input").value = "";
  }
});

function addMessage(type, text) {
  const msgDiv = document.createElement("div");
  msgDiv.className = type + "-message";
  msgDiv.innerHTML = text;
  document.getElementById("chat-log").appendChild(msgDiv);
}

// Butoane de meniu
function getFood() {
  addMessage("user", "Unde mănânc?");
  addMessage("bot", `Uite un loc bun în apropiere: <a href="https://www.google.com/maps/search/restaurant+aproape+de+mine" target="_blank">Vezi restaurante pe Google Maps</a>`);
}

function getMusic() {
  addMessage("user", "Ce muzică ascult?");
  addMessage("bot", `Ascultă acest playlist: <a href="https://www.youtube.com/watch?v=JGwWNGJdvx8&list=PL4fGSI1pDJn6BOP-8nk9FWbOH_35XQ4gD" target="_blank">Muzică de stare bună</a>`);
}

function getRecipe() {
  addMessage("user", "Ce gătesc?");
  addMessage("bot", `Uite o idee rapidă: <a href="https://www.delicatesa.ro/reteta/omleta-cu-ceapa-caramelizata.html" target="_blank">Omletă simplă cu ceapă caramelizată</a>`);
}
