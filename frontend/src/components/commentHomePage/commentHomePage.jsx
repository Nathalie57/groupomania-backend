import moment from "moment";
import React, { useEffect, useState, useRef } from "react";
import "./commentHomePage.css";
import "../replyHomePage/replyHomePage.css";
import CommentsAPI from "../../services/commentDatamanager";
import ReplyHomePage from "../replyHomePage/replyHomePage";
import GetCountedLikes from "../countLikes/countLikes";
import CreateReply from "../createReply/createReply";

const CommentHomePage = (props) => {
  
  const formatDate = (str) => moment(str).format("DD/MM/YYYY");

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

  String.prototype.ucFirst = function () {
    return this.substr(0, 1).toUpperCase() + this.substr(1);
  };

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
                <span>
                  <button type="button"className="replies-button"> 
                    Commentaires
                  </button>
                </span>
              </div>
            </div>
            <div>
              <span className="like">J'aime</span>
              <span className="share">Partager</span>
              <span className="comment">Commenter</span>
            </div>
            <div className="createReply">
              <CreateReply id/>
            </div>
            <div id="replies">
              <ReplyHomePage
                id={comment.id}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CommentHomePage;
