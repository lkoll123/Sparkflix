// src/pages/HomeScreen.jsx
import React, { createContext, useState, useContext } from 'react';
import logo from '../assets/sparkflix-9-3-2024.png';
import '../styles/homescreen.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import Footer from '../components/Footer.jsx'
import validateEmail from '../util/emailValidate.js'
import 'boxicons/css/boxicons.min.css';
import axios from 'axios';

function HomeScreen() {
    const FormDataContext = createContext();
    const navigate = useNavigate(); // Initialize navigate function

    const [formData, setFormData] = useState({ email: ''});
    const [showError, setShowError] = useState(false);
    const [emailExistsError, setEmailExistsError] = useState(false);

    const handleChange = (e) => {
        const {value} = e.target;
        setFormData({email: value});
    }

    const redirectToLogin = () => {
        navigate('/login'); // Use navigate to redirect to the login page
    };

    const redirectToSignup = async () => {
        if (validateEmail(formData.email)) {
            let exists = false;
            try {
                // Use params to send query parameters in a GET request
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/checkEmail`, {
                    params: { email: formData.email }
                });
                
                exists = res.data.exists; // Correctly access the response data
    
                if (exists) {
                    setEmailExistsError(true);
                    setShowError(false);
                } else {
                    navigate('/signup', { state: { email: formData.email } });
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            setShowError(true);
        }
    };

    return (
        <div className="homescreen main-container">
            <header>
                <img className="netflix-logo" src={logo} alt="Netflix Logo" />
                <button className="bold-button" id="sign-in" onClick={redirectToLogin}>Sign In</button>
            </header>
            <main>
                <section id="signup-section">
                    <h1>Unlimited movies, TV shows, and more</h1>
                    <h2>Starts at $6.99. Cancel anytime</h2>
                    <p>Ready to watch? Enter your email to create or restart your membership.</p>
                    <form id="signup" onSubmit={(e) => e.preventDefault()}>
                        <div className="input-group">
                            <input type="text" id="email" name="email" required placeholder=" " onChange={handleChange}/>
                            <label htmlFor="email" className="placeholder">Enter your email</label>
                        </div>
                        <button 
                            type="submit" 
                            className="bold-button" 
                            id="email-submit" 
                            onClick={redirectToSignup}
                        >
                            Get Started <i className="arrow right"></i>
                        </button>
                    </form>
                    {showError && <div className="error-message"><p><i className="bx bxs-x-circle"></i> Invalid Email</p></div>}
                    {emailExistsError && <div className="error-message"><p><i className="bx bxs-x-circle"></i> Email Already Exists</p></div>}
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default HomeScreen;
