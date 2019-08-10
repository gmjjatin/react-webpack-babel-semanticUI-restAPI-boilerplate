import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';
import 'semantic-ui-css/semantic.css'
import './styles/forms.css'

ReactDOM.render(
  <BrowserRouter>
    <App newref={true} />
  </BrowserRouter>,
  document.getElementById('app')
);

module.hot.accept();
