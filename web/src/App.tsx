import React from 'react';
import './styles/global.css';
import 'leaflet/dist/leaflet.css';
import Routes from './routes';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faCheckSquare, faCoffee)


function App() {
  return (
    <Routes/>
  );
}

export default App;
