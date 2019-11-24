import React, { useState, useEffect, useRef } from "react";
import { Post } from "./Post";
import {
    GridList,
    GridListTile,
    Typography,
    Box,
    CircularProgress
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Firestore } from "./db-init";

const useStyles = makeStyles({
    gridListRoot: { margin: "0 !important" }
});

export const Feed = ({ subreddit, ...props }) => {
    const classes = useStyles(props);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const listener = useRef(null);

    useEffect(() => {
        if (subreddit) {
            setLoading(true);
            if (listener.current) {
                listener.current(); // unsubscribe
            }
            listener.current = Firestore.collection("subreddits")
                .doc(subreddit)
                .collection("posts")
                .orderBy("time", "desc")
                .limit(10)
                .onSnapshot(snapshot => {
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
                    }
                });
        }
    }, [subreddit]);

    if (loading) {
        return <CircularProgress />;
    }

    if (posts.length > 0) {
        return (
            <GridList
                cellHeight={200}
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
        );
    } else {
        return (
            <Box width="100%" display="flex" justifyContent="center">
                <Box width="50%">
                    <Typography variant="h6">
                        Hmm. We could not find any posts. Why not make the first
                        one?
                    </Typography>
                </Box>
            </Box>
        );
    }
};
