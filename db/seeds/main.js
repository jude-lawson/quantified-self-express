const seed_fixtures = '../../fixtures/for_seeds';
const foods = require(`${seed_fixtures}/foods`);
const meals = require(`${seed_fixtures}/meals`);
const meal_foods = require(`${seed_fixtures}/meal_foods`);


exports.seed = function(knex, Promise) {
  return Promise.all([
    // Delete all dependents first in meal_foods joins table
    knex('meal_foods').del()
      .then(() => {
        // Delete and add in foods and meals
        knex('foods').del().then(() => knex('foods').insert(foods)),
        knex('meals').del().then(() => knex('meals').insert(meals))
      })
      .then(() => {
        // Update the meal_foods table with created food and meal ids
        knex('meal_foods').insert(meal_foods)
      })
  ]);
};
