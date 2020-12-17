import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import authentication from "../../services/authentication";
import Button from "../../components/button/loginButton.jsx";
import Field from "../../components/inputField/inputField.jsx";
import "./loginPage.css";
import "../../components/button/button.css"

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
              <Field
                name="email"
                type="email"
                label="Identifiant"
                onChange={handleChange}
                value={credentials.email}
                span="Entrez votre adresse email ici"
              />
              <Field
                name="password"
                type="password"
                label="Mot de passe"
                onChange={handleChange}
                value={credentials.password}
                span="Entrez votre mot de passe ici"
              />
            </ul>
            <div>
              <Button value="Connexion" type="submit" className="login-button" />
            </div>
          </form>
          <div className="login-form">
          <p>Pas encore de compte, inscrivez-vous <Link to="/signup">
            ici
          </Link>!</p>
          </div>
        </header>
      </div>
    </>
  );
};

export default LoginPage;
