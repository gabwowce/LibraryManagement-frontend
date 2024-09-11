import React from 'react';
import SearchIcon from '../assets/search.png'


function SearchBar(){

    return(
        <div className='search'>  
            <input 
                placeholder="Search form movies" 
                value="Search"
                onChange={()=>{}}
            />
            <img 
                src={SearchIcon}
                alt="search"
                onClick={()=>{}}
            />
       </div>
    )
}

export default SearchBar;