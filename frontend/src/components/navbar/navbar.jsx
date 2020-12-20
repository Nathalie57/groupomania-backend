import React from "react";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import Button from "../button/loginButton.jsx";
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
          <li>
            <NavLink to="/">
              <img src="logo.png" className="logo" alt="logo"></img>
            </NavLink>
          </li>
        </>
      )) || (
        <>
          <li>
            <NavLink to="/">
              <img src="logo.png" className="logo" alt="logo"></img>
            </NavLink>
          </li>
          <li>
            <Button onClick={handleLogout} value="Déconnexion" />
          </li>
        </>
      )}
    </ul>
  );
};

export default Navbar;
