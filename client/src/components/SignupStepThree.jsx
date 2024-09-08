import React, {useState} from 'react';
import '../styles/signup.css';
import 'boxicons/css/boxicons.min.css';
import axios from 'axios';
import bcrypt from 'bcryptjs'
import { useNavigate } from 'react-router-dom';

function SignupStepThree(props) {
    const [showError, setError] = useState(false);
    const planInfo = [
        {
            title: "Standard with ads",
            titleName: "standard-ads",
            titleRes: "1080p",
            price: "$6.99",
            quality: "Good",
            resolution: "1080p (Full HD)",
            devices: "TV, computer, mobile phone, tablet",
            concurrentStreams: "2",
            downloadDevices: "2",
            ads: "Less than you might think",
            planId: 1
        },
        {
            title: "Standard",
            titleName: "standard",
            titleRes: "1080p",
            price: "$15.49",
            quality: "Good",
            resolution: "1080p (Full HD)",
            devices: "TV, computer, mobile phone, tablet",
            concurrentStreams: "2",
            downloadDevices: "2",
            ads: "No ads",
            planId: 2
        },
        {
            title: "Premium",
            titleName: "premium",
            titleRes: "4k + HDR",
            price: "$22.99",
            quality: "Best",
            resolution: "4K (Ultra HD) + HDR",
            audio: "Spatial audio (immersive sound) Included",
            devices: "TV, computer, mobile phone, tablet",
            concurrentStreams: "4",
            downloadDevices: "6",
            ads: "No ads",
            planId: 3
        }
    ];

    const handlePlanSelect = (planId, docId) => {
        document.querySelectorAll('.plan-option').forEach(element => {
            element.classList.remove('active');
        });
        

        document.getElementById(docId).classList.add('active');
        
        props.setFormData((prevData) => ({ ...prevData, plan: planId}));
        console.log(planId);
    };
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const saltRounds = 10; // Adjust the number of salt rounds as needed
        const hashed = await bcrypt.hash(props.formData.password, saltRounds);
        
        const updatedFormData = {
            ...props.formData,
            password: hashed,
        };
        console.log(updatedFormData);
        if (props.formData.plan === '') {
            setError(true);
        } else {
            axios.post('${import.meta.env.VITE_BACKEND_URL}/api/signup', updatedFormData)
            .then((res) => {
                console.log(res);
                navigate('/login');
             })
            .catch(err => console.log(err));
        }

    }
    return (
        <div id="SignupStepThree">
            <p>Step <strong>3</strong> of <strong>3</strong></p>
            <h1>Choose the plan that’s right for you</h1>
            <div className="plan-select">
                {planInfo.map((plan) => (
                    <div key={plan.planId} id={plan.titleName} className="plan-option" onClick={() => handlePlanSelect(plan.planId, plan.titleName)}>
                        <div className="plan-name">
                            <h2>{plan.title}</h2>
                            <p>{plan.titleRes}</p>
                            <i className="bx bxs-check-circle"></i>
                        </div>
                        <label htmlFor="plan-field">Monthly Price</label>
                        <p className="plan-field">{plan.price}</p>
                        <hr/>
                        <label htmlFor="plan-field">Video and sound quality</label>
                        <p className="plan-field">{plan.quality}</p>
                        <hr/>
                        <label htmlFor="plan-field">Resolution</label>
                        <p className="plan-field">{plan.resolution}</p>
                        <hr/>
                        <label htmlFor="plan-field">Supported devices</label>
                        <p className="plan-field">{plan.devices}</p>
                        <hr/>
                        <label htmlFor="plan-field">Devices your household can watch at </label><br/><label htmlFor="plan-field">the same time</label>
                        <p className="plan-field">{plan.concurrentStreams}</p>
                        <hr/>
                        <label htmlFor="plan-field">Download devices</label>
                        <p className="plan-field">{plan.downloadDevices}</p>
                        <hr/>
                        <label htmlFor="plan-field">Ads</label>
                        <p className="plan-field">{plan.ads}</p>
                    </div>
                ))}
            </div>
            <button type="submit" onClick={handleSubmit} className="bold-button">Sign Up</button>
            {showError && <div className="error-message"><p><i className="bx bxs-x-circle"></i> Choose a plan</p></div>}
            <p className="fineprint">If you select an ad-supported plan, you will be required to provide your date of birth 
                for ads personalization and other purposes consistent with the Netflix Privacy Statement. <br/><br/>
                Full HD (1080p), Ultra HD (4K) and HDR availability subject to your internet service and device capabilities. Not all content i
                s available in all resolutions. See Terms of Use for more details.<br/><br/>
                Only people who live with you may use your account. Add 1 extra member with Standard or up to 2 with Premium. 
                Learn more. Watch on 4 different devices at the same time with Premium and 2 with Standard or Standard with ads.</p>
            
                
        </div>
    );
}

export default SignupStepThree;
