# Team management with team topologies
Under development.  
This app supports the management of teams according to the team topology
philosophy.

# Frontend application
The frontend application uses the create-react-app bootstrap as a base.

## Development
Install all node module with `npm i`.
The application can be started with navigating to the frontend folder and 
running `npm run start`.


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

For basic authentication, copy the `.env.example` and rename it to `.env`.
Add a user and a password.

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
