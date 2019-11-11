import React from "react";
import { IconButton, Link, Grid } from "@material-ui/core";
import ThumbUp from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbDown from "@material-ui/icons/ThumbDownAltOutlined";

export const PostIneractions = props => {
    return (
        // <Paper>
        <Grid container direction="column" alignContent="flex-start">
            <Grid item>
                <IconButton size="small">
                    <ThumbUp fontSize="small" />
                </IconButton>
            </Grid>
            <Grid>
                <IconButton size="small">
                    <ThumbDown fontSize="small" />
                </IconButton>
            </Grid>
        </Grid>
        // </Paper>
    );
};
