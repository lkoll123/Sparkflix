import React, { useState } from 'react'; 
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/sparkflix-9-3-2024.png';
import 'boxicons/css/boxicons.min.css';
import '../../styles/insidenav.css';
import Footer from '../../components/Footer.jsx';

function Movies() {
    const [searchVisible, setSearchVisible] = useState(false); // Manage search bar visibility
    const [searchQuery, setSearchQuery] = useState(''); // Manage search input value

    const navigate = useNavigate();
    const user = {
        name: localStorage.getItem('userName'),
        id: localStorage.getItem('userId'),
        image: localStorage.getItem('userImage'),
        accountId: localStorage.getItem('accountId'),
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

    return (
        <div id="movies" className="inside">
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
            <h1>Coming Soon!</h1>
            <Footer />
        </div>
    );
}

export default Movies;
