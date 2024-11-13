import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import CSS for React Quill
import { FaPaperclip } from 'react-icons/fa'; // Import icon for attach

interface PostFormProps {
    onClose: () => void; // Callback to close the form
    onSave: (postData: { subject: string; content: string; files: File[] }) => void; // Callback to save the post
}

const PostForm: React.FC<PostFormProps> = ({ onClose, onSave }) => {
    const [subject, setSubject] = useState(''); // State for post subject
    const [content, setContent] = useState(''); // State for post content (with rich text)
    const [files, setFiles] = useState<File[]>([]); // State for uploaded files

    // Handle file selection
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFiles(Array.from(event.target.files)); // Convert FileList to an array and store it in state
        }
    };

    // Handle form submission
    const handleSubmit = () => {
        if (subject && content) {
            onSave({ subject, content, files }); // Pass files along with the other data
            onClose(); // Close the form after saving
        } else {
            alert('Please fill in all fields');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <input
                    type="text"
                    placeholder="Enter subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    style={styles.subjectInput}
                />
                <button onClick={onClose} style={styles.closeButton}>
                    Close
                </button>
            </div>

            {/* Toolbar for text editing */}
            <ReactQuill
                value={content}
                onChange={setContent}
                style={styles.editor}
                placeholder="Write your post here..."
                modules={{
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'], // Basic formatting buttons
                        [{list: 'ordered'}, {list: 'bullet'}], // Lists
                        ['link'], // Link insertion
                        [{align: []}], // Align text
                        [{'header': '1'}, {'header': '2'}], // Headings
                        ['image'], // Image insertion
                        ['clean'], // Remove formatting
                    ],
                }}
            />

            {/* File attachment */}
            <div style={styles.attachFile}>
                <label htmlFor="file-upload" style={styles.attachButton}>
                    <FaPaperclip size={20} style={{marginRight: 5}}/>
                </label>
                <input
                    id="file-upload"
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    style={{display: 'none'}}
                />
                <span>{files.length > 0 && `${files.length} file(s) selected`}</span>
            </div>

            {/* Submit button */}
            <div style={styles.footer}>
                <button onClick={handleSubmit} style={styles.saveButton}>
                    Submit
                </button>
            </div>
        </div>
    );
};

// Styles for the PostForm component
const styles: { [key: string]: React.CSSProperties } = {
    container: {
        position: 'fixed',
        bottom: 0,
        right: 0,
        width: 'calc(100% - 250px)',
        backgroundColor: '#f8f9fa',
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        zIndex: 9999,
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
    },
    subjectInput: {
        width: '80%',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    closeButton: {
        backgroundColor: 'transparent',
        border: 'none',
        fontSize: '16px',
        cursor: 'pointer',
    },
    editor: {
        marginBottom: '10px',
        height: 'auto', // Adjusted height for the editor
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '10px',
    },
    deadlineInput: {
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    saveButton: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default PostForm;