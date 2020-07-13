import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Web3ReactManager from '../components/Web3ReactManager';

import Insure from './Insure';

function App() {
  return (
    <HashRouter>
      <Web3ReactManager>
        <Switch>
          <Route exact strict path="/">
            <Redirect to="/insure" />
          </Route>
          <Route exact strict path="/insure" component={Insure} />
        </Switch>
      </Web3ReactManager>
    </HashRouter>
  );
}

export default App;
