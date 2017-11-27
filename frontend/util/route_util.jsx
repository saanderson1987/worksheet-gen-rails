import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import NavBarContainer from '../components/nav_bar/nav_bar_container.jsx';

const Auth = ({ component: Component, path, loggedIn }) => (
  <Route path={path} render={(props) => (
    !loggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to="/" />
    )
  )} />
);

const Protected = ({ component: Component, path, loggedIn }) => {
  return (
    <Route path={path} render={(props) => (
       loggedIn ? (
         path === '/' ? <Redirect to='/my_created_docs/' /> :
          <div>
            <NavBarContainer path={path} />
            <div className='page-container'>
              <Component {...props} />
            </div>
          </div>
      ) : (
        <Redirect to="/login" />
      )
    )} />
  );
};

const mapStateToProps = state => (
  {loggedIn: Boolean(state.session.currentUser)}
);

export const AuthRoute = withRouter(connect(mapStateToProps, null)(Auth));

export const ProtectedRoute = withRouter(connect(mapStateToProps, null)(Protected));
