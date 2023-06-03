import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import App from './components/App';
import Game from './components/Game';
import NotFound from './common/NotFound';

const history = createBrowserHistory();

class RootRouter extends Component {
  render() {
    return (
      <Router history={history}>
          <Switch>
            <Route exact path="/" component={App} />
            <Route path="/game" component={Game} />
            <Route path="/notFound" component={NotFound} />
            <Redirect from="" to="/notFound" />
          </Switch>
      </Router>
    );
  }
}

export default RootRouter;
