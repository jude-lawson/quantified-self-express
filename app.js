const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

import Food from './models/Food';



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 8000);
app.locals.title = 'Quantified Self Express API';

app.get('/', (request, response) => {
  response.send('Quantified Self Express API')
});

app.get('/api/v1/foods', (request, response) => {
  Food.getAllFoods().then(foods => response.status(200).json(foods))
});

// app.get('/api/v1/meals', (request, response) => {
//   // console.log(database.select('foods.*', 'meals.*').from('meal_foods')
//   //               .innerJoin('meals', 'meal_foods.meal_id', 'meals.id')
//   //               .innerJoin('foods', 'meal_foods.food_id', 'foods.id').toSQL().sql);
//   database.select('foods.*', 'meals.*').from('meal_foods')
//     .innerJoin('meals', 'meal_foods.meal_id', 'meals.id')
//     .innerJoin('foods', 'meal_foods.food_id', 'foods.id')
//     .groupBy('meals.name')
//     .then(meals => response.status(200).json(meals))
//     .catch(error => console.error(error));
// });

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is now running on port ${app.get('port')}.`);
});

module.exports = app;

