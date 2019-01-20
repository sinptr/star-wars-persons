import React from 'react';
import ClassNames from 'classnames'
import './styles.scss'

const Select = ({className, name, value, options, onChange, caption}) => {
    return (
        <select className={ClassNames("select", className)} name={name} value={value} onChange={onChange}>
            <option value="" hidden disabled>{caption}</option>
            {Object.keys(options).map((key) => (<option key={key} value={key}>{options[key]}</option>))}
        </select>
    )
};

export default Select;