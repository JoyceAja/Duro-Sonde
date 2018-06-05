import React, { Component } from "react";
import { scaleTime, scaleLinear } from "d3-scale";
import * as d3 from "d3";
import { selectAll, select, clientPoint } from "d3-selection";

import Axes from "../Axis/axes";
import Line from "./line";
import ResponsiveWrapper from "../Responsive/responsive";

var parseDate = d3.timeParse("%Y-%m-%dT%H:%M:%S.%LZ");
const colors = [
  "#ef5350",
  "#ec407a",
  "#ab47bc",
  "#7e57c2",
  "#42a5f5",
  "#26c6da",
  "#ffa726"
];
const sensors = ["Temp", "pH", "ORP", "EC", "TDS", "SAL", "SG", "DO", "SAT"];

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      display: "none"
    };
  }

  filterSensor = (data, id) => {
    let filteredArr = data.filter(el => id === el.sensorid);
    const yArr = filteredArr.map(el => el.sensorvalue);
    const maxVal = Math.max(...yArr);
    filteredArr.forEach(elem => (elem.sensorvalue = elem.sensorvalue / maxVal));
    return filteredArr;
  };

  handleOver = () => {
    this.setState({ display: null });
  };

  handleOut = () => {
    this.setState({ display: "none" });
  };

  bisectDate = d3.bisector(function(d) {
    return d.date_time;
  }).left;

  render() {
    const margins = { top: 50, right: 20, bottom: 100, left: 60 };
    const svgDimensions = {
      width: Math.max(this.props.parentWidth, 100),
      height: 500
    };
    const { data, selected } = this.props;
    const { display } = this.state;

    const xScale = scaleTime()
      .domain(
        d3.extent(data, function(d) {
          return d.date_time;
        })
      )
      .range([margins.left, svgDimensions.width - margins.right]);

    const yScale = scaleLinear()
      .domain([0, 1])
      .range([svgDimensions.height - margins.bottom, margins.top]);

    return (
      <svg
        width={svgDimensions.width}
        height={svgDimensions.height}
        className="container"
        ref="svg"
      >
        <Axes
          scales={{ xScale, yScale }}
          margins={margins}
          svgDimensions={svgDimensions}
        />
        {selected.length > 0
          ? selected.map((elem, idx) => (
              <g>
                <Line
                  scales={{ xScale, yScale }}
                  margins={margins}
                  data={this.filterSensor(data, elem)}
                  svgDimensions={svgDimensions}
                  color={colors[elem]}
                />
              </g>
            ))
          : ""}

        {sensors.map((el, idx) => {
          return (
            <g transform={"translate(" + idx * 70 + ")"}>
              <rect x="0" y="0" width="10" height="10" fill={colors[idx]} />
              <text x="20" y="10" fontSize="15" textAnchor="start">
                {el}
              </text>
            </g>
          );
        })}

        <g className="tooltip" ref="tooltip" display={display}>
          <circle fill="black" stroke="blue" r="6" className="y" />

          <line
            stroke="blue"
            strokeDasharray="3,3"
            opacity="0.5"
            y1="0"
            y2={svgDimensions.height}
          />

          <line
            stroke="blue"
            strokeDasharray="3,3"
            opacity="0.5"
            x1={svgDimensions.width}
            x2={svgDimensions.width}
          />
        </g>

        <rect
          width={svgDimensions.width}
          height={svgDimensions.height}
          fill="none"
          pointerEvents="all"
          onMouseOver={this.handleOver}
          onMouseOut={this.handleOut}
          onMouseMove={e => {
            var x0 = xScale.invert(clientPoint(e.target, e)[0]),
              i = this.bisectDate(data, x0, 1),
              d0 = data[i - 1],
              d1 = data[i],
              d = x0 - d0.date_time > d1.date_time - x0 ? d1 : d0;

            {/* if (d.sensorid === elem) { */}
              const tooltip = select(".tooltip");
              tooltip
                .select("circle.y")
                .attr(
                  "transform",
                  "translate(" +
                    xScale(d.date_time) +
                    "," +
                    yScale(d.sensorvalue) +
                    ")"
                );

                console.log('value i am translating by', d)
            {/* } */}
          }}
        />
      </svg>
    );
  }
}

export default ResponsiveWrapper(Chart);
