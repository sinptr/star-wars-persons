import React from 'react'
import ClassNames from 'classnames';
import Button from "../Button";
import './styles.scss'

const MaterialButton = (props) => {
    const {icon, className, ...other} = props;
    return (
        <Button className={ClassNames("material-button", className)} {...other}>
            <i className="material-icons">
                {icon}
            </i>
        </Button>
    )
};

export default MaterialButton;