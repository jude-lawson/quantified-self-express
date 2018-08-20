'use strict';

require('babel-polyfill');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _config = require('./config');

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use((0, _cors2.default)());
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_routes2.default);
app.set('port', process.env.PORT || 8000);
app.locals.title = 'Quantified Self Express API';

/* Start server */

app.listen(app.get('port'), function () {
  console.log('Starting server...');
  console.log(app.locals.title + ' is now running on port ' + app.get('port') + ' in the ' + _config.environment + ' environment.');
});

module.exports = app;
//# sourceMappingURL=app.js.map