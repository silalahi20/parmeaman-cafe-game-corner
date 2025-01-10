    import React, { useState, useEffect } from 'react';
    import { fetchGames, fetchGameRecommendations} from '../../api/api'; // Pastikan import ini benar'
    import '../../styles/GameRecommendation.css'; // Pastikan path css sudah benar

    function GameRecommendation() {
        const [games, setGames] = useState([]);
        const [input, setInput] = useState('');
        const [selectedGameId, setSelectedGameId] = useState(null);
        const [recommendations, setRecommendations] = useState([]);

        useEffect(() => {
            const loadGames = async () => {
                const allGames = await fetchGames();
                setGames(allGames);
            };
            loadGames();
        }, []);

        const handleInputChange = (event) => {
            const value = event.target.value;
            setInput(value);

            if (!isNaN(value) && value.trim() !== '') { // Cek jika input adalah nomor (ID)
                setSelectedGameId(value);
            } else {
                const gameFound = games.find(game => game.title.toLowerCase().includes(value.toLowerCase()));
                if (gameFound) setSelectedGameId(gameFound.id);
                else setSelectedGameId(null); // Pastikan ID di-reset jika tidak ada game yang cocok
            }
        };

        const handleGetRecommendations = async () => {
            if (selectedGameId) {
                const gameRecommendations = await fetchGameRecommendations(selectedGameId);
                setRecommendations(gameRecommendations);
            } else {
                alert("Please enter a valid game name or ID!");
            }
        };

        return (
            <div className="game-recommendation-container">
                <h1>Rekomendasi Game untuk Anda</h1>
                <p>Masukkan Game yang Menarik / Sudah Pernah Anda Mainkan</p>
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Type name or ID..."
                    className="game-search-input"
                />
                <button onClick={handleGetRecommendations} className="game-recommendation-button">Lihat Rekomendasi Game</button>
                {recommendations.length > 0 && (
                    <div>
                        <h2>Hasil Rekomendasi:</h2>
                        {recommendations.map((rec, index) => (
                            <div key={index} className="recommendation-item">
                                <p>{rec.title} (Similarity Score: {rec.similarity_score}%)</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    export default GameRecommendation;
