import chai, { expect } from 'chai';
import fetch from 'node-fetch'

import foods from '../fixtures/for_seeds/foods';
import meals from '../fixtures/for_seeds/meals';
import meal_foods from '../fixtures/for_seeds/meal_foods';

import food from '../fixtures/for_tests/food';

const environment = 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

describe('Food Requests', () => {
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

  context('GET /api/v1/foods', () => {
    it('should return all foods in the database', async () => {
      let response       = await fetch('http://localhost:8000/api/v1/foods');
      let parsedResponse = await response.json();

      expect(response.status).to.eq(200);
      expect(parsedResponse).to.deep.eq(foods);
    });
  });

  context('GET /api/v1/foods/:id', () => {
    it('should return a single food with the specified id', async () => {
      let response       = await fetch('http://localhost:8000/api/v1/foods/1');
      let parsedResponse = await response.json();

      expect(response.status).to.eq(200);
      expect(parsedResponse).to.deep.eq(food);
    });
  });

  context('POST /api/v1/foods', () => {
    it('given a food object, it should create a food', async () => {
      let new_food   = JSON.stringify({ food: { name: 'Dumplings', calories: 900 } });
      let fetch_init = { method: 'post', body: new_food, headers: { 'Content-Type': 'application/json' } };
      let expected_food = { id: 5, name: 'Dumplings', calories: 900 }

      let response = await fetch('http://localhost:8000/api/v1/foods', fetch_init);
      let parsedResponse = await response.json();
      
      expect(response.status).to.eq(200);
      expect(parsedResponse).to.deep.eq(expected_food);
    })

    it('should return 400 if the creation was not successful', async () => {
      let errant_food = JSON.stringify({ food: {} });
      let fetch_init  = { method: 'post', body: errant_food, headers: { 'Content-Type': 'application/json' } };

      let response       = await fetch('http://localhost:8000/api/v1/foods', fetch_init); 

      expect(response.status).to.eq(400);
    });

    it('should return 400 with error message if \'name\' is not included', async () => {
      let errant_food = JSON.stringify({ food: { calories: 900 } });
      let fetch_init  = { method: 'post', body: errant_food, headers: { 'Content-Type': 'application/json' } };

      let response       = await fetch('http://localhost:8000/api/v1/foods', fetch_init)
      let parsedResponse = await response.json();

      expect(response.status).to.eq(400);
      expect(parsedResponse).to.deep.eq({ error: 'Name attribute is required' })
    });

    it('should return 400 with error message if \'calories\' is not included', async () => {
      let errant_food = JSON.stringify({ food: { name: 'Dumplings' } });
      let fetch_init = { method: 'post', body: errant_food, headers: { 'Content-Type': 'application/json' } };

      let response       = await fetch('http://localhost:8000/api/v1/foods', fetch_init)
      let parsedResponse = await response.json() 

      expect(response.status).to.eq(400);
      expect(parsedResponse).to.deep.eq({ error: 'Calories attribute is required' })
    });
  });

  context('PATCH /api/v1/foods/:id', () => {
    it('should update the food with the specified id', async () => {
      let expected_food     = { id: 1, name: 'Snickerdoodle', calories: 700 };
      let updated_food_data = JSON.stringify({ food: { name: 'Snickerdoodle', calories: 700 } });
      let fetch_init        = { method: 'patch', body: updated_food_data, headers: { 'Content-Type': 'application/json' } }

      let response       = await fetch('http://localhost:8000/api/v1/foods/1', fetch_init)
      let parsedResponse = await response.json();

      expect(response.status).to.eq(200);
      expect(parsedResponse).to.deep.eq(expected_food);
    })

    it('should return a 400 if the food update was unsuccessful', async () => {
      let errant_food       = { food: {} };
      let updated_food_data = JSON.stringify(errant_food);
      let fetch_init        = { method: 'patch', body: updated_food_data, headers: { 'Content-Type': 'application/json' } }

      let response = await fetch('http://localhost:8000/api/v1/foods/1', fetch_init)

      expect(response.status).to.eq(400);
    });
  });

  context('DELETE /api/v1/foods/:id', () => {
    it('should delete the food and return a 204 if successful', async () => {
      let fetch_init = { method: 'delete' }

      let response = await fetch('http://localhost:8000/api/v1/foods/2', fetch_init)
      
      expect(response.status).to.eq(204)
    });

    it('should return a 404 if not successful', async () => {
      let fetch_init = { method: 'delete' }

      let response = await fetch('http://localhost:8000/api/v1/foods/999', fetch_init)

      expect(response.status).to.eq(404)
    });
  })
});
