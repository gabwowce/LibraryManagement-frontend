import React from 'react';
import ProfilePic from '../assets/profile.png';
import { useAuthContext } from '../context/AuthContext';


function ProfileSection(){

    const { user } = useAuthContext();

    return(
        user && (
            <div className='profile'>
                <img src={ProfilePic} alt='profile pic'/>
                <div className='perosnal-info'>
                    <h5>{user.name +" " + user.surname}</h5>
                    <h6>{user.role}</h6>
                </div>
            </div>
        )
        
    )
}

export default ProfileSection;