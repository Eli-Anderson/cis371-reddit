import React, { useContext, useRef, useState } from "react";
import {
    Grid,
    DialogTitle,
    IconButton,
    Typography,
    Box,
    Tooltip
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import RedditIcon from "@material-ui/icons/Reddit";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { useHistory } from "react-router-dom";

<<<<<<< HEAD
const options = ["Login in", "Exit"];
=======
import AccountCircle from "@material-ui/icons/AccountCircle";
import { AppContext } from "./App";
import { Login } from "./Login";
import { PostCreator } from "./PostCreator";
import { AppAUTH } from "./db-init";
>>>>>>> c88441c0c1ed0bfeac4c58dec280f2511077530c

const useStyles = makeStyles({
    root: {
        backgroundColor: "rgb(212,234,224)",
        width: "100%",
        height: "60%"
    },
    spacer: {
        flexGrow: 1
    },
    container: {
        display: "grid",
        gridTemplateColumns: "repeat(2, auto)",
        gridGap: "0",
        cursor: "pointer"
    },
    container2: {
        margin: "4mm 2mm 2mm 2mm",
        display: "grid",
        gridTemplateColumns: "repeat(4, auto)",
        gridGap: "2mm"
    },
    logo: {
        margin: "1.5mm 1mm 0 5mm ",
        width: "2em",
        height: "2em",
        color: "white",
        background: "red",
        borderRadius: "100%"
    },
    buttons: {
        width: "1.5em",
        height: "1.5em"
    },
    selfButton: {
        marginTop: "-1mm",
        width: "2em",
        height: "2em",
        border: "3px solid black",
        borderRadius: "1mm"
    }
});

export const AppHeader = props => {
    const classes = useStyles(props);
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const [loginOpen, setLoginOpen] = useState(false);

    const history = useHistory();

    const { user } = useContext(AppContext);

    const handleAccountClick = () => {
        if (user) {
            setOpen(true);
        } else {
            setLoginOpen(true);
        }
    };
    const handleClose = event => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    return (
        <Grid container direction="row" classes={{ root: classes.root }}>
            <Login open={loginOpen} onClose={() => setLoginOpen(false)} />
            <Grid item>
                {/* Logo */}
                <div
                    className={classes.container}
                    onClick={() => {
                        history.push("/");
                    }}
                >
                    <RedditIcon className={classes.logo}></RedditIcon>
                    <DialogTitle>The Reddit Project</DialogTitle>
                </div>
            </Grid>
            <Grid item classes={{ root: classes.spacer }}>
                <div></div>
            </Grid>
            <Grid item>
                <div className={classes.container2}>
                    <PostCreator iconClass={classes.buttons} />
                    <Tooltip title={user ? "Account" : "Sign in"}>
                        <IconButton
                            size="small"
                            ref={anchorRef}
                            onClick={handleAccountClick}
                        >
                            <AccountCircle className={classes.buttons} />
                        </IconButton>
                    </Tooltip>
                    <Popper
                        open={open}
                        anchorEl={anchorRef.current}
                        transition
                        disablePortal
                        style={{ zIndex: 1 }}
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin:
                                        placement === "bottom"
                                            ? "center top"
                                            : "center bottom"
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener
                                        onClickAway={handleClose}
                                    >
                                        <MenuList>
                                            <Box
                                                margin="4px"
                                                borderBottom="1px solid rgba(0,0,0,0.1)"
                                            >
                                                <Typography
                                                    variant="body2"
                                                    color="textSecondary"
                                                >
                                                    Signed in as
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="textSecondary"
                                                >
                                                    {user ? user.username : ""}
                                                </Typography>
                                            </Box>
                                            <MenuItem
                                                onClick={() => {
                                                    history.push(
                                                        `/u/${user.username}`
                                                    );
                                                }}
                                            >
                                                Profile
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() => {
                                                    AppAUTH.signOut().then(
                                                        () => {
                                                            setOpen(false);
                                                        }
                                                    );
                                                }}
                                            >
                                                Logout
                                            </MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </div>
            </Grid>
        </Grid>
    );
};
