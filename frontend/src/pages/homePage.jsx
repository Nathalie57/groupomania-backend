import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import CommentHomePage from "../components/commentHomePage/commentHomePage";

const HomePage = (props) => {
    const token = localStorage.getItem("authToken");
    const jwtData = jwtDecode(token);
    const username = jwtData.username;

    String.prototype.ucFirst = function () {
        return this.substr(0, 1).toUpperCase() + this.substr(1);
      };

  return (
    <div className="App">
      <header className="App-header">
          <>
            <h1>Bienvenue {username.ucFirst()}</h1>
            < CommentHomePage />
          </>
      </header>
    </div>
  );
};

export default HomePage;
