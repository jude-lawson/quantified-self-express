import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

import meals from './fixtures/meals';

chai.use(chaiHttp);

describe('Meal Requests', () => {
  context('GET /api/v1/meals', () => {
    it('should return all meals in the database', done => {
      chai.request(app)
        .get('/api/v1/meals')
        .end((error, response) => {
          if (error) {
            console.error(error);
          }

          expect(response).to.have.status(200);
          expect(response.body).to.deep.eq(meals);
          done();
        });
    });
  });
});
