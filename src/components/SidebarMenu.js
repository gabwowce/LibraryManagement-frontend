import React from 'react';
import { Link,useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function SidebarMenu(){
    const [activeItem, setActiveItem] = useState('');
    const location = useLocation();

    useEffect(() => {
        setActiveItem(location.pathname);
    }, [location]);
    
    return (
        <nav className="sidebar">
        <h4 className='logo'>
            Dash<span className='logo-span'>Labry</span>
        </h4>
         <ul>
          <li className={activeItem === '/' ? 'active' : ''}>
            <Link to="/" onClick={() => setActiveItem('/')}>Dashboard</Link>
          </li>
          <li className={activeItem === '/overdue-books' ? 'active' : ''}>
            <Link to="/overdue-books" onClick={() => setActiveItem('/overdue-books')}>Overdue Books</Link>
          </li>
          <li className={activeItem === '/books' ? 'active' : ''}>
            <Link to="/books" onClick={() => setActiveItem('/books')}>Books</Link>
          </li>
          <li className={activeItem === '/members' ? 'active' : ''}>
            <Link to="/members" onClick={() => setActiveItem('/members')}>Members</Link>
          </li>
          <li className={activeItem === '/loans' ? 'active' : ''}>
            <Link to="/loans" onClick={() => setActiveItem('/loans')}>Loans</Link>
          </li>
        </ul>
      </nav>
      );
    }

    export default SidebarMenu;