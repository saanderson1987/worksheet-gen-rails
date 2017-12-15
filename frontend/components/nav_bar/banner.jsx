import React from 'react';

export default class Banner extends React.Component {
  render() {
    return(
      <div className="nav__row1">
        <div className="nav__logo">Worksheet Generator</div>
        { this.props.logout ?
          <div style={{cursor: 'pointer'}} onClick={this.props.logout}>
            Logout
          </div> : ''
        }
      </div>
    );
  }
}
