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
 - `GET /api/users`: Get all users
 - `GET /api/users/{userId}`: Get a user by ID
 - `POST /api/users`: Create a new user
 - `PUT /api/users/{userId}`: Update a user
 - `DELETE /api/users/{userId}`: Delete a user

for example, can use API platform POSTMAN, choose GET write  http://localhost:3000/api/users
