// src/components/Auth/SessionExpiredHandle.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/SessionExpiredHandle.css'; // Pastikan path CSS ini benar

function SessionExpiredHandle() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Bersihkan semua data pengguna yang mungkin tersimpan
        localStorage.clear(); // Mengganti removeItem menjadi clear untuk membersihkan semua storage
        navigate('/login', { replace: true }); // Redirect to login page
    };

    return (
        <div className="session-expired-container">
            <h1>Session Expired</h1>
            <p>Your session has expired. Please log in again.</p>
            <button onClick={handleLogout}>Log In Again</button>
        </div>
    );
}

export default SessionExpiredHandle;
