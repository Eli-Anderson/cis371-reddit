import React, { useState, useEffect } from "react";
import { Post } from "./Post";
import { GridList, GridListTile } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Firestore } from "./db-init";

const useStyles = makeStyles({
    gridListTile: { overflow: "visible" }
});

export const Feed = props => {
    const classes = useStyles(props);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        Firestore.collection("subreddits")
            .doc("cis371")
            .collection("posts")
            .orderBy("time", "desc")
            .limit(10)
            .onSnapshot(snapshot => {
                setPosts(
                    snapshot.docs.map(x => ({ ...x.data(), postID: x.id }))
                );
            });
    }, []);

    return (
        <GridList cellHeight={200} cols={2} spacing={20}>
            {posts.map((post, index) => (
                <GridListTile
                    key={index}
                    cols={1}
                    rows={1}
                    classes={{ tile: classes.gridListTile }}
                >
                    <Post {...post} key={index} />
                </GridListTile>
            ))}
        </GridList>
    );
};
