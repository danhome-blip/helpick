document.addEventListener("DOMContentLoaded", () => {
  const micButton = document.getElementById("mic-button");
  const input = document.getElementById("chat-input");

  if (!("webkitSpeechRecognition" in window)) {
    micButton.style.display = "none";
    return;
  }

  const recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "ro-RO";

  micButton.addEventListener("click", () => {
    recognition.start();
    micButton.disabled = true;
  });

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    input.value += (input.value ? " " : "") + transcript;
    input.dispatchEvent(new Event("input"));
    micButton.disabled = false;
  };

  recognition.onerror = () => {
    micButton.disabled = false;
  };
});
