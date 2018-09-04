'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _RecipeService = require('../services/RecipeService');

var _RecipeService2 = _interopRequireDefault(_RecipeService);

var _QueryService = require('../services/QueryService');

var _QueryService2 = _interopRequireDefault(_QueryService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Recipe = function () {
  function Recipe() {
    _classCallCheck(this, Recipe);
  }

  _createClass(Recipe, null, [{
    key: 'getRecipes',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(food_id) {
        var food, food_name, search_results, recipes;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _QueryService2.default.aFood(food_id);

              case 2:
                food = _context.sent;
                food_name = food.rows[0].name.toLowerCase().split(' ').join('+');
                _context.next = 6;
                return _RecipeService2.default.searchRecipes(food_name);

              case 6:
                search_results = _context.sent;
                recipes = search_results.matches.map(function (recipe) {
                  return { name: recipe.recipeName, url: 'https://www.yummly.com/recipe/' + recipe.id };
                });
                return _context.abrupt('return', { status: 200, data: { recipes: recipes } });

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getRecipes(_x) {
        return _ref.apply(this, arguments);
      }

      return getRecipes;
    }()
  }]);

  return Recipe;
}();

exports.default = Recipe;
//# sourceMappingURL=Recipe.js.map