import React, { useEffect, useState } from "react";
import axios from "axios";
import "./commentHomePage.css";
// import jwtDecode from "jwt-decode";

const backendUrl = "http://localhost:3000";
const commentsEndpoint = `${backendUrl}/api/comments?format=json`;

const CommentHomePage = (props) => {
  const token = localStorage.getItem("authToken");
//   const jwtData = jwtDecode(token);
//   const username = jwtData.username;

  String.prototype.ucFirst = function () {
    return this.substr(0, 1).toUpperCase() + this.substr(1);
  };

  const [comments, setComments] = useState([]);

  const getComments = async () => {
    try {
      await axios
        .get(commentsEndpoint, {
          headers: { Authorization: `Bearer ${token}` },
        })
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
      <div className="">
        {comments.map((comment) => (
          <div className="comment-homepage" key={comment.id}>
            <div className="username">{comment.username.ucFirst()}</div>
            <div className="date">{comment.created_at}</div>
            <div>{comment.content}</div>
            <div>
              <img src={comment.image} className="image-homepage"></img>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CommentHomePage;
