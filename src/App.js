import React, { useState } from "react";
import "./App.css";
import { Home } from "./Home";

const AppContext = React.createContext({
    loggedIn: false,
    setLoggedIn: null
});

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    return (
        <AppContext.Provider value={{ loggedIn, setLoggedIn }}>
            <div className="App">
                <Home />
            </div>
        </AppContext.Provider>
    );
}

export { App, AppContext };
