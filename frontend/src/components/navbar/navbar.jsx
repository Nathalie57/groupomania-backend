import React from "react";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import authentication from "../../services/authentication";
import "./navbar.css";


const Navbar = ({ isAuthenticated, onLogout }) => {
  const history = useHistory();
  const handleLogout = () => {
    authentication.logout();
    onLogout(false);
    history.push("/");
    <Redirect to="/" refresh="true" />;
  };

  return (
    <ul className="navigation">
      {(!isAuthenticated && (
        <>
          <li><img src="logo.png" className="logo"></img></li>
          <li>
            <NavLink to="/signup" className="login-button">
              Inscription
            </NavLink>
          </li>
        </>
      )) || (
        <>
          <li><img src="logo.png" className="logo"></img></li>
          <li>
            <button onClick={handleLogout} className="login-button">
              Deconnexion
            </button>
          </li>
        </>
      )}
    </ul>
  );
};

export default Navbar;
