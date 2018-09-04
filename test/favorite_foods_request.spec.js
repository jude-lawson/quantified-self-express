import chai, { expect } from 'chai';
import fetch from 'node-fetch';

import favorite_foods from '../fixtures/for_tests/favorite_foods';

const environment = 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

describe('Favorite Foods Requests', () => {
  beforeEach(async () => {
    // Remove all recods and reset id sequence all database entries in dependency order
    await database.raw('DELETE FROM meal_foods')
    await database.raw('ALTER SEQUENCE meal_foods_id_seq RESTART WITH 1')
    await database.raw('DELETE FROM foods')
    await database.raw('ALTER SEQUENCE foods_id_seq RESTART WITH 1')
    await database.raw('DELETE FROM meals')
    await database.raw('ALTER SEQUENCE meals_id_seq RESTART WITH 1')

    // Create foods
    await database.raw(`INSERT INTO foods (name, calories) VALUES (?, ?)`, 
                        ['Cookies', 900]);
    await database.raw(`INSERT INTO foods (name, calories) VALUES (?, ?)`, 
                        ['Macaroons', 1100]);
    await database.raw(`INSERT INTO foods (name, calories) VALUES (?, ?)`, 
                        ['Banana', 500]);
    await database.raw(`INSERT INTO foods (name, calories) VALUES (?, ?)`, 
                        ['Sandwich', 900]);

    //Create meals
    await database.raw(`INSERT INTO meals (name) VALUES (?)`, ['Breakfast'])
    await database.raw(`INSERT INTO meals (name) VALUES (?)`, ['Snack'])
    await database.raw(`INSERT INTO meals (name) VALUES (?)`, ['Lunch'])
    await database.raw(`INSERT INTO meals (name) VALUES (?)`, ['Dinner'])

    // Create Meal Foods
    await database.raw(`INSERT INTO meal_foods (meal_id, food_id) VALUES (?, ?)`, [1, 3])
    await database.raw(`INSERT INTO meal_foods (meal_id, food_id) VALUES (?, ?)`, [2, 1])
    await database.raw(`INSERT INTO meal_foods (meal_id, food_id) VALUES (?, ?)`, [2, 2])
    await database.raw(`INSERT INTO meal_foods (meal_id, food_id) VALUES (?, ?)`, [3, 4])
    await database.raw(`INSERT INTO meal_foods (meal_id, food_id) VALUES (?, ?)`, [4, 1])
    await database.raw(`INSERT INTO meal_foods (meal_id, food_id) VALUES (?, ?)`, [4, 2])
  });

  context('GET /api/v1/favorite_foods', () => {
    it('should return the meals that match the most times eaten and report that number', async () => {
      let response       = await fetch('http://localhost:8000/api/v1/favorite_foods');
      let parsedResponse = await response.json();

      expect(response.status).to.eq(200)
      expect(parsedResponse).to.deep.eq(favorite_foods);
    });
  })
})
