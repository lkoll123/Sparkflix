// src/App.jsx
import React from 'react'; // Import React
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Correct router imports
import HomeScreen from './pages/homeScreen.jsx'; // Correct import and use PascalCase
import Login from './pages/login.jsx'
import Signup from './pages/signup.jsx'
import WhosWatching from './pages/loggedIn/WhosWatching.jsx';
import Home from './pages/loggedIn/home.jsx';
import Movies from './pages/loggedIn/Movies.jsx';
import TvShows from './pages/loggedIn/TvShows.jsx';
import MyList from './pages/loggedIn/MyList.jsx';



function App() {
  return (
    <Router> {/* Use Router to wrap Routes */}
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/whoswatching" element={<WhosWatching />} />
        <Route path="/home" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tvshows" element={<TvShows />} />
        <Route path="/mylist" element={<MyList />} />
      </Routes>
    </Router>
  );
}

export default App;
