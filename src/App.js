import React from "react";
import "./App.css";
import { Home } from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
    return (
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
    );
}

export default App;
