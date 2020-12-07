import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import HomePage from "./pages/homePage";
import SignupPage from "./pages/signupPage";
import Navbar from "./components/navbar/navbar";
import authentication from "./services/authentication";

function App() {
  // const token = localStorage.getItem('authToken');
  const [isAuthenticated, setIsAuthenticated] = useState(authentication.isAuthenticated());

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} onLogout={setIsAuthenticated} />
      <Switch>
        <Route
          path="/accueil"
          render={(props) => <HomePage
            isAuthenticated={isAuthenticated}
          />}
        />
        <Route exact path="/signup">
          {isAuthenticated ? <Redirect to="/accueil" /> : <SignupPage />}
        </Route>
        <Route
          path="/"
          render={(props) => <LoginPage
            isAuthenticated={isAuthenticated}
            onLogin={setIsAuthenticated}
          />}
        />
      </Switch>
    </Router>
  );
}

export default App;