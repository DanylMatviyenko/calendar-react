import React, { useState, useEffect } from 'react';
import {inputData} from "../inputData";
import classNames from 'classnames';
import isWeekend from 'date-fns/isWeekend';
import { format } from 'date-fns';
import uniqid from "uniqid";

export function CalendarBase(props) {
    const { lastDayOfCurrentMonth } = props;
    const [departmentTeams, setDepartmentTeams] = useState({
        data: {},
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
        }, 2000)
    }, []);
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
    return (
        <section className="calendar">
            <table className="calendar__table">
                <CalendarHeader/>
            </table>
        </section>
    );
}
