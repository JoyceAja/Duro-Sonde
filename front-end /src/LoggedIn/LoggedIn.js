import React from 'react';
import './loggedin.css';
import 'bootstrap/dist/css/bootstrap.css';
import LoggedinHeader from './LoggedinHeader.js';
import UploadingFile from '../Upload/UploadingFile.js';
import MapClusterDemo_loggedin from '../GoogleMap/MapClusterDemo_loggedin.js';
import MainPageData from '../MainPageData/MainPageData.js';

export default class LoggedIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temp:'',
      ph:'',
      company:'',
      company_id:'',
      user_name:'',
      route:'Chart'
    }
  }

  onRouteChange = (route) => {
    this.setState({route: route});
    console.log(this.state.route)
  }

  handleMarkerClicked = (latitude, longitude) => {
      this.setState({
        // markerId: clickedMarkerId,
        latitude: latitude,
        longitude: longitude
      });
      console.log('loggedin', this.state.latitude, this.state.longitude);
    }

  //Do you want a fetch in a render??
  render() {
    if (this.state.company===''){
      fetch('http://localhost:3000/LoggedIn/'+ this.props.match.params.id+'/company')
      .then(response => response.json())
      .then(data => this.setState({company: data.name, company_id: data.cus_id}))
      .catch(err => console.log(err));
      fetch('http://localhost:3000/LoggedIn/'+ this.props.match.params.id+'/name')
      .then(response => response.json())
      .then(data => this.setState({user_name: data.first_name}))
      .catch(err => console.log(err));
    }
    
    // const id = this.props.match.params.id;
    return (
    <div>
        <LoggedinHeader />
      	<nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
	      	<a className="navbar-brand col-sm-3 col-md-2 mr-0" href="">{this.state.company} /  {this.state.user_name}</a>
  	    </nav>
	 <div className="container-fluid">
      <div className="row">
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
        <h4 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>Views</span>
            </h4>
          <div className="sidebar-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link active" href="#" onClick={() => this.onRouteChange('Upload')} >
                  Upload <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={() => this.onRouteChange('Chart')} >
                  Chart
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="">
                  Map
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="">
                  Reports
                </a>
              </li>
            </ul>

            <h4 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>Save reports</span>
            </h4>
            <ul className="nav flex-column mb-2">
              <li className="nav-item">
                <a className="nav-link" href="">
                  Current month
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="">
                  Current quarter
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="">
                  Current year
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="">
                  Last year
                </a>
              </li>
            </ul>
          </div> 
        </nav>
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
          <h1 className="h2">{this.state.route}</h1>
        </div>
    
      { this.state.route === 'Upload'
      ? <UploadingFile user_id={this.props.match.params.id} cus_id={this.state.company_id}/>
      : <div>
          {this.state.route === 'Chart'
          ?
            <div>
              <div className="flex">
                <div className="w-60 pa3 mr2">
                  <MapClusterDemo_loggedin onSelectMarker={this.handleMarkerClicked} cus_id={this.state.company_id}/>
                </div>
                <div className="w-40 pa3 mr2">
                  <MainPageData latitude={this.state.latitude} longitude={this.state.longitude}/>
                </div>
              </div>
            </div>
          :<div></div>
          }
      </div>
      }

        </main>
        
      </div>
    </div>
    </div>
    );
  }
}