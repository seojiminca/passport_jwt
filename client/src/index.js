import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Register from 'screens/Register';
import Signin from "./screens/Signin";
import {BrowserRouter, Route, Switch} from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
      <Switch>
          <Route path='/' exact render={props => <App {...props}/>}/>
          <Route path='/register' exact render={props => <Register {...props}/>}/>
          <Route path='/signin' exact render={props => <Signin {...props}/>}/>
      </Switch>
  </BrowserRouter>,
document.getElementById('root')
);

