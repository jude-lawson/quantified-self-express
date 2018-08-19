import chai, { expect } from 'chai';
import fetch from 'node-fetch';
import meals from '../fixtures/for_tests/meals';


describe('Meal Requests', () => {
  context('GET /api/v1/meals', () => {
    it('should return all meals in the database', done => {
      fetch('http://localhost:8000/api/v1/meals')
        .then(response => response.json())
        .then(parsedResponse => {
          expect(parsedResponse).to.deep.eq(meals)
          done();
        })
        .catch(error => console.error(error))
    });
  });
});
