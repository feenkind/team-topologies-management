# Team management with team topologies
Under development.  
This app supports the management of teams according to the team type
philosophy.

# Frontend application
The frontend application uses the create-react-app bootstrap as a base.

## Development
Install all node module with `npm i`.
The application can be started with navigating to the frontend folder and 
running `npm run start`.

For basic authentication and backend connection, copy the `.env.example` and 
rename it
to `.env`.
Add all needed values.


# Backend application
The frontend application uses NestJS.

## Development
Install all node module with `npm i`.

Run the application in following modes:
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

For basic authentication and database, copy the `.env.example` and rename it 
to `.env`.
Add all needed values.

## Database
Start the postgres database in docker with
```bash
$ docker-compose --env-file backend/.env up db
````

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
