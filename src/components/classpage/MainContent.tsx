import React, { useEffect, useRef, useState } from 'react';
import ClassNavigation from './ClassNavigation';
import FileComponent from './FileComponent';
import PostForm from './PostForm';
import { Post } from '../../mock_data/mockPost';
import { Comment } from '../../mock_data/mockComment';
import { useUser } from '../../contexts/UserContext';

interface MainContentProps {
    selectedTab: 'posts' | 'files';
    onSelectTab: (tab: 'posts' | 'files' | 'meetNow' | 'scheduleMeeting') => void;
}

const MainContent: React.FC<MainContentProps> = ({ selectedTab, onSelectTab }) => {
    const [isPostFormVisible, setPostFormVisible] = useState(false);
    const [posts, setPosts] = useState<Post[]>([]);
    const { user } = useUser();

    const handlePostSubmit = (postData: { subject: string; content: string; files: File[] }) => {
        const newPost: Post = {
            subject: postData.subject,
            message: postData.content,
            comments: [],
            username: 'User',
            avatar: 'https://via.placeholder.com/30',
            timestamp: new Date().toLocaleString(),
            attachedFiles: postData.files[0],
        };
        setPosts([...posts, newPost]);
        setPostFormVisible(false);
    };

    const handleCreateMeetingPost = (post: Post) => {
        setPosts([...posts, post]);
    };

    const handleSelectTab = (tab: 'posts' | 'files' | 'meetNow' | 'scheduleMeeting') => {
        if (tab === 'meetNow') {
            alert('Bắt đầu cuộc họp ngay lập tức...');
        } else if (tab === 'scheduleMeeting') {
            alert('Lên lịch cuộc họp...');
        } else {
            onSelectTab(tab);
        }
    };

    const handleJoinClick = () => {
        if (user) {
            const storedUsers = sessionStorage.getItem('onlineUsers');
            const onlineUsers = storedUsers ? JSON.parse(storedUsers) : [];
            onlineUsers.push(user);
            sessionStorage.setItem('onlineUsers', JSON.stringify(onlineUsers));

            window.open('/online-classroom', '_blank');
        }
    };

    const handleCommentSubmit = (postIndex: number, comment: { message: string; files: File[] }) => {
        const newComment: Comment = {
            message: comment.message,
            username: 'User',
            avatar: 'https://via.placeholder.com/30',
            timestamp: new Date().toLocaleString(),
            attachedFiles: comment.files[0],
        };

        const updatedPosts = [...posts];
        updatedPosts[postIndex].comments.push(newComment);
        setPosts(updatedPosts);
    };

    return (
        <div className="flex-grow-1 p-3" style={{ marginLeft: '250px' }}>
            <ClassNavigation onSelect={handleSelectTab} onCreateMeetingPost={handleCreateMeetingPost} />

            {isPostFormVisible ? (
                <PostForm onClose={() => setPostFormVisible(false)} onSave={handlePostSubmit} />
            ) : null}

            <div style={{ marginTop: '20px', height: 'calc(100vh - 190px)', overflowY: 'auto' }}>
                {selectedTab === 'posts' ? (
                    posts.length === 0 ? (
                        <p style={{ marginTop: '40vh', marginLeft: '30vw' }}>Chưa có bài viết nào.</p>
                    ) : (
                        posts.map((post, postIndex) => (
                            <div key={postIndex} className="border rounded p-2 mb-3 bg-light">
                                <div className="d-flex align-items-center mb-2">
                                    <img
                                        src={post.avatar}
                                        alt="Avatar"
                                        className="rounded-circle me-2"
                                        style={{ width: '30px', height: '30px' }}
                                    />
                                    <div>
                                        <strong>{post.username}</strong>{' '}
                                        <span className="text-muted" style={{ fontSize: 'small' }}>
                                            {post.timestamp}
                                        </span>
                                    </div>
                                </div>
                                <h5>{post.subject}</h5>
                                <p dangerouslySetInnerHTML={{ __html: post.message }}></p>
                                {post.attachedFiles && (
                                    <div>
                                        <hr className='text-black'></hr>
                                        <strong>File đính kèm:</strong>
                                        <ul>
                                            <li>
                                                <a href={URL.createObjectURL(post.attachedFiles)} target="_blank" rel="noopener noreferrer">
                                                    {post.attachedFiles.name}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                                <div className="mt-2">
                                    <hr className='text-black'></hr>
                                    {post.comments.map((comment, index) => (
                                        <div key={index} className="border rounded p-2 mb-2 bg-white d-flex">
                                            <img
                                                src={comment.avatar}
                                                alt="Avatar"
                                                className="rounded-circle me-2"
                                                style={{ width: '30px', height: '30px' }}
                                            />
                                            <div>
                                                <strong>{comment.username}</strong>{' '}
                                                <span className="text-muted" style={{ fontSize: 'small' }}>
                                                    {comment.timestamp}
                                                </span>
                                                <p>{comment.message}</p>
                                                {comment.attachedFiles && (
                                                    <div>
                                                        <strong>File đính kèm:</strong>
                                                        <ul>
                                                            <li>
                                                                <a href={URL.createObjectURL(comment.attachedFiles)} target="_blank" rel="noopener noreferrer">
                                                                    {comment.attachedFiles.name}
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    <CommentBox
                                        onSubmit={(message, attachedFiles) =>
                                            handleCommentSubmit(postIndex, {
                                                message,
                                                files: attachedFiles,
                                            })
                                        }
                                    />
                                </div>
                                <button onClick={handleJoinClick} className="btn btn-primary mt-2">
                                    Join
                                </button>
                            </div>
                        ))
                    )
                ) : (
                    <FileComponent />
                )}
            </div>

            {!isPostFormVisible && (
                <button
                    className="btn btn-primary position-fixed"
                    style={{ bottom: '0', left: '20%', margin: '20px' }}
                    onClick={() => setPostFormVisible(true)}
                >
                    Tạo bài viết mới
                </button>
            )}
        </div>
    );
};

const CommentBox: React.FC<{ onSubmit: (message: string, attachedFiles: File[]) => void }> = ({ onSubmit }) => {
    const [comment, setComment] = useState('');
    const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const adjustTextareaHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    useEffect(() => {
        adjustTextareaHeight();
    }, [comment]);

    const handleCommentSubmit = () => {
        if (comment.trim() || attachedFiles.length > 0) {
            onSubmit(comment, attachedFiles);
            setComment('');
            setAttachedFiles([]);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setAttachedFiles((prevFiles) => [...prevFiles, ...files]);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleCommentSubmit();
        }
    };

    return (
        <div className="mt-3 d-flex align-items-start">
            <textarea
                ref={textareaRef}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Viết bình luận..."
                className="form-control me-2"
                style={{ resize: 'none', overflow: 'hidden', minHeight: '38px' }}
            />
            <input
                type="file"
                id="fileInput"
                multiple
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <button
                className="btn btn-light me-2"
                onClick={() => document.getElementById('fileInput')?.click()}
            >
                {attachedFiles.length > 0 ? (
                    <i className="bi bi-check-circle-fill text-success"></i>
                ) : (
                    <i className="bi bi-paperclip"></i>
                )}
            </button>
            <button
                onClick={handleCommentSubmit}
                className="btn btn-primary"
                disabled={!comment.trim() && attachedFiles.length === 0}
            >
                <i className="bi bi-send"></i>
            </button>
        </div>
    );
};

export default MainContent;