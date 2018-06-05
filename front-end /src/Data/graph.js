import * as d3 from "d3";
import React from "react";
import SelectData from "./dropDown";

var parseDate = d3.timeParse("%Y-%m-%dT%H:%M:%S.%LZ");
class LineChart extends React.Component {

  render() {
    const { data } = this.props;
    const sortedData = data.sort((a,b) => new Date(a.date_time) - new Date(b.date_time))
    sortedData.forEach(el => el.date_time = parseDate(el.date_time))
    return (
      <div>
        <SelectData data={ sortedData }/>
      </div>
    );
  }
}

export default LineChart;
