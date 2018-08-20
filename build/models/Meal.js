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

var Meal = function () {
  function Meal() {
    _classCallCheck(this, Meal);
  }

  _createClass(Meal, null, [{
    key: 'getAllMeals',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _this = this;

        var meals, meal_foods;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return database.raw('SELECT DISTINCT meals.* from meal_foods\n                                    INNER JOIN meals on meal_foods.meal_id=meals.id');

              case 3:
                meals = _context2.sent;
                _context2.next = 6;
                return Promise.all(meals.rows.map(function () {
                  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(meal) {
                    var result;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.next = 2;
                            return database.raw('SELECT foods.* from meal_foods\n                    INNER JOIN foods on meal_foods.food_id=foods.id\n                    WHERE meal_foods.meal_id=?', [meal.id]);

                          case 2:
                            result = _context.sent;
                            return _context.abrupt('return', {
                              id: meal.id,
                              name: meal.name,
                              foods: result.rows
                            });

                          case 4:
                          case 'end':
                            return _context.stop();
                        }
                      }
                    }, _callee, _this);
                  }));

                  return function (_x) {
                    return _ref2.apply(this, arguments);
                  };
                }()));

              case 6:
                meal_foods = _context2.sent;
                return _context2.abrupt('return', meal_foods.sort(function (a, b) {
                  return a.id - b.id;
                }));

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2['catch'](0);
                return _context2.abrupt('return', _context2.t0);

              case 13:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 10]]);
      }));

      function getAllMeals() {
        return _ref.apply(this, arguments);
      }

      return getAllMeals;
    }()
  }, {
    key: 'getMealAndFoods',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(meal_id) {
        var result, meal_foods;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return database.raw('SELECT meals.id AS meal_id, meals.name AS meal_name,\n                                            foods.id AS food_id, foods.name AS food_name, foods.calories\n                                     FROM meal_foods\n                                     INNER JOIN meals on meal_foods.meal_id=meals.id\n                                     INNER JOIN foods on meal_foods.food_id=foods.id\n                                     WHERE meal_foods.meal_id=?', [meal_id]);

              case 2:
                result = _context3.sent;

                if (result.rowCount) {
                  _context3.next = 7;
                  break;
                }

                return _context3.abrupt('return', { status: 404, data: { error: 'Meal not found' } });

              case 7:
                meal_foods = result.rows.map(function (row) {
                  return {
                    id: row.food_id,
                    name: row.food_name,
                    calories: row.calories
                  };
                });
                return _context3.abrupt('return', { status: 200, data: { id: result.rows[0].meal_id, name: result.rows[0].meal_name, foods: meal_foods } });

              case 9:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getMealAndFoods(_x2) {
        return _ref3.apply(this, arguments);
      }

      return getMealAndFoods;
    }()
  }]);

  return Meal;
}();

exports.default = Meal;
//# sourceMappingURL=Meal.js.map