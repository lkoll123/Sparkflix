// src/components/NetflixAddUser.jsx
import React, { useState } from 'react';
import '../styles/whoswatching.css';

function NetflixAddUser(props) {
    const [name, setName] = useState('');
    const [language, setLanguage] = useState('English');
    const [allowMature, setAllowMature] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (name.trim() !== '') {
            await props.onAddProfile({ name, language, allowMature }); 
            props.onClose(); 
        }
    };

    return (
        <div className="add-user-modal">
            <div className="add-user-content">
                <h2 className="add-user-title">Add Profile</h2>
                <hr/>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter Name"
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Language</label>
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="form-select"
                        >
                            <option value="English">English</option>
                            <option value="Spanish">Spanish</option>
                            <option value="French">French</option>
                            <option value="French">German</option>
                            <option value="French">Japanese</option>
                            <option value="French">Mandarin</option>
                            <option value="French">Russian</option>
                            
                        </select>
                    </div>
                    <div className="form-group">
                        <input
                            type="checkbox"
                            checked={allowMature}
                            onChange={() => setAllowMature(!allowMature)}
                            className="form-checkbox"
                        />
                        <label className="form-checkbox-label">Allow Mature Content</label>
                    </div>
                    <div className="form-buttons">
                        <button type="submit" className="btn">Add Profile</button>
                        <button type="button" className="btn btn-cancel" onClick={props.onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NetflixAddUser;
