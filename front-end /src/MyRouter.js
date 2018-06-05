import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import MainPage from './MainPage/MainPage.js';
import LoggedIn from './LoggedIn/LoggedIn.js';
import Contact from './Contact/Contact.js';
import SignInPage from './SignIn/SignInForm.js';
import RegisterPage from './Register/RegisterForm.js';
import UploadPage from './Upload/UploadPage.js';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin()

// import { Helmet } from 'react-helmet';
// import {DocumentTitle}from 'react-document-title';

class MyRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000')
    .then(response => response.json())
    .then(console.log)
  }

  render() {
	return(
		<div className="mv3 App">
		    <Router>
				<div>
					<Switch>
						<Route exact path='/SignIn' component={SignInPage}></Route>
						<Route exact path='/Upload' component={UploadPage}></Route>
						<Route exact path='/Register' component={RegisterPage}></Route>
						<Route exact path='/Contact' component={Contact}></Route>
						<Route exact path='/LoggedIn/:id' component={LoggedIn}></Route>
						<Route exact path='/' component={MainPage}></Route>
					</Switch>
				</div>
			</Router>
		</div>
		);
}}


export default MyRouter;