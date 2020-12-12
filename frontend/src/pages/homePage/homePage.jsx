import React, { useState, useRef } from "react";
import jwtDecode from "jwt-decode";
import CommentHomePage from "../../components/commentHomePage/commentHomePage";
import Modal from "../../components/commentModal/commentModal.jsx";
import "./homePage.css";
import "../../components/commentModal/commentModal.css";

// import ucFirst from "../../services/displayNames";

const HomePage = (props) => {
  const token = localStorage.getItem("authToken");
  const jwtData = jwtDecode(token);
  const username = jwtData.username;

  
  const buttonOpen = useRef(null);
  const modalElement = useRef(null);
  
  const [comment, setComment] = useState({
    content: "",
    image: "",
  });
  
  String.prototype.ucFirst = function () {
    return this.substr(0, 1).toUpperCase() + this.substr(1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <>
          <div className="comment-homepage">
            <button type="button" ref={buttonOpen} className="comment-creation">
              {username.ucFirst()}, exprimez-vous !
              </button>
            </div>
            <div id="commentModal" ref={modalElement}>
              <Modal
                buttonOpen={buttonOpen}
                modalElement={modalElement}
              />
          </div>

          <CommentHomePage />
        </>
      </header>
    </div>
  );
};

export default HomePage;
