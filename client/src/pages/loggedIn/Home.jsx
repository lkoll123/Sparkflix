import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/sparkflix-9-3-2024.png';
import norsemenImage from '../../assets/stock-norsemen.png';
import 'boxicons/css/boxicons.min.css';
import '../../styles/insidenav.css';
import '../../styles/home.css';
import backgroundVideo from '../../assets/stock-netflix.mp4';
import fetchPopularMovies from '../../util/queryMovies'; // Ensure this function returns a promise

function Home() {
    const [popularMovies, setPopularMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const user = {
        name: localStorage.getItem('userName'),
        id: localStorage.getItem('userId'),
        image: localStorage.getItem('userImage')
    };

    useEffect(() => {
        async function getMovies() {
            try {
                const movieData = await fetchPopularMovies();
                setPopularMovies(movieData); // Assuming fetchMovies resolves to an array
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }

        getMovies();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div id="home-page" className="inside">
            <header>
                <img className="netflix-logo" src={logo} alt="Netflix Logo" />
                <NavLink to="/home" className="nav-link">Home</NavLink>
                <NavLink to="/movies" className="nav-link">Movies</NavLink>
                <NavLink to="/tvshows" className="nav-link">TV Shows</NavLink>
                <NavLink to="/mylist" className="nav-link">My List</NavLink>
                <i className="bx bx-search"></i>
                {user.image && <img src={user.image} className="profile-image" alt="User Profile" />}
            </header>
            <div className="background-video">
                <video autoPlay muted loop playsInline>
                    <source src={backgroundVideo} type="video/mp4" /> 
                    Your browser does not support the video tag.
                </video>
                <img src={norsemenImage} alt="norsemen-image" className="description-image" />
            </div>
            
            <p className="description">
                In 790 AD, the Vikings of Norheim have a hectic schedule that includes 
                pillaging, plundering, enslaving others and solving problems with violence.
                <br />
                <br />
                <strong>Starring:</strong> Kåre Conradi, Silje Torp, Nils Jørgen Kaalstad <br />
                <strong>Creators:</strong> Jon Iver Helgaker, Jonas Torgersen
            </p>

            <div className="buttons-container">
                <button className="play-button"><i className="bx bx-play"></i> Play</button>
                <button className="my-list-button">+ My List</button>
            </div>

            <div className="everything-below">
                <h1 className="movie-carousel-title">Popular Movies</h1>
                <div className="movie-carousel">
                    {popularMovies.map((movie) => (
                        <div key={movie.id} className="movie-item">
                            <img 
                                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} 
                                alt={`Movie ${movie.id}`} 
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
