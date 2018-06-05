import React, { Component } from "react";
// import EGoogleMap from './EGoogleMap.js';
import MainHeader from "./MainHeader.js";
import MainPageData from "../MainPageData/MainPageData.js";
import MapClusterDemo from "../GoogleMap/MapClusterDemo.js";
// import logo from '../DUROlogo.jpeg';
// import Favicon from 'react-favicon';

import Dialog from "material-ui/Dialog";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";
const muiTheme = getMuiTheme();

const customContentStyle = {
  width: "100%",
  backgroundColor: "#37474f",
  height: "100%"
};

const bodyStyle = {
  backgroundColor: "#37474f",
  color: "black" ,
  margin:'0',
  width:'100%'
}

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // markerId:'',
      latitude: "",
      longitude: "",
      markerClicked: false
    };
  }

  handleMarkerClicked = (latitude, longitude) => {
    this.setState({
      // markerId: clickedMarkerId,
      latitude: latitude,
      longitude: longitude,
      markerClicked: true
    });
    console.log("mainpage", this.state.latitude, this.state.longitude);
  };

  // handleDialogOpen = () => {
  //   console.log("its opening");
  //   this.setState({ markerClicked: true });
  // };
  handleDialogClose = () => {
    this.setState({ markerClicked: false });
  };

  render() {
    return (
      <div>
        <div className="">
          <MainHeader />
        </div>
        <div className="flex">
          <div className="w-60 pa3 mr2">
            <MapClusterDemo onSelectMarker={this.handleMarkerClicked} />
          </div>
          <div >
            <MuiThemeProvider muiTheme={muiTheme}>
              <Dialog
              root
                modal={false}
                open={this.state.markerClicked}
                onRequestClose={this.handleDialogClose}
               
              >
                <MainPageData
                  latitude={this.state.latitude}
                  longitude={this.state.longitude}
                />
              </Dialog>
            </MuiThemeProvider>
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;
