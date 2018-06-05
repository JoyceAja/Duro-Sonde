import React from "react";
import { compose, withProps, withHandlers } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");
// const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");


const MapClusterDemo = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDKW2XtVEQSJIlVXgcUhs1-nIFgPR5DxQo&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `600px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
      const clickedMarkers = markerClusterer.getMarkers()
      // console.log(`Current clicked markers length: ${clickedMarkers.length}`)
      // console.log(markerClusterer)
    },
  }),
  withScriptjs,  
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={5}
    defaultCenter={{ lat: 40.7128, lng: -74.0060 }}
    defaultOptions={{fullscreenControl: false}}>
  <MarkerClusterer
    onClick={props.onMarkerClustererClick}
    averageCenter
    enableRetinaIcons
    gridSize={60}>
  {props.markers.map(marker => (
    <Marker
      key={marker.row_id}
      position={{ lat: marker.lat, lng: marker.lon }}
      onClick={props.onMarkerClick.bind(this,marker)}/>
  ))}
  </MarkerClusterer>
  </GoogleMap>
);

class DemoApp extends React.PureComponent {
  state = {
      markers: [],
      clickedmarker: '',
      sensorid: '',
      sensorvalue: ''
    }
  
  componentWillMount() { //Remind me to take this out
    this.setState({ markers: [] })
  }

  componentDidMount() {
    fetch('http://localhost:3000/')
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        var lon_ = 0;
        var newdata = [];
        var j = 0;
        for (var i = 0; i < data.length; i++){
          if (lon_ !== data[i].lon){
            // console.log('eq')
            // console.log(lon_);
            newdata[j] = (data[i]);
            j += 1;
          }
          lon_ = data[i].lon;
          i += 1;
        }
        this.setState({ markers: newdata });
      });
  }

  handleMarkerId = (markerId) => {
    console.log('when i click regular')
        this.setState({
          // clickedmarker: markerId.id,
          latitude: markerId.lat,
          longitude: markerId.lon,
        });
        // console.log(this.state.latitude);
        this.props.onSelectMarker(this.state.latitude, this.state.longitude); 
    }

  render() {
    return (
      <MapClusterDemo markers={this.state.markers} onMarkerClick={this.handleMarkerId}/>
    )
  }
}
export default DemoApp;

