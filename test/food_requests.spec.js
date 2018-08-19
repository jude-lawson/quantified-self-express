import chai, { expect } from 'chai';
import fetch from 'node-fetch'

import foods from '../fixtures/for_tests/foods';
import food from '../fixtures/for_tests/food';

describe('Food Requests', () => {
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

      let response = await fetch('http://localhost:8000/api/v1/foods', fetch_init);
      let parsedResponse = await response.json();

      expect(response.status).to.eq(200);
      expect(parsedResponse).to.deep.eq({ id: 5, name: 'Dumplings', calories: 900 })
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
});
