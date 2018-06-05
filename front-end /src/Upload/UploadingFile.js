import React from 'react';
import FileUploadProgress  from 'react-fileupload-progress';

class UploadingFile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      txtURL: '',
    };

    // this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  // handleUploadImage(ev) {
  //   ev.preventDefault();

  //   const data = new FormData();
  //   data.append('file', this.uploadInput.files[0]);
  //   console.log(this.uploadInput.files[0])
  //   // data.append('filename', this.fileName.value);
  //   // console.log(this.fileName.value)

  //   fetch('http://localhost:3000/Upload/'+ this.props.user_id + '/' + this.props.cus_id + '/', {
  //     method: 'POST',
  //     body: data,
  //   }).then((response) => {
  //     response.json().then((body) => {
  //       this.setState({ txtURL: `http://localhost:3000/${body.file}` });
  //     });
  //   });
  // }

  render() {
    console.log(this.props.user_id)
    return (

        <FileUploadProgress key='ex1' url={'http://localhost:3000/Upload/'+ this.props.user_id + '/' + this.props.cus_id + '/'} type="file"
          onProgress={(e, request, progress) => {console.log('progress', e, request, progress);}}
          onLoad={ (e, request) => {console.log('load', e, request);}}
          onError={ (e, request) => {console.log('error', e, request);}}
          onAbort={ (e, request) => {console.log('abort', e, request);}}
          />
      
    );
  }
}

export default UploadingFile;