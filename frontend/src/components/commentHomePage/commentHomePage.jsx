import moment from "moment";
import React, { useEffect, useState } from "react";
import "./commentHomePage.css";
import CommentsAPI from "../../services/commentDatamanager";
import ReplyHomePage from "../replyHomePage/replyHomePage";
import GetCountedLikes from "../countLikes/countLikes";

const CommentHomePage = (props) => {
  String.prototype.ucFirst = function () {
    return this.substr(0, 1).toUpperCase() + this.substr(1);
  };

  const formatDate = (str) => moment(str).format("DD/MM/YYYY");

  const [comments, setComments] = useState([]);

  // const [replies, setReplies] = useState([]);

  const getComments = async () => {
    try {
      CommentsAPI.findMainComments()
        .then((response) => response.data)
        .then((data) => setComments(data));
    } catch (error) {
      console.log(error.response);
    }
  };

  const idParent = comments.id;
  // console.log(idParent);

  //   const getReplies = async () => {
  //   try {
  //       CommentsAPI.findChildComments(idParent)
  //       .then((response) => response.data)
  //       .then((data) => setComments(data));
  //   } catch (error) {
  //     console.log(error.response);
  //   }
  // };

  // useEffect(() => {
  //   getReplies(idParent);
  // }, [idParent]);

  useEffect(() => {
    getComments();
  }, []);
  // console.log(replies);

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
            <div className="counted-likes">
              <div className="under-image">
              <span>
                <GetCountedLikes id={comment.id} />
              </span>
              <span>Nombre de commentaires</span>
              </div>
            </div>
            <div>
              <span className="like">J'aime</span>
              <span className="share">Partager</span>
              <span className="comment">Commenter</span>
            </div>
            <ReplyHomePage id={comment.id} />
          </div>
        ))}
      </div>
    </>
  );
};

export default CommentHomePage;
