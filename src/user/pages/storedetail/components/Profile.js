import { useState, useEffect, useRef }  from 'react';

function Profile(){

    const [profile, setProfile] = useState("")

    useEffect(() => {
        fetch('http://localhost:8080/storeProfile/5')
        .then(res => res.json())
        .then(data => {
            setProfile(data)
        });
    });

    return(
        <>
            <div>
                <p>프로필</p>
                <img></img>
            </div>
        </>
    );
}

export default Profile;