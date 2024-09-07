import React from 'react'
import LoginForm from '../components/LoginForm.jsx'
import logo from '../assets/sparkflix-9-3-2024.png';
import '../styles/login.css'
import Footer from '../components/Footer.jsx'


function Login() {
    return (
        <div className="login main-container">
            <header>
                <img className="netflix-logo" src={logo} alt="Netflix Logo" />
            </header>
            <LoginForm />
            <Footer />
        </div>
    )
}

export default Login;