import React, { useEffect, useState } from "react";
import ImageUploader from "react-images-upload";
import Field from "../../components/inputField/inputField.jsx";
import Button from "../../components/button/commentButton.jsx";
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
    console.log("open");
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
        <Field
          name="image"
          type="file"
          label="Image"
          onChange={handleChange}
          value={comment.image}
        >
        </Field>
        <div className="create-comment-button">
          <Button value="Publier" type="submit" />
        </div>
      </form>
      <div className="create-comment-button">
        <Button value="Annuler" type="button" onClick={close} />
      </div>
    </div>
  );
}
