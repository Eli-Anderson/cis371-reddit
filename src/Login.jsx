import React, { useState, useCallback } from "react";
import {
    Button,
    Modal,
    makeStyles,
    Fade,
    Backdrop,
    TextField
} from "@material-ui/core";
import { AppAUTH, Firestore } from "./db-init";

const useStyles = makeStyles(theme => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: "2mm",
        padding: "1em",
        width: "50vw",
        boxShadow: theme.shadows[5],
        outline: "none"
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
        color: "rgb(90, 241, 173)",
        fontSize: "16px",
        alignItems: "center"
    },
    signup: {
        color: "rgb(120, 173, 149)",
        fontSize: "16px",
        alignItems: "center"
    }
}));

export const Login = ({ open, onClose, ...props }) => {
    const classes = useStyles(props);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const login = useCallback(() => {
        AppAUTH.signInWithEmailAndPassword(email, password)
            .then(() => AppAUTH.setPersistence("local"))
            .then(() => {
                onClose();
            })
            .catch(reason => window.alert(reason));
    }, [email, password, onClose]);

    const signUp = useCallback(() => {
        Firestore.collection("users")
            .doc(name)
            .get()
            .then(snapshot => {
                if (snapshot.exists) window.alert("Username is already in use");
                else {
                    AppAUTH.createUserWithEmailAndPassword(email, password)
                        .then(u => {
                            AppAUTH.currentUser
                                .updateProfile({
                                    displayName: name
                                })
                                .then(() => {
                                    Firestore.collection("users")
                                        .doc(name)
                                        .set({
                                            subscriptions: []
                                        })
                                        .then(() => {
                                            onClose();
                                        });
                                });
                        })
                        .catch(reason => window.alert(reason));
                }
            });
    }, [email, password, onClose, name]);

    return (
        <div>
            <Modal
                className={classes.modal}
                open={open}
                onClose={onClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <form>
                            <div className={classes.inputTable}>
                                <TextField
                                    label="Email"
                                    type="email"
                                    value={email}
                                    onChange={ev => setEmail(ev.target.value)}
                                />
                                <TextField
                                    label="Password"
                                    type="password"
                                    value={password}
                                    onChange={ev =>
                                        setPassword(ev.target.value)
                                    }
                                />
                                <TextField
                                    label="Username"
                                    value={name}
                                    onChange={ev => setName(ev.target.value)}
                                />
                            </div>
                            <div className={classes.buttonGroup}>
                                <Button
                                    className={classes.login}
                                    variant={name ? undefined : "outlined"}
                                    disabled={!email || !password}
                                    onClick={ev => {
                                        ev.preventDefault();
                                        login();
                                    }}
                                    type="submit"
                                >
                                    Log in
                                </Button>

                                <Button
                                    className={classes.signup}
                                    variant={name ? "outlined" : undefined}
                                    disabled={!email || !password || !name}
                                    onClick={() => {
                                        signUp();
                                    }}
                                >
                                    Sign up
                                </Button>
                            </div>
                        </form>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
};
