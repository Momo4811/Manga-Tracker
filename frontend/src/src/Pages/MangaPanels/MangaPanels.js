import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFetchMangaPanels } from "../../Hooks/useFetchMangaPanels";
import { Loading } from "../../Components";
import "./MangaPanels.css";

const MangaPanels = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mangaTitle = location.pathname.split("/")[2];
  const { mangaURL, chapterURL } = location.state;

  const { panels, chapters, currentChapterIndex, error } = useFetchMangaPanels(
    mangaURL,
    chapterURL
  );

  if (!mangaURL || !chapterURL) {
    return <div>Error: No manga or chapter URL provided</div>;
  }

  if (!panels) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handlePreviousChapter = () => {
    if (currentChapterIndex > 0) {
      navigate(`/read/${mangaTitle}`, {
        state: {
          mangaURL,
          chapterURL: chapters[currentChapterIndex - 1].chapterURL,
        },
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNextChapter = () => {
    if (currentChapterIndex < chapters.length - 1) {
      navigate(`/read/${mangaTitle}`, {
        state: {
          mangaURL,
          chapterURL: chapters[currentChapterIndex + 1].chapterURL,
        },
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleChapterSelect = (event) => {
    const selectedChapterURL = event.target.value;
    navigate(`/read/${mangaTitle}`, {
      state: { mangaURL, chapterURL: selectedChapterURL },
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="manga-reader">
      <div className="navigation-controls">
        <button
          onClick={handlePreviousChapter}
          disabled={currentChapterIndex === 0}
        >
          Previous Chapter
        </button>

        <select value={chapterURL} onChange={handleChapterSelect}>
          {chapters.map((chapter, index) => (
            <option key={index} value={chapter.chapterURL}>
              {chapter.chapterTitle}
            </option>
          ))}
        </select>

        <button
          onClick={handleNextChapter}
          disabled={currentChapterIndex === chapters.length - 1}
        >
          Next Chapter
        </button>
      </div>

      <div className="manga-panel-container">
        {panels.map((panel, index) => (
          <img
            key={index}
            src={panel}
            alt={`Manga panel ${index + 1}`}
            className="manga-panel"
            onError={(e) => {
              e.target.alt = "Image not available";
            }}
          />
        ))}
      </div>
      
      <div className="navigation-controls">
        <button
          onClick={handlePreviousChapter}
          disabled={currentChapterIndex === 0}
        >
          Previous Chapter
        </button>
        <button
          onClick={handleNextChapter}
          disabled={currentChapterIndex === chapters.length - 1}
        >
          Next Chapter
        </button>
      </div>
    </div>
  );
};

export { MangaPanels };
