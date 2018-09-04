'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _foods_controller = require('./controllers/foods_controller');

var _foods_controller2 = _interopRequireDefault(_foods_controller);

var _meals_controller = require('./controllers/meals_controller');

var _meals_controller2 = _interopRequireDefault(_meals_controller);

var _MealFoodsController = require('./controllers/MealFoodsController');

var _MealFoodsController2 = _interopRequireDefault(_MealFoodsController);

var _FavoriteFoodsController = require('./controllers/FavoriteFoodsController');

var _FavoriteFoodsController2 = _interopRequireDefault(_FavoriteFoodsController);

var _RecipesController = require('./controllers/RecipesController');

var _RecipesController2 = _interopRequireDefault(_RecipesController);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

//Root
router.get('/', function (request, response) {
  response.send('Quantified Self Express API');
});

// Foods & Favorite Foods
router.get('/api/v1/foods', function (request, response) {
  _foods_controller2.default.index(request, response);
});
router.get('/api/v1/foods/:id', function (request, response) {
  _foods_controller2.default.show(request, response);
});
router.post('/api/v1/foods', function (request, response) {
  _foods_controller2.default.create(request, response);
});
router.patch('/api/v1/foods/:id', function (request, response) {
  _foods_controller2.default.update(request, response);
});
router.delete('/api/v1/foods/:id', function (request, response) {
  _foods_controller2.default.destroy(request, response);
});

router.get('/api/v1/favorite_foods', function (request, response) {
  _FavoriteFoodsController2.default.index(request, response);
});

// Meals
router.get('/api/v1/meals', function (request, response) {
  _meals_controller2.default.index(request, response);
});
router.get('/api/v1/meals/:meal_id/foods', function (request, response) {
  _meals_controller2.default.show(request, response);
});

// MealFoods
router.post('/api/v1/meals/:meal_id/foods/:id', function (request, response) {
  _MealFoodsController2.default.create(request, response);
});
router.delete('/api/v1/meals/:meal_id/foods/:id', function (request, response) {
  _MealFoodsController2.default.destroy(request, response);
});

// Recipes
router.get('/api/v1/foods/:id/recipes', function (request, response) {
  _RecipesController2.default.show(request, response);
});

exports.default = router;
//# sourceMappingURL=routes.js.map