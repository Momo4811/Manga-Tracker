import React, { useState } from 'react';

const genres = [
  "Action", "Adult", "Adventure", "Comedy", "Cooking", "Doujinshi", "Drama", "Ecchi", "Erotica", 
  "Fantasy", "Gender bender", "Harem", "Historical", "Horror", "Isekai", "Josei", "Manhua", 
  "Manhwa", "Martial arts", "Mature", "Mecha", "Medical", "Mystery", "One shot", "Pornographic", 
  "Psychological", "Romance", "School life", "Sci fi", "Seinen", "Shoujo", "Shoujo ai", "Shounen", 
  "Shounen ai", "Slice of life", "Smut", "Sports", "Supernatural", "Tragedy", "Webtoons", "Yaoi", "Yuri"
];

const AdvancedSearchFilter = ({ filters = { genres: [], keyword: '', sortBy: 'latest', status: 'all', keywordType: 'everything' }, handleInputChange, onFilterChange }) => {
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isHelpContentVisible, setIsHelpContentVisible] = useState(false);

  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
  };

  const toggleHelpContentVisibility = () => {
    setIsHelpContentVisible(!isHelpContentVisible);
  };

  return (
    <div className="panel-advanced-search-tool">
      <p className={`advanced-search-tool-title ${isContentVisible ? '' : 'advanced-search-tool-hidden'} a-h`} onClick={toggleContentVisibility}>
        <span>Advanced Search </span>
        <i className={isContentVisible ? 'icon-up' : 'icon-down'}></i>
      </p>
      <div className="advanced-search-tool-content" style={{ display: isContentVisible ? 'block' : 'none' }}>
        <button className="hide-button" onClick={toggleContentVisibility}>
          <i className={isContentVisible ? 'icon-hide' : 'icon-show'}></i> {isContentVisible ? 'Hide' : 'Show'}
        </button>
        <p className="advanced-search-tool-label">Genres:</p>
        <div className="advanced-search-tool-genres-help">
          <span className="advanced-search-tool-genres-help-title a-h" onClick={toggleHelpContentVisibility}>
            <span className="advanced-search-tool-include-span">
              <i className="advanced-search-tool-include-icon"></i>Include genre
            </span>
            <span className="advanced-search-tool-exclude-span">
              <i className="advanced-search-tool-exclude-icon"></i>Exclude genre
            </span>
            <span className="advanced-search-tool-help-icon">
              <i></i>&nbsp;
            </span>
          </span>
          <p className="advanced-search-tool-genres-help-content" style={{ display: isHelpContentVisible ? 'block' : 'none' }}>
            <i className="advanced-search-tool-include-icon"></i><b>Include genre:</b> If you include Historical, it will filter only mangas with Historical genre. (You can include multiple genres).<br />
            <i className="advanced-search-tool-exclude-icon"></i><b>Exclude genre:</b> If you include Comedy, Romance but exclude Ecchi, it will filter all mangas with Comedy and Romance but Ecchi.
          </p>
        </div>
        <div className="advanced-search-tool-genres-list">
          {genres.map((genre) => (
            <label key={genre}>
              <input
                type="checkbox"
                name="genres"
                value={genre}
                checked={filters.genres.includes(genre)}
                onChange={handleInputChange}
              />
              {genre}
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