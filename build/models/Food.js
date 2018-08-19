'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var environment = process.env.NODE_ENV || 'development';
var configuration = require('../../knexfile')[environment];
var database = require('knex')(configuration);

var Food = function () {
  function Food() {
    _classCallCheck(this, Food);
  }

  _createClass(Food, null, [{
    key: 'getAllFoods',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(request, response) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return database('foods').select();

              case 2:
                return _context.abrupt('return', _context.sent);

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getAllFoods(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return getAllFoods;
    }()
  }, {
    key: 'getSingleFood',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(food_id) {
        var food;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return database.raw('SELECT foods.* FROM foods\n                                     WHERE foods.id=?', [food_id]);

              case 3:
                food = _context2.sent;
                return _context2.abrupt('return', food.rows[0]);

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2['catch'](0);
                return _context2.abrupt('return', _context2.t0);

              case 10:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 7]]);
      }));

      function getSingleFood(_x3) {
        return _ref2.apply(this, arguments);
      }

      return getSingleFood;
    }()
  }]);

  return Food;
}();

exports.default = Food;
//# sourceMappingURL=Food.js.map