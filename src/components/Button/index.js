import React from 'react'

export const Button = (props) => {
    return (
        <button
            className={"button " + props.className}
            value={props.value}
            name={props.name}
        >
            {props.children}
        </button>
    )
};