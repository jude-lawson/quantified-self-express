'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('../config');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var QueryService = function () {
  function QueryService() {
    _classCallCheck(this, QueryService);
  }

  _createClass(QueryService, null, [{
    key: 'allFoods',

    // Food Related Queries
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _config.database)('foods').select();

              case 2:
                return _context.abrupt('return', _context.sent);

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function allFoods() {
        return _ref.apply(this, arguments);
      }

      return allFoods;
    }()
  }, {
    key: 'aFood',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(food_id) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _config.database.raw('SELECT foods.* FROM foods WHERE foods.id=?', [food_id]);

              case 2:
                return _context2.abrupt('return', _context2.sent);

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function aFood(_x) {
        return _ref2.apply(this, arguments);
      }

      return aFood;
    }()
  }, {
    key: 'createFood',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(new_food_data) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _config.database.raw('INSERT INTO foods (name, calories) VALUES (?, ?)\n                               RETURNING id, name, calories', [new_food_data.name, new_food_data.calories]);

              case 2:
                return _context3.abrupt('return', _context3.sent);

              case 3:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function createFood(_x2) {
        return _ref3.apply(this, arguments);
      }

      return createFood;
    }()
  }, {
    key: 'updateFood',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(updated_food_data, food_id) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _config.database.raw('UPDATE foods SET name=?, calories=?\n                               WHERE foods.id=? RETURNING id, name, calories', [updated_food_data.name, updated_food_data.calories, food_id]);

              case 2:
                return _context4.abrupt('return', _context4.sent);

              case 3:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function updateFood(_x3, _x4) {
        return _ref4.apply(this, arguments);
      }

      return updateFood;
    }()
  }, {
    key: 'getFoodCounts',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _config.database.raw('SELECT foods.*, COUNT(foods.id) AS food_count FROM meal_foods\n                               INNER JOIN foods ON meal_foods.food_id = foods.id\n                               GROUP BY foods.id\n                               ORDER BY food_count DESC\n                               LIMIT 5');

              case 2:
                return _context5.abrupt('return', _context5.sent);

              case 3:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getFoodCounts() {
        return _ref5.apply(this, arguments);
      }

      return getFoodCounts;
    }()
  }, {
    key: 'deleteFoodToMealAssociation',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(food_id) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _config.database.raw('DELETE FROM meal_foods WHERE meal_foods.food_id=?', [food_id]);

              case 2:
                return _context6.abrupt('return', _context6.sent);

              case 3:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function deleteFoodToMealAssociation(_x5) {
        return _ref6.apply(this, arguments);
      }

      return deleteFoodToMealAssociation;
    }()
  }, {
    key: 'deleteFood',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(food_id) {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return _config.database.raw('DELETE FROM foods WHERE foods.id=?', [food_id]);

              case 2:
                return _context7.abrupt('return', _context7.sent);

              case 3:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function deleteFood(_x6) {
        return _ref7.apply(this, arguments);
      }

      return deleteFood;
    }()

    // Meal Queries

  }, {
    key: 'aMeal',
    value: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(meal_id) {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return _config.database.raw('SELECT * FROM meals WHERE meals.id=? LIMIT 1', [meal_id]);

              case 2:
                return _context8.abrupt('return', _context8.sent);

              case 3:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function aMeal(_x7) {
        return _ref8.apply(this, arguments);
      }

      return aMeal;
    }()
  }, {
    key: 'allMeals',
    value: function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return _config.database.raw('SELECT meals.id, meals.name, json_agg(foods.*) AS foods FROM meal_foods\n                               INNER JOIN meals ON meal_foods.meal_id=meals.id\n                               INNER JOIN foods ON meal_foods.food_id=foods.id\n                               GROUP BY meals.id');

              case 2:
                return _context9.abrupt('return', _context9.sent);

              case 3:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function allMeals() {
        return _ref9.apply(this, arguments);
      }

      return allMeals;
    }()
  }, {
    key: 'distinctMealsThatHaveFoods',
    value: function () {
      var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return _config.database.raw('SELECT DISTINCT meals.* from meal_foods\n                               INNER JOIN meals on meal_foods.meal_id=meals.id');

              case 2:
                return _context10.abrupt('return', _context10.sent);

              case 3:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function distinctMealsThatHaveFoods() {
        return _ref10.apply(this, arguments);
      }

      return distinctMealsThatHaveFoods;
    }()
  }, {
    key: 'aMealsFoods',
    value: function () {
      var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(meal_id) {
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return _config.database.raw('SELECT foods.* from meal_foods\n                               INNER JOIN foods on meal_foods.food_id=foods.id\n                               WHERE meal_foods.meal_id=?', [meal_id]);

              case 2:
                return _context11.abrupt('return', _context11.sent);

              case 3:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function aMealsFoods(_x8) {
        return _ref11.apply(this, arguments);
      }

      return aMealsFoods;
    }()
  }, {
    key: 'aMealAndAllItsFoods',
    value: function () {
      var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(meal_id) {
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return _config.database.raw('SELECT meals.id AS meal_id, meals.name AS meal_name,\n                                foods.id AS food_id, foods.name AS food_name, foods.calories\n                              FROM meal_foods\n                              INNER JOIN meals on meal_foods.meal_id=meals.id\n                              INNER JOIN foods on meal_foods.food_id=foods.id\n                              WHERE meal_foods.meal_id=?', [meal_id]);

              case 2:
                return _context12.abrupt('return', _context12.sent);

              case 3:
              case 'end':
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function aMealAndAllItsFoods(_x9) {
        return _ref12.apply(this, arguments);
      }

      return aMealAndAllItsFoods;
    }()

    // Meal Food Queries

  }, {
    key: 'createMealFood',
    value: function () {
      var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(meal_id, food_id) {
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return _config.database.raw('INSERT INTO meal_foods (meal_id, food_id)\n                               VALUES (?, ?)', [meal_id, food_id]);

              case 2:
                return _context13.abrupt('return', _context13.sent);

              case 3:
              case 'end':
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function createMealFood(_x10, _x11) {
        return _ref13.apply(this, arguments);
      }

      return createMealFood;
    }()
  }, {
    key: 'removeMealFood',
    value: function () {
      var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(meal_id, food_id) {
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return _config.database.raw('DELETE FROM meal_foods\n                               WHERE meal_foods.meal_id=?\n                               AND meal_foods.food_id=?', [meal_id, food_id]);

              case 2:
                return _context14.abrupt('return', _context14.sent);

              case 3:
              case 'end':
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function removeMealFood(_x12, _x13) {
        return _ref14.apply(this, arguments);
      }

      return removeMealFood;
    }()
  }]);

  return QueryService;
}();

exports.default = QueryService;
//# sourceMappingURL=QueryService.js.map