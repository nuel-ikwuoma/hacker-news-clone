import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { IconContext } from 'react-icons';

// This component file holds the search input box
const Search = ({ value, onChange, label, onSubmit }) => (
  <form onSubmit={onSubmit}>
    {`${label}: `}
    <input type='text' value={value} onChange={onChange} placeholder={label}/>
    <button type='submit'>
      <IconContext.Provider
        value={{ color: 'blue', className: 'align-middle' }}
      >
        <div>
          <FaSearch size="1.4em"/>
        </div>
      </IconContext.Provider>
    </button>
  </form>
);

export default Search;
