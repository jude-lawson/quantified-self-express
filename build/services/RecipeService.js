'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var yummly_app_id;
var yummly_app_key;
if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === undefined) {
  yummly_app_id = require('../../secrets').yummly_app_id;
  yummly_app_key = require('../../secrets').yummly_app_key;
} else {
  yummly_app_id = process.env.YUMMLY_APP_ID;
  yummly_app_key = process.env.YUMMLY_APP_KEY;
}

var banana_search_yummly = require('../../fixtures/for_tests/banana_search_yummly');
var onion_soup_search_yummly = require('../../fixtures/for_tests/onion_soup_search_yummly');

var RecipeService = function () {
  function RecipeService() {
    _classCallCheck(this, RecipeService);
  }

  _createClass(RecipeService, null, [{
    key: 'searchRecipes',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(food_name) {
        var parsedResponse, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(process.env.NODE_ENV === 'test' && food_name === "banana")) {
                  _context.next = 4;
                  break;
                }

                parsedResponse = banana_search_yummly;
                _context.next = 14;
                break;

              case 4:
                if (!(process.env.NODE_ENV === "test" && food_name === "onion+soup")) {
                  _context.next = 8;
                  break;
                }

                parsedResponse = onion_soup_search_yummly;
                _context.next = 14;
                break;

              case 8:
                _context.next = 10;
                return (0, _nodeFetch2.default)('http://api.yummly.com/v1/api/recipes?_app_id=' + yummly_app_id + '&_app_key=' + yummly_app_key + '&q=' + food_name);

              case 10:
                response = _context.sent;
                _context.next = 13;
                return response.json();

              case 13:
                parsedResponse = _context.sent;

              case 14:
                _context.next = 16;
                return parsedResponse;

              case 16:
                return _context.abrupt('return', _context.sent);

              case 17:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function searchRecipes(_x) {
        return _ref.apply(this, arguments);
      }

      return searchRecipes;
    }()
  }]);

  return RecipeService;
}();

exports.default = RecipeService;
//# sourceMappingURL=RecipeService.js.map