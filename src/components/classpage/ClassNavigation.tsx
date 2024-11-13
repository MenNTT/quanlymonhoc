import { BsFillFileEarmarkTextFill, BsFileEarmark, BsCameraVideoFill } from 'react-icons/bs';
import { Dropdown } from 'react-bootstrap';
import { Post } from '../../mock_data/mockPost';
import { useUser } from '../contents/UserContext.tsx'; // Import useUser hook

interface ClassNavigationProps {
    onSelect: (tab: 'posts' | 'files' | 'meetNow' | 'scheduleMeeting') => void;
    onCreateMeetingPost: (post: Post) => void;
}

const ClassNavigation: React.FC<ClassNavigationProps> = ({ onSelect, onCreateMeetingPost }) => {
    const { user } = useUser();

    const handleMeetNowClick = () => {
        if (user) {
            const newPost: Post = {
                subject: `Meeting ${new Date().toLocaleString()}`,
                message: '<button onclick="window.open(\'/online-classroom\', \'_blank\')">Join</button>',
                comments: [],
                username: user.name,
                avatar: 'https://via.placeholder.com/30',
                timestamp: new Date().toLocaleString(),
                attachedFiles: null,
            };
            onCreateMeetingPost(newPost);

            const storedUsers = sessionStorage.getItem('onlineUsers');
            const onlineUsers = storedUsers ? JSON.parse(storedUsers) : [];
            onlineUsers.push(user);
            sessionStorage.setItem('onlineUsers', JSON.stringify(onlineUsers));

            window.open('/online-classroom', '_blank');
        }
    };

    return (
        <nav className="mb-3" style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '0.25rem', zIndex: '9000' }}>
            <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                    <div
                        className="d-flex align-items-center me-3"
                        onClick={() => onSelect('posts')}
                        style={{ cursor: 'pointer' }}
                    >
                        <BsFillFileEarmarkTextFill className="me-2" />
                        <span>Posts</span>
                    </div>
                    <div className="vr" style={{ height: '20px', margin: '0 10px' }}></div>
                    <div
                        className="d-flex align-items-center ms-3"
                        onClick={() => onSelect('files')}
                        style={{ cursor: 'pointer' }}
                    >
                        <BsFileEarmark className="me-2" />
                        <span>Files</span>
                    </div>
                </div>

                <div className="d-flex align-items-center">
                    <div className="d-flex align-items-center" style={{ cursor: 'pointer' }}>
                        <BsCameraVideoFill className="me-2" onClick={handleMeetNowClick} />
                    </div>

                    <Dropdown>
                        <Dropdown.Toggle
                            variant="light"
                            id="dropdown-basic"
                            className="p-0"
                            style={{ boxShadow: 'none', border: 'none' }}
                        >
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={handleMeetNowClick}>Meet now</Dropdown.Item>
                            <Dropdown.Item onClick={() => onSelect('scheduleMeeting')}>Schedule meeting</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </nav>
    );
};

export default ClassNavigation;