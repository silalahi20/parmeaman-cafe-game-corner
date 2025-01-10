import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthProvider'; // Import the authentication context
import '../../styles/Header.css';

function Header() {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();

    return (
        <div className="header">
            <div className="header-title">PARMEAMAN</div>
            {!isAuthenticated ? (
                <div className="header-links">
                    <button onClick={() => navigate('/login')}>Login</button>
                    <button onClick={() => navigate('/register')}>Register</button>
                </div>
            ) : (
                <div className="header-links">
                    <button onClick={logout}>Logout</button>
                </div>
            )}
        </div>
    );
}

export default Header;
