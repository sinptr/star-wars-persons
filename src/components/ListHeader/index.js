import React from 'react';
import ClassNames from 'classnames';

import './styles.scss'

const ListHeader = ({className, text, direction, isActive, onClick}) => {
    return (
        <div className={ClassNames("columnheader", className)} onClick={onClick}>
            {text && <span>{text}</span>}
            {isActive && <i className={"material-icons " + direction}>
                arrow_right_alt
            </i>}
        </div>
    )
};

export default ListHeader;