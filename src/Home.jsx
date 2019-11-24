import React from "react";
import { Feed } from "./Feed";
import { AppHeader } from "./AppHeader";
import { useRouteMatch } from "react-router-dom";
import { PostCreator } from "./PostCreator";
import { Typography, Box } from "@material-ui/core";
export const Home = props => {
    const match = useRouteMatch("/r/:subreddit");
    return (
        <Box display="flex" flexDirection="column">
            <Box width="100%" height="100px">
                <AppHeader />
            </Box>
            <Box width="100%" flexGrow="1" overflow="auto">
                <Typography variant="h3">
                    {(match && match.params.subreddit) || "All"}
                </Typography>
                <PostCreator subreddit={match && match.params.subreddit} />
                <Feed subreddit={match && match.params.subreddit} />
            </Box>
        </Box>
    );
};
