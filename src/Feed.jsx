import React, { useState, useEffect, useRef, useCallback } from "react";
import { Post } from "./Post";
import {
    GridList,
    GridListTile,
    Typography,
    Box,
    CircularProgress,
    Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Firestore } from "./db-init";
import { SubredditCreator } from "./SubredditCreator";
import { PostCreator } from "./PostCreator";
import { useRouteMatch } from "react-router-dom";

const useStyles = makeStyles({
    gridListRoot: { margin: "0 !important", height: "100%" }
});

export const Feed = props => {
    const classes = useStyles(props);
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const listener = useRef(null);

    const match = useRouteMatch("/r/:subreddit");

    const subreddit = match && match.params.subreddit;
    const lastPost = useRef(null);

    const loadPosts = useCallback(
        posts => {
            if (subreddit) {
                setLoading(true);
                // if (listener.current) {
                //     listener.current(); // unsubscribe
                // }
                Firestore.collection("subreddits")
                    .doc(subreddit)
                    .get()
                    .then(snapshot => {
                        if (snapshot.exists) {
                            setName(snapshot.data().name || "");
                            if (lastPost.current) {
                                listener.current = Firestore.collection(
                                    "subreddits"
                                )
                                    .doc(subreddit)
                                    .collection("posts")
                                    .orderBy("time", "desc")
                                    .limit(4)
                                    .startAfter(lastPost.current)
                                    .get()
                                    .then(snapshot => {
                                        setLoading(false);
                                        // we already have posts, so concat the new ones
                                        if (!snapshot.empty) {
                                            setPosts(
                                                posts.concat(
                                                    snapshot.docs.map(x => ({
                                                        ...x.data(),
                                                        postID: x.id
                                                    }))
                                                )
                                            );
                                            lastPost.current =
                                                snapshot.docs[
                                                    snapshot.docs.length - 1
                                                ];
                                        }
                                    });
                            } else {
                                listener.current = Firestore.collection(
                                    "subreddits"
                                )
                                    .doc(subreddit)
                                    .collection("posts")
                                    .orderBy("time", "desc")
                                    .limit(4)
                                    .get()
                                    .then(snapshot => {
                                        setLoading(false);
                                        if (snapshot.empty) {
                                            setPosts([]);
                                        } else {
                                            setPosts(
                                                snapshot.docs.map(x => ({
                                                    ...x.data(),
                                                    postID: x.id
                                                }))
                                            );
                                            lastPost.current =
                                                snapshot.docs[
                                                    snapshot.docs.length - 1
                                                ];
                                        }
                                    });
                            }
                        } else {
                            setLoading(false);
                            setPosts(null);
                        }
                    });
            }
        },
        [subreddit]
    );

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

    if (posts.length > 0) {
        return (
            <Box margin="10px">
                <Typography variant="h3">{name}</Typography>
                <Box display="flex" justifyContent="flex-end">
                    <PostCreator subreddit={match && match.params.subreddit} />
                </Box>
                <GridList
                    cellHeight={120}
                    cols={2}
                    spacing={20}
                    classes={{ root: classes.gridListRoot }}
                >
                    {posts.map(post => (
                        <GridListTile key={post.postID} cols={1} rows={1}>
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
            <Box width="100%" display="flex" justifyContent="center">
                <Box width="50%">
                    <Typography variant="h6">
                        Hmm. We could not find any posts. Why not make the first
                        one?
                    </Typography>
                    <PostCreator subreddit={match && match.params.subreddit} />
                </Box>
            </Box>
        );
    }
};
