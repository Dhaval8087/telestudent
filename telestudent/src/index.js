import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './Authetication/Login'
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './Common/toastr.css';
import {MemoryRouter} from 'react-router-dom';

ReactDOM.render(
  <MemoryRouter><Login/></MemoryRouter>, document.getElementById('root'));
registerServiceWorker();
