import React from 'react';
import { Route, Redirect, Switch, Link, HashRouter } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import SessionFormContainer from './session_form/session_form_container.js';
import DocList from './doc_list/doc_list.jsx';
import DocView from './doc_view/doc_view.jsx';


const App = () => (
  <div>
    <Switch>
      <AuthRoute path="/login" component={SessionFormContainer} />
      <AuthRoute path="/signup" component={SessionFormContainer} />
      <ProtectedRoute exact path='/' component={DocList} />
      <ProtectedRoute path='/documents/:id/' component={DocView} />
    </Switch>
  </div>
);

export default App;
