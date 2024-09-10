import React, { useState } from 'react';
import { useFetchMangaChapters } from '../Hooks/useFetchMangaChapters';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './ViewAllChaptersPage.css';

const ViewAllChaptersPage = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const mangaURL = location.state.mangaURL;

  const { mangaInfo, chapters, error } = useFetchMangaChapters(isAuthenticated, mangaURL);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);


  const handleToggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!mangaInfo) {
    return <div>Loading...</div>;
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
              <a
                href={chapter.chapterURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {chapter.chapterTitle}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export { ViewAllChaptersPage };