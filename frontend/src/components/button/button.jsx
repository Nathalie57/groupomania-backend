import React from "react";
import styles from "./button.css";

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