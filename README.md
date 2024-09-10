# Manga Tracker

Manga Tracker is a web application that helps you track your favorite manga and never miss an update!

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

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


# API Endpoints

## Authentication
- POST /auth/register - Register a new user
- POST /auth/login - Log in an existing user

## Bookmarks
- GET /bookmarks - Get all bookmarks for a user
- POST /bookmarks - Add a new bookmark
- PUT /bookmarks/:id - Update a bookmark

## Search
- POST /search/extract - Search for manga series

## User
- GET /user/fetchUserID - Fetch user ID

## License
This project is licensed under the MIT License.