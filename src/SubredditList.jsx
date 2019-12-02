import React, { useState, useEffect } from "react";
import {
    Link,
    List,
    ListItem,
    Paper,
    Box,
    Typography,
    CircularProgress
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { Firestore } from "./db-init";

export const SubredditList = props => {
    const [subreddits, setSubreddits] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        Firestore.collection("subreddits")
            .get()
            .then(snapshot => {
                setSubreddits(
                    snapshot.docs.map(d => ({ url: d.id, ...d.data() }))
                );
                setLoading(false);
            });
    }, []);

    return (
        <Paper elevation={4}>
            <Box>
                <List dense>
                    <ListItem>
                        <Box
                            display="flex"
                            width="100%"
                            justifyContent="center"
                        >
                            <Typography
                                color="textSecondary"
                                variant="subtitle2"
                            >
                                Subreddits
                            </Typography>
                        </Box>
                    </ListItem>
                    {loading ? (
                        <CircularProgress />
                    ) : (
                        subreddits.map(x => (
                            <ListItem key={x.url}>
                                <Link>
                                    <RouterLink to={`/r/${x.url}`}>
                                        {x.name}
                                    </RouterLink>
                                </Link>
                            </ListItem>
                        ))
                    )}
                </List>
            </Box>
        </Paper>
    );
};
