import React from "react";
import "./button.css";

const LoginButton = (props) => {

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

export default LoginButton;