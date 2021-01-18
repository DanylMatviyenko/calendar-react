import React from 'react';
import { MonthSwitcher } from 'Components/MonthSwitcher'
import { CalendarBase } from './Components/CalendarBase';
import lastDayOfMonth from 'date-fns/lastDayOfMonth';
import { ModalWindow } from "./Components/ModalWindow";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lastDayOfCurrentMonth: lastDayOfMonth(new Date()),
      isLoading: true,
      isFormShown: false
    }
  }
  updateLastDayOfCurrentMonth = (newLastDay) => {
    this.setState({
      lastDayOfCurrentMonth: newLastDay
    });
  }
  toggleLoadingState = () => {
    this.setState({
      isLoading: !this.state.isLoading
    });
  }
  toggleFormVisibility = () => {
    this.setState({
      isFormShown: !this.state.isFormShown
    });
  }
  render() {
    const { isLoading, isFormShown, lastDayOfCurrentMonth } = this.state;
    const { toggleLoadingState, toggleFormVisibility, updateLastDayOfCurrentMonth } = this;
    return (
      <>
        <ModalWindow isLoading={ isLoading }
                     isFormShown={ isFormShown }
                     toggleLoadingState={ toggleLoadingState }
                     toggleFormVisibility={ toggleFormVisibility }/>
        <div className="wrapper">
          <MonthSwitcher lastDayOfCurrentMonth={ lastDayOfCurrentMonth }
                         updateDate={ updateLastDayOfCurrentMonth }/>
          <CalendarBase lastDayOfCurrentMonth={ lastDayOfCurrentMonth }
                        toggleLoadingState={ toggleLoadingState }
                        toggleFormVisibility={ toggleFormVisibility }/>
        </div>
      </>
    )
  }
}

export default App;
