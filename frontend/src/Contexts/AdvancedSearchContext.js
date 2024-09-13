import React, { createContext, useState, useContext } from 'react';
const mangaGenres = [
    "Action", "Adult", "Adventure", "Comedy", "Cooking", "Doujinshi", "Drama", "Ecchi", "Erotica",
    "Fantasy", "Gender bender", "Harem", "Historical", "Horror", "Isekai", "Josei", "Manhua",
    "Manhwa", "Martial arts", "Mature", "Mecha", "Medical", "Mystery", "One shot", "Pornographic",
    "Psychological", "Romance", "School life", "Sci fi", "Seinen", "Shoujo", "Shoujo ai", "Shounen",
    "Shounen ai", "Slice of life", "Smut", "Sports", "Supernatural", "Tragedy", "Webtoons", "Yaoi", "Yuri"
  ];
  
  const mangaGenresInitialValues = mangaGenres.reduce((acc, genre) => {
    acc[genre] = 'unchecked';
    return acc;
  }, {});

  const initialState = {
    genres: mangaGenresInitialValues,
    keyword: '',
    status: '',
    sortBy: '',
    keywordType: 'everything'
  };

const AdvancedSearchContext = createContext();

export const AdvancedSearchProvider = ({ children }) => {
  const [filters, setFilters] = useState(initialState);
  const [isContentVisible, setIsContentVisible] = useState(false);

  const resetFilters = () => {
    setFilters(initialState);
  };

  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
  };


  return (
    <AdvancedSearchContext.Provider 
    value={{ filters, setFilters, resetFilters, 
            isContentVisible, setIsContentVisible, toggleContentVisibility }}>
      {children}
    </AdvancedSearchContext.Provider>
  );
};

export const useAdvancedSearchContext = () => useContext(AdvancedSearchContext);