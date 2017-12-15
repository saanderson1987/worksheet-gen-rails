import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Banner from '../nav_bar/banner.jsx';
import ButtonRow from '../ui/button_row.jsx';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn) {
      this.props.history.push('/');
    }
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = this.state;
    this.props.processForm({user});
  }

  navLink() {
    if (this.props.formType === 'login') {
      return <Link to="/signup">sign up</Link>;
    } else {
      return <Link to="/login">log in</Link>;
    }
  }

  renderErrors() {
    return(
      <ul>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div>
        <nav><Banner /></nav>
        <div className="login-form-container">
          <form onSubmit={this.handleSubmit} className="login-form-box">
            <div>Welcome!</div>
            Please {this.props.formType} or <span style={{textDecoration: 'underline', color: '#5083d8'}}>{this.navLink()}</span> instead.
            {this.renderErrors()}
            <div className="login-form">
              <br/>
              <div>Username:{' '}
                <input type="text"
                  value={this.state.username}
                  onChange={this.update('username')}
                  className="login-input"
                />
              </div>
              <br/>
              <div>Password:{' '}
                <input type="password"
                  value={this.state.password}
                  onChange={this.update('password')}
                  className="login-input"
                />
              </div>
              <br/>
              {/* <input type="submit" value="Submit" /> */}
              <ButtonRow>
                <button className='button--green' onClick={this.handleSubmit}>Submit</button>
              </ButtonRow>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(SessionForm);
