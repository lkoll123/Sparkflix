import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/sparkflix-9-3-2024.png';
import norsemenImage from '../../assets/stock-norsemen.png';
import 'boxicons/css/boxicons.min.css';
import '../../styles/insidenav.css';
import '../../styles/home.css';
import backgroundVideo from '../../assets/stock-netflix.mp4';
import fetchPopularMovies from '../../util/queryMovies'; 
import fetchTopRatedMovies from '../../util/queryTopRatedMovies.js';
import MovieModal from '../../components/MovieModal.jsx'; 
import Footer from '../../components/Footer.jsx';

function Home() {
    const [popularMovies, setPopularMovies] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState(null); // Manage selected movie
    const [modalVisible, setModalVisible] = useState(false); // Manage modal visibility
    const [searchVisible, setSearchVisible] = useState(false); // Manage search bar visibility
    const [searchQuery, setSearchQuery] = useState(''); // Manage search input value

    const navigate = useNavigate();

    const user = {
        name: localStorage.getItem('userName'),
        id: localStorage.getItem('userId'),
        image: localStorage.getItem('userImage'),
        accountId: localStorage.getItem('accountId')
    };

    useEffect(() => {
        async function getMovies() {
            try {
                const movieData = await fetchPopularMovies();
                const topMovieData = await fetchTopRatedMovies();
                setPopularMovies(movieData);
                setTopRated(topMovieData);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }

        getMovies();
    }, []);

    const handleMovieClick = (movie) => {
        setSelectedMovie(movie);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedMovie(null);
    };

    const toggleSearchBar = () => {
        document.querySelector('.bx-search').classList.toggle('active');
        setSearchVisible(!searchVisible);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // Implement the search logic here, e.g., fetch search results from an API
        console.log('Searching for:', searchQuery);
    };

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
                <i className="bx bx-search" onClick={toggleSearchBar} style={{ cursor: 'pointer' }}></i>
                {searchVisible && (
                    <form onSubmit={handleSearchSubmit} className="search-bar">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search for a movie or show..."
                            className="search-input"
                        />
                    </form>
                )}
                {user.image && (
                    <img
                        src={user.image}
                        onClick={() => {
                            localStorage.setItem('userId', user.accountId);
                            navigate('/whoswatching');
                        }}
                        className="profile-image"
                        alt="User Profile"
                        style={{ cursor: 'pointer' }}
                    />
                )}
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
                        <div
                            key={movie.id}
                            className="movie-item"
                            onClick={() => handleMovieClick(movie)}
                            style={{ cursor: 'pointer' }}
                        >
                            <img 
                                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} 
                                alt={`Movie ${movie.id}`} 
                            />
                        </div>
                    ))}
                </div>
                <h1 className="movie-carousel-title">Top Rated Movies</h1>
                <div className="movie-carousel">
                    {topRated.map((movie) => (
                        <div
                            key={movie.id}
                            className="movie-item"
                            onClick={() => handleMovieClick(movie)}
                            style={{ cursor: 'pointer' }}
                        >
                            <img 
                                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} 
                                alt={`Movie ${movie.id}`} 
                            />
                        </div>
                    ))}
                </div>
            </div>
            <Footer />

            {modalVisible && <MovieModal movie={selectedMovie} onClose={handleCloseModal} />}
        </div>
    );
}

export default Home;
