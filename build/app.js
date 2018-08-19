'use strict';

require('babel-polyfill');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _foods_controller = require('./controllers/foods_controller');

var _foods_controller2 = _interopRequireDefault(_foods_controller);

var _meals_controller = require('./controllers/meals_controller');

var _meals_controller2 = _interopRequireDefault(_meals_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
// const bodyParser = require('body-parser');

// const express = require('express');


var environment = process.env.NODE_ENV || 'development';
var configuration = require('../knexfile')[environment];
var database = require('knex')(configuration);

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 8000);
app.locals.title = 'Quantified Self Express API';

app.get('/', function (request, response) {
  response.send('Quantified Self Express API');
});

app.get('/api/v1/foods', function (request, response) {
  _foods_controller2.default.index(request, response);
});

app.get('/api/v1/meals', function (request, response) {
  _meals_controller2.default.index(request, response);
});

app.get('/api/v1/foods/:id', function (request, response) {
  _foods_controller2.default.show(request, response);
});

app.listen(app.get('port'), function () {
  console.log('Starting server...');
  console.log(app.locals.title + ' is now running on port ' + app.get('port') + ' in the ' + environment + ' environment.');
});

module.exports = app;
//# sourceMappingURL=app.js.map