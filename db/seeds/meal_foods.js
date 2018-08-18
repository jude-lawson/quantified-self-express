const meal_foods = require('../../fixtures/development/meal_foods');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('meal_foods').del()
    .then(function () {
      // Inserts seed entries
      return knex('meal_foods').insert(meal_foods);
    });
};
