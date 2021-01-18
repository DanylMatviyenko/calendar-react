import React from 'react';
import compareAsc from 'date-fns/compareAsc';
import PropTypes from "prop-types";

const StatisticContext = React.createContext();

export class StatisticFooterProvider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            teamStatisticList: new Map()
        }
    }
    componentDidUpdate(prevProps) {
        if (compareAsc(this.props.lastDayOfCurrentMonth, prevProps.lastDayOfCurrentMonth) !== 0) {
            this.setState( {
                teamStatisticList: new Map()
            } );
        }
    }
    setTeamStatisticList = (teamStatisticList) => {
        this.setState({
            teamStatisticList
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