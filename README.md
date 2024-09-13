# Manga Tracker

Manga Tracker is a web application that helps you track your favorite manga and never miss an update! Made as a personal project, likely to be adapted to a browser extension in the future

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Preview](#preview)
- [API-Endpoints](#api-endpoints)


## Features

- Search for manga
- Track your favorite manga
- View all chapters
- Bookmark manga

## Installation

### Backend

1. Navigate to the `backend` directory:
    ```sh
    cd backend
    ```
2. Install the dependencies:
    ```sh
    npm install
    ```
3. Start the backend server:
    ```sh
    npm start
    ```

### Frontend

1. Navigate to the `frontend` directory:
    ```sh
    cd frontend
    ```
2. Install the dependencies:
    ```sh
    npm install
    ```
3. Start the frontend development server:
    ```sh
    npm start
    ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Use the search bar on the homepage to search for manga.
3. Bookmark your favorite manga and track their updates.


# Preview

### Home Page
![Home Page](images/home_page.png)

### Search Page
![Search Page](images/search_page.png)

### Bookmarks Page
![Manga Details Page](images/manga_details_page.png)

### Manga Details Page
![Manga Details Page](images/manga_details_page.png)


# API Endpoints

## Authentication
- POST /auth/register - Register a new user
- POST /auth/login - Log in an existing user

## Bookmarks
- POST /fetchBookmarks - Fetch bookmarks for a user
- POST /addBookmark - Add a new bookmark
- DELETE /deleteBookmark - Delete a bookmark
- PUT /readChapter - Read + update next chapter 
- POST /viewChapters - View chapters of a manga
- PUT /updateLastRead - Update the last read chapter

## Search
- POST /search/extract - Search for manga series

## User
- GET /user/fetchUserID - Fetch user ID

