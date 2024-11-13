import React, { useState, useRef, useEffect } from 'react';
import '../../../styles/OnlineClassroom.css';
import { User } from '../../../mock_data/mockUsers';
import { useUser } from '../../contents/UserContext';

const OnlineClassroom: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'chat' | 'people'>('people');
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [messages, setMessages] = useState<{ user: User; content: string }[]>([]);
    const [message, setMessage] = useState('');
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const { user } = useUser();

    useEffect(() => {
        const storedUsers = sessionStorage.getItem('onlineUsers');
        if (storedUsers) {
            setUsers(JSON.parse(storedUsers));
        }
    }, []);

    const handleToggleCamera = () => {
        if (isCameraOn) {
            setIsCameraOn(false);
            if (videoRef.current && videoRef.current.srcObject) {
                (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
                videoRef.current.srcObject = null;
            }
        } else {
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then((stream) => {
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                    }
                    setIsCameraOn(true);
                })
                .catch((error) => console.error('Error accessing camera: ', error));
        }
    };

    const handleSendMessage = () => {
        if (message.trim() && user) {
            setMessages([...messages, { user, content: message }]);
            setMessage('');
        }
    };

    return (
        <div>
            <nav className="navbar navbar-light bg-light p-2">
                <div className="container-fluid">
                    <div className="d-flex">
                        <button className="btn btn-light icon-button me-2" onClick={() => setActiveTab('chat')}>
                            <i className="bi bi-chat-dots"></i>
                        </button>
                        <button className="btn btn-light icon-button me-2" onClick={() => setActiveTab('people')}>
                            <i className="bi bi-people"></i>
                        </button>
                        <button className="btn btn-light icon-button me-2" onClick={handleToggleCamera}>
                            <i className={`bi bi-camera-video${isCameraOn ? '-off' : ''}`}></i>
                        </button>
                        <button className="btn btn-light icon-button me-2">
                            <i className="bi bi-mic"></i>
                        </button>
                        <button className="btn btn-light icon-button me-2">
                            <i className="bi bi-display"></i>
                        </button>
                    </div>
                </div>
            </nav>

            <div className="container-fluid main-content d-flex">
                <div className="content-area col-md-9 d-flex justify-content-center align-items-center text-white bg-dark">
                    {isCameraOn ? (
                        <video ref={videoRef} autoPlay playsInline className="w-100" style={{ maxWidth: '600px' }}></video>
                    ) : (
                        <p>Nội dung chính hiển thị ở đây (Camera, Chia sẻ màn hình, v.v.)</p>
                    )}
                </div>

                <div className="sidebar col-md-3 bg-white p-3">
                    {activeTab === 'chat' ? (
                        <div id="chatBox" className="chat-box">
                            <h5>Chat</h5>
                            <div className="messages mb-3" style={{ minHeight: '300px', overflowY: 'auto' }}>
                                {messages.map((msg, index) => (
                                    <div key={index} className="d-flex align-items-start mb-2">
                                        <img src="https://via.placeholder.com/30" alt="Avatar" className="rounded-circle me-2" />
                                        <div>
                                            <strong>{msg.user.name}</strong>
                                            <p className="mb-0">{msg.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="input-group chat-input">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nhập tin nhắn..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                                <button className="btn btn-primary" type="button" onClick={handleSendMessage}>
                                    <i className="bi bi-send"></i>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div id="userList" className="user-list">
                            <h5>Danh sách người dùng</h5>
                            {users.map((user) => (
                                <div key={user.id} className="user mb-3 d-flex align-items-center">
                                    <img src="https://via.placeholder.com/50" className="user-avatar me-2" alt="User Avatar" />
                                    <span>{user.name}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OnlineClassroom;