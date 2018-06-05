import React, { Component } from "react";
import { scaleLinear } from "d3-scale";
import { interpolateLab } from "d3-interpolate";
import * as d3 from "d3";
import { line } from "d3-shape";

var parseDate = d3.timeParse("%Y-%m-%dT%H:%M:%S.%LZ");
export default class LineChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      xScale: this.props.scales.xScale,
      yScale: this.props.scales.yScale
    };
  }

  line = line()
    .x(d => {
      const { xScale } = this.props.scales;
      return xScale(d.date_time);
    })
    .y(d => {
      const { yScale } = this.props.scales;
      return yScale(d.sensorvalue);
    })
    .defined(d => {
      return d !== null;
    })
    .curve(d3.curveCatmullRom);

  circle = this.props.data.map(d => (
    <circle
      cx={this.props.scales.xScale(d.date_time)}
      cy={this.props.scales.yScale(d.sensorvalue)}
      r="3"
      stroke="black"
      fill="none"
    />
  ));

  render() {
    const { data,text } = this.props;
    const { height, width } = this.props.svgDimensions;

    return (
      <g>
        <path
          d={this.line(data)}
          strokeLinecap="round"
          stroke={this.props.color}
          fill="none"
          strokeWidth="1.5"
        />
        {this.circle}
      </g>
    );
  }
}

