import React, { useState, useEffect } from 'react';
import '../../styles/whoswatching.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'boxicons/css/boxicons.min.css';
import NetflixAddUser from '../../components/NetflixAddUser.jsx';

// Import images directly
import AvatarBlue from '../../assets/avatar_blue.png';
import AvatarGreen from '../../assets/avatar_green.png';
import AvatarRed from '../../assets/avatar_red.png';
import AvatarTurqoise from '../../assets/avatar_turqoise.png';
import AvatarYellow from '../../assets/avatar_yellow.jpg';

function WhosWatching() {
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();
    const images = [AvatarBlue, AvatarGreen, AvatarRed, AvatarTurqoise, AvatarYellow];

    const [profiles, setProfiles] = useState([]);
    const [isAddUserVisible, setIsAddUserVisible] = useState(false);
    const [isRemoveMode, setIsRemoveMode] = useState(false); // Toggle for showing remove icons
    const [lessThanFive, setLessThanFive] = useState(profiles.length < 5);
    const [areNoProfiles, setNoProfiles] = useState(profiles.length === 0);

    useEffect(() => {
        setLessThanFive(profiles.length < 5);
        setNoProfiles(profiles.length === 0);
    }, [profiles]);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/getUsers', {
                    params: { userId: userId }
                });
                if (res.data !== "EMPTY") {
                    const profilesWithImages = res.data.map((profile, index) => ({
                        ...profile,
                        image: images[index % images.length] // Cycle through images array
                    }));
                    setProfiles(profilesWithImages);
                }
            } catch (err) {
                console.error("Failed to fetch profiles", err);
            }
        };

        fetchProfiles();
    }, [userId]);

    const handleProfileSelect = (profileId) => {
        if (isRemoveMode) {
            handleRemoveProfile(profileId);
        } else {
            const selectedProfile = profiles.find(profile => profile.id === profileId);
            console.log(selectedProfile);
            localStorage.clear()
            localStorage.setItem('userName', selectedProfile.name);
            localStorage.setItem('userImage', selectedProfile.image);
            localStorage.setItem('userId', selectedProfile.id);
            localStorage.setItem('accountId', userId);
            navigate('/home');
        }
    };

    const handleAddProfile = async (newProfile) => {
        await axios.post('http://localhost:8080/api/setUser', { ...newProfile, userId: userId })
        .then((res) => {
                console.log(res);
        })
        .catch(err => console.log(err));
        setProfiles([...profiles, { id: profiles.length + 1, image: images[profiles.length], ...newProfile }]);
    };

    const handleRemoveProfile = (profileId) => {
        const updatedProfiles = profiles.filter(profile => profile.id !== profileId);
        setProfiles(updatedProfiles);
        axios.post('http://localhost:8080/api/removeUser', {userId: profileId})
        .then((res) => {
            console.log(res);
        })
        .catch(err => console.log(err));
    };

    return (
        <div>
            {!isAddUserVisible &&
                <div id="whos-watching-page">

                    <div className="whos-watching-header">
                        <h1 className="whos-watching-title">Who's Watching?</h1>
                    </div>
                    <main className="whos-watching-main">
                        <div className="whos-watching-profiles">
                            {profiles.map(profile => (
                                <div className="whos-watching-box" key={profile.id}>
                                    <div
                                        className="whos-watching-profile"
                                        onClick={() => handleProfileSelect(profile.id)}
                                    >
                                        <img src={profile.image} alt={profile.name} className="whos-watching-profile-img" />
                                        {isRemoveMode && (
                                            <i
                                                className="bx bx-minus-circle remove-icon"
                                            />
                                        )}
                                    </div>
                                    <p className="whos-watching-profile-name">{profile.name}</p>
                                </div>
                            ))}
                            {lessThanFive &&
                                <div className="whos-watching-box">
                                    <div className="whos-watching-profile whos-watching-add-profile" onClick={() => setIsAddUserVisible(true)}>
                                        <i className="bx bxs-plus-circle"></i>
                                    </div>
                                    <p className="whos-watching-profile-name">Add Profile</p>
                                </div>
                            }
                            {!areNoProfiles && 
                                <div className="whos-watching-box">
                                    <div className="whos-watching-profile whos-watching-remove-profile" onClick={() => setIsRemoveMode(!isRemoveMode)}>
                                        <i className="bx bxs-minus-circle"></i>
                                    </div>
                                    <p className="whos-watching-profile-name">Remove Profile</p>
                                </div>
                            }
                            
                        </div>
                    </main>
                </div>}

            {isAddUserVisible && (
                <div id="whos-watching-page-add">
                    <NetflixAddUser
                        onAddProfile={handleAddProfile}
                        onClose={() => setIsAddUserVisible(false)}
                    />
                </div>
            )}
        </div>
    );
}

export default WhosWatching;
