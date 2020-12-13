import React, { useEffect, useState } from "react";
import CommentsAPI from "../../services/commentDatamanager";

const getCountedLikes = ({ id }) => {
  const [likes, setLikes] = useState([]);

  const countLikesByComment = async () => {
    try {
      CommentsAPI.countLikes(14)
        .then((response) => response.data)
        .then((data) => setLikes(data));
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    countLikesByComment(id);
  }, [id]);

  console.log(countLikesByComment);

  return (
    <>
      <div>
        {likes.map((like) => (
          <div className="reply-homepage" key={like.id}>
            <div className="reply-username">
              {comment.username.ucFirst()}
              <span className="reply-date">
                {formatDate(comment.created_at)}
              </span>
            </div>
            <div>{comment.content}</div>
            <div>
              <img src={comment.image} className="reply-image-homepage"></img>
            </div>
            <div>
              <span className="likesCount">Nombre de likes</span>
              <span>Nombre de commentaires</span>
            </div>
            <div></div>
          </div>
        ))}
      </div>
    </>
  );
};

export default getCountedLikes;
