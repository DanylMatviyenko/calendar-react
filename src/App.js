import React from 'react';
import lastDayOfMonth from 'date-fns/lastDayOfMonth';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.lastDayOfCurrentMonth = lastDayOfMonth(new Date());
  }
  render() {
    return null;
  }
}

export default App;
