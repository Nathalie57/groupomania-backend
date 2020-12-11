import React from "react";

const Button = (props) => {

    return (
        <button
            id={props.id}
            className="login-button"
            onClick={props.onClick}
            to={props.to}
        >
        {props.value}
        </button>
    );
};

export default Button;