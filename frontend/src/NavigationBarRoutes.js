import React from 'react';
import { Route, Routes, Navigate} from 'react-router-dom';
import { HomePage } from './Pages/HomePage';
import { ViewBookmarksPage } from './Pages/ViewBookmarksPage'; 
import { AddBookmark } from './Pages/AddBookmark'; 
import { SearchResultsPage } from './Pages/SearchResultsPage';

const NavigationBarRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/view-bookmarks" element={<ViewBookmarksPage />} />
      <Route path="/add-bookmark" element={<AddBookmark />} />
      <Route path="/search/:mangaTitle" element={<SearchResultsPage />} />
  </Routes>
  );
};

export { NavigationBarRoutes }