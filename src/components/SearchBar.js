import React from 'react';
import SearchIcon from '../assets/search.png'
import {useState} from 'react';


function SearchBar({ searchQuery, setSearchQuery }) {
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
                placeholder="Search members..." 
                type="text"
                value={searchQuery}
                onChange={handleChange}
            />
       </div>
    )
}

export default SearchBar;