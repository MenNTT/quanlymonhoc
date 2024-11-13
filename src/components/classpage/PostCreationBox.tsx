import React, { useState, useRef } from 'react';
import { FaBold, FaItalic, FaUnderline, FaStrikethrough, FaListUl, FaListOl, FaHighlighter, FaFont, FaLink, FaCode, FaQuoteLeft } from 'react-icons/fa';

interface PostCreationBoxProps {
    onClose: () => void;
    onSubmit: (subject: string, message: string) => void;
}

const PostCreationBox: React.FC<PostCreationBoxProps> = ({ onClose, onSubmit }) => {
    const [subject, setSubject] = useState('');
    const contentEditableRef = useRef<HTMLDivElement>(null);

    const handleSubmit = () => {
        const message = contentEditableRef.current?.innerHTML || '';
        onSubmit(subject, message);
        setSubject('');
        if (contentEditableRef.current) {
            contentEditableRef.current.innerHTML = '';
        }
    };

    // Hàm xử lý khi nhấn các nút định dạng
    const applyStyle = (command: string, value: string = '') => {
        document.execCommand(command, false, value);
    };

    return (
        <div className="border rounded p-3 mb-3 bg-light position-fixed w-75"
             style={{ bottom: '0' }}>
            <div className="d-flex justify-content-between align-items-center">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                />
                <button className="btn btn-close" onClick={onClose}></button>
            </div>
            <div className="my-2">
                <div className="btn-group" role="group">
                    <button className="btn btn-outline-secondary" onClick={() => applyStyle('bold')}>
                        <FaBold />
                    </button>
                    <button className="btn btn-outline-secondary" onClick={() => applyStyle('italic')}>
                        <FaItalic />
                    </button>
                    <button className="btn btn-outline-secondary" onClick={() => applyStyle('underline')}>
                        <FaUnderline />
                    </button>
                    <button className="btn btn-outline-secondary" onClick={() => applyStyle('strikeThrough')}>
                        <FaStrikethrough />
                    </button>
                    <button className="btn btn-outline-secondary" onClick={() => applyStyle('insertUnorderedList')}>
                        <FaListUl />
                    </button>
                    <button className="btn btn-outline-secondary" onClick={() => applyStyle('insertOrderedList')}>
                        <FaListOl />
                    </button>
                    <button className="btn btn-outline-secondary" onClick={() => applyStyle('hiliteColor', 'yellow')}>
                        <FaHighlighter />
                    </button>
                    <button className="btn btn-outline-secondary" onClick={() => applyStyle('foreColor', 'red')}>
                        <FaFont />
                    </button>
                    <button className="btn btn-outline-secondary" onClick={() => {
                        const url = prompt('Enter the URL');
                        if (url) applyStyle('createLink', url);
                    }}>
                        <FaLink />
                    </button>
                    <button className="btn btn-outline-secondary" onClick={() => applyStyle('formatBlock', 'pre')}>
                        <FaCode />
                    </button>
                    <button className="btn btn-outline-secondary" onClick={() => applyStyle('insertHTML', '<pre><code>Snippet</code></pre>')}>
                        <FaQuoteLeft />
                    </button>
                </div>
            </div>
            <div
                ref={contentEditableRef}
                className="form-control mb-2"
                style={{ minHeight: '100px', overflow: 'auto' }}
                contentEditable={true}
            ></div>
            <div className="d-flex justify-content-between">
                <button className="btn btn-outline-secondary">Attach File</button>
                <button className="btn btn-primary" onClick={handleSubmit}>Post</button>
            </div>
        </div>
    );
};

export default PostCreationBox;
