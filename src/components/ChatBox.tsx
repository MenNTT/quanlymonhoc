import React, { useState } from 'react';
import '../styles/ChatBox.css';
import { FaComments, FaPaperPlane, FaTimes } from 'react-icons/fa';

const ChatBox: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    // Danh sách câu trả lời tự động
    const autoResponses = {
        default: "Xin lỗi, tôi không hiểu câu hỏi của bạn. Bạn có thể cho tôi biết:\n1. Bạn đã có kinh nghiệm lập trình chưa?\n2. Bạn muốn theo đuổi Frontend hay Backend?\n3. Thời gian học mong muốn của bạn?",
        
        greetings: [
            "Xin chào! 👋 Tôi là trợ lý tư vấn của EDUPATH. Bạn đang quan tâm đến lĩnh vực nào?",
            "Chào bạn! 😊 Để tư vấn tốt nhất, bạn có thể cho tôi biết mục tiêu học tập của bạn không?",
            "Hi! 🌟 Rất vui được tư vấn cho bạn. Bạn đã có định hướng về nghề nghiệp chưa?"
        ],

        beginner: [
            "Đối với người mới bắt đầu, EDUPATH có lộ trình học từ zero:\n1. Fundamental (2 tháng)\n2. Frontend/Backend Basic (4 tháng)\n3. Chuyên sâu (6 tháng)\nBạn muốn tìm hiểu giai đoạn nào?",
            "Chúng tôi có khóa học Bootcamp cho người mới:\n✅ HTML, CSS, JavaScript cơ bản\n✅ Tư duy lập trình\n✅ Thực hành dự án\n✅ Mentoring 1-1",
            "Để bắt đầu, bạn nên học:\n1. Web Foundation (HTML, CSS)\n2. JavaScript Basics\n3. Git cơ bản\nBạn muốn đăng ký học thử miễn phí không?"
        ],

        frontend: [
            "Lộ trình Frontend Developer (8 tháng):\n1. HTML/CSS Master (2 tháng)\n2. JavaScript Advanced (2 tháng)\n3. ReactJS (2 tháng)\n4. Dự án thực tế (2 tháng)\nMức lương: 15-35M/tháng",
            "Frontend roadmap chi tiết:\n1. Web Fundamentals\n2. UI/UX Principles\n3. JavaScript & ES6+\n4. React & Redux\n5. Responsive Design\n6. Performance & SEO",
            "Kỹ năng Frontend cần có:\n✅ HTML5 Semantic\n✅ CSS3 & Flexbox/Grid\n✅ JavaScript Modern\n✅ React Ecosystem\n✅ Git & DevTools"
        ],

        backend: [
            "Lộ trình Backend Developer (10 tháng):\n1. Programming Basic (2 tháng)\n2. Database & API (3 tháng)\n3. NodeJS/Python (3 tháng)\n4. DevOps Basic (2 tháng)\nMức lương: 20-40M/tháng",
            "Backend roadmap chi tiết:\n1. Algorithm & Data Structure\n2. Database Design\n3. RESTful API\n4. Authentication/Security\n5. Server Deployment",
            "Kỹ năng Backend cần có:\n✅ Server Programming\n✅ Database Management\n✅ API Development\n✅ Security & Performance\n✅ Cloud Services"
        ],

        career: [
            "Cơ hội việc làm sau khóa học:\n👨‍💻 Junior Developer (10-18M)\n👨‍💻 Mid-level (18-35M)\n👨‍💻 Senior (35-50M)\nChúng tôi cam kết hỗ trợ tìm việc sau tốt nghiệp!",
            "EDUPATH có các đối tác tuyển dụng:\n🏢 Các công ty outsourcing\n🏢 Product Company\n🏢 Startup công nghệ\nBạn muốn tham gia buổi career talk không?",
            "Hỗ trợ việc làm:\n✅ CV & Portfolio Review\n✅ Mock Interview\n✅ Job Connect\n✅ Career Mentoring\nBạn quan tâm đến vị trí nào?"
        ],

        experience: [
            "Với người đã có kinh nghiệm, chúng tôi có:\n🔥 Advanced Courses\n🔥 Tech Leader Path\n🔥 System Design\n🔥 Microservices",
            "Khóa học nâng cao bao gồm:\n📚 Design Patterns\n📚 Clean Architecture\n📚 DevOps CI/CD\n📚 Cloud Native",
            "Senior Developer Path:\n🚀 Technical Leadership\n🚀 System Optimization\n🚀 Team Management\n🚀 Architecture Design"
        ],

        pricing: [
            "Học phí linh hoạt theo lộ trình:\n💰 Fundamental: 12M\n💰 Professional: 25M\n💰 Advanced: 35M\nTrả góp 0% lãi suất trong 12 tháng!",
            "Ưu đãi đặc biệt:\n🎁 Giảm 20% khi đăng ký combo\n🎁 Học thử 3 buổi miễn phí\n🎁 Tặng khóa học AWS/Docker\n🎁 Career Coaching 1-1",
            "Investment cho sự nghiệp:\n📈 Fundamental: 4M/tháng\n📈 Professional: 6M/tháng\n📈 Advanced: 8M/tháng\nRoi trung bình: 300%/năm"
        ]
    };

    // Hàm phân tích nội dung tin nhắn
    const analyzeMessage = (msg: string): string => {
        msg = msg.toLowerCase();
        
        if (msg.match(/\b(hi|hello|chào|xin chào|hey)\b/)) {
            return 'greetings';
        }
        
        if (msg.match(/\b(mới|bắt đầu|start|beginner|basic|cơ bản|zero|chưa biết)\b/)) {
            return 'beginner';
        }
        
        if (msg.match(/\b(frontend|react|vue|angular|ui|giao diện|web|website)\b/)) {
            return 'frontend';
        }
        
        if (msg.match(/\b(backend|server|database|api|nodejs|python|java)\b/)) {
            return 'backend';
        }
        
        if (msg.match(/\b(job|việc|lương|career|nghề|tuyển dụng|việc làm)\b/)) {
            return 'career';
        }
        
        if (msg.match(/\b(kinh nghiệm|senior|advanced|expert|chuyên sâu|cao cấp)\b/)) {
            return 'experience';
        }
        
        if (msg.match(/\b(giá|học phí|price|chi phí|phí|tiền|đóng|đăng ký)\b/)) {
            return 'pricing';
        }
        
        return 'default';
    };

    // Hàm lấy câu trả lời ngẫu nhiên từ danh sách
    const getRandomResponse = (category: string): string => {
        if (category === 'default') return autoResponses.default;
        const responses = autoResponses[category as keyof typeof autoResponses] as string[];
        return responses[Math.floor(Math.random() * responses.length)];
    };

    const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
        { text: "Xin chào! Tôi là trợ lý ảo của EDUPATH 👋", isUser: false },
        { text: "Tôi có thể giúp gì cho bạn?", isUser: false }
    ]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim()) {
            setMessages(prev => [...prev, { text: message, isUser: true }]);
            
            const messageType = analyzeMessage(message);
            const response = getRandomResponse(messageType);
            
            setMessage('');
            setIsTyping(true);
            
            // Gửi câu trả lời chính
            setTimeout(() => {
                setIsTyping(false);
                setMessages(prev => [...prev, { text: response, isUser: false }]);
                
                // Thêm câu hỏi follow-up sau 1 giây
                setTimeout(() => {
                    const followUp = getFollowUpQuestion(messageType);
                    setMessages(prev => [...prev, { text: followUp, isUser: false }]);
                }, 1000);
            }, 1500);
        }
    };

    // Avatar URLs
    const botAvatar = "https://static.vecteezy.com/system/resources/previews/022/739/948/non_2x/chatbot-robo-advisor-chat-bot-robot-like-assistant-concept-of-digital-advisor-avatar-to-help-the-customer-icon-vector.jpg"; // Link đến avatar bot
    const userAvatar = "https://phongreviews.com/wp-content/uploads/2022/11/avatar-facebook-mac-dinh-19.jpg"; // Link đến avatar user mặc định

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    // Thêm gợi ý sau mỗi tin nhắn
    const getFollowUpQuestion = (category: string): string => {
        switch(category) {
            case 'beginner':
                return "Bạn muốn bắt đầu từ Frontend hay Backend?";
            case 'frontend':
                return "Bạn đã có kinh nghiệm với HTML/CSS chưa?";
            case 'backend':
                return "Bạn đã học qua ngôn ngữ lập trình nào chưa?";
            case 'career':
                return "Bạn mong muốn mức lương khởi điểm bao nhiêu?";
            case 'experience':
                return "Bạn muốn phát triển theo hướng Technical Lead hay Solution Architect?";
            case 'pricing':
                return "Bạn quan tâm đến hình thức học phí trả góp không?";
            default:
                return "Bạn cần tư vấn thêm về vấn đề gì?";
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
                    <div className="header-info">
                        <img src={botAvatar} alt="Bot Avatar" className="bot-avatar" />
                        <div>
                            <h4>EDUPATH Support</h4>
                            <span className="status">Online</span>
                        </div>
                    </div>
                    <button className="close-btn" onClick={toggleChat}>
                        <FaTimes />
                    </button>
                </div>

                <div className="messages-container">
                    {messages.map((msg, index) => (
                        <div key={index} className="message-wrapper">
                            {!msg.isUser && (
                                <img src={botAvatar} alt="Bot" className="message-avatar" />
                            )}
                            <div className={`message ${msg.isUser ? 'user-message' : 'bot-message'}`}>
                                {msg.text}
                            </div>
                            {msg.isUser && (
                                <img src={userAvatar} alt="User" className="message-avatar user-avatar" />
                            )}
                        </div>
                    ))}
                    {isTyping && (
                        <div className="message-wrapper">
                            <img src={botAvatar} alt="Bot" className="message-avatar" />
                            <div className="typing-indicator">
                                <div className="typing-dot"></div>
                                <div className="typing-dot"></div>
                                <div className="typing-dot"></div>
                            </div>
                        </div>
                    )}
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