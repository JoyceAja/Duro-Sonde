import React from 'react';
import './LoggedinHeader.css';
import logo from '../DUROlogo.jpeg';

const LoggedinHeader = () => {
    return (
      <nav className=" dt-l w-100 border-box pa0 ph3-l ph4-r code bg-dark-red shadow-5">
        <div className=" dtc-l v-mid link w-100 w-25-l tc tl-l mb2 mb0-l">
          <img src={logo} height='90px' alt='DURO'/>
        </div>
        <div className=" dtc-l v-mid w-100 w-75-l tc tr-l fontred">
          <a className="link sans-serif grow black f4 f4-l dib mr3 mr4-l pointer" href="/" title="setting">Settings</a>
        </div>
        <div className=" dtc-l v-mid w-100 w-75-l tc tr-l fontred">
          <a className="link sans-serif grow black f4 f4-l dib mr3 mr4-l pointer" href="/" title="Signout">SignOut</a>
        </div>
      </nav>
    );
  }

export default LoggedinHeader;