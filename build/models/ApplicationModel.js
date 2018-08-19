'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ApplicationModel = function ApplicationModel() {
  _classCallCheck(this, ApplicationModel);

  var environment = process.env.NODE_ENV || 'development';
  var configuration = require('../knexfile')[environment];
  this.database = require('knex')(configuration);
  console.log(this.database);
}
// static database() {
//   const environment = process.env.NODE_ENV || 'development';
//   const configuration = require('../knexfile')[environment];
//   return require('knex')(configuration);
// }
;

exports.default = ApplicationModel;
//# sourceMappingURL=ApplicationModel.js.map