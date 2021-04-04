import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(   
  //  recebe as tags html e coloca no elemento html
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
