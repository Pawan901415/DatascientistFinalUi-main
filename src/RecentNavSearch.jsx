import React from 'react';

const RecentNavSearch = ({ addRecentSearch, recentSearches }) => {
  const handleAddRecentSearch = (searchTerm) => {
    addRecentSearch(searchTerm); // Notify the parent component about the recent search
  };

  return (
    <div className="recent-nav-search">
      <h6>Recent Searches</h6>
      <ul>
        {recentSearches && recentSearches.map((searchTerm, index) => (
          <li key={index} onClick={() => handleAddRecentSearch(searchTerm)}>
            {searchTerm}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentNavSearch;
