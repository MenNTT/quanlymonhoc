import React, { useState } from 'react';
import '../styles/ChatBox.css';
import { FaComments, FaPaperPlane, FaTimes } from 'react-icons/fa';

const ChatBox: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
        { text: "Xin chào! Tôi là trợ lý ảo của EDUPATH 👋", isUser: false },
        { text: "Tôi có thể giúp gì cho bạn?", isUser: false }
    ]);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim()) {
            setMessages([...messages, { text: message, isUser: true }]);
            
            setTimeout(() => {
                setMessages(prev => [...prev, {
                    text: "Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong thời gian sớm nhất! 🙂",
                    isUser: false
                }]);
            }, 1500);
            
            setMessage('');
        }
    };

    return (
        <div className="chatbox-container">
            <button 
                className={`chat-toggle-btn ${isOpen ? 'open' : ''}`}
                onClick={toggleChat}
                aria-label="Toggle chat"
            >
                {isOpen ? <FaTimes /> : <FaComments />}
            </button>

            <div className={`chat-window ${isOpen ? 'open' : ''}`}>
                <div className="chat-header">
                    <h4>EDUPATH Support</h4>
                    <button className="close-btn" onClick={toggleChat}>
                        <FaTimes />
                    </button>
                </div>

                <div className="messages-container">
                    {messages.map((msg, index) => (
                        <div 
                            key={index} 
                            className={`message ${msg.isUser ? 'user-message' : 'bot-message'}`}
                        >
                            {msg.text}
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="chat-input-container">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Nhập tin nhắn..."
                        className="chat-input"
                    />
                    <button type="submit" className="send-btn">
                        <FaPaperPlane />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatBox; 