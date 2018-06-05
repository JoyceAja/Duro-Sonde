import React from 'react';
import UploadingFile from './UploadingFile.js';
import MainHeader from '../MainPage/MainHeader.js';

export default class Contact extends React.Component {
  render() {
    return (
      <div>
      	<MainHeader/>
        <h1 className="tc">Upload</h1>
        <div className="tc">
        	<UploadingFile/>
        </div>
      </div>
    );
  }
}