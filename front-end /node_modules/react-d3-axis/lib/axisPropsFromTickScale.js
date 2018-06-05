'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = axisPropsFromTickScale;
function axisPropsFromTickScale(scale, tickCount) {
  var range = scale.range();
  var values = scale.ticks(tickCount);
  var format = scale.tickFormat(tickCount);

  var position = scale.copy();

  return { range: range, values: values, format: format, position: position };
}