import * as d3 from "d3";
import React from "react";
import { csv } from "d3-request";
import LineChart from "./graph.js";

export default class Data extends React.Component {
  constructor() {
    super();

    this.state = {
      data: [],
      loadError: null,
      updated_: false
    };
  }
  parseDate = d3.timeParse("%Y-%m-%d %H:%M:%S");

  componentDidUpdate(){
    if (this.state.updated_===false){
      const { data } = this.props
    
    this.setState({
        data: data.map(d => ({
          ...d,
          x: this.parseDate(d.date_time),
          updated_: true
        }))

  })
    }
    
  }

  render() {
    const { data } = this.state;
    // console.log('data from marker', data)
    return (
      <div>
        {data ? <LineChart data= { data } /> : ""}
      </div>
    );
  }
}
