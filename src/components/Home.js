import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/Auth/AuthProvider'; // Import the authentication context
import '../styles/Home.css';

function Home() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth(); // Use the authentication state

    const handleNavigation = (path) => {
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            navigate(path);
        }
    };

    return (
        <div className="home-container">
            <h1>Welcome To,</h1>
            <h2>PARMEAMAN CAFE & GAME CORNER</h2>
            <div className="buttons">
                <button onClick={() => handleNavigation('/foodMenu')} className="btn">Pesan Makanan</button>
                <button onClick={() => handleNavigation('/gameList')} className="btn">Pilih Game</button>
            </div>
        </div>
    );
}

export default Home;
