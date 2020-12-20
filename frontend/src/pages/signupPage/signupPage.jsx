import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import Field from "../../components/inputField/inputField.jsx";
import Button from "../../components/button/commentButton.jsx";
import UsersAPI from "../../services/userDatamanager";
import "../../components/button/button.css"

const SignupPage = (props) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    is_admin: 0,
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const history = useHistory();

  // Gestion des changements des inputs dans le formulaire
  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setUser({ ...user, [name]: value });
  };

  // Gestion de la soumission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const apiErrors = {};

    if (user.password !== user.passwordConfirm) {
      apiErrors.passwordConfirm =
        "Votre confirmation de mot de passe n'est pas conforme avec le mot de passe original";
      setErrors(apiErrors);
      //   toast.error("Des erreurs dans votre formulaire !");
      return;
    }

    try {
      await UsersAPI.register(user);
      history.push("/");
      // TODO : Flash success
      //   toast.success(
      //     "Vous êtes désormais inscrit, vous pouvez vous connecter !"
      //   );
    } catch (error) {
        console.log(error.response);
    }
    return <Redirect to="/" refresh="true" />;
  };

  return (
    <>
    <div className="App">
    <header className="App-header">
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <Field
          name="username"
          label="Pseudo"
          error={errors.firstName}
          value={user.firstName}
          onChange={handleChange}
          span="Entrez votre pseudo ici"
        />
        <Field
          name="email"
          label="Email"
          type="email"
          error={errors.email}
          value={user.email}
          onChange={handleChange}
          span="Entrez votre adresse email ici"
        />
        <Field
          name="password"
          label="Mot de passe"
          type="password"
          error={errors.password}
          value={user.password}
          onChange={handleChange}
          span="Entrez votre mot de passe ici"
        />
        <Field
          name="passwordConfirm"
          label="Confirmation du mot de passe"
          type="password"
          error={errors.passwordConfirm}
          value={user.passwordConfirm}
          onChange={handleChange}
          span="Confirmez votre mot de passe ici"
        />

        <div className="form-group">
        <Button value="S'inscrire" type="submit" className="login-button" />
          <Link to="/login" className="btn btn-link">
            J'ai déjà un compte
          </Link>
        </div>
      </form>
      </header>
      </div>
    </>
  );
};

export default SignupPage;
