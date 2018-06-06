import React from "react";
import { compose, withProps, withHandlers } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");


const MapClusterDemo_loggedin = compose(
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
      onClick={props.onMarkerClick.bind(this,marker)}/> //this is probably want I want
  ))}
  </MarkerClusterer>
  </GoogleMap>
);

class DemoApp extends React.PureComponent {
  constructor(props) {
    super(props);
    console.log('constructor',this)
    this.state = {
      markers: [],
      fetch_: false,
      clickedmarker: '',
      sensorid: '',
      sensorvalue: '',
      cus_id:''
    }
  }
  
  componentWillMount() { //also take out
    this.setState({ markers: [] });
  }

  //fetching data for the marker on the map
  componentDidUpdate() {
    console.log('what is this', this.state.fetch_)
    if(this.state.fetch_ === false){
      fetch('http://localhost:3100/Logindata/' + this.props.cus_id)
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
          this.setState({ fetch_: true });
        })
    }
  }

  handleMarkerId = (markerId) => {
    console.log('when i click logged')
        this.setState({
          // clickedmarker: markerId.id,
          latitude: markerId.lat,
          longitude: markerId.lon,
        });
        // console.log(this.state.latitude);
        this.props.onSelectMarker(this.state.latitude, this.state.longitude); 
    }

  render() {
    // console.log('render',this.props.cus_id)
    return (
      <MapClusterDemo_loggedin markers={this.state.markers} onMarkerClick={this.handleMarkerId}/>
    )
  }
}
export default DemoApp;

