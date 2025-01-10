import React, { useEffect, useState } from 'react';
import { fetchGames } from '../../api/api'; // Pastikan path sudah benar
import { Link } from 'react-router-dom'; // Import Link dari react-router-dom
import '../../styles/GameList.css'; // Pastikan path sudah benar

function GameList() {
    const [games, setGames] = useState([]);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1); // Halaman saat ini
    const gamesPerPage = 25; // Jumlah game per halaman

    useEffect(() => {
        const loadGames = async () => {
            try {
                const gameData = await fetchGames();
                setGames(gameData);
            } catch (error) {
                setError(error.message);
                console.error('Failed to fetch games:', error);
            }
        };

        loadGames();
    }, []);

    // Menentukan indeks pertama dan terakhir berdasarkan halaman saat ini
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

    // Fungsi untuk menavigasi ke halaman berikutnya atau sebelumnya
    const nextPage = () => {
        if (currentPage < Math.ceil(games.length / gamesPerPage)) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    return (
        <div className="game-list-container">
            <h1>Daftar Game</h1>

            {/* Tombol Rekomendasi berada tepat di bawah judul */}
            <div className="recommendation-btn-container">
                <Link to="/GameRecommendation">
                    <button className="recommendation-btn">
                        Lihat Rekomendasi Game untuk Anda
                    </button>
                </Link>
            </div>

            {error ? <p>Error: {error}</p> : (
                <div>
                    <ul>
                        {currentGames.map(game => (
                            <li key={game.id}>
                                <h2>{game.title} ({game.genre}) - {game.release_year}</h2>
                                <p>ID: {game.id}</p>
                                <p>Developer: {game.developer}, Publisher: {game.publisher}</p>
                                <p>Rating: {game.rating}, Popularity: {game.popularity}</p>
                            </li>
                        ))}
                    </ul>
                    <div className="pagination">
                        <button onClick={prevPage} disabled={currentPage === 1}>
                            &lt; Prev
                        </button>
                        <span>Page {currentPage} of {Math.ceil(games.length / gamesPerPage)}</span>
                        <button onClick={nextPage} disabled={currentPage === Math.ceil(games.length / gamesPerPage)}>
                            Next &gt;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GameList;
