import React, {useState} from 'react';
import validateEmail from '../util/emailValidate.js'
import validatePassword from '../util/passwordValidate.js';

function SignupStepOne(props) {

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const nextStep = () => {
        setEmailError(false);
        setPasswordError(false);
        
        const passCheck = validatePassword(props.formData.password);
        const emailCheck = validateEmail(props.formData.email);
        switch (true) {
            case passCheck && emailCheck:
                props.incrementStep();
                break;
            case passCheck && !emailCheck:
                setEmailError(true);
                break;
            case emailCheck && !passCheck:
                setPasswordError(true);
                break;
            case !emailCheck && !passCheck:
                setPasswordError(true);
                setEmailError(true);
                break;
        }
        
    }

    const handleEmailChange = (e) => {
        const { value } = e.target;
        props.setFormData((currData) => ({
            ...currData,
            email: value,
        }));
    };

    const handlePasswordChange = (e) => {
        const { value } = e.target;
        props.setFormData((currData) => ({
            ...currData,
            password: value,
        }));
    };

    return (
        <div id="SignupStepOne">
            <p> Step <strong>1</strong> of <strong>3</strong></p>
            <h1>Create a password to start your membership</h1>
            <p>Just a few more steps and you're done!<br />We hate paperwork, too.</p>
            <div className="input-group">
                <input
                    type="text"
                    name="email"
                    id="email"
                    required
                    placeholder=" "
                    value={props.formData.email}
                    onChange={handleEmailChange}
                />
                <label htmlFor="email" className="placeholder">Enter your email</label>
            </div>
            {emailError && <div className="error-message"><p><i className="bx bxs-x-circle"></i> Invalid Email</p></div>}

            <div className="input-group">
                <input
                    type="password"
                    name="password"
                    id="password"
                    required
                    placeholder=" "
                    onChange={handlePasswordChange}
                />
                <label htmlFor="password" className="placeholder">Enter password</label>
            </div>
            {passwordError && <div className="error-message"><p><i className="bx bxs-x-circle"></i> Invalid Password</p></div>}
            <button onClick={nextStep} className="bold-button">Next</button>
        </div>
    );
}

export default SignupStepOne;
