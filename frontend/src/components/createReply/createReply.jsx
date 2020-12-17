import React, { useEffect, useState } from "react";
import ImageUploader from "react-images-upload";
import Field from "../../components/inputField/inputField.jsx";
import Button from "../../components/button/replyButton.jsx";
import CommentsAPI from "../../services/commentDatamanager";
import "../../components/button/button.css";
import "../../pages/loginPage/loginPage.css";
import "./createReply.css"

const CreateReply = ({ id }) => {
  const [comment, setComment] = useState({
    content: "",
    image: "",
    id_parent: id
  });

  const [images, setImages] = useState([]);

  const onDrop = (image) => {
    setImages([...images, image]);
  };

  const handleChange = ({ currentTarget }) => {
    const { value, name } = currentTarget;

    setComment({ ...comment, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await CommentsAPI.createReply(comment, id);
    } catch (error) {
      console.log(error.response.data);
    }
    document.location.reload();
  };

  return (
    <div className="create-reply">
      <form onSubmit={handleSubmit}>
        <Field
          name="content"
          type="text"
          label="Nouveau post"
          onChange={handleChange}
          value={comment.content}
          placeholder="Ajouter un commentaire"
        />
        {/* <ImageUploader
          {...props}
          withIcon={true}
          onChange={onDrop}
          imgExtension={[".jpg", ".gif", ".png", ".gif"]}
          maxFileSize={5242880}
          name="image"
          value={comment.image}
        /> */}
        <div className="create-reply-button">
          <Button value="Publier" type="submit" />
        </div>
      </form>
    </div>
  );
}

export default CreateReply;