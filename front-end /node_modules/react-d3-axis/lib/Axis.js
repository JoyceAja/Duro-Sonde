'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LEFT = exports.BOTTOM = exports.RIGHT = exports.TOP = undefined;
exports.default = Axis;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function translateX(scale0, scale1, d) {
  var x = scale0(d);
  return 'translate(' + (isFinite(x) ? x : scale1(d)) + ',0)';
}


function translateY(scale0, scale1, d) {
  var y = scale0(d);
  return 'translate(0,' + (isFinite(y) ? y : scale1(d)) + ')';
}

var TOP = exports.TOP = 'TOP';
var RIGHT = exports.RIGHT = 'RIGHT';
var BOTTOM = exports.BOTTOM = 'BOTTOM';
var LEFT = exports.LEFT = 'LEFT';

var defaultAxisStyle = {
  orient: BOTTOM,
  tickSizeInner: 6,
  tickSizeOuter: 6,
  tickPadding: 3,
  strokeWidth: 1,
  strokeColor: 'black',
  tickFont: 'sans-serif',
  tickFontSize: 10
};

function Axis(props) {
  var style = props.style,
      range = props.range,
      values = props.values,
      position = props.position,
      format = props.format;


  var axisStyle = Object.assign({}, defaultAxisStyle, style);
  var orient = axisStyle.orient,
      tickSizeInner = axisStyle.tickSizeInner,
      tickPadding = axisStyle.tickPadding,
      tickSizeOuter = axisStyle.tickSizeOuter,
      strokeWidth = axisStyle.strokeWidth,
      strokeColor = axisStyle.strokeColor,
      tickFont = axisStyle.tickFont,
      tickFontSize = axisStyle.tickFontSize;


  var transform = orient === TOP || orient === BOTTOM ? translateX : translateY;
  var tickTransformer = function tickTransformer(d) {
    return transform(position, position, d);
  };

  var k = orient === TOP || orient === LEFT ? -1 : 1;
  var isRight = orient === RIGHT;
  var isLeft = orient === LEFT;
  var isTop = orient === TOP;
  var isBottom = orient === BOTTOM;
  var isHorizontal = isRight || isLeft;
  var x = isHorizontal ? 'x' : 'y';
  var y = isHorizontal ? 'y' : 'x';

  var halfWidth = strokeWidth / 2;
  var range0 = range[0] + halfWidth;
  var range1 = range[range.length - 1] + halfWidth;

  var spacing = Math.max(tickSizeInner, 0) + tickPadding;

  return _react2.default.createElement(
    'g',
    {
      fill: 'none',
      fontSize: tickFontSize,
      fontFamily: tickFont,
      textAnchor: isRight ? 'start' : isLeft ? 'end' : 'middle',
      strokeWidth: strokeWidth
    },
    _react2.default.createElement('path', {
      stroke: strokeColor,
      d: isHorizontal ? 'M' + k * tickSizeOuter + ',' + range0 + 'H' + halfWidth + 'V' + range1 + 'H' + k * tickSizeOuter : 'M' + range0 + ',' + k * tickSizeOuter + 'V' + halfWidth + 'H' + range1 + 'V' + k * tickSizeOuter
    }),
    values.map(function (v, idx) {
      var lineProps = { stroke: strokeColor };
      lineProps[x + '2'] = k * tickSizeInner;
      lineProps[y + '1'] = halfWidth;
      lineProps[y + '2'] = halfWidth;

      var textProps = {
        fill: strokeColor,
        dy: isTop ? '0em' : isBottom ? '0.71em' : '0.32em'
      };
      textProps['' + x] = k * spacing;
      textProps['' + y] = halfWidth;

      return _react2.default.createElement(
        'g',
        { key: 'tick-' + idx, opacity: 1, transform: tickTransformer(v) },
        _react2.default.createElement('line', lineProps),
        _react2.default.createElement(
          'text',
          textProps,
          format(v)
        )
      );
    })
  );
}