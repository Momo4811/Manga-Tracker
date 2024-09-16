import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { useFetchMangaChapters } from '../../Hooks/useFetchMangaChapters';
import { useAuth } from '../../Contexts/AuthContext';
import { Loading } from '../../Components';

import './ViewAllChaptersPage.css';

const ViewAllChaptersPage = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const mangaURL = location.state.mangaURL;

  const { mangaInfo, chapters, error } = useFetchMangaChapters(isAuthenticated, mangaURL);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const handleToggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const handleReadChapter = (chapterURL) => {
    navigate(`/read/${(mangaInfo.officialTitle).replace(' ','_')}`, { state: { mangaURL, chapterURL : chapterURL } });
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!mangaInfo) {
    return <Loading />;
  }

  return (
    <div className="view-all-chapters-page">
      <div className="back-button-container">
        <button className="back-button" onClick={() => window.history.back()}>
          <FontAwesomeIcon icon={faArrowLeft} /> Back
        </button>
      </div>
      <div className="manga-info">
        <h1>{mangaInfo.officialTitle}</h1>
        <img src={mangaInfo.mangaImage} alt={mangaInfo.officialTitle} />
        <div className="manga-info-details">
          <p><strong>Alternate Titles:</strong> {mangaInfo.alternateTitles}</p>
          <p><strong>Genres:</strong> {mangaInfo.genres.join(', ')}</p>
          <p><strong>Status:</strong> {mangaInfo.mangaStatus}</p>
          <p><strong>Latest Chapter:</strong> {mangaInfo.latestChapter.chapterTitle}</p>
          <p><strong>Release Date:</strong> {mangaInfo.latestChapter.releaseDate}</p>
        </div>
      </div>
      <div className="manga-description">
        <h2>Description</h2>
        <p>
          {isDescriptionExpanded ? mangaInfo.description : `${mangaInfo.description.substring(0, 300)}...`}
          {mangaInfo.description.length > 300 && (
            <button className="continue-reading-button" onClick={handleToggleDescription}>
              {isDescriptionExpanded ? 'Show Less' : 'Show More'}
            </button>
          )}
        </p>
      </div>
      <div className="chaper-container">
        <h2 className="chapter-list-header">Chapters</h2>
        <ul className="chapters-list">
          {chapters.map((chapter, index) => (
            <li key={index} className="chapter-item">
              <div
                className="chapter-link"
                onClick={() => handleReadChapter(chapter.chapterURL)}
              >
                {chapter.chapterTitle}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export { ViewAllChaptersPage };