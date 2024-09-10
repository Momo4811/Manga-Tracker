import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { HomePage, ViewBookmarksPage, AddBookmark, SearchResultsPage, ViewAllChaptersPage } from './Pages';

const NavigationBarRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/view-bookmarks" element={<ViewBookmarksPage />} />
      <Route path="/add-bookmark" element={<AddBookmark />} />
      <Route path="/search/:mangaTitle" element={<SearchResultsPage searchType="regular" />} />
      <Route path="/view-bookmarks/:title" element={<ViewAllChaptersPage />} /> 
      <Route path="/advanced_search" element={<SearchResultsPage searchType="advanced" />} />
    </Routes>
  );
};

export { NavigationBarRoutes };