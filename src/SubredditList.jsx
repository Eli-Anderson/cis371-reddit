import React, { useState, useEffect, useContext } from "react";
import {
    List,
    ListItem,
    Paper,
    Box,
    Typography,
    CircularProgress
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { Firestore } from "./db-init";
import { AppContext } from "./App";

export const SubredditList = props => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [subreddits, setSubreddits] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AppContext);

    useEffect(() => {
        setLoading(true);
        if (user) {
            Firestore.collection("users")
                .doc(user.username)
                .get()
                .then(snapshot => {
                    setSubscriptions(snapshot.data().subscriptions || []);
                    return snapshot.data().subscriptions || [];
                })
                .then(subs => {
                    Firestore.collection("subreddits")
                        .get()
                        .then(snapshot => {
                            setSubreddits(
                                snapshot.docs
                                    .map(d => d.id)
                                    .filter(s => !subs.includes(s))
                            );
                            setLoading(false);
                        });
                });
        } else {
            Firestore.collection("subreddits")
                .get()
                .then(snapshot => {
                    setSubreddits(snapshot.docs.map(d => d.id));
                    setLoading(false);
                });
        }
    }, [user]);

    if (user)
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
                                    Subscriptions
                                </Typography>
                            </Box>
                        </ListItem>
                        {loading ? (
                            <CircularProgress />
                        ) : (
                            subscriptions.map(x => (
                                <ListItem key={x}>
                                    <RouterLink to={`/r/${x}`}>{x}</RouterLink>
                                </ListItem>
                            ))
                        )}

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
                                    Other Subreddits
                                </Typography>
                            </Box>
                        </ListItem>
                        {loading ? (
                            <CircularProgress />
                        ) : (
                            subreddits.map(x => (
                                <ListItem key={x}>
                                    <RouterLink to={`/r/${x}`}>{x}</RouterLink>
                                </ListItem>
                            ))
                        )}
                    </List>
                </Box>
            </Paper>
        );

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
                            <ListItem key={x}>
                                <RouterLink to={`/r/${x}`}>{x}</RouterLink>
                            </ListItem>
                        ))
                    )}
                </List>
            </Box>
        </Paper>
    );
};
