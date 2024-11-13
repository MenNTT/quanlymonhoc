import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import CSS for React Quill
import { FaPaperclip } from 'react-icons/fa'; // Import icon for attach

interface AssignmentFormProps {
    onClose: () => void; // Callback to close the form
    onSave: (assignmentData: { subject: string; content: string; deadline: string; files: File[] }) => void; // Callback to save the assignment
}

const AssignmentForm: React.FC<AssignmentFormProps> = ({ onClose, onSave }) => {
    const [subject, setSubject] = useState(''); // State for assignment subject
    const [content, setContent] = useState(''); // State for assignment content (with rich text)
    const [deadline, setDeadline] = useState(''); // State for deadline
    const [files, setFiles] = useState<File[]>([]); // State for uploaded files

    // Handle file selection
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFiles(Array.from(event.target.files)); // Convert FileList to an array and store it in state
        }
    };

    // Handle form submission
    const handleSubmit = () => {
        if (subject && content && deadline) {
            onSave({ subject, content, deadline, files }); // Pass files along with the other data
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
                placeholder="Write the assignment content here..."
                modules={{
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'], // Basic formatting buttons
                        [{ list: 'ordered' }, { list: 'bullet' }], // Lists
                        ['link'], // Link insertion
                        [{ align: [] }], // Align text
                        ['clean'], // Clear formatting
                    ],
                }}
            />

            {/* Attach file button */}
            <div className="d-flex align-items-center mt-3">
                <label htmlFor="fileInput" style={{ cursor: 'pointer', marginRight: '10px' }}>
                    <FaPaperclip size={20} /> {/* Icon for attaching files */}
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }} // Hide the default file input
                    onChange={handleFileChange}
                    multiple // Allow multiple file uploads
                />
                <span>{files.length > 0 && `${files.length} file(s) selected`}</span>
            </div>

            {/* Deadline picker */}
            <div style={styles.footer}>
                <input
                    type="datetime-local"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    style={styles.deadlineInput}
                />
                <button onClick={handleSubmit} style={styles.saveButton}>
                    Save Assignment
                </button>
            </div>
        </div>
    );
};

// Styles for the form
const styles: { [key: string]: React.CSSProperties } = {
    container: {
        position: 'fixed',
        bottom: 0,
        right: 0,
        width: 'calc(100% - 250px)',
        backgroundColor: '#f8f9fa',
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        zIndex: 1000,
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

export default AssignmentForm;
