import React from 'react';
import {genders} from "../../config/config";

const Select = ({className, name, value, options, onChange, caption}) => {
    return (
        <select className={className} name={name} value={value} onChange={onChange}>
            <option value="" hidden disabled>{caption}</option>
            {Object.keys(options).map((key) => (<option key={key} value={key}>{options[key]}</option>))}
        </select>
    )
};

export default Select;