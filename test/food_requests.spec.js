import chai, { expect } from 'chai';
import foods from '../fixtures/for_tests/foods'
import fetch from 'node-fetch'

describe('Food Requests', () => {
  context('GET /api/v1/foods', () => {
    it('should return all foods in the database', done => {
      fetch('http://localhost:8000/api/v1/foods')
        .then(response => response.json())
        .then(parsedResponse => {
          console.log(parsedResponse)
          console.log('-----')
          console.log(foods)
          expect(parsedResponse).to.deep.eq(foods)
          done();
        })
    });
  });
});
