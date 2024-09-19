import React from 'react';
import ProfileSection from '../components/ProfileSection';
import { Link } from 'react-router-dom';
import '../styles/layout/_header.scss';

function Header(){
    return (
        <header>
            
            <ProfileSection/>
        </header>
      );
    }

export default Header;