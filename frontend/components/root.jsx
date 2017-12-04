import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter,  Route, Redirect, Switch, Link } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import SessionFormContainer from './session_form/session_form_container.js';
import DocList from './doc_list/doc_list.jsx';
import DocView from './doc_view/doc_view.jsx';
import DocEditContainer from './doc_edit/doc_edit_container.jsx';
import NewDoc from './new_doc/new_doc.jsx';

const Root = ({ store }) => (
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <AuthRoute path="/login" component={SessionFormContainer} />
        <AuthRoute path="/signup" component={SessionFormContainer} />
        <ProtectedRoute exact path='/' />
        <ProtectedRoute exact path='/my_created_docs' component={DocList} />
        <ProtectedRoute exact path='/my_created_docs/new' component={NewDoc} />
        <ProtectedRoute exact path='/my_created_docs/:id/' component={DocView} />
        <ProtectedRoute exact path='/my_created_docs/:id/edit' component={DocEditContainer} />
        <ProtectedRoute exact path='/my_subscribed_docs' component={DocList} />
        <ProtectedRoute exact path='/my_subscribed_docs/:id/' component={DocView} />
        <ProtectedRoute exact path='/documents/:id/' component={DocView} />
      </Switch>
    </HashRouter>
  </Provider>
);

export default Root;
