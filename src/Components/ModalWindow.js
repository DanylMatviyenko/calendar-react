import React, { Component } from 'react';
import '../assets/stylesheets/ModalWindow.css';
import { Button, Modal } from 'semantic-ui-react';

export default class ModalWindow extends Component {
    state = { modalOpen: false }

    handleOpen = () => this.setState({ modalOpen: true });
    handleClose = () => this.setState({ modalOpen: false });

    render() {
        return (
            <Modal
                trigger={<Button onClick={this.handleOpen}>+ Add Vacation</Button>}
                open={this.state.modalOpen}
                onClose={this.handleClose}
                basic
                size='small'
            >
                <Modal.Content>
                    <div className="modalBackground" onClick={this.handleClose}>
                        <div className="loadingWindow">
                            <p className="loadingWindow__text">Loading...</p>
                        </div>
                        <div className="inputForm form__container" onClick={this.handleClose}>
                            <form className="form" id="">
                                <div className="form__header">
                                    <h3 className="form__title">Vacation Request</h3>
                                    <div className="form__days-counter">
                                        <p className="form__days-text">8 Days</p>
                                    </div>
                                </div>
                                <div className="form__body">
                                    <div className="form__dates-subtitle">
                                        <h4>Dates</h4>
                                    </div>
                                    <div className="form__inputs-group">
                                        <div className="form__input-wrapper">
                                            <label>From</label>
                                            <input className="form__input-from form__input" type="date"/>
                                        </div>
                                        <div className="form__input-wrapper">
                                            <label>To</label>
                                            <input className="form__input-to form__input" type="date"/>
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
                                    <button className="form__cancel-btn form__btn" onClick={this.handleClose}>Cancel
                                    </button>
                                    <button className="form__send-btn form__btn" onClick={this.handleClose}>Send</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal.Content>
            </Modal>
        );
    }
}
