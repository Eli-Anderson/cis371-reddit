import React, { useState, useEffect, useContext, useRef } from "react";
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

    const userListener = useRef(null);
    const subredditListener = useRef(null);

    useEffect(() => {
        setLoading(true);
        if (user) {
            if (userListener.current) userListener.current();
            userListener.current = Firestore.collection("users")
                .doc(user.username)
                .onSnapshot(snapshot => {
                    setSubscriptions(snapshot.data().subscriptions || []);
                });
        }
    }, [user]);

    useEffect(() => {
        setLoading(true);
        if (subredditListener.current) subredditListener.current();
        subredditListener.current = Firestore.collection(
            "subreddits"
        ).onSnapshot(snapshot => {
            setSubreddits(
                snapshot.docs
                    .map(d => d.id)
                    .filter(id => !subscriptions.includes(id))
            );
            setLoading(false);
        });
    }, [subscriptions]);

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
