# React Employee App

React based web-app that has manager and employee entity with 1:N relationship.
The manager is able to manipulate employee after following authentication process.

## Run Locally

Clone the project

```bash
  git clone https://github.com/bhavik2936/react-employee-app.git
```

Go to the project directory

```bash
  cd react-employee-app
```

Install dependencies

```bash
  yarn install
```

Start the server

```bash
  yarn start
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

Below mentioned variable referes to rails API server; [this repo](https://github.com/bhavik2936/rails-employee-app) have deployed server on [heroku](https://rails-employee-app.herokuapp.com/api/v1) to serve the same purpose.

`REACT_APP_RAILS_API_URL`

For not to open browser on server start, the following environment variable can also be defined.

`BROWSER = none`

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn format`

Formats the .js and .jsx files with prettier formatter.

### `yarn lint`

Analyzes and reports with specified linting rules with eslint.
