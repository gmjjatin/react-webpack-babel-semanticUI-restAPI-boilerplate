import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import 'semantic-ui-css/semantic.css'

ReactDOM.render(
  <App  />,
  document.getElementById('app')
);

module.hot.accept();
