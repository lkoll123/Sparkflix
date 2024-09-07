import React from 'react';
import '../styles/moviemodal.css'; // Ensure you create this CSS file for styling

function MovieModal({ movie, onClose }) {
    if (!movie) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <span className="close-btn" onClick={onClose}>×</span>
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                    alt={movie.title}
                />
                <h2>{movie.title}</h2>
                <p>{movie.overview}</p>
                <hr/>
                <p><strong>Release Date:</strong> {movie.release_date}</p>
                <p><strong>Rating:</strong> {movie.vote_average}</p>
            </div>
        </div>
    );
}

export default MovieModal;
