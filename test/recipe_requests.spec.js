import chai, { expect } from 'chai';
import fetch from 'node-fetch';
import nock from 'nock'


import { yummly_app_id, yummly_app_key } from '../secrets';
import banana_search_results from '../fixtures/for_tests/banana_search_results';
import onion_soup_search_results from '../fixtures/for_tests/onion_soup_search_results';
import banana_search_yummly from '../fixtures/for_tests/banana_search_yummly'

// Stubs

const mock_banana_results = nock('http://api.yummly.com')
                              .get(`/v1/api/recipes?_app_id=${yummly_app_id}&_app_key=${yummly_app_key}&q=banana`)
                              .reply(200, banana_search_yummly)

const turing_mock = nock('http://backend.turing.io')
                      .get('/module4')
                      .reply(200, { message: 'hello' })

const environment = 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);


describe('Recipe Search Requests', () => {
  beforeEach(async () => {
    await database.raw('DELETE FROM meal_foods')
    await database.raw('ALTER SEQUENCE meal_foods_id_seq RESTART WITH 1')
    await database.raw('DELETE FROM foods')
    await database.raw('ALTER SEQUENCE foods_id_seq RESTART WITH 1')
    await database.raw('DELETE FROM meals')
    await database.raw('ALTER SEQUENCE meals_id_seq RESTART WITH 1')

    // Add Food
    await database.raw(`INSERT INTO foods (name, calories) VALUES (?, ?)`, ['Banana', 800])
    await database.raw(`INSERT INTO foods (name, calories) VALUES (?, ?)`, ['Onion Soup', 800])
  });

  context('GET /api/v1/foods/:id/recipes', () => {
    it('should return recipe results from external recipe service', async () => {
      let response       = await fetch(`http://localhost:8000/api/v1/foods/1/recipes`)
      let parsedResponse = await response.json();

      expect(response.status).to.eq(200);
      expect(parsedResponse).to.deep.eq(banana_search_results);
    });

    it('should support multi-word foods', async () => {
      let response       = await fetch('http://localhost:8000/api/v1/foods/2/recipes')
      let parsedResponse = await response.json();

      expect(response.status).to.eq(200);
      expect(parsedResponse).to.deep.eq(onion_soup_search_results);
    });
  })
})
