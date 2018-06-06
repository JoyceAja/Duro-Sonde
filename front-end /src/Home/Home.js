import React, { Component } from "react";
import "./Home.css";

export default class Home extends Component {
  render() {
    return (
      <div className="homepage">
        <div className="pic1">
          <div className="opac" />
          <div className="home-content">
            <span className="sonde-img">
              <img
                className="sonde"
                src="https://durouas.com/wp-content/uploads/2017/09/Duro-Sonde-Web-e1509463119346.jpg"
              />
            </span>
            <span className="description">
              <h1 className="title">Duro Sonde</h1>
              <h2 className="title-def">
                Autonomous water quality monitoring system
              </h2>
              <p className="def">
                Collect up to 5 parameters of data, including pH, Oxidation-Reduction Potential (ORP), Dissolved Oxygen (DO),
                Conductivity and Temperature
              </p>
              <h3 className="mini-header">Applications</h3>
              <ul className="list">
                <li className="list-item">Environmental & Climate Research</li>
                <li className="list-item">Surface Water & Groundwater</li>
                <li className="list-item">Drinking Water</li>
                <li className="list-item">Aquaculture</li>
              </ul>
            </span>
          </div>
        </div>

        <section className="text1">
          <h1 className="title2">Share Online</h1>
          <h2 className="def2">
            Learn from and inform others by sharing your results with the Duro
            community
          </h2>
        </section>

        {/* <div className="pic2">
          <div className="ptext" />
        </div> */}

        {/* <section>
          <h1>Map</h1>
        </section>

        <div className="pic3">
          <div className="ptext" />
        </div>

        <section>
          <div className="ptext">
            <h3 className="text">Contact</h3>
          </div>
        </section> */}
      </div>
    );
  }
}
