'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _QueryService = require('../services/QueryService');

var _QueryService2 = _interopRequireDefault(_QueryService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Meal = function () {
  function Meal() {
    _classCallCheck(this, Meal);
  }

  _createClass(Meal, null, [{
    key: 'getAllMeals',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var result, sorted_result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _QueryService2.default.allMeals();

              case 2:
                result = _context.sent;
                sorted_result = result.rows.sort(function (a, b) {
                  return a.id - b.id;
                });
                return _context.abrupt('return', sorted_result);

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getAllMeals() {
        return _ref.apply(this, arguments);
      }

      return getAllMeals;
    }()
  }, {
    key: 'getMealAndFoods',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(meal_id) {
        var result, meal_foods;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _QueryService2.default.aMealAndAllItsFoods(meal_id);

              case 2:
                result = _context2.sent;

                if (result.rowCount) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt('return', { status: 404, data: { error: 'Meal not found' } });

              case 7:
                meal_foods = result.rows.map(function (row) {
                  return {
                    id: row.food_id,
                    name: row.food_name,
                    calories: row.calories
                  };
                });
                return _context2.abrupt('return', { status: 200, data: { id: result.rows[0].meal_id, name: result.rows[0].meal_name, foods: meal_foods } });

              case 9:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getMealAndFoods(_x) {
        return _ref2.apply(this, arguments);
      }

      return getMealAndFoods;
    }()
  }]);

  return Meal;
}();

exports.default = Meal;
//# sourceMappingURL=Meal.js.map