import React, { useState, useEffect } from 'react';
import compareAsc from 'date-fns/compareAsc';
import formatDistanceStrict from 'date-fns/formatDistanceStrict';
import PropTypes from "prop-types";

export function ModalWindow(props) {
    const [startVacationDate, setStartVacationDate] = useState('');
    const [endVacationDate, setEndVacationDate] = useState('');
    const [vacationDatesDiff, setVacationDatesDiff] = useState('Enter correct dates');

    useEffect(() => {
        validateUserVacationDates(startVacationDate, endVacationDate);
    }, [startVacationDate, endVacationDate])

    const validateUserVacationDates = (startVacationDate, endVacationDate) => {
        if (startVacationDate &&
            endVacationDate   &&
            compareAsc(new Date(endVacationDate), new Date(startVacationDate)) === 1) {
            setVacationDatesDiff(formatDistanceStrict(
                new Date(endVacationDate),
                new Date(startVacationDate),
                { unit: 'day' }));
        }else {
            setVacationDatesDiff('Enter correct dates');
        }
    }
    const handleInputFrom = (event) => {
        setStartVacationDate(event.target.value);
    }
    const handleInputTo = (event) => {
        setEndVacationDate(event.target.value);
    }
    const {
        isLoading,
        isFormShown,
        toggleFormVisibility
    } = props;

    const hideModalWindow = (event) => {
        if (!isLoading) {
            event.preventDefault();
            toggleFormVisibility();
        }
    }

    const loadingWindow = (
        <div className="loadingWindow" >
            <p className="loadingWindow__text">Loading...</p>
        </div>
    );
    const inputForm = (
        <div className="inputForm form__container" onClick={ (event) => { event.stopPropagation() } }>
            <form className="form">
                <div className="form__header">
                    <h3 className="form__title">Vacation Request</h3>
                    <div className="form__days-counter">
                        <p className="form__days-text">{ vacationDatesDiff }</p>
                    </div>
                </div>
                <div className="form__body">
                    <div className="form__dates-subtitle">
                        <h4>Dates</h4>
                    </div>
                    <div className="form__inputs-group">
                        <div className="form__input-wrapper">
                            <label>From</label>
                            <input className="form__input-from form__input"
                                   type="date"
                                   onChange={ handleInputFrom }/>
                        </div>
                        <div className="form__input-wrapper">
                            <label>To</label>
                            <input className="form__input-to form__input"
                                   type="date"
                                   onChange={ handleInputTo }/>
                        </div>
                        <div className="form__select-wrapper">
                            <div className="form__dates-subtitle">
                                <h4>Vac Type</h4>
                            </div>
                            <select form="form" name="" id="" className="form__select">
                                <option>Paid Day Off (PD)</option>
                                <option>Unpaid Day (UD)</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="form__footer">
                    <button className="form__cancel-btn form__btn" onClick={ hideModalWindow }>Cancel
                    </button>
                    <button className="form__send-btn form__btn"
                            onClick={ (event) => { event.preventDefault() } }>Send</button>
                </div>
            </form>
        </div>
    );
    if (isFormShown || isLoading) {
        return (
            <div className="modalBackground" onClick={ hideModalWindow }>
                { isLoading ? loadingWindow : null }
                { isFormShown ? inputForm : null }
            </div>
        );
    }
    return null;
}

ModalWindow.propTypes = {
    toggleFormVisibility: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isFormShown:  PropTypes.bool.isRequired
}
