import React, { useContext } from "react";
import { AppContext } from "./App";
import { Button, Modal, makeStyles, Fade, Backdrop } from "@material-ui/core";
import { positions } from "@material-ui/system";

const useStyles = makeStyles(theme => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid grey",
        borderRadius: "2mm",
        padding: "1em",
        width: "50vw",
        boxShadow: theme.shadows[5],
        padding: "16px"
    },
    inputTable: {
        display: "grid",
        gridTemplateColumns: "repeat(2, auto)",
        borderRadius: "4px",
        gridGap: "2mm",
        fontSize: "16px",
        fontFamily: "Roboto, sans- serif"
    },
    buttonGroup: {
        width: "100 %",
        padding: "12px",
        marginRight: "auto",
        marginLeft: "auto",
        textAlign: "right",
        position: "relative"
    },
    login: {
        background: "green",
        color: "black",
        fontSize: "16px",
        alignItems: "center",
        borderRadius: "4px"
    },
    setup: {
        background: "red",
        color: "black",
        fontSize: "16px",
        alignItems: "center",
        borderRadius: "4px"
    }
}));

export const Login = props => {
    const classes = useStyles();
    const { loggedIn, setLoggedIn } = useContext(AppContext);

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={!loggedIn}
                onClose={setLoggedIn}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500
                }}
            >
                <Fade in={!loggedIn}>
                    <div className={classes.paper}>
                        <div className={classes.inputTable}>
                            <label for="userid">UserName</label>
                            <input id="userid" type="text"></input>
                            <label for="passwd">Password</label>
                            <input id="passwd" type="text"></input>
                        </div>
                        <div className={classes.buttonGroup}>
                            <Button
                                className={classes.login}
                                onClick={() => {
                                    setLoggedIn(true);
                                }}
                            >
                                Log in
                            </Button>

                            <Button
                                className={classes.setup}
                                onClick={() => {
                                    setLoggedIn(true);
                                }}
                            >
                                Sign up
                            </Button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
};
