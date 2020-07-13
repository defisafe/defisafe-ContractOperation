import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

import Insure from './Insure';

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact strict path="/">
          <Redirect to="/insure" />
        </Route>
        <Route exact strict path="/insure" component={Insure} />
      </Switch>
    </HashRouter>
  );
}

export default App;
