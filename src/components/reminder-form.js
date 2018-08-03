import React, {Component} from 'react';

class ReminderForm extends Component {
  render() {
    return (
      <div className="reminder-form">
        <input
          type="text"
          value={this.props.reminder.name}
          onChange={(event) => this.props.updateReminderName(event.target.value)}
        />
      </div>
    );
  }
}

export default ReminderForm;
