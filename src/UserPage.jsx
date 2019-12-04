import { AppHeader } from "./AppHeader";
import { AppContext } from "./App";
// import Firebase from './db-init';
import {
    Box,
    Container,
    ListItem,
    ListItemText,
    GridListTile,
    Typography,
    List
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { useRouteMatch } from "react-router-dom";
import { Firestore } from "./db-init";
import { Link as RouterLink } from "react-router-dom";

export const UserPage = props => {
    const [subscriptionNumber, setSubscriptionNumber] = useState(0);
    const [subscriptions, setSubscriptions] = useState([]);
    const [subredditsCreated, setsubredditsCreated] = useState([]);
    const [likes, setLikes] = useState(0);
    const { user } = useContext(AppContext);
    const match = useRouteMatch("/u/:username");

    const ableToView = match && user && user.username === match.params.username;
    const classes = useStyles();

    useEffect(() => {
        Firestore.collection("users")
            .doc(match.params.username)
            .get()
            .then(doc => {
                const data = doc.data();

                setSubscriptionNumber(data.subscriptions.length);
                setSubscriptions(doc.data().subscriptions);
                return doc.data().subscriptions || [];
            });

        Firestore.collection("users")
            .doc(match.params.username)
            .collection("votes")
            .get()
            .then(doc => {
                setLikes(doc.docs.length);
            });

        var list = [];
        const subredditCollection = Firestore.collection("subreddits");
        const subredditDocuments = subredditCollection
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    if (doc.data().userID == match.params.username) {
                        list.push(doc.data());
                    }
                });
                setsubredditsCreated(list);
                return subredditDocuments;
            })
            .catch(err => {
                console.log(err);
            });
    });

    return (
        <Grid>
            <AppHeader />
            <Grid container direction="row" style={{ marginTop: "50px" }}>
                <Container maxWidth="xs"style={{ textAlign: "left" }}>
                    {props.match.params.user !== null ? (
                        <h2 style={h2Style}>{props.match.params.user}</h2>
                    ) : (
                        <h2 style={h2Style}>Username</h2>
                    )}
                    {/* Private info */}
                    {ableToView ? (
                        <div>
                            <Typography variant="subtitle2">
                                Sign up date: {user.creationTime}
                                <br />
                            </Typography>
                            <Typography variant="subtitle2">
                                Email: {user.email}
                                <br />
                            </Typography>
                        </div>
                    ) : (
                        <div></div>
                    )}
                    {/* end private info */}
                    <Typography variant="subtitle2">
                        Number of subscriptions: {subscriptionNumber} <br />
                    </Typography>
                    <Typography variant="subtitle2">
                        Number of subreddits created: {subredditsCreated.length}{" "}
                        <br />
                    </Typography>
                    <Typography variant="subtitle2">
                        Number of likes and dislikes: {likes} <br />
                    </Typography>
                </Container>

                <Container style={userHistory} maxWidth="md">
                    <GridList cols={2}>
                        <GridListTile classes={{ root: classes.root }}>
                            <ListItem button classes={{ root: classes.button }}>
                                <ListItemText primary="Subs Created" />
                            </ListItem>
                            <List>
                                { subredditsCreated !== [] 
                                ? (
                                    subredditsCreated.map(y => (
                                        <ListItem key={y}>
                                            <ListItemText primary={y.name}/>
                                        </ListItem>
                                    ))
                                )
                                : (
                                    <ListItem>
                                        <ListItemText primary="Nothing here." />
                                    </ListItem>
                                )

                                }
                            </List>
                        </GridListTile>

                        <GridListTile classes={{ root: classes.root }}>
                            <ListItem button classes={{ root: classes.button }}>
                                <ListItemText primary="Subscriptions" />
                            </ListItem>
                            <List >
                                {subscriptions !== [] ? (
                                    subscriptions.map(x => (
                                        <ListItem key={x}>
                                            <RouterLink to={`/r/${x}`}>
                                                {x}
                                            </RouterLink>
                                        </ListItem>
                                    ))
                                ) : (
                                    <ListItem>
                                        <ListItemText primary="Nothing here." />
                                    </ListItem>
                                )}
                            </List>
                        </GridListTile>
                    </GridList>
                </Container>
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles({
    root: {
        padding: "0 !important"
    },

    button: {
        border: "1px solid #707070",
        borderWidth: "2px 1px 2px 1px",
        textAlign: "center"
    }
});

const userHistory = {
    border: "3px solid #707070",
    borderRadius: "4px",
    height: "80vh",
    marginLeft: "20px",
    padding: "0"
};

const h2Style = {
    color: "#5F787C",
    fontWeight: "bold",
    textAlign: "center"
};
