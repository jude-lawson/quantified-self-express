import chai, { expect } from 'chai';
import fetch from 'node-fetch'

import foods from '../fixtures/for_tests/foods';
import food from '../fixtures/for_tests/food';
import seed from '../db/seeds/main.js'

describe('Food Requests', () => {
  context('GET /api/v1/foods', () => {
    it('should return all foods in the database', done => {
      fetch('http://localhost:8000/api/v1/foods')
        .then(response => response.json())
        .then(parsedResponse => {
          expect(parsedResponse).to.deep.eq(foods)
          done();
        })
        .catch(error => console.error(error))
    });
  });

  context('GET /api/v1/foods/:id', () => {
    it('should return a single food with the specified id', done => {
      fetch('http://localhost:8000/api/v1/foods/1')
        .then(response => response.json())
        .then(parsedResponse => {
          expect(parsedResponse).to.deep.eq(food)
          done();
        })
        .catch(error => console.error(error))
    });
  });

  context('POST /api/v1/foods', () => {
    it('given a food object, it should create a food', done => {
      let new_food = JSON.stringify({ food: { name: 'Dumplings', calories: 900 } });

      fetch('http://localhost:8000/api/v1/foods', {
        method: 'post',
        body: new_food,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        expect(response.status).to.eq(200);
        return response.json()
      })
      .then(parsedResponse => {
        expect(parsedResponse).to.deep.eq({ id: 5, name: 'Dumplings', calories: 900 })
        done();
      })
      .catch(error => console.error(error))
    })

    it('should return 400 if the creation was not successful', done => {
      let new_food = JSON.stringify({ food: {} });

      fetch('http://localhost:8000/api/v1/foods', {
        method: 'post',
        body: new_food,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        expect(response.status).to.eq(400);
        done();
      })
      .catch(error => console.error(error))
    });

    it('should return 400 with error message if \'name\' is not included', done => {
      let errant_food = JSON.stringify({ food: { calories: 900 } });

      fetch('http://localhost:8000/api/v1/foods', {
        method: 'post',
        body: errant_food,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        expect(response.status).to.eq(400);
        return response.json();
      })
      .then(parsedResponse => {
        expect(parsedResponse).to.deep.eq({ error: 'Name attribute is required' })
        done();
      })
      .catch(error => console.error(error))

    });

    it('should return 400 with error message if \'calories\' is not included', done => {
      let errant_food = JSON.stringify({ food: { name: 'Dumplings' } });

      fetch('http://localhost:8000/api/v1/foods', {
        method: 'post',
        body: errant_food,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        expect(response.status).to.eq(400);
        return response.json();
      })
      .then(parsedResponse => {
        expect(parsedResponse).to.deep.eq({ error: 'Calories attribute is required' })
        done();
      })
      .catch(error => console.error(error))

    });
  });
});
