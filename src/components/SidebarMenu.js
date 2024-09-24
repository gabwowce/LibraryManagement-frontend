import React from 'react';
import Icon from '../components/Icon'
import { ReactComponent as DashboardIcon } from '../assets/dashborad.svg';
import { ReactComponent as OverdueBooksIcon  } from '../assets/overdueBooks.svg';
import { ReactComponent as MembersIcon } from '../assets/members.svg';
import { ReactComponent as BooksIcon } from '../assets/books.svg';
import { ReactComponent as LogoutIcon } from '../assets/logout.svg';
import { ReactComponent as AccIcon } from '../assets/acc.svg';
import { Link,useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGaugeHigh } from '@fortawesome/free-solid-svg-icons';

import {useAuthContext} from '../context/AuthContext';


function SidebarMenu(){
    const { logout,user } = useAuthContext();
    const [activeItem, setActiveItem] = useState('/');
    const location = useLocation();


    useEffect(() => {
        setActiveItem(location.pathname);
        console.log(`activeItem: ${activeItem}`);
    }, [location]);


    return (
      user.role === 'admin' ||  user.role === 'manager' ? 
      
      (
        <nav className="sidebar">
        <h2 className="logo">
          Dash<span className="logo-span">Labry</span>
        </h2>
        <ul>
          <li className={`menu-item ${activeItem === '/' ? 'menu-item-active' : ''}`}>
            <Link to="/" onClick={() => setActiveItem('/')}>
              <DashboardIcon className="icon" /> <h6>Dashboard</h6>
            </Link>
          </li>
          <li className={`menu-item ${activeItem === '/overdue-books' ? 'menu-item-active' : ''}`}>
            <Link to="/overdue-books" onClick={() => setActiveItem('/overdue-books')}>
              <OverdueBooksIcon className="icon" /> <h6>Overdue</h6>
            </Link>
          </li>
          <li className={`menu-item ${activeItem === '/books' ? 'menu-item-active' : ''}`}>
            <Link to="/books" onClick={() => setActiveItem('/books')}>
              <BooksIcon className="icon" /> <h6>Books</h6>
            </Link>
          </li>
          <li className={`menu-item ${activeItem === '/members' ? 'menu-item-active' : ''}`}>
            <Link to="/members" onClick={() => setActiveItem('/members')}>
              <MembersIcon className="icon" /> <h6>Members</h6>
            </Link>
          </li>
          
        </ul>
        <div className="seperator">
  
        </div>
  
        <ul className="bottom-menu">
          <li className={`menu-item ${activeItem === '/managers' ? 'menu-item-active' : ''}`}>
            <Link to="/managers" onClick={() => setActiveItem('/managers')}>
              <MembersIcon className="icon" /> <h6>Managers</h6>
            </Link>
          </li>
          <li className={`menu-item ${activeItem === '/logout' ? 'menu-item-active' : ''}`}>
              <Link to="/logout" onClick={(e) => { e.preventDefault(); logout(); }}>
                  <LogoutIcon className="icon" /> <h6>Log Out</h6>
              </Link>
          </li>
        </ul>
      </nav>
      ) 
      : 
      (
      <nav className="sidebar">
      <h2 className="logo">
        Dash<span className="logo-span">Labry</span>
      </h2>
      <ul>
        <li className={`menu-item ${activeItem === '/books' ? 'menu-item-active' : ''}`}>
          <Link to="/books" onClick={() => setActiveItem('/books')}>
            <BooksIcon className="icon" /> <h6>Books</h6>
          </Link>
        </li>
        
      </ul>
      <div className="seperator">

      </div>

      <ul className="bottom-menu">
        <li className={`menu-item ${activeItem === '/account' ? 'menu-item-active' : ''}`}>
            <Link to="/account" onClick={() => setActiveItem('/account')}>
              <AccIcon className="icon" /> <h6>Account</h6>
            </Link>
        </li>
        <li className={`menu-item ${activeItem === '/logout' ? 'menu-item-active' : ''}`}>
            <Link to="/logout" onClick={(e) => { e.preventDefault(); logout(); }}>
                <LogoutIcon className="icon" /> <h6>Log Out</h6>
            </Link>
        </li>
      </ul>
    </nav>
      )
  
      
    );
  }
    

    export default SidebarMenu;