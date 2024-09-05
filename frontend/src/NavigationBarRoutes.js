import React from 'react';
import { Route, Routes, Navigate} from 'react-router-dom';
import { HomePage } from './Pages';
import { ViewBookmarksPage } from './Pages'; 
import { AddBookmark } from './Pages'; 
import { SearchResultsPage } from './Pages';
import { ViewAllChaptersPage } from './Pages';

const NavigationBarRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/view-bookmarks" element={<ViewBookmarksPage />} />
      <Route path="/add-bookmark" element={<AddBookmark />} />
      <Route path="/search/:mangaTitle" element={<SearchResultsPage />} />
      <Route path="/view-bookmarks/:title" element={<ViewAllChaptersPage />} /> 
  </Routes>
  );
};

export { NavigationBarRoutes }