import React from 'react';
import uniqid from "uniqid";
import PropTypes from "prop-types";

export function CalendarBody(props) {
    const {
        teamId,
        lastDayOfCurrentMonth,
        getDepartmentsInfoByName,
        getTeamsNodeById
    } = props;
    const team = getTeamsNodeById('teams', teamId);

    const participants = getDepartmentsInfoByName('users').reduce((accumulator, currentValue) => {
        if (currentValue.teamId === teamId) {
            accumulator.push(currentValue.id);
        }
        return accumulator;
    }, []);

    return (
        <tbody>
            <tr className="mainRow">
                <td className="teamInfo">
                    <div className="teamInfo__wrapper">
                        <p className="teamInfo__name">{ team.name }</p>
                        <div className="teamInfo__block">
                            <i className="fas fa-users"></i>
                            <span>{ participants.length }</span>
                            <div className="percent">{ team.percentageOfAbsent[lastDayOfCurrentMonth.getMonth()] }%</div>
                            <button>
                                <i className="fas chevronBtn fa-chevron-up"></i>
                            </button>
                        </div>
                    </div>
                </td>
                { [...Array(lastDayOfCurrentMonth.getDate() + 1).keys()].map(() => {
                    return <td className="teamInfo" key={uniqid()}></td>
                }) }
            </tr>
        </tbody>
    );
}
CalendarBody.propTypes = {
    teamId: PropTypes.number.isRequired,
    lastDayOfCurrentMonth: PropTypes.instanceOf(Date).isRequired,
    getDepartmentsInfoByName: PropTypes.func.isRequired,
    getTeamsNodeById: PropTypes.func.isRequired
}