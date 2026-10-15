# Simple RESTful API + Postman

## Requirements
- Node.js and npm
- Postman
- VS Code (recommended)

## Run on Mac
1. Extract this ZIP.
2. Open the `RESTful_API_Postman` folder in VS Code.
3. Open Terminal in VS Code.
4. Run:
   ```bash
   npm install
   npm start
   ```
5. Keep the terminal running. The API uses port 8080.

## Test in a browser
- `http://localhost:8080/`
- `http://localhost:8080/api/books`
- `http://localhost:8080/api/books/1`

## Test in Postman
Use `http://localhost:8080` as the base URL.

### GET all books
- Method: GET
- URL: `http://localhost:8080/api/books`

### GET one book
- Method: GET
- URL: `http://localhost:8080/api/books/1`

### POST a book
- Method: POST
- URL: `http://localhost:8080/api/books`
- Body > raw > JSON:
  ```json
  {
    "title": "The Alchemist"
  }
  ```

### PUT (update) a book
- Method: PUT
- URL: `http://localhost:8080/api/books/2`
- Body > raw > JSON:
  ```json
  {
    "title": "Wings of Fire"
  }
  ```

### DELETE a book
- Method: DELETE
- URL: `http://localhost:8080/api/books/2`

## Notes
- Data is stored in memory, so it resets when the server restarts.
- If port 8080 is busy, stop the other server or change `PORT` in your environment.
