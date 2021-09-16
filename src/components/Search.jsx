import React from "react";

const Search = ({ search, searchInput, handleSearch }) => {
  return (
    <div className="Search">
      <input
        ref={searchInput}
        type="text"
        value={search}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
