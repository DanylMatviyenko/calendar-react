import React from 'react';
import isWeekend from "date-fns/isWeekend";
import PropTypes from "prop-types";

const StatisticContext = React.createContext();

export class StatisticFooterProvider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            teamStatisticList: this.fillStatisticsList(props.lastDayOfCurrentMonth)
        }
    }
    setTeamStatisticList = (teamStatisticList) => {
        this.setState({
            teamStatisticList
        });
        console.log(this.state.teamStatisticList);
    }
    fillStatisticsList = (lastDayOfCurrentMonth) =>  {
        return [...Array(lastDayOfCurrentMonth.getDate()).keys()].map((elemIndex) => {
            const iDate = new Date(
                lastDayOfCurrentMonth.getFullYear(),
                lastDayOfCurrentMonth.getMonth(),
                ++elemIndex
            );
            if (isWeekend(iDate)) {
                return '';
            }
            return 0;
        });
    }
    render() {
        const { children } = this.props;
        const { teamStatisticList } = this.state;
        const { setTeamStatisticList } = this;

        return (
            <StatisticContext.Provider value={{
                teamStatisticList,
                setTeamStatisticList
            }}>
                { children }
            </StatisticContext.Provider>
        );
    }
}
StatisticFooterProvider.propTypes = {
    lastDayOfCurrentMonth: PropTypes.instanceOf(Date).isRequired,
    children: PropTypes.oneOfType([
                  PropTypes.arrayOf(PropTypes.node),
                  PropTypes.node
              ]).isRequired
}
export default StatisticContext