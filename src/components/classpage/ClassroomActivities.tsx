import React, {useState} from 'react';
import ClassSidebar from "./ClassSidebar";
import PostsContainer from "./PostsContainer.tsx";
import AssignmentsContainer from "./AssignmentsContainer.tsx"; // Import MainContent

const ClassroomActivities: React.FC = () => {
    const [activeSection, setActiveSection] = useState<'general' | 'assignments' | 'grades' | 'notebook'>('general');

    const handleSectionSelect = (section: 'general' | 'assignments' | 'grades' | 'notebook') => {
        setActiveSection(section);
    };

    return (
        <div className="d-flex">
            <ClassSidebar onSelect={handleSectionSelect} />
            {activeSection === 'general' ? (
                <PostsContainer />
            ): (
                <AssignmentsContainer />
            )}
        </div>
    );
};

export default ClassroomActivities;
