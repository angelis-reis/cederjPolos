import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';

import { createGlobalStyle } from "styled-components";


const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Notable');

  body {
    font-family: 'Notable', sans-serif;
  }
`

 

function Routes() {
    return (
        
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/app" component={OrphanagesMap} />
                <Route path="/orphanages/create" component={CreateOrphanage} />
                <Route path="/orphanages/:id" component={Orphanage} />   
                    {/* fiquei 4 horas procurando um erro, ára um espaço no fim desta rota */}
            </Switch>
        </BrowserRouter>

        
        
    );
}

export default Routes;