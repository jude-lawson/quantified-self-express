const seed_fixtures = '../../fixtures/for_seeds';
const foods = require(`${seed_fixtures}/foods`);
const meals = require(`${seed_fixtures}/meals`);
const meal_foods = require(`${seed_fixtures}/meal_foods`);


exports.seed = async (knex, Promise) => {
  // Delete meal_foods and reset id sequence
  await Promise.all([
    knex('meal_foods').del(),
    knex.raw('ALTER SEQUENCE meal_foods_id_seq RESTART WITH 1')
  ]);

  // Delete meals and reset id sequence
  await Promise.all([
    knex('meals').del(),
    knex.raw('ALTER SEQUENCE meals_id_seq RESTART WITH 1')
  ]);

  // Delete foods and reset id sequence
  await Promise.all([
    knex('foods').del(),
    knex.raw('ALTER SEQUENCE foods_id_seq RESTART WITH 1')
  ]);
  
  // Create foods
  await Promise.all([
    knex.raw(`INSERT INTO foods (name, calories)
              VALUES (?,?)
              RETURNING id`, [foods[0].name, foods[0].calories]),
    knex.raw(`INSERT INTO foods (name, calories)
              VALUES (?,?)
              RETURNING id`, [foods[1].name, foods[1].calories]),
    knex.raw(`INSERT INTO foods (name, calories)
              VALUES (?,?)
              RETURNING id`, [foods[2].name, foods[2].calories]),
    knex.raw(`INSERT INTO foods (name, calories)
              VALUES (?,?)
              RETURNING id`, [foods[3].name, foods[3].calories]),
  ]);

  // Create meals
  await Promise.all([
    knex.raw(`INSERT INTO meals (name)
              VALUES (?)`, [meals[0].name]),
    knex.raw(`INSERT INTO meals (name)
              VALUES (?)`, [meals[1].name]),
    knex.raw(`INSERT INTO meals (name)
              VALUES (?)`, [meals[2].name]),
    knex.raw(`INSERT INTO meals (name)
              VALUES (?)`, [meals[3].name])
  ]);

  // Create meal_foods
  await Promise.all([
    knex.raw(`INSERT INTO meal_foods (meal_id, food_id)
              VALUES (?,?)`, [meal_foods[0].meal_id, meal_foods[0].food_id]),
    knex.raw(`INSERT INTO meal_foods (meal_id, food_id)
              VALUES (?,?)`, [meal_foods[1].meal_id, meal_foods[1].food_id]),
    knex.raw(`INSERT INTO meal_foods (meal_id, food_id)
              VALUES (?,?)`, [meal_foods[2].meal_id, meal_foods[2].food_id]),
    knex.raw(`INSERT INTO meal_foods (meal_id, food_id)
              VALUES (?,?)`, [meal_foods[3].meal_id, meal_foods[3].food_id]),
  ]);
};
