import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import PolosMap from './pages/PolosMap';
import Polo from './pages/Polo';
import CreatePolo from './pages/CreatePolo';

/* import { createGlobalStyle } from "styled-components";
const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Notable');
  body {
    font-family: 'Notable', sans-serif;
  }
` */

function Routes() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path='/' exact component={Landing} />
				<Route path='/app' component={PolosMap} />
				<Route path='/polos/create' component={CreatePolo} />
				<Route path='/polos/:id' component={Polo} />
				{/* fiquei 4 horas procurando um erro, ára um espaço no fim desta rota */}
			</Switch>
		</BrowserRouter>
	);
}
export default Routes;
