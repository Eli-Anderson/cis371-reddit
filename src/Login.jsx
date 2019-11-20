import React, { useContext } from "react";
import { AppContext } from "./App";
import { Button } from "@material-ui/core";

export const Login = props => {
    const { loggedIn, setLoggedIn } = useContext(AppContext);

    return (
        <div>
            {!loggedIn && (
                <Button
                    onClick={() => {
                        setLoggedIn(true);
                    }}
                >
                    Login
                </Button>
            )}
        </div>
    );
};
