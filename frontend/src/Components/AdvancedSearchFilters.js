import React, { useState } from 'react';
import './AdvancedSearchFilter.css';

const mangaGenres = [
  "Action", "Adult", "Adventure", "Comedy", "Cooking", "Doujinshi", "Drama", "Ecchi", "Erotica", 
  "Fantasy", "Gender bender", "Harem", "Historical", "Horror", "Isekai", "Josei", "Manhua", 
  "Manhwa", "Martial arts", "Mature", "Mecha", "Medical", "Mystery", "One shot", "Pornographic", 
  "Psychological", "Romance", "School life", "Sci fi", "Seinen", "Shoujo", "Shoujo ai", "Shounen", 
  "Shounen ai", "Slice of life", "Smut", "Sports", "Supernatural", "Tragedy", "Webtoons", "Yaoi", "Yuri"
];

const mangaGenresIndexes = [2, 3, 4, 6, 7, 9,
                            10, 11, 48, 12, 13, 14,
                            15, 16, 45, 17, 44, 43,
                            19, 20, 21, 22, 24, 25,
                            47, 26, 27, 28, 29, 30,
                            31, 32, 33, 34, 35, 36,
                            37, 38, 40, 41, 39, 42];

const mangaGenresMap = mangaGenres.reduce((acc, genre, index) => {
  acc[genre] = mangaGenresIndexes[index];
  return acc;
}, {});

const mangaGenresChecked = mangaGenres.reduce((acc, genre) => {
  acc[genre] = "unchecked";
  return acc;
}, {});

const AdvancedSearchFilter = ({ filters = { genres: [], keyword: '', sortBy: 'latest', status: 'all', keywordType: 'everything' }, handleInputChange, onFilterChange }) => {
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isHelpContentVisible, setIsHelpContentVisible] = useState(false);
  const [genres, setGenres] = useState({mangaGenresChecked});

  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
  };

  const toggleHelpContentVisibility = () => {
    setIsHelpContentVisible(!isHelpContentVisible);
  };

  const handleGenreChange = (genre) => {
    setGenres((prevGenres) => {
      let newStatus;
      if (prevGenres[genre] === 'unchecked') newStatus = 'include';
      else if (prevGenres[genre] === 'include') newStatus = 'exclude';
      else newStatus = 'unchecked';
  
      return {
        ...prevGenres,
        [genre]: newStatus,
      };
    });
  };
  


  return (
    <div className="panel-advanced-search-tool">
      <p className={`advanced-search-tool-title ${isContentVisible ? '' : 'advanced-search-tool-hidden'} a-h`} onClick={toggleContentVisibility}>
        <span>Advanced Search </span>
        <i className={isContentVisible ? 'icon-up' : 'icon-down'}></i>
      </p>
      <div className="advanced-search-tool-content" style={{ display: isContentVisible ? 'block' : 'none' }}>
        {/* <button className="hide-button" onClick={toggleContentVisibility}>
          <i className={isContentVisible ? 'icon-hide' : 'icon-show'}></i> {isContentVisible ? 'Hide' : 'Show'}
        </button> */}
        <p className="advanced-search-tool-label">Genres:</p>
        <div className="advanced-search-tool-genres-help">
          {/* <span className="advanced-search-tool-genres-help-title a-h" onClick={toggleHelpContentVisibility}>
            <span className="advanced-search-tool-include-span">
              <i className="advanced-search-tool-include-icon"></i>Include genre / 
            </span>
            <span className="advanced-search-tool-exclude-span">
              <i className="advanced-search-tool-exclude-icon"></i>Exclude genre
            </span>
            <span className="advanced-search-tool-help-icon">
              <i></i>&nbsp;
            </span>
          </span> */}
          <p className="advanced-search-tool-genres-help-content" style={{ display: isHelpContentVisible ? 'block' : 'none' }}>
            <i className="advanced-search-tool-include-icon"></i><b>Include genre:</b> If you include Historical, it will filter only mangas with Historical genre. (You can include multiple genres).<br />
            <i className="advanced-search-tool-exclude-icon"></i><b>Exclude genre:</b> If you include Comedy, Romance but exclude Ecchi, it will filter all mangas with Comedy and Romance but Ecchi.
          </p>
        </div>
        <div className="advanced-search-tool-genres-list">
        {mangaGenres.map((genre) => (
            <label key={genre} className="checkbox">
            <button className="checkbox-button" onClick={() => handleGenreChange(genre)}>
              <i className={`checkbox-icon ${genres[genre]}`}/>  
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
            onChange={handleInputChange}
          >
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
            onChange={handleInputChange}
          >
            <option value="all">Ongoing and Complete</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <p style={{ clear: 'both' }}></p>
        <div className="advanced-search-tool-keyword">
          <span className="advanced-search-tool-keyword-title text-nowrap">Keywords:</span>
          <select
            className="advanced-search-tool-keyword-type"
            name="keywordType"
            value={filters.keywordType}
            onChange={handleInputChange}
          >
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
        <button className="advanced-search-tool-apply" onClick={() => onFilterChange(filters)}>Search</button>
      </div>
    </div>
  );
};

export { AdvancedSearchFilter };