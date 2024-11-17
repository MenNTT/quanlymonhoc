// src/components/classpage/AssignmentDetail.tsx

import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaPaperclip, FaCheckCircle } from 'react-icons/fa';
import { Assignment } from '../../mock_data/mockAssignment';
import { useUser } from '../../contexts/UserContext';
import { Submission } from '../../mock_data/mockSubmission';

interface AssignmentDetailProps {
    assignment: Assignment;
    onBack: () => void;
    onUpdateStatus: (id: number, status: 'upcoming' | 'pastDue' | 'completed') => void;
}

const AssignmentDetail: React.FC<AssignmentDetailProps> = ({ assignment, onBack, onUpdateStatus }) => {
    const { user } = useUser();
    const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
    const [isTurnedIn, setIsTurnedIn] = useState(false);
    const [turnInTime, setTurnInTime] = useState<Date | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);

    useEffect(() => {
        // const existingSubmission = mockSubmissions.find(
        //     (submission) => submission.id_assignment === assignment.id && submission.id_user === user!.id
        // );
        const existingSubmission: Submission | any = null;
        if (existingSubmission) {
            setIsTurnedIn(true);
            setTurnInTime(new Date(existingSubmission.submissionTime));
            setAttachedFiles([existingSubmission.file]);
            setFileName(existingSubmission.file.name);
        }
    }, [assignment.id, user]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files);
            setAttachedFiles(filesArray);
            setFileName(filesArray[0].name);
        }
    };

    const handleTurnIn = () => {
        if (attachedFiles.length === 0) {
            alert('Please attach a file before turning in.');
            return;
        }

        if (isTurnedIn) {
            setIsTurnedIn(false);
            setTurnInTime(null);
            onUpdateStatus(assignment.id, 'upcoming');
        } else {
            const submission: Submission = {
                id_assignment: assignment.id,
                id_user: user!.id,
                file: attachedFiles[0],
                submissionTime: new Date().toISOString(),
            };
            // mockSubmissions.push(submission);

            setIsTurnedIn(true);
            setTurnInTime(new Date());
            onUpdateStatus(assignment.id, 'completed');
        }
    };

    const formatTurnInTime = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        };
        return date.toLocaleDateString(undefined, options);
    };

    return (
        <div style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
            <button className="btn btn-light mb-3" onClick={onBack}>
                <FaArrowLeft className="me-2" />
                Back to Assignments
            </button>

            <div className="card shadow-sm p-4">
                <div className="d-flex justify-content-between align-items-center">
                    <h4>{assignment.title}</h4>
                    <div className="d-flex align-items-center">
                        {isTurnedIn && turnInTime && (
                            <p className="mb-0 me-3">
                                Turned in {formatTurnInTime(turnInTime)}
                            </p>
                        )}
                        <button className="btn btn-primary" onClick={handleTurnIn}>
                            {isTurnedIn ? 'Undo turn in' : 'Turn in'}
                        </button>
                    </div>
                </div>
                <p><strong>Due Date:</strong> {assignment.dueDate}</p>
                <p>
                    <strong>Status:</strong> {assignment.status === 'completed' ? 'Completed' : assignment.status === 'pastDue' ? 'Past Due' : 'Upcoming'}
                </p>
                <p><strong>Description:</strong></p>
                <div dangerouslySetInnerHTML={{ __html: assignment.description }} />

                {assignment.files && assignment.files.length > 0 && (
                    <div className="mt-4">
                        <h5>Attached Files</h5>
                        <ul>
                            {assignment.files.map((file, index) => (
                                <li key={index}>
                                    <a href={URL.createObjectURL(file)} target="_blank" rel="noopener noreferrer">
                                        {file.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="mt-4">
                    <h5>Turn in your work</h5>
                    <div className="d-flex align-items-center">
                        <input
                            type="file"
                            id="fileInput"
                            multiple
                            onChange={handleFileChange}
                            className="form-control mb-2"
                            style={{ display: 'none' }}
                        />
                        <button
                            className="btn btn-light me-2"
                            onClick={() => document.getElementById('fileInput')?.click()}
                        >
                            {fileName ? (
                                <FaCheckCircle className="text-success" />
                            ) : (
                                <FaPaperclip />
                            )}
                        </button>
                        {fileName && <span>{fileName}</span>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssignmentDetail;