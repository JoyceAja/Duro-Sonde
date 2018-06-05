import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import 'tachyons';
import MyRouter from './MyRouter.js';
// import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(<MyRouter />, document.getElementById('root'));
registerServiceWorker();
