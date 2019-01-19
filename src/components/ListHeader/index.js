import React from 'react';

const ListHeader = ({text, direction, isActive, onClick}) => {
    return (
        <div className="columnheader" onClick={onClick}>
            {text && <span>{text}</span>}
            {isActive && <i className={"material-icons " + direction}>
                arrow_right_alt
            </i>}
        </div>
    )
};

export default ListHeader;