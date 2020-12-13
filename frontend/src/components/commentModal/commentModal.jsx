import React, { useEffect, useState } from "react";
import ImageUploader from "react-images-upload";
import Field from "../../components/inputField/inputField.jsx";
import Button from "../../components/button/loginButton.jsx";
import CommentsAPI from "../../services/commentDatamanager";
import "../../components/button/button.css";
import "../../pages/loginPage/loginPage.css";

export default function Modal(props) {
  const [comment, setComment] = useState({
    content: "",
    image: "",
  });

  const [images, setImages] = useState([]);

  const onDrop = (image) => {
    setImages([...images, image]);
  };

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await CommentsAPI.create(comment);
      props.modalElement.current.style.display = "none";
    } catch (error) {
      console.log(error.response.data);
    }
    document.location.reload();
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <h1>Créer un post</h1>
        <Field
          name="content"
          type="text"
          label="Nouveau post"
          onChange={handleChange}
          value={comment.content}
        />
        <ImageUploader
          {...props}
          withIcon={true}
          onChange={onDrop}
          imgExtension={[".jpg", ".gif", ".png", ".gif"]}
          maxFileSize={5242880}
          name="image"
          value={comment.image}
        />
        <div className="login-button">
          <Button value="Publier" type="submit" className="login-button" />
        </div>
      </form>
      <div className="login-button">
        <Button
          value="Annuler"
          type="button"
          className="login-button"
          onClick={close}
        />
      </div>
    </div>
  );
}
