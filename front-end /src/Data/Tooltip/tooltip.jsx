import React from "react";
import { circle, rect } from "d3-shape";

export default class toolTip extends React.Component{

    circle = circle()
    .cx(d => {
      return d.x;
    })
    .cy(d => {
      const { yVal, yScale } = this.state
      return Number(d[yVal]);
    })
    .curve(d3.curveBasis);

    render(){
        return(
            <g>
            <svg 
            data={this.props.data}
            r="4"
            />
            </g>
        )
    }
} 