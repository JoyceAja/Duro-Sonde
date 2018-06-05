import React from "react";
import * as d3 from "d3";
import DateRangePicker from "./DateRangePicker.js";
import Graph from "../Data/graph.js";
import "./MainPageData.css";

var parseDate = d3.timeParse("%Y-%m-%dT%H:%M:%S.%LZ");

class MainPageData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: "",
      longitude: "",
      sensorid: [],
      sensorvalue: [],
      dropdownOpen: false,
      clicked: false,
      data: []
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  // parseDate = d3.timeParse("%Y-%m-%d %H:%M:%S");

  render() {
    if (this.props.longitude !== this.state.longitude) {
      this.setState({ clicked: true });
      fetch(
        "http://localhost:3000/" +
          this.props.longitude +
          "/" +
          this.props.latitude
      )
        .then(response => response.json())
        // .then(data => console.log(data))
        // .then(data => this.setState({data: data[0].row_id}));
        .then(data => {
          // this.setState({ data: data });
          var sensorid = [];
          var sensorvalue = [];
          for (var i = 0; i < data.length; i++) {
            sensorid[i] = data[i].sensorid;
            sensorvalue[i] = data[i].sensorvalue;
            // }console.log(sensorid);
          }
          this.setState({
            sensorid: sensorid,
            sensorvalue: sensorvalue,
            data: data 
          });
        });
      this.setState({ longitude: this.props.longitude });
    }

    return (
      <div>
        {this.state.clicked && this.state.data.length > 0 ? (
          <div>
            <div className="card wider">
              <div className="card-body">
                <Graph data={this.state.data} />
              </div>
            </div>
          </div>
        ) : (
          <div />
        )}

        <p className="f6 lh-copy measure mt2 mid-gray">
          latitude: {this.props.latitude}
        </p>

        <p className="f6 lh-copy measure mt2 mid-gray">
          longitude: {this.props.longitude}
        </p>
      </div>
    );
  }
}

export default MainPageData;
