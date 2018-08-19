import chai, { expect } from 'chai';
import fetch from 'node-fetch'

import foods from '../fixtures/for_tests/foods';
import food from '../fixtures/for_tests/food';

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
});
