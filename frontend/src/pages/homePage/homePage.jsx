import React, { useState, useRef } from "react";
import jwtDecode from "jwt-decode";
import CommentHomePage from "../../components/commentHomePage/commentHomePage";
import Field from "../../components/inputField/inputField.jsx";
import Button from "../../components/button/loginButton.jsx";
import Modal from "../../components/commentModal/commentModal.jsx";
import CommentButton from "../../components/button/commentButton.jsx";
import "./homePage.css";
import "../../components/commentModal/commentModal.css";

// import ucFirst from "../../services/displayNames";

const HomePage = (props) => {
  const token = localStorage.getItem("authToken");
  const jwtData = jwtDecode(token);
  const username = jwtData.username;

  // const buttonOpen = useRef(null);
  // const modalElement = useRef(null);

  const [comment, setComment] = useState({
    content: "",
    image: "",
  });

  const handleChange = ({ currentTarget }) => {
    const { value, name } = currentTarget;

    setComment({ ...comment, [name]: value });
  };

  String.prototype.ucFirst = function () {
    return this.substr(0, 1).toUpperCase() + this.substr(1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // try {
    //   await authentication.authenticate(credentials);
    //   onLogin(true);
    //   history.push("/accueil");
    // } catch (error) {
    //   console.log(error.response);
    // }
    // return <Redirect to="/accueil" refresh="true" />;
  };

  // function addComment(e) {
  //   e.preventDefault();
  //   modalElement.current.style.display = "none";
  // }

  return (
    <div className="App">
      <header className="App-header">
        <>
          {/* <h1>Bienvenue {username.ucFirst()}</h1> */}
          <div className="comment-homepage">
            {/* <button type="button" ref={buttonOpen} className="comment-creation">
              {username.ucFirst()}, exprimez-vous !
              </button>
            </div>
            <div id="commentModal" ref={modalElement}>
              <Modal
                addComment={addComment}
                buttonOpen={buttonOpen}
                modalElement={modalElement}
              /> */}
            <form onSubmit={handleSubmit} className="login-form">
              <Field
                name="comment"
                type="text"
                label={username.ucFirst() + ", exprimez-vous !"}
                onChange={handleChange}
                value={comment.id}
              />
              <div>
              <Button value="Publier" type="submit" className="login-button" />
            </div>
            </form>
          </div>

          <CommentHomePage />
        </>
      </header>
    </div>
  );
};

export default HomePage;
