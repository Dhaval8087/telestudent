import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './Common/toastr.css';

import Relay from 'react-relay';
console.log(Relay.RelayQL(`
  {
    blocks {
      value
    }
  }
`,[]))
ReactDOM.render(
  <App />, document.getElementById('root'));
registerServiceWorker();
