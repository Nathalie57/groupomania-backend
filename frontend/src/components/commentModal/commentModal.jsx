import React, { useEffect, useState } from "react";
import Field from "../../components/inputField/inputField.jsx";
import Button from "../../components/button/loginButton.jsx";
import "../../components/button/button.css";
import "../../pages/loginPage/loginPage.css";
import commentDatamanager from "../../services/commentDatamanager.jsx";

export default function Modal(props) {
  const [comment, setComment] = useState({
    content: "",
    image: "",
  });

  const handleChange = ({ currentTarget }) => {
    const { value, name } = currentTarget;

    setComment({ ...comment, [name]: value });
  };

  function close() {
    props.modalElement.current.style.display = "none";
  }

  function open() {
    props.modalElement.current.style.display = "block";
  }

  useEffect(() => {
    props.buttonOpen.current.onclick = open;
  });

  return (
    <div>
      <form className="login-form" onSubmit={(e) => props.addComment(e)}>
        <h1>Créer un post</h1>
        <Field
          name="comment"
          type="comment"
          label="Nouveau post"
          onChange={handleChange}
          value={comment.content}
        />
        <div className="login-button">
          <span>
            <Button value="Publier" type="submit" className="login-button" />
          </span>
          <span>
            <Button
              value="Annuler"
              type="button"
              className="login-button"
              onClick={close}
            />
          </span>
        </div>
      </form>
    </div>
  );
}
