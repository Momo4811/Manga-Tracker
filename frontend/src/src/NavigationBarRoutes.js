import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { HomePage, ViewBookmarksPage, AddBookmark, SearchResultsPage, ViewAllChaptersPage, MangaPanels } from './Pages';

const NavigationBarRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/view-bookmarks" element={<ViewBookmarksPage />} />
      <Route path="/add-bookmark" element={<AddBookmark />} />
      <Route path="/search/:mangaTitle" element={<SearchResultsPage searchType="regular" />} />
      <Route path="/view-manga/:title" element={<ViewAllChaptersPage />} />
      <Route path="/advanced_search" element={<SearchResultsPage searchType="advanced" />} />
      <Route path="/read/:title" element={<MangaPanels />} />
    </Routes>
  );
};

export { NavigationBarRoutes };