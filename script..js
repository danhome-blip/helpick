import React, { useRef, useState, useEffect } from "react";
import "./App.css";

const DEFAULT_WELCOME = "Bun venit la Helpick! Întreabă-mă orice despre locații, rețete sau muzică.";

function buildLinks(msg) {
  const out = [];
  // Rețete culinare
  const recipeMatch = msg.match(/rețet[ăe] ([a-zA-Z0-9 ]+)/i) || msg.match(/reteta ([a-zA-Z0-9 ]+)/i);
  if (recipeMatch) {
    const recipe = recipeMatch[1].trim().replace(/\s+/g, "+");
    out.push({
      label: "Rețetă pe Google",
      url: `https://www.google.com/search?q=reteta+${recipe}`,
      emoji: "🍳"
    });
    out.push({
      label: "Rețetă pe JamilaCuisine",
      url: `https://www.jamilacuisine.ro/?s=${recipe}`,
      emoji: "🍲"
    });
  }
  // Google Maps
  if (/cafenea/i.test(msg)) {
    out.push({
      label: "Cafenele pe Maps",
      url: "https://www.google.com/maps/search/cafenea+langa+mine",
      emoji: "☕"
    });
  }
  if (/restaurant/i.test(msg)) {
    out.push({
      label: "Restaurante pe Maps",
      url: "https://www.google.com/maps/search/restaurant+langa+mine",
      emoji: "🍽️"
    });
  }
  if (/hotel/i.test(msg)) {
    out.push({
      label: "Hoteluri pe Maps",
      url: "https://www.google.com/maps/search/hotel+langa+mine",
      emoji: "🏨"
    });
  }
  // YouTube/Radio
  if (/muzic[ăa]|relaxare|relaxant[ăa]/i.test(msg)) {
    out.push({
      label: "Muzică relaxantă pe YouTube",
      url: "https://www.youtube.com/results?search_query=relaxing+music+cafe",
      emoji: "🎵"
    });
  }
  if (/radio/i.test(msg)) {
    out.push({
      label: "Ascultă Radio România Actualități",
      url: "https://www.radioromania.ro/live.html",
      emoji: "📻"
    });
  }
  return out;
}

function botReply(userMsg) {
  // Răspuns foarte simplist, doar ca demo MVP
  const links = buildLinks(userMsg);
  let text = "Iată ce am găsit pentru tine:";
  if (!links.length) text = "Spune-mi dacă vrei locații, rețete sau muzică!";
  return { text, links };
}

function speak(text) {
  if (!window.speechSynthesis) return;
  const utter = new window.SpeechSynthesisUtterance(text);
  utter.lang = "ro-RO";
  window.speechSynthesis.speak(utter);
}

function Message({ who, msg, links, canTTS }) {
  return (
    <div className={`message ${who}`}>
      <div>{msg}</div>
      {links && links.length > 0 && (
        <div className="links">
          {links.map(({ label, url, emoji }) => (
            <a key={url} href={url} target="_blank" rel="noopener noreferrer">
              {emoji} {label}
            </a>
          ))}
        </div>
      )}
      {canTTS && (
        <button className="tts-btn" onClick={() => speak(msg)}>
          🔊 Ascultă răspunsul
        </button>
      )}
    </div>
  );
}

function App() {
  const [messages, setMessages] = useState([
    { who: "bot", msg: DEFAULT_WELCOME }
  ]);
  const [input, setInput] = useState("");
  const messagesEnd = useRef(null);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((msgs) => [...msgs, { who: "user", msg: userMsg }]);
    setInput("");
    setTimeout(() => {
      const { text, links } = botReply(userMsg);
      setMessages((msgs) => [
        ...msgs,
        { who: "bot", msg: text, links, canTTS: true }
      ]);
    }, 600);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") handleSend();
  };

  // Web Speech API: voice-to-text
  const [recording, setRecording] = useState(false);
  let recognition = null;
  if (window.SpeechRecognition || window.webkitSpeechRecognition) {
    recognition =
      new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "ro-RO";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
  }

  const startVoice = () => {
    if (!recognition) return;
    setRecording(true);
    recognition.start();
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setRecording(false);
    };
    recognition.onerror = () => setRecording(false);
    recognition.onend = () => setRecording(false);
  };

  return (
    <div className="chatbox">
      <div className="header">Helpick</div>
      <div className="messages">
        {messages.map((m, i) => (
          <Message key={i} {...m} />
        ))}
        <div ref={messagesEnd}></div>
      </div>
      <div className="input-area">
        <button
          onClick={startVoice}
          style={{ background: recording ? "#d1e2ff" : undefined }}
          title="Voice input"
        >
          🎤
        </button>
        <input
          type="text"
          placeholder="Scrie aici sau folosește microfonul..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
        />
        <button onClick={handleSend}>Trimite</button>
      </div>
    </div>
  );
}

export default App;
