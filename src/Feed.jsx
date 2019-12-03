import React, {
    useState,
    useEffect,
    useRef,
    useCallback,
    useContext
} from "react";
import { Post } from "./Post";
import {
    GridList,
    GridListTile,
    Typography,
    Box,
    CircularProgress,
    Button,
    Tooltip,
    IconButton
} from "@material-ui/core";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import { makeStyles } from "@material-ui/styles";
import { Firestore } from "./db-init";
import { SubredditCreator } from "./SubredditCreator";
import { PostCreator } from "./PostCreator";
import { useRouteMatch } from "react-router-dom";
import { AppContext } from "./App";

const useStyles = makeStyles({
    gridListRoot: { margin: "0 !important", height: "100%" },
    newPostIcon: { width: "2em", height: "2em" }
});

export const Feed = props => {
    const classes = useStyles(props);
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("Home");
    const [subscribed, setSubscribed] = useState(false);
    const listener = useRef(null);

    const { user } = useContext(AppContext);

    const match = useRouteMatch("/r/:subreddit");

    const subreddit = match && match.params.subreddit;

    const loadPosts = useCallback(
        posts => {
            if (subreddit) {
                setLoading(true);
                Firestore.collection("subreddits")
                    .doc(subreddit)
                    .get()
                    .then(snapshot => {
                        if (snapshot.exists) {
                            setName(snapshot.data().name);
                            if (listener.current) {
                                listener.current();
                            }
                            listener.current = Firestore.collection(
                                "subreddits"
                            )
                                .doc(subreddit)
                                .collection("posts")
                                .orderBy("time", "desc")
                                .limit(4 + ((posts && posts.length) || 0))
                                .onSnapshot(snapshot => {
                                    setLoading(false);
                                    if (!snapshot.empty) {
                                        setPosts(
                                            snapshot.docs.map(x => ({
                                                postID: x.id,
                                                subreddit: x.data().subreddit
                                            }))
                                        );
                                    } else {
                                        setPosts([]);
                                    }
                                });
                        } else {
                            setLoading(false);
                            setPosts(null);
                            setName("Home");
                        }
                    });
            } else {
                setName("Home");
                setLoading(true);
                if (user) {
                    Firestore.collection("users")
                        .doc(user.username)
                        .get()
                        .then(snapshot => {
                            const { subscriptions } = snapshot.data();

                            if (subscriptions && subscriptions.length) {
                                Firestore.collectionGroup("posts")
                                    .where("subreddit", "in", subscriptions)
                                    .orderBy("time", "desc")
                                    .limit(4 + ((posts && posts.length) || 0))
                                    .onSnapshot(snapshot => {
                                        setLoading(false);
                                        if (!snapshot.empty) {
                                            setPosts(
                                                snapshot.docs.map(x => ({
                                                    postID: x.id,
                                                    subreddit: x.data()
                                                        .subreddit
                                                }))
                                            );
                                        } else {
                                            setPosts([]);
                                        }
                                    });
                            }
                        });
                } else {
                    setName("Home");
                    Firestore.collectionGroup("posts")
                        .orderBy("time", "desc")
                        .limit(4 + ((posts && posts.length) || 0))
                        .onSnapshot(snapshot => {
                            setLoading(false);
                            if (!snapshot.empty) {
                                setPosts(
                                    snapshot.docs.map(x => ({
                                        postID: x.id,
                                        subreddit: x.data().subreddit
                                    }))
                                );
                            } else {
                                setPosts([]);
                            }
                        });
                }
            }
        },
        [subreddit, user]
    );

    const toggleSubscribe = () => {
        if (user && subreddit) {
            Firestore.collection("users")
                .doc(user.username)
                .get()
                .then(snapshot => {
                    const oldSubs = snapshot.data().subscriptions;
                    let newSubs = [];
                    if (oldSubs.indexOf(subreddit) >= 0) {
                        newSubs = oldSubs.filter(x => x !== subreddit);
                    } else {
                        newSubs = oldSubs.concat([subreddit]);
                    }
                    Firestore.collection("users")
                        .doc(user.username)
                        .update({
                            subscriptions: newSubs
                        })
                        .then(() => {
                            setSubscribed(v => !v);
                        });
                });
        }
    };

    useEffect(() => {
        if (subreddit && user) {
            Firestore.collection("users")
                .doc(user.username)
                .get()
                .then(snapshot => {
                    const subs = snapshot.data().subscriptions;
                    setSubscribed(subs && subs.includes(subreddit));
                });
        }
    }, [user, subreddit]);

    useEffect(() => {
        loadPosts([]);
    }, [loadPosts]);

    if (posts === null && loading) {
        return (
            <Box margin="20px">
                <CircularProgress />
            </Box>
        );
    }

    if (posts === null) {
        return (
            <div>
                <Typography>Oops... This doesn't exist yet</Typography>
                <SubredditCreator
                    defaultValues={{
                        id: subreddit,
                        label: `Create /r/${subreddit}`
                    }}
                    onSuccess={() => loadPosts(posts)}
                />
            </div>
        );
    }

    const SubscribeIcon = () => {
        return (
            <Box marginLeft="16px">
                <Tooltip title={subscribed ? "Unsubscribe" : "Subscribe"}>
                    <IconButton size="small" onClick={toggleSubscribe}>
                        {subscribed ? (
                            <Favorite
                                style={{ width: "1.5em", height: "1.5em" }}
                            />
                        ) : (
                            <FavoriteBorder
                                style={{ width: "1.5em", height: "1.5em" }}
                            />
                        )}
                    </IconButton>
                </Tooltip>
            </Box>
        );
    };

    if (posts.length > 0) {
        return (
            <Box margin="10px">
                <Box display="flex" justifyContent="center">
                    <Typography variant="h3">{name}</Typography>
                    {subreddit && <SubscribeIcon />}
                </Box>
                <GridList
                    cols={2}
                    spacing={20}
                    classes={{ root: classes.gridListRoot }}
                >
                    {posts.map(post => (
                        <GridListTile
                            key={post.postID}
                            cols={1}
                            rows={1}
                            style={{ height: "unset" }}
                        >
                            <Post {...post} key={post.postID} />
                        </GridListTile>
                    ))}
                </GridList>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <Button
                        onClick={() => {
                            loadPosts(posts);
                        }}
                        disabled={loading}
                        variant="outlined"
                    >
                        Load More
                    </Button>
                )}
            </Box>
        );
    } else {
        return (
            <Box
                width="100%"
                display="flex"
                flexDirection="column"
                alignItems="center"
            >
                <Box display="flex" alignItems="center" justifyContent="center">
                    <Typography variant="h3">{name}</Typography>
                    {subreddit && <SubscribeIcon />}
                </Box>
                <Box width="50%">
                    <Typography variant="h6">
                        Hmm. We could not find any posts. Why not make the first
                        one?
                    </Typography>
                    <PostCreator iconClass={classes.newPostIcon} />
                </Box>
            </Box>
        );
    }
};
