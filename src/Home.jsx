import React from "react";
import { Feed } from "./Feed";
import { AppHeader } from "./AppHeader";
import { Box } from "@material-ui/core";

export const Home = props => {
    return (
        <Box display="flex" flexDirection="column">
            <Box width="100%" height="100px">
                <AppHeader />
            </Box>
            <Box width="100%" overflow="scroll" maxHeight="calc(100vh - 100px)">
                <Feed />
            </Box>
        </Box>
    );
};
