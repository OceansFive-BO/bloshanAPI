- # Bloshan API Documentation
  ## Contents
  - User Endpoints
  - Book Endpoints
  - Contact Endpoint
  ## User Endpoints
  - GET `/user/:id/borrowed`
    - Returns a list of books borrowed by the user.
    - **Params:** `id` - User's ID. Required.
  - GET `/user/:id/lending`
    - Returns a list of books the user is lending.
    - **Params:** `id` - User's ID. Required.
  - GET `/user/:id`
    - Returns user information.
    - **Params:** `id` - User's ID. Required.
  - POST `/user/login`
    - Login in
    - **Params:** `username`,`password` Required.
  - POST `/user`
    - Registers a new user.
    - **Params:** ` firstname`, `lastname`,`password` , `username`,`phone`,`email`,`address`,`birth_date`,`photo_url`,`preferred_contact`. Required.
  - POST `/user/logout`
    - Logs out a user.
  ## Book Endpoints
   - GET `/books/newBooks/:title`
    - Returns books searched by title from google API
    - **Params:** `genre` - Genre of the books. Required.
  - GET `/books/`
    - Returns books in collection
    - **Query Params:** `genre`,`title`,`count` Optional
  - GET `/books/genre/:genre`
    - Returns books searched by genre.
    - **Params:** `genre` - Genre of the books. Required.
  - GET `/books/:id`
    - Returns details for a specific book.
    - **Params:** `id` - Book ID. Required.
  - GET `/books/title/:title`
    - Returns top 5 books containing word in title.
    - **Params:** `title` - Part of the title. Required.
  - POST `/books`
    - Adds a new book to the database.
    - **Params:** ` userID`,`bookID`. Required. `notes` Optional.
  - PUT `/books/:id/lend`
    - Updates the lending and borrowing status of a book.
    - **Params:** `id` - Book ID. `userID` id- borrower Required.
  - PUT `/books/:id/like`
    - Updates the lending and borrowing status of a book.
    - **Params:** `id` - Book ID Required.
  ## Contact Endpoint
  - POST `/contact`
    - Allows users to send messages or feedback.
    - **Params:** ` date`,`name`, `message`. Required.`phone`,`email` Optional.
