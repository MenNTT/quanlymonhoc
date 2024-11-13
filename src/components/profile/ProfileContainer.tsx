import React, {useState} from 'react';
import Profile from './Profile';
import Sidebar from './Sidebar';
import ClassList from "./ClassList.tsx";

const ProfileContainer: React.FC = () => {
    const [showClassList, setShowClassList] = useState(false);

    return (
        <div className="d-flex position-relative">
            <Sidebar setShowClassList={setShowClassList} />
            {showClassList ? <ClassList /> : <Profile />}
        </div>
    );
};

export default ProfileContainer;
