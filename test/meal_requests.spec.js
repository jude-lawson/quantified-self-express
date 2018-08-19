import chai, { expect } from 'chai';
import fetch from 'node-fetch';
import meals from '../fixtures/for_tests/meals';


describe('Meal Requests', () => {
  context('GET /api/v1/meals', () => {
    it('should return all meals in the database', async () => {
      let response       = await fetch('http://localhost:8000/api/v1/meals');
      let parsedResponse = await response.json();
      
      expect(response.status).to.eq(200);
      expect(parsedResponse).to.deep.eq(meals);
    });
  });
});
