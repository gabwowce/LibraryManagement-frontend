import React from 'react';
import SearchIcon from '../assets/search.png'
import {useState} from 'react';


function SearchBar({ searchQuery, setSearchQuery, placeholder }) {
    const handleChange = (event) => {
      setSearchQuery(event.target.value);
    };

    return(
        <div className='search'>  
            <img 
                src={SearchIcon}
                alt="search"
                onClick={()=>{}}
            />
            <input 
                placeholder={placeholder}
                type="text"
                value={searchQuery}
                onChange={handleChange}
            />
       </div>
    )
}

export default SearchBar;