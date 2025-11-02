'use client';

import action from 'src/components/actions/logoutActions';

const LogoutButtonDashboard = () => {
    return (
        <button onClick={async () => await action()} className="back-button">
            Logout
        </button>
    );
};

export default LogoutButtonDashboard;
