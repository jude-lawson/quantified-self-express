# Quantified Self ExpressJS API

[![Waffle.io - Columns and their card count](https://badge.waffle.io/jude-lawson/quantified-self-express.svg?columns=all)](https://waffle.io/jude-lawson/quantified-self-express)


## Summary

Quantified Self Express API is an Express API built for serving a Meal Diary interface. The frontend for that meal diary can be found [here](https://jude-lawson.github.io/quantified-self-fe-express/). The backend API is hosted at [here](https://thawing-coast-44702.herokuapp.com/). 

The api keeps track of foods and their calorie counts and relates those foods to specific meals (breakfast, lunch, snack, or dinner).

### Endpoints

`GET /api/v1/foods`
- Returns all foods currently in the database
- Payload:
```javascript
[
  {
    id: 1,
    name: 'Banana',
    calories: 100
  },
  {
    id: 2,
    name: 'Cookie',
    calories: '300'
  }
]
```

`GET /api/v1/foods/:id`
- Returns a single food with the provided id from the database
- Payload:
```javascript
{
  id: 12,
  name: 'Cookie',
  calories: 300
}
```

`POST /api/v1/foods`
- Adds a food to the database
- Receives a object (converted to JSON) like the one below:
```javascript
{
  food: {
    name: 'Dumplings',
    calories: 900
  }
}
```

`PATCH /api/v1/foods/:id`
- Updates the food with the given id in the database
- Receives and object (converted to JSON) like the one below:
```javascript
{
  food: {
    name: 'Flax Seed'
    calories: 50
  }
}
```

`DELETE /api/v1/foods/:id`
- Removes the food specified by the id from the database and associated meals
- If the food item is not found, a 404 will be returned

`GET /api/v1/meals`
- Returns all meals and their associated foods
- Payload:
```javascript
[
  {
    id: 1,
    name: 'Breakfast',
    foods: [
      {
        id: 1,
        name: 'Strawberries'
        calories: 200
      }
    ]
  },
  {
    id: 2
    name: 'Lunch'
    foods: [
      {
        id: 3,
        name: 'Sandwich'
        calories: 600
      },
      {
        id: 4,
        name: 'Chips'
        calories: 800
      }
    ]
  }
]
```

`GET /api/v1/meals/:meal_id/foods`
- Returns all of the associated foods for a specified meal
- Payload:
```javascript
{
  id: 2
  name: 'Lunch'
  foods: [
    {
      id: 3,
      name: 'Sandwich'
      calories: 600
    },
    {
      id: 4,
      name: 'Chips'
      calories: 800
    }
  ]
}
```

`POST /api/v1/meals/:meal_id/foods/:id`
- Adds a food to a specified meal
- Returns the following message with a 201 status if successful
```javascript
{
  message: 'Successfully added <food> to <meal>'
}
```
- Returns a 404 if the specified food or meal cannot be found


`DELETE /api/v1/meals/:meal_id/foods/:id`
- Removes the specified food from the specified meal
- Returns a 404 if the specified food or meal is not found
- Return the following message with a 201 status if successful
```javascript
{
  message: 'Successfully removed <food> from <meal>'
}
```

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
