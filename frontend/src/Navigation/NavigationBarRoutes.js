import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../Pages/HomePage';
import { ViewBookmarks } from '../Pages/ViewBookmarks'; 
import { AddBookmark } from '../Pages/AddBookmark'; 
import { SearchResultsPage } from '../Pages/SearchResultsPage';

const NavigationBarRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/view-bookmarks" element={<ViewBookmarks />} />
      <Route path="/add-bookmark" element={<AddBookmark />} />
      <Route path="/search-results" element={<SearchResultsPage />} />
  </Routes>
  );
};

export { NavigationBarRoutes }