import moment from "moment";
import React, { useEffect, useState } from "react";
import "./replyHomePage.css";
import CommentsAPI from "../../services/commentDatamanager";

export default function ReplyHomePage(props) {
  
  const formatDate = (str) => moment(str).format("DD/MM/YYYY");

  const [comments, setComments] = useState([]);

  const getChildComments = async () => {
    try {
      CommentsAPI.findChildComments(props.id)
        .then((response) => response.data)
        .then((data) => setComments(data));
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getChildComments(props.id);
  }, [props.id]);

  String.prototype.ucFirst = function () {
    return this.substr(0, 1).toUpperCase() + this.substr(1);
  };

  return (
    <>
      <div>
        {comments.map((comment) => (
          <div className="reply-homepage" key={comment.id}>
            <div className="reply-username">{comment.username.ucFirst()}
            <span className="reply-date">{formatDate(comment.created_at)}</span></div>
            <div>{comment.content}</div>
            <div>
              <img src={comment.image} className="reply-image-homepage"></img>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

// export default ReplyHomePage;
