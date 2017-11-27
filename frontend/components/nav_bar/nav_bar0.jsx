import React from 'react';
import { Link } from 'react-router-dom';

const sessionLinks = () => (
  <nav className="login-signup">
    <Link to="/login">Login</Link>
    &nbsp;or&nbsp;
    <Link to="/signup">Sign up!</Link>
  </nav>
);

const personalGreeting = (currentUser, logout) => (
	<hgroup className="header-group">
    <h2 className="header-name">Hi, {currentUser.username}!</h2>
    <button className="header-button" onClick={logout}>Log Out</button>
	</hgroup>
);

// const NavBar = ({ currentUser, logout }) => {
//   return currentUser ? personalGreeting(currentUser, logout) : sessionLinks();
// };
//
// export default NavBar;

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <nav>
          <div className="nav__row1">
            <div className="nav__logo">Worksheet Generator</div>
            <div style={{cursor: 'pointer'}} onClick={this.props.logout}>Logout</div>
          </div>
          <div className="nav__row2" >
            <div className='nav__row2-item'>Documents I'm Subscribed To</div>
            <div className='nav__row2-item'>Documents I've Created</div>
            <div className='nav__row2-item'>
              <div className="plus-icon">+</div>
              <div className='nav__row2-text_left-of-icon'>New Document</div>
            </div>
          </div>
        </nav>
    );
  }

}
