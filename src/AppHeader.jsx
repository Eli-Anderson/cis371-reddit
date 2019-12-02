import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
    root: {
        backgroundColor: "gray",
        width: "100%",
        height: "100%"
    },
    spacer: {
        flexGrow: 1
    }
});

export const AppHeader = props => {
    const classes = useStyles(props);
    return (
        <Grid container direction="row" classes={{ root: classes.root }}>
            <Grid item>
                {/* Logo */}
                <div></div>
            </Grid>
            <Grid item classes={{ root: classes.spacer }}>
                <div></div>
            </Grid>
            <Grid item>
                <div></div>
            </Grid>
        </Grid>
    );
};
