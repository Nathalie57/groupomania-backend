import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import authentication from "../services/authentication";

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
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Entrez votre identifiant</label>
              <input
                value={credentials.email}
                onChange={handleChange}
                type="email"
                name="email"
                id="email"
              />
            </div>
            <div>
              <label htmlFor="password">Entrez votre mot de passe</label>
              <input
                value={credentials.password}
                onChange={handleChange}
                type="password"
                name="password"
                id="password"
              />
            </div>
            <div>
              <button className="button" type="submit">
                Connexion
              </button>
            </div>
          </form>
        </header>
      </div>
    </>
  );
};

export default LoginPage;
