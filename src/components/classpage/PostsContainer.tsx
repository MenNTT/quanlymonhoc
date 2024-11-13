import React, { useState } from "react";
import MainContent from "./MainContent.tsx";

const PostsContainer: React.FC = () => {
    // Keep the state as 'posts' | 'files' only
    const [selectedTab, setSelectedTab] = useState<'posts' | 'files'>('posts');

    // Create a function to handle the additional tabs separately
    const handleSelectTab = (tab: 'posts' | 'files' | 'meetNow' | 'scheduleMeeting') => {
        if (tab === 'meetNow') {
            alert('Starting an instant meeting...');
        } else if (tab === 'scheduleMeeting') {
            alert('Scheduling a meeting...');
        } else {
            setSelectedTab(tab); // For 'posts' and 'files', update the state
        }
    };

    return (
        <>
            <MainContent selectedTab={selectedTab} onSelectTab={handleSelectTab} /> {/* Pass the handler and selectedTab */}
        </>
    );
};

export default PostsContainer;
