import React from "react";
import { Feed } from "./Feed";
import { AppHeader } from "./AppHeader";
import { Box } from "@material-ui/core";
import { SubredditList } from "./SubredditList";

export const Home = props => {
    return (
        <Box display="flex" flexDirection="column">
            <Box width="100%" height="100px">
                <AppHeader />
            </Box>
            <Box width="100%" display="flex">
                <Box
                    minWidth="200px"
                    maxHeight="calc(100vh - 132px)"
                    padding="16px"
                    overflow="scroll"
                >
                    <SubredditList />
                </Box>
                <Box
                    flexGrow={1}
                    maxHeight="calc(100vh - 100px)"
                    overflow="scroll"
                >
                    <Feed />
                </Box>
            </Box>
        </Box>
    );
};
