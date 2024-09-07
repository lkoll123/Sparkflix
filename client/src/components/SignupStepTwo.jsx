import React from 'react';
import 'boxicons/css/boxicons.min.css';

function SignupStepTwo(props) {
    const nextStep = () => {
        props.incrementStep();
    };

    return (
        <div id="SignupStepTwo">
            <i className="bx bxs-check-shield"></i>
            <p> Step <strong>2</strong> of <strong>3</strong></p>
            <h1>Great, now let's verify your email</h1>
            <p> Click the link we sent to <strong>{props.formData.email}</strong> to verify.</p>
            <p>Verifying your email will improve account security and help you receive important Netflix communications.</p>
            <button onClick={nextStep} className="bold-button">Skip</button>
        </div>
    );
}

export default SignupStepTwo;
