import React, { useState, useEffect } from 'react';
import { inputData } from "../inputData";
import { CalendarBody } from './CalendarBody';
import classNames from 'classnames';
import isWeekend from 'date-fns/isWeekend';
import { format } from 'date-fns';
import uniqid from "uniqid";
import PropTypes from "prop-types";
import { StatisticFooterProvider } from "../context/StatisticFooterProvider";

export function CalendarBase(props) {
    const { lastDayOfCurrentMonth } = props;
    const [departmentTeams, setDepartmentTeams] = useState({
        data: {
            teams: [],
            users: [],
            vacations: []
        },
        isLoading: true
    });
    //const [isLoading, setIsLoading] = useState(true);

    //handle request errors
    useEffect(() => {
        const getTeamsData = () => {
            return fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify([inputData]),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
        }
        setTimeout(() => {
            getTeamsData()
                .then((response) => response.json())
                .then((dataObj) => {
                    if(Object.keys(dataObj).length !== 0) {
                        setDepartmentTeams({
                            data: dataObj[0],
                            isLoading: false
                        });
                    }
                });
            //update to 2000
        }, 0)
    }, []);
    const getDepartmentsInfoByName = (dataName) => {
        return departmentTeams.data[dataName];
    }
    const getTeamsNodeById = (dataName, id) => {
        return departmentTeams.data[dataName].find((element) => {
            return id === element.id;
        });
    }
    const CalendarHeader = () => {
        return (
            <thead>
                <tr className="outputCalendar">
                    <td className="addVacationCell outputItem ">
                        <button className="addVacationBtn"><span>+</span>Add Vacation</button>
                    </td>
                    { [...Array(lastDayOfCurrentMonth.getDate()).keys()].map((element) => {
                        const iDate = new Date(
                            lastDayOfCurrentMonth.getFullYear(),
                            lastDayOfCurrentMonth.getMonth(),
                            ++element);
                        return <HeaderDayCell cellDate={ iDate } key={ uniqid() }/>
                    }) }
                    <td className="sumCell outputItem"><span className="calendar__text">Sum</span></td>
                </tr>
            </thead>
        );
    }
    const HeaderDayCell = (props) => {
        const { cellDate } = props;

        const headerDayCellClassName = classNames(
            'outputItem',
            { weekend: isWeekend(cellDate) }
        );
        return (
            <td className={ headerDayCellClassName }>
                <span className="outputDay">{ format(cellDate, 'iiiiii') }</span>
                <br />
                <span className="outputDate">{ cellDate.getDate() }</span>
            </td>
        );
    }
    HeaderDayCell.propTypes = {
        cellDate: PropTypes.instanceOf(Date).isRequired
    }
    return (
        <section className="calendar">
            <table className="calendar__table">
                <StatisticFooterProvider lastDayOfCurrentMonth={ lastDayOfCurrentMonth }>
                    <CalendarHeader/>
                    { getDepartmentsInfoByName('teams').map((team) => {
                        return <CalendarBody teamId={ team.id }
                                             lastDayOfCurrentMonth={ lastDayOfCurrentMonth }
                                             getDepartmentsInfoByName={ getDepartmentsInfoByName }
                                             getTeamsNodeById={ getTeamsNodeById }
                                             key={ team.id }/>
                    }) }
                </StatisticFooterProvider>
            </table>
        </section>
    );
}
CalendarBase.propTypes = {
    lastDayOfCurrentMonth: PropTypes.instanceOf(Date).isRequired
}
