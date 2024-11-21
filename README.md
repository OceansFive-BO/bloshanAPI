# Bloshan API Documentation

## Contents
  - User Endpoints
  - Book Endpoints
  - Contact Endpoint
    
## Getting Started

To get started with the Bloshan API, follow these steps:

1. Clone the repository.
2. Install the dependencies using `npm install`.
3. Seed the Database `npm run seed`.
4. Start the server using `npm start`.

The server will be running on `http://localhost:3000`.

## API Endpoints

### Users

- **GET /users**: Get all users.
  - **Response**: An array of user objects.
- **GET /users/:id**: Get a user by ID.
  - **Parameters**: 
    - `id` (string): The ID of the user.
  - **Response**: A user object.
- **GET /users/email/:email**: Get a user by email.
  - **Parameters**: 
    - `email` (string): The email of the user.
  - **Response**: A user object.
- **GET /users/:id/borrowed**: Get borrowed books by user ID.
  - **Parameters**: 
    - `id` (string): The ID of the user.
  - **Response**: An array of book objects.
- **GET /users/:id/lending**: Get total books lent by user ID.
  - **Parameters**: 
    - `id` (string): The ID of the user.
  - **Response**: An array of book objects.
- **GET /users/:id/recommended**: Get recommended books for a user.
  - **Parameters**: 
    - `id` (string): The ID of the user.
  - **Response**: An array of recommended book objects.
- **POST /users**: Add a new user.
  - **Request Body**:
    - **Params:** ` firstname`, `lastname`,`password` , `username`,`phone`,`email`,`address`,`birth_date`,`photo_url`,`preferred_contact`. Required.
  - **Response**: The created user object.

### Books

- **GET /books**: Get all books.
  - **Response**: An array of book objects.
- **GET /books/:id**: Get a book by ID.
  - **Parameters**: 
    - `id` (string): The ID of the book.
  - **Response**: A book object.
- **GET /books/title/:title**: Get books by title.
  - **Parameters**: 
    - `title` (string): The title of the book.
  - **Response**: An array of book objects.
- **GET /books/genre/:genre**: Get books by genre.
  - **Parameters**: 
    - `genre` (string): The genre of the book.
  - **Response**: An array of book objects.
- **GET /books/newBooks/:title**: Find new books by title.
  - **Parameters**: 
    - `title` (string): The title of the book.
  - **Response**: An array of new book objects.
- **PUT /books/:id/like**: Like a book.
  - **Parameters**: 
    - `id` (string): The ID of the book.
  - **Response**: The updated book object.
- **PUT /books/:id/lend**: Toggle lend status of a book.
  - **Parameters**: 
    - `id` (string): The ID of the book.
  - **Response**: The updated book object.
- **POST /books**: Add a new book.
  - **Request Body**:
    - **Params:** ` userID`,`bookID`. Required. `notes` Optional.
  - **Response**: The created book object.
- **DELETE /books/:id**: Remove a book by ID.
  - **Parameters**: 
    - `id` (string): The ID of the book.
  - **Response**: A message indicating the book was deleted.

### Contacts

- **POST /contact**: Save a new contact.
  - **Request Body**:
    **Params:** `firstname`,`lastname`, `email`, `message`, `date`. Required.
  - **Response**: The created contact object.
