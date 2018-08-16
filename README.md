# Quantified Self Express API

### Setup
- Clone down this repo

```
git clone git@github.com:jude-lawson/quantified-self-express.git
```

- Install dependencies: `yarn install` or `npm install`
- Install the postgresql package globally: `yarn global add pg` or `npm install -g pg`
- Open the postgresql cli in your terminal: `psql`
  - You may receive a message about a missing database and your username. Use the command below to create that database and continue using psql:
  
  ```shell
  createdb '<your_username_cited_from_the_error>'
  ```

- After successfully accessing psql, create your development database: `CREATE DATABASE <your_development_database_name>`
  - _Please be sure to repeat this step for databases needed for other environments_

- Initialize knex: `knex init`
- Open the created `knexfile.js` and configure it for development using something like what's below:

_NOTE: The file should already be setup properly, but you may have to update the database connection name in the development and test environments_

```javascript
  module.exports = {
    development: {
      client: 'pg',
      connection:  'postgres://localhost/quantified_self_express_development',
      migrations: {
        directory: './db/migrations'
      },
      userNullAsDefault: true
    },
    ...
  };
```

- Run all existing migrations: `knex migrate:latest`
- Run all tests to ensure that they are passing: `yarn test`
- Run the app locally to make sure there are no server-side errors: `yarn start`

### Contributing

We are accepting contributions!
Please be sure to do the following when contributing:

- Fork this repository.
- Clone it down and follow the setup steps above.
- When submitting a PR, use the PR template that automatically populates in the PR field.
- Please be sure to reference the issue that you are addressing. If there is not an existing issue, please create one.
- We will do our best to provide code reviews, please make any required changes and re-push to the branch with the open PR. No need to make a new PR.
