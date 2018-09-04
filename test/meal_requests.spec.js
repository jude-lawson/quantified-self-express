import chai, { expect } from 'chai';
import fetch from 'node-fetch';

import meals from '../fixtures/for_seeds/meals';
import foods from '../fixtures/for_seeds/foods';
import meal_foods from '../fixtures/for_seeds/meal_foods';

import meals_and_foods from '../fixtures/for_tests/meals_and_foods'
import meal_and_foods from '../fixtures/for_tests/meal_and_foods'

const environment = 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);


describe('Meal Requests', () => {
  beforeEach(async () => {
    // Remove all recorsd and reset id sequence all database entries in dependency order
    await database.raw('DELETE FROM meal_foods')
    await database.raw('ALTER SEQUENCE meal_foods_id_seq RESTART WITH 1')
    await database.raw('DELETE FROM foods')
    await database.raw('ALTER SEQUENCE foods_id_seq RESTART WITH 1')
    await database.raw('DELETE FROM meals')
    await database.raw('ALTER SEQUENCE meals_id_seq RESTART WITH 1')
  
    // Create foods
    await database.raw(`INSERT INTO foods (name, calories)
                        VALUES (?,?)
                        RETURNING id`, [foods[0].name, foods[0].calories]);
    await database.raw(`INSERT INTO foods (name, calories)
                        VALUES (?,?)
                        RETURNING id`, [foods[1].name, foods[1].calories]);
    await database.raw(`INSERT INTO foods (name, calories)
                        VALUES (?,?)
                        RETURNING id`, [foods[2].name, foods[2].calories]);
    await database.raw(`INSERT INTO foods (name, calories)
                        VALUES (?,?)
                        RETURNING id`, [foods[3].name, foods[3].calories]);

    // Create meals
    await database.raw(`INSERT INTO meals (name)
                    VALUES (?)`, [meals[0].name]);
    await database.raw(`INSERT INTO meals (name)
                    VALUES (?)`, [meals[1].name]);
    await database.raw(`INSERT INTO meals (name)
                    VALUES (?)`, [meals[2].name]);
    await database.raw(`INSERT INTO meals (name)
                    VALUES (?)`, [meals[3].name]);

    // Create meal_foods
    await database.raw(`INSERT INTO meal_foods (meal_id, food_id)
                    VALUES (?,?)`, [meal_foods[0].meal_id, meal_foods[0].food_id]);
    await database.raw(`INSERT INTO meal_foods (meal_id, food_id)
                    VALUES (?,?)`, [meal_foods[1].meal_id, meal_foods[1].food_id]);
    await database.raw(`INSERT INTO meal_foods (meal_id, food_id)
                    VALUES (?,?)`, [meal_foods[2].meal_id, meal_foods[2].food_id]);
    await database.raw(`INSERT INTO meal_foods (meal_id, food_id)
                    VALUES (?,?)`, [meal_foods[3].meal_id, meal_foods[3].food_id]);
  })

  context('GET /api/v1/meals', () => {
    it('should return all meals in the database', async () => {
      let response       = await fetch('http://localhost:8000/api/v1/meals');
      let parsedResponse = await response.json();
      
      expect(response.status).to.eq(200);
      expect(parsedResponse).to.deep.eq(meals_and_foods);
    });
  });

  context('GET /api/v1/meals/:meal_id/foods', () => {
    it('should return all foods for a specified meal', async () => {
      let response       = await fetch('http://localhost:8000/api/v1/meals/3/foods');
      let parsedResponse = await response.json();

      expect(response.status).to.eq(200);
      expect(parsedResponse).to.deep.eq(meal_and_foods);
    });

    it('should return a 404 if the meal is not found', async () => {
      let response       = await fetch('http://localhost:8000/api/v1/meals/999/foods')
      let parsedResponse = await response.json();

      expect(response.status).to.eq(404);
      expect(parsedResponse).to.deep.eq({ error: 'Meal not found' });
    });
  });
});
