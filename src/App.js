import React from 'react';
import { MonthSwitcher } from 'Components/MonthSwitcher';
import { CalendarBase } from './Components/CalendarBase';
import lastDayOfMonth from 'date-fns/lastDayOfMonth';
import { ModalWindow } from './Components/ModalWindow';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lastDayOfCurrentMonth: lastDayOfMonth(new Date())
    }
  }
  updateLastDayOfCurrentMonth = (newLastDay) => {
    this.setState({
      lastDayOfCurrentMonth: newLastDay
    });
  }
  render() {
    return (
      <>
        <MonthSwitcher lastDayOfCurrentMonth={ this.state.lastDayOfCurrentMonth }
                       updateDate={ this.updateLastDayOfCurrentMonth }/>
        <CalendarBase lastDayOfCurrentMonth={ this.state.lastDayOfCurrentMonth }/>
      </>
    )
  }
}

export default App;
