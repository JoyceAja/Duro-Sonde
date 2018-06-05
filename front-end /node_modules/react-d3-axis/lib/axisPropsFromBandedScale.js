'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = axisPropsFromBandedScale;
function axisPropsFromBandedScale(scale) {
  var range = scale.range();
  var values = scale.domain();
  var format = function format(d) {
    return String(d);
  };

  var offset = scale.bandwidth() / 2;
  var scaleCopy = scale.copy();
  if (scaleCopy.round()) offset = Math.round(offset);
  var position = function position(d) {
    return scaleCopy(d) + offset;
  };

  return { range: range, values: values, format: format, position: position };
}