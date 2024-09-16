import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdvancedSearchContext } from '../../Contexts/AdvancedSearchContext';
import './AdvancedSearchBar.css';


const mangaGenres = [
  "Action", "Adult", "Adventure", "Comedy", "Cooking", "Doujinshi", "Drama", "Ecchi", "Erotica",
  "Fantasy", "Gender bender", "Harem", "Historical", "Horror", "Isekai", "Josei", "Manhua",
  "Manhwa", "Martial arts", "Mature", "Mecha", "Medical", "Mystery", "One shot", "Pornographic",
  "Psychological", "Romance", "School life", "Sci fi", "Seinen", "Shoujo", "Shoujo ai", "Shounen",
  "Shounen ai", "Slice of life", "Smut", "Sports", "Supernatural", "Tragedy", "Webtoons", "Yaoi", "Yuri"
];

const mangaGenresIndexes = [
  2, 3, 4, 6, 7, 9, 10,
  11, 48, 12, 13, 14, 15, 16, 
  45, 17, 44, 43, 19, 20, 21,
  22, 24, 25, 47, 26, 27, 28, 
  29, 30, 31, 32, 33, 34, 35,
  36, 37, 38, 39, 40, 41, 42
];

const mangaGenresMap = mangaGenres.reduce((acc, genre, index) => {
  acc[genre] = mangaGenresIndexes[index];
  return acc;
}, {});


const AdvancedSearchBar = () => {
  const { filters, setFilters, isContentVisible, toggleContentVisibility } = useAdvancedSearchContext();

  const navigate = useNavigate();


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleGenreChange = (genre) => {
    setFilters((prevFilters) => {
      let newStatus;
      if (prevFilters.genres[genre] === 'unchecked') newStatus = 'include';
      else if (prevFilters.genres[genre] === 'include') newStatus = 'exclude';
      else newStatus = 'unchecked';

      return {
        ...prevFilters,
        genres: {
          ...prevFilters.genres,
          [genre]: newStatus,
        },
      };
    });
  };

  const handleGenresChecklist = () => {
    const includedGenres = [];
    const excludedGenres = [];

    for (const genre in filters.genres) {
      if (filters.genres[genre] === 'include') includedGenres.push(mangaGenresMap[genre]);
      else if (filters.genres[genre] === 'exclude') excludedGenres.push(mangaGenresMap[genre]);
    }

    return { includedGenres, excludedGenres };
  }


  const handleGenresSearch = async () => {
    const { includedGenres, excludedGenres } = handleGenresChecklist();

    const includedGenresStr = includedGenres.length > 0 ? `&g_i=${includedGenres.join('_')}` : '';
    const excludedGenresStr = excludedGenres.length > 0 ? `&g_e=${excludedGenres.join('_')}` : '';
    const keywordStr = filters.keyword ? `&keyw=${filters.keyword}` : '';
    const statusStr = filters.status !== 'all' ? `&sts=${filters.status}` : '';
    const sortByStr = filters.sortBy ? `&orby=${filters.sortBy}` : '';
    const keywordTypeStr = filters.keywordType ? `&keyt=${filters.keywordType}` : '';
    const searchURL = includedGenresStr + excludedGenresStr + keywordStr + statusStr + sortByStr + keywordTypeStr;

    toggleContentVisibility();
    navigate(`/advanced_search?s=all${searchURL}&page=1`);
  };

  useEffect(() => {
    
  }, []);

  return (
    <div className="panel-advanced-search-tool">
      <p className={`advanced-search-tool-title ${isContentVisible ? '' : 'advanced-search-tool-hidden'} a-h`} onClick={toggleContentVisibility}>
        <span>Advanced Search </span>
        <i className={isContentVisible ? 'icon-up' : 'icon-down'}></i>
      </p>
      <div className="advanced-search-tool-content" style={{ display: isContentVisible ? 'block' : 'none' }}>
        <p className="advanced-search-tool-label">Genres:</p>
        <div className="advanced-search-tool-genres-help" />
        <div className="advanced-search-tool-genres-list">
          {mangaGenres.map((genre) => (
            <label key={genre} className="checkbox">
              <button className="checkbox-button" onClick={() => handleGenreChange(genre)}>
                <i className={`checkbox-icon ${filters.genres[genre]}`} />
                <span>{genre}</span>
              </button>
            </label>
          ))}
        </div>
        <div className="advanced-search-tool-orderby">
          <span className="advanced-search-tool-orderby-title text-nowrap">Order by:</span>
          <select
            className="advanced-search-tool-orderby-content"
            name="sortBy"
            value={filters.sortBy}
            onChange={handleInputChange}>
            <option value="latest">Latest updates</option>
            <option value="topview">Top view</option>
            <option value="newest">New manga</option>
            <option value="az">A-Z</option>
          </select>
        </div>
        <div className="advanced-search-tool-status">
          <span className="advanced-search-tool-status-title text-nowrap">Status:</span>
          <select
            className="advanced-search-tool-status-content"
            name="status"
            value={filters.status}
            onChange={handleInputChange}>
            <option value="all">Ongoing and Complete</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <p style={{ clear: 'both' }}></p>
        <div className="advanced-search-tool-keyword">
          <span className="advanced-search-tool-keyword-title text-nowrap">Keyword:</span>
          <select
            className="advanced-search-tool-keyword-type"
            name="keywordType"
            value={filters.keywordType}
            onChange={handleInputChange}>
            <option value="everything">Everything</option>
            <option value="title">Name title</option>
            <option value="alternative">Alternative name</option>
            <option value="author">Author</option>
          </select>
        </div>
        <p style={{ clear: 'both' }}></p>
        <input
          type="text"
          className="advanced-search-tool-keyword-content"
          placeholder="Search Manga"
          name="keyword"
          value={filters.keyword}
          onChange={handleInputChange}
          autoComplete="off"
          maxLength="100"
        />
        <p style={{ clear: 'both' }}></p>
        <button className="advanced-search-tool-apply" onClick={handleGenresSearch}>Search</button>
      </div>
    </div>
  );
};

export { AdvancedSearchBar };