import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

const STORAGE_KEY = 'chat_messages';
const NAME_STORAGE_KEY = 'chat_user_name';

function loadMessages() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function loadUserName() {
  try {
    return localStorage.getItem(NAME_STORAGE_KEY) || '';
  } catch {
    return '';
  }
}

function App() {
  const [name, setName] = useState(loadUserName);
  const [text, setText] = useState('');
  const [messages, setMessages] = useState(loadMessages);

  const handleNameChange = (e) => {
    const nextName = e.target.value;
    setName(nextName);
    try {
      localStorage.setItem(NAME_STORAGE_KEY, nextName);
    } catch {
      // ignore
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedText = text.trim();
    if (!trimmedName || !trimmedText) {
      return;
    }

    const newMessage = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      author: trimmedName,
      text: trimmedText,
      timestamp: new Date().toISOString(),
    };

    const nextMessages = [...messages, newMessage];
    setMessages(nextMessages);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextMessages));
    } catch {
      // ignore
    }
    setText('');
  };

  const handleClear = () => {
    setMessages([]);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    } catch {
      // ignore
    }
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1 className="chat-title">Онлайн-чат</h1>
        <button
          type="button"
          className="btn btn-danger"
          data-testid="chat-clear"
          onClick={handleClear}
        >
          Очистить чат
        </button>
      </header>

      <div className="chat-history" data-testid="chat-history">
        {messages.length === 0 ? (
          <div className="chat-empty">История сообщений пуста</div>
        ) : (
          messages.map((item) => (
            <article
              key={item.id}
              className="chat-item"
              data-testid="chat-item"
            >
              <div className="chat-item-meta">
                <span className="chat-item-author">{item.author}</span>
                <time className="chat-item-time" dateTime={item.timestamp}>
                  {new Date(item.timestamp).toLocaleString('ru-RU')}
                </time>
              </div>
              <p className="chat-item-text">{item.text}</p>
            </article>
          ))
        )}
      </div>

      <form className="chat-form" onSubmit={handleSend}>
        <div className="form-group">
          <label htmlFor="chat-name">Имя пользователя:</label>
          <input
            id="chat-name"
            type="text"
            className="form-input"
            data-testid="chat-name"
            placeholder="Введите имя"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="chat-message">Сообщение:</label>
          <input
            id="chat-message"
            type="text"
            className="form-input"
            data-testid="chat-message"
            placeholder="Введите текст сообщения"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          data-testid="chat-send"
        >
          Отправить
        </button>
      </form>
    </div>
  );
}

const rootElement = document.querySelector('[data-testid="app"]');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
