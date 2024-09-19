import React from 'react';
import Icon from '../components/Icon'
import { ReactComponent as DashboardIcon } from '../assets/dashborad.svg';
import { ReactComponent as OverdueBooksIcon  } from '../assets/overdueBooks.svg';
import { ReactComponent as MembersIcon } from '../assets/members.svg';
import { ReactComponent as BooksIcon } from '../assets/books.svg';
import { Link,useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGaugeHigh } from '@fortawesome/free-solid-svg-icons';


function SidebarMenu(){
    const [activeItem, setActiveItem] = useState('/');
    const location = useLocation();

    useEffect(() => {
        setActiveItem(location.pathname);
        console.log(`activeItem: ${activeItem}`);
    }, [location]);
    
    return (
        <nav className="sidebar">
            <h2 className='logo'>
                Dash<span className='logo-span'>Labry</span>
            </h2>
            <ul>
              <li className={`menu-item ${activeItem === '/' ? 'menu-item-active' : ''}`}>
                <Link to="/" onClick={() => setActiveItem('/')}>
                  <DashboardIcon className='icon' /> <h6>Dashboard</h6>
                </Link>
              </li>
              <li className={`menu-item ${activeItem === '/overdue-books' ? 'menu-item-active' : ''}`}>
                <Link to="/overdue-books" onClick={() => setActiveItem('/overdue-books')}>
                  <OverdueBooksIcon className='icon' /> <h6>Overdue Books</h6>
                </Link>
              </li>
              <li className={`menu-item ${activeItem === '/books' ? 'menu-item-active' : ''}`}>
                <Link to="/books" onClick={() => setActiveItem('/books')}>
                  <BooksIcon className='icon' /><h6>Books</h6>
                </Link>
              </li>
              <li className={`menu-item ${activeItem === '/members' ? 'menu-item-active' : ''}`}>
                <Link to="/members" onClick={() => setActiveItem('/members')}>
                  <MembersIcon className='icon' /><h6>Members</h6>
                </Link>
              </li>
            </ul>
      </nav>
      );
    }

    export default SidebarMenu;