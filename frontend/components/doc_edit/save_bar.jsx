import React from 'react';

export default class SaveBar extends React.Component {
  render() {
    const saveButton = this.props.saved ?
      <button className='button--small'>SAVED</button> :
      <button className='button--small button--green' onClick={this.props.updateDoc}>
        SAVE CHANGES
      </button>;
    return (
      <div className='save-bar'>
        {saveButton}
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
