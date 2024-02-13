# CRUD-API-nodejs

## Installation Guide

1. Install dependencies:
    ```
    npm i 
    ```
2. Run start:dev script for running application in development mode
    ```
    npm run start:dev
    ```
    Or run start:prod script for running application in production mode

    ```
    npm run start:dev
    ```

3. Then use postman to test app.

### Implemented endpoint api/users:

- **GET** `api/users` is used to get all persons
  - Server should answer with `status code` **200** and all users records
    - **GET** `api/users/{userId}`
        - Server should answer with `status code` **200** and record with `id === userId` if it exists
        - Server should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
        - Server should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
    - **POST** `api/users` is used to create record about new user and store it in database
        - Server should answer with `status code` **201** and newly created record
        - Server should answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields
    - **PUT** `api/users/{userId}` is used to update existing user
        - Server should answer with` status code` **200** and updated record
        - Server should answer with` status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
        - Server should answer with` status code` **404** and corresponding message if record with `id === userId` doesn't exist
    - **DELETE** `api/users/{userId}` is used to delete existing user from database
        - Server should answer with `status code` **204** if the record is found and deleted
        - Server should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
        - Server should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist

### There is one predefined User in database for better testing
```JSON
{
  "id": "876c2611-aa48-4ab4-9199-e8fc83e492b8",
  "username": "Artur",
  "age": 23,
  "hobbies": [
    "footbal"
  ]
}
```