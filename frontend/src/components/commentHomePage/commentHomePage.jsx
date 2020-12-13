import moment from "moment";
import React, { useEffect, useState } from "react";
import "./commentHomePage.css";
import CommentsAPI from "../../services/commentDatamanager";

const CommentHomePage = (props) => {
  String.prototype.ucFirst = function () {
    return this.substr(0, 1).toUpperCase() + this.substr(1);
  };

  const formatDate = str => moment(str).format("DD/MM/YYYY");

  const [comments, setComments] = useState([]);

  const getComments = async () => {
    try {
      CommentsAPI.findMainComments()
        .then((response) => response.data)
        .then((data) => setComments(data));
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <>
      <div>
        {comments.map((comment) => (
          <div className="comment-homepage" key={comment.id}>
            <div className="username">{comment.username.ucFirst()}</div>
            <div className="date">{formatDate(comment.created_at)}</div>
            <div>{comment.content}</div>
            <div>
              <img src={comment.image} className="image-homepage"></img>
            </div>
            <div>
            <span className="likesCount">Nombre de likes</span>
            <span>Nombre de commentaires</span>
            </div>
            <div>

            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CommentHomePage;
