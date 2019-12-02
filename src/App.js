import React, { useState } from "react";
import "./App.css";
import { Home } from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const AppContext = React.createContext({
    loggedIn: false,
    setLoggedIn: null
});

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    return (
        <AppContext.Provider value={{ loggedIn, setLoggedIn }}>
          <div className="App">
              <Router>
                  <Switch>
                      <Route path="/r/:subreddit" exact>
                          <Home />
                      </Route>
                      <Route path="/" exact>
                          <Home />
                      </Route>
                  </Switch>
              </Router>
          </div>
        </AppContext.Provider>
    );
}

export { App, AppContext };
