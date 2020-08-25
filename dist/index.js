"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var RafNumberLexicalHolder = function RafNumberLexicalHolder() {
  if (typeof window.requestAnimationFrame === "function") {
    var prevValue = 0;
    return function (_ref) {
      var _ref$value = _ref.value,
          value = _ref$value === void 0 ? 0 : _ref$value,
          _ref$totalSteps = _ref.totalSteps,
          totalSteps = _ref$totalSteps === void 0 ? 10 : _ref$totalSteps,
          _ref$className = _ref.className,
          className = _ref$className === void 0 ? "" : _ref$className;
      var prevRafRef;
      var ref = useRef();
      var range = value - prevValue;
      var counter = 0;

      function callback() {
        if (counter < totalSteps) {
          counter += 1;
          prevValue += range / totalSteps;
          ref.current.textContent = commaSperator(NumbersToPersian(prevValue.toFixed(0)));
          prevRafRef = requestAnimationFrame(callback);
        } else {
          // ref.current.textContent = midValue;
          ref.current.textContent = commaSperator(NumbersToPersian(value.toFixed(0)));
          cancelAnimationFrame(prevRafRef);
        }
      }

      (0, _react.useEffect)(function () {
        prevRafRef = requestAnimationFrame(callback);
        return function () {
          if (prevRafRef) {
            cancelAnimationFrame(prevRafRef);
          }
        };
      }, [value]);
      return /*#__PURE__*/_react.default.createElement("span", {
        ref: ref,
        className: className
      });
    };
  } else {
    return function (_ref2) {
      var _ref2$value = _ref2.value,
          value = _ref2$value === void 0 ? 0 : _ref2$value;
      return /*#__PURE__*/_react.default.createElement("span", {
        className: className
      }, value);
    };
  }
};

var RafNumberCounter = RafNumberLexicalHolder();
module.exports = RafNumberCounter;