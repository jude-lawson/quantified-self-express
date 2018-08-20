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

var MealFood = function () {
  function MealFood() {
    _classCallCheck(this, MealFood);
  }

  _createClass(MealFood, null, [{
    key: 'addFoodToMeal',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(meal_id, food_id) {
        var food, meal, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return database.raw('SELECT * FROM foods WHERE foods.id=? LIMIT 1', [food_id]);

              case 2:
                food = _context.sent;
                _context.next = 5;
                return database.raw('SELECT * FROM meals WHERE meals.id=? LIMIT 1', [meal_id]);

              case 5:
                meal = _context.sent;

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
                return database.raw('INSERT INTO meal_foods (meal_id, food_id)\n                                       VALUES (?, ?)', [meal_id, food_id]);

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
  }]);

  return MealFood;
}();

exports.default = MealFood;
//# sourceMappingURL=MealFood.js.map