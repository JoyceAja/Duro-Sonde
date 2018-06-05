import React from "react";
import { compose, withProps, withStateHandlers } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");

// 40.7128° N, 74.0060° W === NewYork
const EGoogleMap = 
  compose(
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDKW2XtVEQSJIlVXgcUhs1-nIFgPR5DxQo&callback=initMap",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `800px` }} />,
      mapElement: <div style={{ height: `100%` }} />,}),
    withStateHandlers(() => ( {isOpen1: false,}), 
                              {onToggleOpen1: ({ isOpen1 }) => () => ({
                                isOpen1: !isOpen1,})}),
    withStateHandlers(() => ( {isOpen2: false,}), 
                              {onToggleOpen2: ({ isOpen2 }) => () => ({
                                isOpen2: !isOpen2,})}),
    withScriptjs,
    withGoogleMap)((props) =>
  <GoogleMap defaultZoom={10} defaultCenter={{ lat: 40.7128, lng: -74.0060 }}>

  <Marker position={{ lat: 40.7128, lng: -74.0060 }} onClick={props.onToggleOpen1}>
    {props.isOpen1 && 
      <InfoBox onCloseClick={props.onToggleOpen1} options={{ closeBoxURL: ``, enableEventPropagation: true }}>
        <div style={{ backgroundColor: `blue`, opacity: 0.75, padding: `12px` }}>
          <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
            Hello, NewYork--1!
          </div>
        </div>
      </InfoBox>}
  </Marker>

  <Marker position={{ lat: 40.5, lng: -74 }} onClick={props.onToggleOpen2}>
    {props.isOpen2 && 
      <InfoBox onCloseClick={props.onToggleOpen2} options={{ closeBoxURL: ``, enableEventPropagation: true }}>
        <div style={{ backgroundColor: `pink`, opacity: 0.75, padding: `12px` }}>
          <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
            Hello, NewYork--2!
          </div>
        </div>
      </InfoBox>}
  </Marker>
  
  </GoogleMap>
)

export default EGoogleMap;
