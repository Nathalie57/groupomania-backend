import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import authentication from "../../services/authentication";
import Button from "../../components/button/button.jsx";
import "./loginPage.css";

const LoginPage = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = ({ currentTarget }) => {
    const { value, name } = currentTarget;

    setCredentials({ ...credentials, [name]: value });
  };

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await authentication.authenticate(credentials);
      onLogin(true);
      history.push("/accueil");
    } catch (error) {
      console.log(error.response);
    }
    return <Redirect to="/accueil" refresh="true" />;
  };

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h2>Connexion à l'espace sécurisé</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <ul>
              <li>
                <label htmlFor="email">Identifiant</label>
                <input
                  value={credentials.email}
                  onChange={handleChange}
                  type="email"
                  name="email"
                  id="email"
                />
                <span>Entrez votre adresse email ici</span>
              </li>
              <li>
                <label htmlFor="password">Mot de passe</label>
                <input
                  value={credentials.password}
                  onChange={handleChange}
                  type="password"
                  name="password"
                  id="password"
                />
                <span>Entrez votre mot de passe ici</span>
              </li>
            </ul>
            <div>
              <Button value="Connexion" type="submit" />
            </div>
          </form>
        </header>
      </div>
    </>
  );
};

export default LoginPage;
