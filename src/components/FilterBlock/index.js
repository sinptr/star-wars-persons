import React from 'react';

const FilterBlock = ({title, children}) => {
    return (
        <div className="filters">
            <h2 className="filters__title">{title}</h2>
            <div className="filter__items">
                {children}
            </div>
        </div>
    )
};

export default FilterBlock;