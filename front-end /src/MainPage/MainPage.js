import React, { Component } from "react";
// import EGoogleMap from './EGoogleMap.js';
import MainHeader from "./MainHeader.js";
import MainPageData from "../MainPageData/MainPageData.js";
import MapClusterDemo from "../GoogleMap/MapClusterDemo.js";
import Home from "../Home/Home.js";
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
  color: "black",
  margin: "0",
  width: "100%"
};

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

  handleDialogClose = () => {
    this.setState({ markerClicked: false });
  };

  render() {
    return (
      <div>
        <div>
          <MainHeader />
        </div>
        <div>
          <Home />
        </div>
        <div className="flex">
          <div className="w-100 pa">
            <MapClusterDemo onSelectMarker={this.handleMarkerClicked} />
          </div>
          <div>
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
        <section className="contact">
          <h1 className="title2 contact-header">Contact</h1>
          <div ClassName="contact-item">
            <i class="material-icons">room</i>
            <span>info@durouas.com</span>
          </div>
          <div ClassName="contact-item">
            <i class="material-icons">email</i>
            <span>
              The Bruckner Building - 2417 Third Avenue, STE #301 Bronx, NY
              10451
            </span>
          </div>
          <div ClassName="contact-item">
            <i class="material-icons" href="https://durouas.com">language</i>
            <span>https://durouas.com/</span>
          </div>
        </section>
        <div className="pic2">
          <div className="ptext" />
        </div>
      </div>
    );
  }
}

export default MainPage;
