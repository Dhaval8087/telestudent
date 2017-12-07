import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Route from './routes/Route';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/react-mdl/extra/material.js';
import '../node_modules/react-mdl/extra/material.css';
import '../node_modules/toastr/build/toastr.css';

ReactDOM.render(<Route />, document.getElementById('root'));
registerServiceWorker();
