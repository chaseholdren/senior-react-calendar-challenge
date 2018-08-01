import React, { Component } from 'react';

class ReminderForm extends Component {
  render() {
    return (
      <div className="reminder-form">
        {this.props.reminder.name}
      </div>
    );
  }
}

export default ReminderForm;
