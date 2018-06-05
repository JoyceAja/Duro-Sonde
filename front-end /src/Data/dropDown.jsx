import React from "react";
import { Dropdown, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import Chart from "./LineChart/chart";

// const sensors = ["Temp", "pH", "ORP", "EC", "TDS", "SAL", "SG", "DO", "SAT"]
const options = [
  { key: "TEMP", value: 0, text: "Temp" },
  { key: "PH", value: 1, text: "pH" },
  { key: "ORP", value: 2, text: "ORP" },
  { key: "EC", value: 3, text: "EC" },
  { key: "TDS", value: 4, text: "TDS" },
  { key: "SAL", value: 5, text: "SAL" },
  { key: "SG", value: 6, text: "SG" },
  { key: "DO", value: 7, text: "DO" },
  { key: "SAT", value: 8, text: "SAT" }
];

const trigger = <Icon name="add circle" size="big" color="teal" />;

export default class DropdownImageTriggerExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: [],
      value: [],
      multiple: true
    };
  }

  handleChange = (e, {value} ) => {
    const multiple = true
    this.setState({multiple, value: value })
  };

  render() {
    const { selected, value, multiple } = this.state;
    return (
      <div>
        <Dropdown
          fluid
          selection
          multiple={multiple}
          value={value}
          options={options}
          placeholder="Add Graph"
          onChange={this.handleChange}
        />
        <Chart selected={value} data={this.props.data} />
      </div>
    );
  }
}
