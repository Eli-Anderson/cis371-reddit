import React, { useContext } from "react";
import { AppContext } from "./App";
import { Button, Modal } from "@material-ui/core";

export const Login = props => {
    const { loggedIn, setLoggedIn } = useContext(AppContext);

    return (
        <div>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={!loggedIn}
            >
                <div>
                    <Button
                        onClick={() => {
                            setLoggedIn(true);
                        }}
                    >
                        Login
                    </Button>
                </div>
            </Modal>
        </div>
    );
};
