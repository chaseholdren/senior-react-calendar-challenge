import React, {Component} from 'react';
import Day from './calendar-day';
import ReminderForm from './reminder-form';
import './calendar.css';

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const weekObject = dayNames.map((dayName, index) => {
  return {
    index,
    name: dayName,
    reminders: [],
  };
});

class Calendar extends Component {
  state = {
    focusedReminder: null,
    weeks: [
      {index: 0, weekIndex: 27, days: weekObject.map(a => Object.assign({}, a))},
      {index: 1, weekIndex: 28, days: weekObject.map(a => Object.assign({}, a))},
      {index: 2, weekIndex: 29, days: weekObject.map(a => Object.assign({}, a))},
      {index: 3, weekIndex: 30, days: weekObject.map(a => Object.assign({}, a))},
    ],
  };

  render() {
    const { focusedReminder } = this.state;

    const theFocusedReminderObject = focusedReminder && this.state.weeks[focusedReminder.weekIndex].days[focusedReminder.dayIndex].reminders[focusedReminder.reminderIndex];

    return (
      <div className="calendar">
        {this.state.weeks.map(week => {

          const days = week.days.map(day => {

            const dayIncludesFocusedReminder = focusedReminder && (week.index === focusedReminder.weekIndex && day.index === focusedReminder.dayIndex);

            const focusedReminderIndex = focusedReminder && dayIncludesFocusedReminder ? focusedReminder.reminderIndex : null;

            return <Day
              key={`${week.weekIndex}-${day.name}`}
              name={day.name}
              addReminder={() => this.addReminder(week.index, day.index)}
              deleteReminder={(reminderIndex) => this.deleteReminder(week.index, day.index, reminderIndex)}
              focusReminder={(reminderIndex) => this.focusReminder(week.index, day.index, reminderIndex)}
              focusedReminderIndex={focusedReminderIndex}
              reminders={day.reminders}
            />;
          });

          return <div key={week.index} className="week">{days}</div>;
        })}
        {theFocusedReminderObject ? <ReminderForm reminder={theFocusedReminderObject} /> : null}
      </div>
    );
  }

  focusReminder = (weekIndex, dayIndex, reminderIndex) => {
    this.setState({
      focusedReminder: {
        weekIndex,
        dayIndex,
        reminderIndex,
      },
    });
  };

  deleteReminder = (weekIndex, dayIndex, reminderIndex) => {

    this.setState((prevState, props) => {
      const newReminders = prevState.weeks[weekIndex].days[dayIndex].reminders.slice();
      newReminders.splice(reminderIndex, 1);

      let newDay = Object.assign(prevState.weeks[weekIndex].days[dayIndex], {reminders: newReminders});

      let newWeek = Object.assign({}, prevState.weeks[weekIndex]);
      newWeek[dayIndex] = newDay;

      let newMonth = prevState.weeks.slice();
      newMonth[weekIndex] = newWeek;

      let newState = Object.assign(prevState, {weeks: newMonth, focusedReminder: null});

      return newState;
    });
  };

  addReminder = (weekIndex, dayIndex) => {
    console.log(weekIndex, dayIndex);

    const emptyReminder = {
      name: "(unnamed)",
      time: "12:00 AM",
    };

    this.setState((prevState, props) => {
      const newReminders = prevState.weeks[weekIndex].days[dayIndex].reminders.slice();
      newReminders.push(emptyReminder);

      let newDay = Object.assign(prevState.weeks[weekIndex].days[dayIndex], {reminders: newReminders});

      let newWeek = Object.assign({}, prevState.weeks[weekIndex]);
      newWeek[dayIndex] = newDay;

      let newMonth = prevState.weeks.slice();
      newMonth[weekIndex] = newWeek;

      const focusedReminder = {
        weekIndex,
        dayIndex,
          reminderIndex: newReminders.length - 1,
      };

      let newState = Object.assign(prevState, {weeks: newMonth, focusedReminder });

      return newState;
    });
  };
}

export default Calendar;
