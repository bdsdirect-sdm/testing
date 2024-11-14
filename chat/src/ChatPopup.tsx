import { useState } from 'react';
import { FaComments } from 'react-icons/fa';
import './ChatPopup.css';

export default function ChatPopup() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<{ text: string, timestamp: string }[]>([]);

    const toggleChat = (): void => {
        setIsOpen(!isOpen);
    };

    const handleSendMessage = (e: React.FormEvent): void => {
        e.preventDefault();

        const currentTime = new Date().toLocaleTimeString();
        setMessages(prevMessages => [
            ...prevMessages,
            { text: message, timestamp: currentTime }
        ]);
        setMessage('');

        setTimeout(() => {
            const receivedMessage = { text: "I'm here! How can I help?", timestamp: new Date().toLocaleTimeString() };
            setMessages(prevMessages => [...prevMessages, receivedMessage]);
        }, 1000);
    };

    return (
        <div>
            <div className="container">
                <h1>Chat App</h1>
            </div>
            {/* Chat Popup Button */}
            <button
                type="button"
                className="chat-btn rounded-circle"
                onClick={toggleChat}
            >
                <FaComments size={24} color="white" />
            </button>

            {/* Chat Popup Window */}
            <div className={`chat-window ${isOpen ? 'open' : ''}`}>
                <div className="chat-header">
                    <div className="user-info">
                        <img className="profile-img" src="profile-img.png" alt="icon.." />
                        <span>User name</span>
                    </div>
                    <button className="btn-close" onClick={toggleChat}>
                        X
                    </button>
                </div>
                <div className="chat-body">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`message ${index % 2 === 0 ? 'sent' : 'received'}`}
                        >
                            <div>{msg.text}</div>
                            <div className="timestamp">{msg.timestamp}</div>
                        </div>
                    ))}
                </div>
                <div className="chat-footer">
                    <form className="d-flex flex-direction-row align-items-center" onSubmit={handleSendMessage}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Type a message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <img className="share-img" src="share.png" alt="send" onClick={handleSendMessage} />
                    </form>
                </div>
            </div>
        </div>
    );
}
