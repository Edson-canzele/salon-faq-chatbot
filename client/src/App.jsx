
import { useState } from "react";
import "./App.css";

const API_URL = "http://localhost:3000/api/chat";
const HUMAN_CONTACT_URL = "https://wa.me/27781656717";

const INITIAL_MESSAGE = {
  role: "assistant",
  content:
    "Hi there! Welcome to Glow & Grace Salon. I'm here to help with our services, appointments, and other salon questions. How can I help you today?",
};

const suggestions = [
  "What services do you offer?",
  "How much do your services cost?",
  "How can I book an appointment?",
];

// Make the salon's WhatsApp contact clickable in assistant replies.
function renderMessageContent(content) {
  const parts = content.split(/(https:\/\/wa\.me\/\d+)/g);

  return parts.map((part, index) => {
    if (part === HUMAN_CONTACT_URL) {
      return (
        <a
          key={index}
          href={HUMAN_CONTACT_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Chat with our team on WhatsApp
        </a>
      );
    }

    return part;
  });
}

function App() {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function sendMessage(text = input) {
    const message = text.trim();

    if (!message || loading) return;

    const history = messages.slice(-10).map(({ role, content }) => ({
      role,
      content,
    }));

    setMessages((current) => [
      ...current,
      { role: "user", content: message },
    ]);
    setInput("");
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, history }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.reply || "Unable to send your message.");
      }

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: data.reply,
        },
      ]);
    } catch {
      setError(
        "Unable to connect to the salon assistant. Please check that the server is running and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage();
  }

  function handleNewChat() {
    if (loading) return;

    setMessages([INITIAL_MESSAGE]);
    setInput("");
    setError("");
  }

  return (
    <main className="page">
      <section className="chat-card">
        <header className="chat-header">
          <div className="salon-avatar">G&G</div>

          <div className="salon-info">
            <h1>Glow &amp; Grace Salon</h1>
            <p>
              <span className="online-dot" />
              Salon FAQ Assistant
            </p>
          </div>

          <button
            className="new-chat-button"
            type="button"
            onClick={handleNewChat}
            disabled={loading}
            title="Start a new conversation"
          >
            New chat
          </button>
        </header>

        <div className="chat-notice">
          Welcome! Ask us about salon services and appointments.
        </div>

        <div className="messages" aria-live="polite">
          {messages.map((message, index) => (
            <div
              className={`message-row ${message.role}`}
              key={`${index}-${message.role}`}
            >
              <div className={`message-bubble ${message.role}`}>
                <p>{renderMessageContent(message.content)}</p>
                <span className="message-time">
                  {message.role === "assistant" ? "Salon assistant" : "You"}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="message-row assistant">
              <div
                className="message-bubble assistant typing"
                aria-label="Assistant is typing"
              >
                <span />
                <span />
                <span />
              </div>
            </div>
          )}

          {error && (
            <div className="error-message" role="alert">
              {error}
            </div>
          )}
        </div>

        {messages.length === 1 && (
          <div className="suggestions">
            <p>Try asking:</p>
            {suggestions.map((question) => (
              <button
                type="button"
                key={question}
                onClick={() => sendMessage(question)}
                disabled={loading}
              >
                {question}
              </button>
            ))}
          </div>
        )}

        <form className="chat-input-area" onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Type your message..."
            aria-label="Type your message"
            maxLength={1000}
            disabled={loading}
          />

          <button
            type="submit"
            className="send-button"
            disabled={loading || !input.trim()}
          >
            Send
          </button>
        </form>

        <footer className="chat-footer">
          <span>Glow &amp; Grace Salon FAQ Assistant</span>
          <span>
            Built by <strong>Edison Canzele</strong>
          </span>
          <small>AI-powered chatbot prototype</small>
        </footer>
      </section>
    </main>
  );
}

export default App;
