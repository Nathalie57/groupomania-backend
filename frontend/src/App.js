import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import HomePage from "./pages/homePage";
import SignupPage from "./pages/signupPage";
// import Navbar from "./components/navbar";
import authentication from "./services/authentication";

function App() {
  // const token = localStorage.getItem('authToken');
  const [isAuthenticated, setIsAuthenticated] = useState(authentication.isAuthenticated());

  return (
    <Router>
      <Switch>
        <Route
          path="/login"
          render={(props) => <LoginPage
            isAuthenticated={isAuthenticated}
            onLogin={setIsAuthenticated}
          />}
        />
        <Route exact path="/signup">
          {isAuthenticated ? <Redirect to="/" /> : <SignupPage />}
        </Route>
        <Route
          path="/"
          render={(props) => <HomePage
            isAuthenticated={isAuthenticated}
          />}
        />
      </Switch>
    </Router>
    // <Fragment>
    //   <HashRouter>
    //     <Navbar isAuthenticated={isAuthenticated} onLogout={setIsAuthenticated} />
    //     <Switch>
    //       <Route path="/beneficiaire" component={NewBeneficiaryPage} />
    //       <Route
    //         path="/login"
    //         render={(props) => <LoginPage
    //           isAuthenticated={isAuthenticated}
    //           onLogin={setIsAuthenticated}
    //         />}
    //       />
    //       <Route
    //         path="/"
    //         render={(props) => <HomePage
    //           isAuthenticated={isAuthenticated}
    //         />}
    //       />
    //     </Switch>
    //   </HashRouter>
    // </Fragment>
  );
}

export default App;