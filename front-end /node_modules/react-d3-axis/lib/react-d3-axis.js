'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axisPropsFromTickScale = require('./axisPropsFromTickScale');

Object.defineProperty(exports, 'axisPropsFromTickScale', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_axisPropsFromTickScale).default;
  }
});

var _axisPropsFromBandedScale = require('./axisPropsFromBandedScale');

Object.defineProperty(exports, 'axisPropsFromBandedScale', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_axisPropsFromBandedScale).default;
  }
});

var _Axis = require('./Axis');

Object.defineProperty(exports, 'Axis', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Axis).default;
  }
});
Object.defineProperty(exports, 'TOP', {
  enumerable: true,
  get: function get() {
    return _Axis.TOP;
  }
});
Object.defineProperty(exports, 'RIGHT', {
  enumerable: true,
  get: function get() {
    return _Axis.RIGHT;
  }
});
Object.defineProperty(exports, 'BOTTOM', {
  enumerable: true,
  get: function get() {
    return _Axis.BOTTOM;
  }
});
Object.defineProperty(exports, 'LEFT', {
  enumerable: true,
  get: function get() {
    return _Axis.LEFT;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }