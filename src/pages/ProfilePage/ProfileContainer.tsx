import React, {useState} from 'react';
import Profile from '../../components/profile/Profile';
import Sidebar from '../../components/profile/Sidebar';
import ClassList from "../../components/profile/ClassList";

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
