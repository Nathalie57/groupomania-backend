import React, { useState } from "react";
import jwtDecode from "jwt-decode";
import CommentHomePage from "../../components/commentHomePage/commentHomePage";
import Field from "../../components/inputField/inputField.jsx";
import "./homePage.css";
// import ucFirst from "../../services/displayNames";

const HomePage = (props) => {
  const token = localStorage.getItem("authToken");
  const jwtData = jwtDecode(token);
  const username = jwtData.username;

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

  return (
    <div className="App">
      <header className="App-header">
        <>
          {/* <h1>Bienvenue {username.ucFirst()}</h1> */}
          <form className="comment-form">
            <Field
              name="comment"
              type="text"
              label={username.ucFirst() + ", exprimez-vous !"} 
              onChange={handleChange}
              value={comment.id}
            />
          </form>
          <CommentHomePage />
        </>
      </header>
    </div>
  );
};

export default HomePage;
