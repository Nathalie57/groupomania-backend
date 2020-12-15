import React from "react";
import "./button.css";

const CommentButton = (props) => {

    return (
        <button
            id={props.id}
            className="reply-button"
            onClick={props.onClick}
            to={props.to}
        >
        {props.value}
        </button>
    );
};

export default CommentButton;