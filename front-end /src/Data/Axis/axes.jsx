import React from 'react'
import AxisX from './axisX'
import AxisY from './axisY'

export default ({ scales, margins, svgDimensions }) => {
  const { height, width } = svgDimensions
  //something seems to be off with the axis and scaling

  const xProps = {
    orient: 'Bottom',
    scale: scales.xScale,
    translate: `translate(0, ${height - margins.bottom})`,
    tickSize: height - margins.top - margins.bottom,
  }

  const yProps = {
    orient: 'Left',
    scale: scales.yScale,
    translate: `translate(${margins.left}, 0)`,
    tickSize: width - margins.left - margins.right,
  }

  return (
    <g>
      <AxisX {...xProps} />
      <AxisY {...yProps} />
    </g>
  )
}