'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MealFood = require('../models/MealFood');

var _MealFood2 = _interopRequireDefault(_MealFood);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MealFoodsController = function () {
  function MealFoodsController() {
    _classCallCheck(this, MealFoodsController);
  }

  _createClass(MealFoodsController, null, [{
    key: 'create',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(request, response) {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _MealFood2.default.addFoodToMeal(request.params.meal_id, request.params.id);

              case 2:
                result = _context.sent;

                response.status(result.status).json(result.data);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function create(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: 'destroy',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(request, response) {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _MealFood2.default.removeFoodFromMeal(request.params.meal_id, request.params.id);

              case 2:
                result = _context2.sent;

                response.status(result.status).json(result.data);

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function destroy(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return destroy;
    }()
  }]);

  return MealFoodsController;
}();

exports.default = MealFoodsController;
//# sourceMappingURL=MealFoodsController.js.map