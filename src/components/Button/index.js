import React from 'react'
import ClassNames from 'classnames';
import './styles.scss'

const Button = (props) => {
    const {className, ...other} = props;
    return (
        <button className={ClassNames("button", className)} {...other} >
            {props.children}
        </button>
    )
};

export default Button;