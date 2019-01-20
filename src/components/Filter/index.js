import React, {Component} from 'react';
import Select from "../Select";

import './styles.scss'

export default class Filter extends Component {
    handleChange = (e) => {
        this.props.onChange({[this.props.name]: e.currentTarget.value})
    };

    render() {
        return (
            <form className="filter">
                <p className="filter__title">{this.props.title}</p>
                <Select
                    name={this.props.name}
                    value={this.props.value}
                    onChange={this.handleChange}
                    caption={this.props.caption}
                    options={this.props.options}
                />
            </form>
        );
    }
}