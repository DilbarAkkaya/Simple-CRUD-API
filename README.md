IMPORTANT! create .env file with variable PORT=3000 in the project root folder (SIMPLE CRUD API at the same level with a file api.ts)

# Simple-CRUD-API
## Installing
 - git clone https://github.com/DilbarAkkaya/Simple-CRUD-API.git or Download ZIP
 - git checkout develop
 - npm install

## Running
 - development mode: npm run start:dev
 - production mode: npm run start:prod
 - multi mode: npm run start:multi
 - tests: npm run test

## Configuring
 - Endpoint: /api/users
 - Base port: 3000
 - Base URL: http://localhost:3000

## Using
The following endpoints are available:
 - `GET /api/users`: Get all users (first will shown empty array (database), after post new users, you can try again, you will see all created users)
 - `GET /api/users/{userId}`: Get a user by ID (you will see in response a user with this id)
 - `POST /api/users`: Create a new user (new user will be in response and will add to database, don't add field id, id will be created by uuid)
 - `PUT /api/users/{userId}`: Update a user (when you send this request, you will see this user in response with updated fields, array will be with updated user) 
 - `DELETE /api/users/{userId}`: Delete a user (when you send this request, you will see this user in response, but it will be deleted from array of users, you can check it with GET /api/users.

for example, can use API platform POSTMAN, choose GET write  http://localhost:3000/api/users
