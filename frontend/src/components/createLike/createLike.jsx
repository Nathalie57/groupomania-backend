import React, { useEffect, useState } from "react";
import CommentsAPI from "../../services/commentDatamanager";
import "../button/button.css";

const CreateLike = ({ id }) => {
  const [like, setLike] = useState({
    id_comment: "",
    id_user: "",
    is_liked: 1,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await CommentsAPI.createLike(like, id);
    } catch (error) {
      console.log(error.response.data);
    }
    document.location.reload();
  };

  return (
    <>
      <button class="like-button" onClick={handleSubmit}><span className="like">
        J'aime
      </span></button>
    </>
  );
};

export default CreateLike;
