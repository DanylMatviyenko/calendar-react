import React, { Component } from 'react';
import classNames from 'classnames';

export default function ModalWindow(props) {
    state = { modalOpen: false }

    handleOpen = () => this.setState({ modalOpen: true })
    handleClose = () => this.setState({ modalOpen: false })

    return (
        <ModalWindow>
            <div className="popup">
                <div className="popup__head">
                    <h2 className="popup__title">Vacation Request</h2>
                    <div className="popup__days-counter">
                        {{this.dateService.vacationDaysSum}}
                        <span>Days</span>
                    </div>
                </div>

                <div className="popup__body">
                    <div className="popup__dates-info">
                        <h3 className="popup__subtitle">Dates</h3>
                        <div className="popup__inputs-wrapper">
                            <div className="popup__date-input">
                                <label htmlFor="dateFrom">From</label>
                                <input className="popup__dateFrom" id="dateFrom" type="date"
                                (change)="this.dateService.getVacationDatesRange($event)"
                                [value]="this.dateService.startDate"
                                >
                            </div>
                            <div className=" popup__date-input">
                                <label for=" dateTo">To</label>
                                <input className=" popup__dateTo" id=" dateTo" type=" date"
                                (change)=" this.dateService.getVacationDatesRange($event)"
                                [value]="this.dateService.endDate"
                                >
                            </div>
                        </div>
                    </div>

                    <div className=" popup__vacation-info">
                        <h3 className=" popup__subtitle">Vac Type</h3>
                        <select className=" popup__vacation-type" name=" vacation-type" id=" vacation-type">
			                <option className=" popup__vacation-option" value=" Paid Day Off (PD)">
                                Paid Day Off (PD)
                            </option>
                            <option className="popup__vacation-option" value="Unpaid Day Off (UD)">
                                Unpaid Day Off (UD)
                            </option>
                        </select>
                    </div>
                </div>

                <div className="popup__foot">
                    <button onClick={this.handleClose} className="popup__cancel-btn button btn">Cancel</button>
                    <button onClick={this.handleClose} className="popup__accept-btn button btn-success">Send</button>
                </div>
            </div>
        </ModalWindow>
    );
}
