import React from "react";
import { Grid, DialogTitle } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MessageIcon from "@material-ui/icons/Message";
import PostAddIcon from "@material-ui/icons/PostAdd";
import RedditIcon from "@material-ui/icons/Reddit";

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
        gridTemplateColumns: "repeat(2, auto)",
        gridGap: "2mm"
    },
    logo: {
        margin: "1mm 1mm 0 5mm ",
        width: "2em",
        height: "2em"
    },
    buttons: {
        width: "1.25em",
        height: "1.25em"
    }
});

export const AppHeader = props => {
    const classes = useStyles(props);
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
                </div>
            </Grid>
        </Grid>
    );
};
