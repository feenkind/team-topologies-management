# Team Management with Team Topologies 
This app supports the management of teams 
according to the Team Topologies philosophy.

# Frontend application
The frontend application is written in React uses the create-react-app 
bootstrap as a base.

## Development
Install all node module with `npm i`.
The application can be started with navigating to the frontend folder and 
running `npm run start`.

For working backend connection, copy the `.env.example` and rename it to `.env`.
Add the url to your local backend.


# Backend application
The backend application uses NestJS.

## Development
Install all node module with `npm i`.

Navigate to the backend folder and run the application in following modes:
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

For basic authentication and the database connection, copy the `.env.example` 
and rename it 
to `.env`.
Add all needed values.

### Running the backend application with docker
Alternatively you can run the backend application with docker.
```bash
$ docker-compose --env-file backend/.env up app
````
Make sure to change `localhost` in the DATABASE_URL in your `.env` with 
`team-management-postgres`.

## Database
Start the postgres database in docker with
```bash
$ docker-compose --env-file backend/.env up db
````

To apply all migrations, execute `npx prisma migrate dev`.

For some test data, execute
`npx prisma db seed`. This command will also be executed when resetting the 
database with `npx prisma migrate reset`.

## Test
Only basic tests are implemented for the backend so far. They can be run 
with following commands:

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
