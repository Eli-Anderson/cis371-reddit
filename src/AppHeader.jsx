import React from "react";
import { Grid, DialogTitle } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import MessageIcon from "@material-ui/icons/Message";
import PostAddIcon from "@material-ui/icons/PostAdd";
import RedditIcon from "@material-ui/icons/Reddit";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

const options = ["Login in", "Exit"];

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
        gridGap: "0"
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
        width: "1.25em",
        height: "1.25em"
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
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const handleClick = () => {
        console.info(`You clicked ${options[selectedIndex]}`);
    };
    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(prevOpen => !prevOpen);
    };
    const handleClose = event => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };
    const theme = createMuiTheme({
        palette: {
            primary: green
        }
    });

    return (
        <Grid container direction="row" classes={{ root: classes.root }}>
            <Grid item>
                {/* Logo */}
                <div className={classes.container}>
                    <RedditIcon className={classes.logo}></RedditIcon>
                    <DialogTitle>Reddit Project</DialogTitle>
                </div>
            </Grid>
            <Grid item classes={{ root: classes.spacer }}>
                <div></div>
            </Grid>
            <Grid item>
                <div className={classes.container2}>
                    <MessageIcon className={classes.buttons}> </MessageIcon>
                    <PostAddIcon className={classes.buttons}></PostAddIcon>
                    <span className={classes.selfButton}></span>
                    <ButtonGroup
                        theme={theme}
                        variant="contained"
                        color="primary"
                        ref={anchorRef}
                        aria-label="split button"
                    >
                        <Button
                            color="primary"
                            size="small"
                            aria-controls={
                                open ? "split-button-menu" : undefined
                            }
                            aria-expanded={open ? "true" : undefined}
                            aria-label="select merge strategy"
                            aria-haspopup="menu"
                            onClick={handleToggle}
                        >
                            <ArrowDropDownIcon />
                        </Button>
                    </ButtonGroup>
                    <Popper
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        transition
                        disablePortal
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
                                        <MenuList id="split-button-menu">
                                            {options.map((option, index) => (
                                                <MenuItem
                                                    key={option}
                                                    disabled={index === 2}
                                                    selected={
                                                        index === selectedIndex
                                                    }
                                                    onClick={event =>
                                                        handleMenuItemClick(
                                                            event,
                                                            index
                                                        )
                                                    }
                                                >
                                                    {option}
                                                </MenuItem>
                                            ))}
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
