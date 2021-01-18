import React, { useState } from 'react';
import uniqid from 'uniqid';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CalendarUser } from 'Components/CalendarUser';

export function CalendarBody(props) {
    const {
        teamId,
        lastDayOfCurrentMonth,
        getDepartmentsInfoByName,
        getTeamsNodeById
    } = props;
    const [isTeamUsersHide, setIsTeamUsersHide] = useState(false);
    const team = getTeamsNodeById('teams', teamId);

    const participants = getDepartmentsInfoByName('users').reduce((accumulator, currentValue) => {
        if (currentValue.teamId === teamId) {
            accumulator.push(currentValue.id);
        }
        return accumulator;
    }, []);
    const toggleUsersVisibility = () => {
        setIsTeamUsersHide(!isTeamUsersHide);
    }
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
                            <button onClick={ toggleUsersVisibility }>
                                <i className={classNames(
                                    'fas',
                                    'fa-chevron-up',
                                    'chevronBtn',
                                    { rotateChevron: isTeamUsersHide }
                                )}></i>
                            </button>
                        </div>
                    </div>
                </td>
                { [...Array(lastDayOfCurrentMonth.getDate() + 1).keys()].map(() => {
                    return <td className="teamInfo" key={uniqid()}></td>
                }) }
            </tr>
            { participants.map((userId) => {
                return <CalendarUser key={ userId }
                                     userId={ userId }
                                     lastDayOfCurrentMonth={ lastDayOfCurrentMonth }
                                     getDepartmentsInfoByName={ getDepartmentsInfoByName }
                                     getTeamsNodeById={ getTeamsNodeById }
                                     isTeamUsersHide={ isTeamUsersHide }/>
            }) }
        </tbody>
    );
}
CalendarBody.propTypes = {
    teamId: PropTypes.number.isRequired,
    lastDayOfCurrentMonth: PropTypes.instanceOf(Date).isRequired,
    getDepartmentsInfoByName: PropTypes.func.isRequired,
    getTeamsNodeById: PropTypes.func.isRequired
}