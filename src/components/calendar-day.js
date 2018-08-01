import React, {Component} from 'react';

class Day extends Component {
  render() {
    return (
      <div className="day">
        {this.props.name}
        <button onClick={this.props.addReminder}>+</button>
        {this.props.reminders.map((reminder, index) => {
          const isFocused = this.props.focusedReminderIndex === index;
          return (
            <div key={index} className={isFocused ? "focused-reminder" : null}>
              <span onClick={() => this.props.focusReminder(index)}>
                    {reminder.name} at {reminder.time}
              </span>
              <button onClick={this.props.deleteReminder}>-</button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Day;
