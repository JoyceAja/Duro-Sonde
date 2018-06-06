import React from 'react';
import './MainHeader.css';
import logo from '../DUROlogo.jpeg';
import { Button, Modal } from 'semantic-ui-react'

import RegisterForm from '../Register/RegisterForm.js';
import SignInForm from '../SignIn/SignInForm.js';

class MainHeader extends React.Component{
  constructor(){
    super()

    this.state = {
      signin: false,
      register: false
    }
  }

  handleDialogOpenSignin = () => {
    console.log("its opening");
    this.setState({ signin: true });
  };
  handleDialogCloseSignin = () => {
    this.setState({ signin: false });
  };
  handleDialogOpenRegister = () => {
    console.log("its opening");
    this.setState({ register: true });
  };
  handleDialogCloseRegister = () => {
    this.setState({ register: false });
  };
  render(){
    return (
      <nav className=" dt-l w-100 border-box pa0 ph3-l ph4-r code bg-dark-red shadow-5">
        <div className=" dtc-l v-mid link w-100 w-25-l tc tl-l mb2 mb0-l">
          <img className="logo" src={logo} height='90px' alt='DURO'/>
        </div>
        <div className=" dtc-l v-mid w-100 w-75-l tc tr-l fontred">
          <a className="link sans-serif grow black f4 f4-l dib mr3 mr4-l pointer" href="/" title="Home">HOME</a>
        </div>
        <div className=" dtc-l v-mid w-100 w-75-l tc tr-l fontred">
          <a className="link sans-serif grow black f4 f4-l dib mr3 mr4-l pointer" href="#" onClick={this.handleDialogOpenSignin} title="SignIn">SIGNIN</a>
          <SignInForm handleDialogClose={this.handleDialogCloseSignin} open={this.state.signin}/>
        </div>
        <div className=" dtc-l v-mid w-100 w-75-l tc tr-l fontred">
          <a className="link sans-serif grow black f4 f4-l dib mr3 mr4-l pointer" href="/#" onClick={this.handleDialogOpenRegister} title="Register">REGISTER</a>
          <RegisterForm handleDialogClose={this.handleDialogCloseRegister} open={this.state.register}/>
        </div>
        <div className=" dtc-l v-mid w-100 w-75-l tc tr-l fontred">
          <a className="link sans-serif grow black f4 f4-l dib mr3 mr4-l pointer" href="https://durouas.com/#contact" title="Contact">CONTACT</a>
        </div>
      </nav>
    );
  }
  }

export default MainHeader;