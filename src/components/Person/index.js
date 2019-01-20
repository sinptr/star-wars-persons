import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {genders} from "../../config/config";
import Select from "../Select";

export default class Person extends Component{
    state = {
        edit: false,
        name: this.props.name,
        height: this.props.height,
        gender: this.props.gender
    };

    handleEdit = () => {
        this.setState({
            edit: true
        })
    };

    handleChange = e => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
    };
    
    handleHeightChange = e => {
        let value = e.currentTarget.value;
        if (/^\d*$/.test(value)) {
            this.setState({
                height: value
            })
        }
    };

    validate = () => {
        const {name, height} = this.state;
        return !!(name.trim() && height);
    };

    handleSave = () => {
        this.setState({
            edit: false
        });
        this.props.onSave({
            id: this.props.id,
            name: this.state.name,
            height: this.state.height,
            gender: this.state.gender
        })
    };

    renderTemplate = () => {
        let personTemplate;
        if (this.state.edit) {
            personTemplate =
                <Fragment>
                    <input
                        type="text"
                        name="name"
                        placeholder="Имя"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        name="height"
                        placeholder="Рост"
                        value={this.state.height}
                        onChange={this.handleHeightChange}
                    />
                    <Select name="gender" value={this.state.gender} onChange={this.handleChange} options={genders}/>
                    <div className="buttons">
                        <button className="material-button" onClick={this.handleSave} disabled={!this.validate()}>
                            <i className="material-icons">
                                save
                            </i>
                        </button>
                    </div>
                </Fragment>
        } else {
            personTemplate =
                <Fragment>
                    <span>{this.props.name}</span>
                    <span>{this.props.height}</span>
                    <span>{genders[this.props.gender]}</span>
                    <div className="buttons">
                        <button className="material-button" onClick={this.handleEdit}>
                            <i className="material-icons">
                                edit
                            </i>
                        </button>
                        <button className="material-button" onClick={() => this.props.onDelete(this.props.id)}>
                            <i className="material-icons">
                                delete
                            </i>
                        </button>
                    </div>
                </Fragment>
        }
        return personTemplate;
    };

    render() {
        return (
            this.renderTemplate()
        );
    }
}