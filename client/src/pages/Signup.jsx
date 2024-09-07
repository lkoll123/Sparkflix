import React, { useState, useEffect } from 'react';
import '../styles/signup.css';
import logo from '../assets/sparkflix-9-3-2024.png';
import SignupStepOne from '../components/SignupStepOne.jsx';
import SignupStepTwo from '../components/SignupStepTwo.jsx';
import SignupStepThree from '../components/SignupStepThree.jsx';
import Footer from '../components/Footer.jsx';
import { useLocation } from 'react-router-dom';

function Signup() {
  const location = useLocation();
  const { email } = location.state || {};
  const [signupStep, setSignupStep] = useState(1);
  const [formData, setFormData] = useState({ email: email, password: '', plan: '' });
  const [animateClass, setAnimateClass] = useState('');

  const incrementStep = function () {
    setSignupStep((currStep) => currStep + 1);
  };
  //unused for now
  const decrementStep = function () {
    setSignupStep((currStep) => currStep - 1);
  };

  useEffect(() => {
    setAnimateClass(''); 
    const timer = setTimeout(() => setAnimateClass('signup-step'), 10); 
    return () => clearTimeout(timer); 
  }, [signupStep]);

  return (
    <div className="signup main-container">
      <header>
        <img className="netflix-logo" src={logo} alt="Netflix Logo" />
        <a href="/login" id="signin-redirect">
          Sign In
        </a>
      </header>
      <hr />
      <div className={animateClass}>
        {signupStep === 1 && (
          <SignupStepOne setFormData={setFormData} formData={formData} incrementStep={incrementStep} />
        )}
        {signupStep === 2 && (
          <SignupStepTwo setFormData={setFormData} formData={formData} incrementStep={incrementStep} />
        )}
        {signupStep === 3 && (
          <SignupStepThree setFormData={setFormData} formData={formData} incrementStep={incrementStep} />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Signup;
