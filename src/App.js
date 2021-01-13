import React from 'react';
import { MonthSwitcher } from 'Components/MonthSwitcher'
import lastDayOfMonth from 'date-fns/lastDayOfMonth';

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
      <MonthSwitcher lastDayOfCurrentMonth={ this.state.lastDayOfCurrentMonth }
                     updateDate={ this.updateLastDayOfCurrentMonth }/>
    )
  }
}

export default App;
