import * as React from 'react';

const SearchBar = ({ keyword, onChange }) => {
  return (
    <input
      className="inputStyle"
      key="search-bar"
      value={keyword}
      placeholder={'search users'}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchBar;
