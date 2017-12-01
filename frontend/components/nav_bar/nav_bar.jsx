import React from 'react';
import { Link } from 'react-router-dom';
import shortid from 'shortid';

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
    const pages = {
      my_subscribed_docs:
        <div className='nav__row2-item'>
          <Link to='/my_subscribed_docs'>Documents I'm Subscribed To</Link>
        </div>,
      my_created_docs:
        <div className='nav__row2-item'>
          <Link to='/my_created_docs/'>Documents I've Created</Link>
        </div>,
      new_doc:
        <div className='nav__row2-item'>
          <div className="plus-icon">+</div>
          <div className='nav__row2-text_left-of-icon'>
            <Link to='/my_created_docs/new'>New Document</Link>
          </div>
        </div>,
    };

    const currentPage = this.props.path.slice(1);
    pages[currentPage] =
      <div className='nav__row2-item--selected'>{pages[currentPage]}</div>;

    return (
        <nav>
          <div className="nav__row1">
            <div className="nav__logo">Worksheet Generator</div>
            <div style={{cursor: 'pointer'}} onClick={this.props.logout}>
              Logout
            </div>
          </div>
          <div className="nav__row2" >
            { Object.values(pages).map( page => (
              <div key={shortid.generate()}>{page}</div>)
            ) }
          </div>
        </nav>
    );
  }

}
