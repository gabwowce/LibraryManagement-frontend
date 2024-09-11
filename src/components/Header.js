import React from 'react';
import SearchBar from '../components/SearchBar';
import ProfileSection from '../components/ProfileSection';
import { Link } from 'react-router-dom';
import '../styles/layout/_header.scss';

function Header(){
    return (
        <header>
            <SearchBar/>
            <ProfileSection/>
        </header>
      );
    }

export default Header;