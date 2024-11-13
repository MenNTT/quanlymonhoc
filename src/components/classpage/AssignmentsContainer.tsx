// src/components/classpage/AssignmentsContainer.tsx

import React, { useState } from 'react';
import AssignmentList from './AssignmentList';
import AssignmentDetail from './AssignmentDetail';
import { Assignment } from '../../mock_data/mockAssignment';

const AssignmentsContainer: React.FC = () => {
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);

    const handleBack = () => {
        setSelectedAssignment(null);
    };

    const updateAssignmentStatus = (id: number, status: 'upcoming' | 'pastDue' | 'completed') => {
        setAssignments(assignments.map(assignment =>
            assignment.id === id ? { ...assignment, status } : assignment
        ));
    };

    return (
        <>
            {selectedAssignment ? (
                <AssignmentDetail
                    assignment={selectedAssignment}
                    onBack={handleBack}
                    onUpdateStatus={updateAssignmentStatus}
                />
            ) : (
                <AssignmentList
                    assignments={assignments}
                    setAssignments={setAssignments}
                    onSelectAssignment={setSelectedAssignment}
                />
            )}
        </>
    );
};

export default AssignmentsContainer;