const chai = require('chai')
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../app')
const foods = require('./fixtures/foods')
// import { chaiHttp } from 'chai-http';

chai.use(chaiHttp);

describe('Food Requests', () => {
  context('GET /api/v1/foods', () => {
    it('should return all foods in the database', done => {
      chai.request(app)
        .get('/api/v1/foods')
        .end((error, response) => {
          expect(response.body).to.eq(foods)
          expect(response).to.have.status(200);
          done();
        });
    });
  });
});
