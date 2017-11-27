import React from 'react';

export default class ButtonRow extends React.Component {
  render() {
    return(
      <div className='button-row'>
        {this.props.children}
      </div>
    );
  }
}
