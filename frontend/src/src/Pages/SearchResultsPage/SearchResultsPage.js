import React, { useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';

import { AdvancedSearchBar, Pagination, Loading, SearchResultItem } from '../../Components';
import { useSearchManga } from '../../Hooks/useSearchManga';
import './SearchResultsPage.css'; // Import CSS for styling



const SearchResultsPage = ({ searchType }) => {
  const { mangaTitle } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const [page, setPage] = useState(1);


  const regularURL = `https://manganato.com/search/story/${mangaTitle}?page=${page}`;
  const advancedURL = `https://manganato.com/advanced_search?${searchParams.toString()}&page=${page}`;
  const searchURL = searchType === 'advanced' ? advancedURL : regularURL;

  const { searchResults, totalPages, error } = useSearchManga(searchURL, page);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    searchParams.set('page', newPage);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  if(!searchResults) {
    return <Loading />
  }
  
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="search-results-page">
          <AdvancedSearchBar />
          <div className="search-results">
            {searchResults.map((manga, index) => (
              <SearchResultItem key={index} manga={manga} />
            ))}
          </div>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
    </div>
  );
};

export { SearchResultsPage };