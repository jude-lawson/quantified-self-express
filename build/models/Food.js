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
  }, {
    key: 'createFood',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(new_food_data) {
        var created_food;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (new_food_data.name) {
                  _context3.next = 4;
                  break;
                }

                return _context3.abrupt('return', { status: 400, data: { error: 'Name attribute is required' } });

              case 4:
                if (new_food_data.calories) {
                  _context3.next = 8;
                  break;
                }

                return _context3.abrupt('return', { status: 400, data: { error: 'Calories attribute is required' } });

              case 8:
                _context3.prev = 8;
                _context3.next = 11;
                return database.raw('INSERT INTO foods (name, calories)\n                                               VALUES (?, ?)\n                                               RETURNING id, name, calories', [new_food_data.name, new_food_data.calories]);

              case 11:
                created_food = _context3.sent;
                return _context3.abrupt('return', { status: 200, data: created_food.rows[0] });

              case 15:
                _context3.prev = 15;
                _context3.t0 = _context3['catch'](8);
                return _context3.abrupt('return', { status: 400, data: { error: _context3.t0 } });

              case 18:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[8, 15]]);
      }));

      function createFood(_x4) {
        return _ref3.apply(this, arguments);
      }

      return createFood;
    }()
  }, {
    key: 'updateFood',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(updated_food_data, food_id) {
        var updated_food;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return database.raw('UPDATE foods\n                                             SET name=?, calories=?\n                                             WHERE foods.id=?\n                                             RETURNING id, name, calories', [updated_food_data.name, updated_food_data.calories, food_id]);

              case 3:
                updated_food = _context4.sent;
                return _context4.abrupt('return', { status: 200, data: updated_food.rows[0] });

              case 7:
                _context4.prev = 7;
                _context4.t0 = _context4['catch'](0);
                return _context4.abrupt('return', { status: 400, data: { error: _context4.t0 } });

              case 10:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 7]]);
      }));

      function updateFood(_x5, _x6) {
        return _ref4.apply(this, arguments);
      }

      return updateFood;
    }()
  }, {
    key: 'destroyFood',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(food_id) {
        var result;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return database.raw('DELETE FROM meal_foods WHERE meal_foods.food_id=?', [food_id]);

              case 2:
                _context5.next = 4;
                return database.raw('DELETE FROM foods WHERE foods.id=?', [food_id]);

              case 4:
                result = _context5.sent;

                if (result.rowCount) {
                  _context5.next = 9;
                  break;
                }

                return _context5.abrupt('return', { status: 404, data: { error: 'Food not found' } });

              case 9:
                return _context5.abrupt('return', { status: 204 });

              case 10:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function destroyFood(_x7) {
        return _ref5.apply(this, arguments);
      }

      return destroyFood;
    }()
  }]);

  return Food;
}();

exports.default = Food;
//# sourceMappingURL=Food.js.map