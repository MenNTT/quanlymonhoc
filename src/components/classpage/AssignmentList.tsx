import React, { useState } from 'react';
import { FaClipboardList, FaPlus } from 'react-icons/fa';
import AssignmentForm from './AssignmentForm';
import { Assignment } from '../../mock_data/mockAssignment';

interface AssignmentListProps {
    assignments: Assignment[];
    setAssignments: React.Dispatch<React.SetStateAction<Assignment[]>>;
    onSelectAssignment: (assignment: Assignment) => void;
}

const AssignmentList: React.FC<AssignmentListProps> = ({ assignments, setAssignments, onSelectAssignment }) => {
    const [isFormVisible, setFormVisible] = useState(false);
    const [selectedTab, setSelectedTab] = useState<'upcoming' | 'pastDue' | 'completed'>('upcoming');

    const filteredAssignments = assignments.filter((assignment) => assignment.status === selectedTab);

    const handleSaveAssignment = (assignmentData: { subject: string; content: string; deadline: string; files: File[] }) => {
        const newAssignment: Assignment = {
            id: assignments.length + 1,
            title: assignmentData.subject,
            dueDate: assignmentData.deadline,
            description: assignmentData.content,
            status: 'upcoming',
            files: assignmentData.files,
        };

        setAssignments([...assignments, newAssignment]);
        setFormVisible(false);
    };

    return (
        <div style={{ marginLeft: '250px', width: 'calc(100% - 250px)' }}>
            <div className='position-fixed top-0 w-100' style={{ zIndex: 1000 }}>
                <div className="bg-light shadow-sm p-3 d-flex align-items-center">
                    <FaClipboardList className="me-2" size={24}/>
                    <h4 className="mb-0">Assignments</h4>
                </div>

                <div className="d-flex justify-content-between mb-3" style={{width: '83%'}}>
                    <div className="nav nav-tabs">
                        <button
                            className={`nav-link ${selectedTab === 'upcoming' ? 'active-tab' : ''}`}
                            onClick={() => setSelectedTab('upcoming')}
                            style={{color: selectedTab === 'upcoming' ? 'black' : 'gray'}}
                        >
                            Upcoming
                        </button>
                        <button
                            className={`nav-link ${selectedTab === 'pastDue' ? 'active-tab' : ''}`}
                            onClick={() => setSelectedTab('pastDue')}
                            style={{color: selectedTab === 'pastDue' ? 'black' : 'gray'}}
                        >
                            Past Due
                        </button>
                        <button
                            className={`nav-link ${selectedTab === 'completed' ? 'active-tab' : ''}`}
                            onClick={() => setSelectedTab('completed')}
                            style={{color: selectedTab === 'completed' ? 'black' : 'gray'}}
                        >
                            Completed
                        </button>
                    </div>

                    <button
                        className="ms-auto"
                        onClick={() => setFormVisible(true)}
                        style={{background: 'none', border: 'none', cursor: 'pointer', right: '0'}}
                    >
                        <FaPlus style={{color: 'black'}}/>
                    </button>
                </div>
            </div>

            <div style={{ marginTop: '100px', zIndex: '0', height: 'calc(100vh - 100px)', overflowY: 'auto' }}>
                {filteredAssignments.length === 0 ? (
                    <p style={{ marginTop: '40vh', marginLeft: '30vw' }}>No assignments in this category.</p>
                ) : (
                    <ul className="list-group">
                        {filteredAssignments.map((assignment) => (
                            <li
                                key={assignment.id}
                                className="list-group-item d-flex justify-content-between align-items-center"
                                style={{width: '100%', cursor: 'pointer'}}
                                onClick={() => onSelectAssignment(assignment)}
                            >
                                <div>
                                    <h5 className="mb-1">{assignment.title}</h5>
                                    <small className={assignment.status === 'pastDue' ? 'text-danger' : ''}>
                                        {assignment.status === 'completed' ? `Submitted at ${assignment.dueDate}` : `Due at ${assignment.dueDate}`}
                                    </small>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {isFormVisible && (
                <AssignmentForm
                    onClose={() => setFormVisible(false)}
                    onSave={handleSaveAssignment}
                />
            )}
        </div>
    );
};

export default AssignmentList;