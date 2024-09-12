import React from 'react';
import ProfilePic from '../assets/profile.png';


function ProfileSection(){

    return(
        <div className='profile'>
            <img src={ProfilePic} alt='profile pic'/>
            <div className='perosnal-info'>
                <h5>Moni Roy</h5>
                <h6>Admin</h6>
            </div>
        </div>
    )
}

export default ProfileSection;