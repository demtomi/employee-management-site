import React from 'react';
import './SearchBar.css';

function SearchBar(props) {
    const setSearchInput = props.setSearchInput;

  return (
    <div >
        <input className='search-bar' placeholder='Type name for search...' onChange={(e) =>setSearchInput(e.target.value) }></input>
    </div>
  )
};

export default SearchBar;