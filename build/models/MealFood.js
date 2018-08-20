'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // const environment = process.env.NODE_ENV || 'development';
// const configuration = require('../../knexfile')[environment];
// const database = require('knex')(configuration);


var _config = require('../config');

var _QueryService = require('../services/QueryService');

var _QueryService2 = _interopRequireDefault(_QueryService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MealFood = function () {
  function MealFood() {
    _classCallCheck(this, MealFood);
  }

  _createClass(MealFood, null, [{
    key: 'addFoodToMeal',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(meal_id, food_id) {
        var meal, food, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _QueryService2.default.aMeal(meal_id);

              case 2:
                meal = _context.sent;
                _context.next = 5;
                return _QueryService2.default.aFood(food_id);

              case 5:
                food = _context.sent;

                if (food.rowCount) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt('return', { status: 404, data: { error: 'Food could not be found' } });

              case 10:
                if (meal.rowCount) {
                  _context.next = 14;
                  break;
                }

                return _context.abrupt('return', { status: 404, data: { error: 'Meal could not be found' } });

              case 14:
                _context.next = 16;
                return _QueryService2.default.createMealFood(meal_id, food_id);

              case 16:
                result = _context.sent;
                return _context.abrupt('return', { status: 201, data: { message: 'Successfully added ' + food.rows[0].name + ' to ' + meal.rows[0].name } });

              case 18:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function addFoodToMeal(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return addFoodToMeal;
    }()
  }, {
    key: 'removeFoodFromMeal',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(meal_id, food_id) {
        var meal, food, result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _QueryService2.default.aMeal(meal_id);

              case 2:
                meal = _context2.sent;
                _context2.next = 5;
                return _QueryService2.default.aFood(food_id);

              case 5:
                food = _context2.sent;

                if (food.rowCount) {
                  _context2.next = 10;
                  break;
                }

                return _context2.abrupt('return', { status: 404, data: { error: 'Food could not be found' } });

              case 10:
                if (meal.rowCount) {
                  _context2.next = 14;
                  break;
                }

                return _context2.abrupt('return', { status: 404, data: { error: 'Meal could not be found' } });

              case 14:
                _context2.next = 16;
                return _QueryService2.default.removeMealFood(meal_id, food_id);

              case 16:
                result = _context2.sent;
                return _context2.abrupt('return', { status: 200, data: { message: 'Successfully removed ' + food.rows[0].name + ' from ' + meal.rows[0].name } });

              case 18:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function removeFoodFromMeal(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return removeFoodFromMeal;
    }()
  }]);

  return MealFood;
}();

exports.default = MealFood;
//# sourceMappingURL=MealFood.js.map