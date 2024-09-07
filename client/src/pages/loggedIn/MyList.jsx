import React from 'react'; 
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/sparkflix-9-3-2024.png';
import 'boxicons/css/boxicons.min.css';
import '../../styles/insidenav.css';

function App() {
    const navigate = useNavigate();
    const user = {};
    user.name = localStorage.getItem('userName');
    user.id = localStorage.getItem('userId');
    user.image = localStorage.getItem('userImage');
    user.accountId = localStorage.getItem('accountId');
  return (
    <div id="my-list" className="inside">
        <header>
                <img className="netflix-logo" src={logo} alt="Netflix Logo" />
                <NavLink to="/home" className="nav-link">Home</NavLink>
                <NavLink to="/movies" className="nav-link">Movies</NavLink>
                <NavLink to="/tvshows" className="nav-link">TV Shows</NavLink>
                <NavLink to="/mylist" className="nav-link">My List</NavLink>
                <i className="bx bx-search"></i>
                {user.image && (
                    <img
                        src={user.image}
                        onClick={() => {
                            localStorage.setItem('userId', user.accountId)
                            navigate('/whoswatching');
                        }}
                        className="profile-image"
                        alt="User Profile"
                        style={{ cursor: 'pointer' }} // Ensure the cursor is a pointer to show it's clickable
                    />
                )}
            </header>
    </div>
  );
}

export default App;
