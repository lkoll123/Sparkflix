import React, { useState } from 'react';
import axios from 'axios'
import loginValidate from '../util/loginValidate.js'
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const [usePassword, setUsePassword] = useState(true);
    const [formData, setFormData] = useState({ email: '', password: ''});

    const [errorMessage, setErrorMessage] = useState(false);
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        const { value } = e.target;
        setFormData((currData) => ({
            ...currData,
            email: value,
        }));
    };

    const handlePasswordChange = (e) => {
        const { value } = e.target;
        setFormData((currData) => ({
            ...currData,
            password: value,
        }));
    };

    const toggleState = () => {
        setUsePassword(currState => !currState);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/api/login', formData)
        .then(async (res) => {
            if (res.data === "Failed") {
                setErrorMessage(true);
            } else {
                const emailData = res.data[0];
                if (await loginValidate(formData.password, emailData.password)) {
                    localStorage.setItem('userId', emailData.userId);
                    navigate('/whoswatching')
                } else {
                    setErrorMessage(true);
                }
            }
        })
        .catch(err => console.log(err));
        
        
    }

    return (
        <section id="login-form">
            {usePassword ? (
                <form onSubmit={handleSubmit}>
                    <h1>Sign In</h1>
                    <div className="input-group">
                        <input type="text" name="email" id="email" required placeholder=" " onChange={handleEmailChange}/>
                        <label htmlFor="email" className="placeholder">Enter your email</label>
                    </div>

                    <div className="input-group">
                        <input type="password" name="password" id="password" required placeholder=" " onChange={handlePasswordChange}/>
                        <label htmlFor="password" className="placeholder">Enter password</label>
                    </div>
                    {errorMessage && <div className="error-message"><p><i className="bx bxs-x-circle"></i> Invalid login credentials</p></div>}
                    <button type="submit" className="bold-button">Sign In</button>
                    
                    <p>OR</p>
                    <button id="toggle-signin" onClick={toggleState}>Use a Sign-in Code</button>
                    <div className="input-group">
                        <input type="checkbox" name="remember-me" id="remember-me" value="dog" />
                        <label htmlFor="remember-me" id="checkbox-label" className="placeholder">Remember Me</label>
                    </div>
                    <p id="signup-redirect">New to Netflix? <a href="../">Sign Up Now.</a></p>
                </form>
            ) : (
                <form>
                    <h1>Sign In</h1>
                    <div className="input-group">
                        <input type="text" name="email" id="email" required placeholder=" " onChange={handleEmailChange}/>
                        <label htmlFor="email" className="placeholder">Enter your email</label>
                    </div>
                    <p id="fineprint">Message and data rates may apply</p>
                    <button type="submit" className="bold-button">Send Sign-in code</button>
                    <p>OR</p>
                    <button id="toggle-signin" onClick={toggleState}>Use Password</button>
                    <div className="input-group">
                        <input type="checkbox" name="remember-me" id="remember-me" value="dog" />
                        <label htmlFor="remember-me" id="checkbox-label" className="placeholder">Remember Me</label>
                    </div>
                    <p id="signup-redirect">New to Netflix? <a href="../">Sign Up Now.</a></p>
                </form>
            )}
        </section>
    );
}



export default LoginForm;
