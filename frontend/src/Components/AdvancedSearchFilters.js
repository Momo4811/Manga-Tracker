import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const AdvancedSearchFilter = () => {
  const [isContentVisible, setIsContentVisible] = useState(false);
  // const [isHelpContentVisible, setIsHelpContentVisible] = useState(false);
  const [genres, setGenres] = useState({ mangaGenresChecked });
  const [keyword, setkeyword] = useState('');
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [keywordType, setKeywordType] = useState('everything');

  const navigate = useNavigate();

  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
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

  const handleGenresChecklist = () => {
    const includedGenres = [];
    const excludedGenres = [];

    for (const genre in genres) {
      if (genres[genre] === 'include') includedGenres.push(mangaGenresMap[genre]);
      else if (genres[genre] === 'exclude') excludedGenres.push(mangaGenresMap[genre]);
    }

    return { includedGenres, excludedGenres };
  }


  const handleGenresSearch = async () => {
    const { includedGenres, excludedGenres } = handleGenresChecklist();

    const includedGenresStr = includedGenres.length > 0 ? `&g_i=${includedGenres.join('_')}` : '';
    const excludedGenresStr = excludedGenres.length > 0 ? `&g_e=${excludedGenres.join('_')}` : '';
    const keywordStr = keyword ? `&keyw=${keyword}` : '';
    const statusStr = status !== 'all' ? `&sts=${status}` : '';
    const sortByStr = sortBy ? `&orby=${sortBy}` : '';
    const keywordTypeStr = keywordType ? `&keyt=${keywordType}` : '';
    const pageStr = `&page=${page}`;

    const searchURL = includedGenresStr + excludedGenresStr + keywordStr + statusStr + sortByStr + keywordTypeStr + pageStr;

    navigate(`/advanced_search?s=all${searchURL}`);
  };

  return (
    <div className="panel-advanced-search-tool">
      <p className={`advanced-search-tool-title ${isContentVisible ? '' : 'advanced-search-tool-hidden'} a-h`} onClick={toggleContentVisibility}>
        <span>Advanced Search </span>
        <i className={isContentVisible ? 'icon-up' : 'icon-down'}></i>
      </p>
      <div className="advanced-search-tool-content" style={{ display: isContentVisible ? 'block' : 'none' }}>
        <p className="advanced-search-tool-label">Genres:</p>
        <div className="advanced-search-tool-genres-help"/>
        <div className="advanced-search-tool-genres-list">
          {mangaGenres.map((genre) => (
            <label key={genre} className="checkbox">
              <button className="checkbox-button" onClick={() => handleGenreChange(genre)}>
                <i className={`checkbox-icon ${genres[genre]}`} />
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
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
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
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
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
            value={keywordType}
            onChange={(e) => setKeywordType(e.target.value)}
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
          value={keyword}
          onChange={(e) => setkeyword(e.target.value)}
          autoComplete="off"
          maxLength="100"
        />
        <p style={{ clear: 'both' }}></p>
        <button className="advanced-search-tool-apply" onClick={handleGenresSearch}>Search</button>
      </div>
    </div>
  );
};

export { AdvancedSearchFilter };