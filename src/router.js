import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Login from './routes/Login';
import HomeRoot from './routes/HomeRoot';
import HomeHospital from './routes/HomeHospital';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={HomeRoot} />
        <Route path="/hospital" exact component={HomeHospital} />
        <Route path="/login" exact component={Login} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
