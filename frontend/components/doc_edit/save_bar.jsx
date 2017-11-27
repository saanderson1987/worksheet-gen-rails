import React from 'react';

export default class SaveBar extends React.Component {
  render() {
    return (
      <div className='save-bar'>
        <button className='button--small button--green' onClick={this.props.updateDoc}>
          SAVE CHANGES
        </button>
        <div className='update-time'>Last updated at {this.getTimeLastUpdated()}</div>
      </div>
    );
  }

  getTimeLastUpdated() {
    const updateTime = new Date(this.props.updatedAt);
    const format = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      weekday: 'short',
      month: 'short',
      year: 'numeric',
      day: 'numeric'
    };
    return updateTime.toLocaleString('en-US', format);
  }
}