import React from 'react';
import SearchIcon from '../assets/search.png'
import {useState} from 'react';


function SearchBar(){
    const [searchText, setSearchText] = useState("");

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    return(
        <div className='search'>  
            <img 
                src={SearchIcon}
                alt="search"
                onClick={()=>{}}
            />
            <input 
                placeholder="Search" 
                value={searchText}
                onChange={handleSearchChange}
            />
       </div>
    )
}

export default SearchBar;