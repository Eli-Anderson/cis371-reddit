import React, { useState, useEffect, useRef } from "react";
import { PostFooter } from "./PostFooter";
import { Card, CardHeader, CircularProgress } from "@material-ui/core";
import { BigPost } from "./BigPost";
import { Firestore, increment } from "./db-init";

export const Post = ({ subreddit, postID }) => {
    const userVoteListener = useRef(null);
    const voteCountListener = useRef(null);
    const [open, setOpen] = useState(false);
    const [userVote, setUserVote] = useState(null);
    const [data, setData] = useState(null);
    useEffect(() => {
        if (!userVoteListener.current) {
            userVoteListener.current = Firestore.collection("users")
                .doc("andeelij")
                .collection("votes")
                .doc(postID)
                .onSnapshot(snapshot => {
                    if (snapshot.exists) {
                        setUserVote(snapshot.data().value);
                    }
                });
        } else {
            userVoteListener.current(); // unsubscribe
        }
        if (!voteCountListener.current) {
            voteCountListener.current = Firestore.collection("subreddits")
                .doc(subreddit)
                .collection("posts")
                .doc(postID)
                .onSnapshot(snapshot => {
                    if (snapshot.exists) {
                        setData(snapshot.data());
                    }
                });
        } else {
            voteCountListener.current(); // unsubscribe
        }
    }, [postID, subreddit]);

    if (data === null)
        return (
            <Card style={{ margin: 6 }}>
                <CircularProgress />
                <div style={{ backgroundColor: "#fafafa" }}></div>
            </Card>
        );

    return (
        <div>
            <Card style={{ margin: 6 }}>
                <CardHeader
                    onClick={() => {
                        if (data.content) setOpen(true);
                        else window.open(data.url, "_blank");
                    }}
                    style={{ textAlign: "left", cursor: "pointer" }}
                    title={data.title}
                ></CardHeader>
                <div style={{ backgroundColor: "#fafafa" }}>
                    <PostFooter
                        subreddit={"cis371"}
                        time={data.time}
                        userID={data.userID}
                        voteCount={data.voteCount}
                        userVote={userVote}
                        onUpvote={() => {
                            let voteCount = 0;
                            let userVoteValue = 0;

                            if (userVote === -1) {
                                voteCount = 2;
                                userVoteValue = 1;
                            } else if (!userVote) {
                                voteCount = 1;
                                userVoteValue = 1;
                            } else if (userVote === 1) {
                                voteCount = -1;
                                userVoteValue = 0;
                            }
                            if (voteCount) {
                                Firestore.collection("subreddits")
                                    .doc("cis371")
                                    .collection("posts")
                                    .doc(postID)
                                    .update({
                                        voteCount: increment(voteCount)
                                    })
                                    .then(() => {
                                        // setUserVote(userVoteValue);
                                    });
                            }
                            Firestore.collection("users")
                                .doc("andeelij")
                                .collection("votes")
                                .doc(postID)
                                .set({
                                    value: userVoteValue
                                });
                        }}
                        onDownvote={() => {
                            let voteCount = 0;
                            let userVoteValue = 0;

                            if (userVote === 1) {
                                voteCount = -2;
                                userVoteValue = -1;
                            } else if (!userVote) {
                                voteCount = -1;
                                userVoteValue = -1;
                            } else if (userVote === -1) {
                                voteCount = 1;
                                userVoteValue = 0;
                            }
                            if (voteCount) {
                                Firestore.collection("subreddits")
                                    .doc("cis371")
                                    .collection("posts")
                                    .doc(postID)
                                    .update({
                                        voteCount: increment(voteCount)
                                    })
                                    .then(() => {
                                        setUserVote(userVoteValue);
                                    });
                            }
                            Firestore.collection("users")
                                .doc("andeelij")
                                .collection("votes")
                                .doc(postID)
                                .set({
                                    value: userVoteValue
                                });
                        }}
                    />
                </div>
            </Card>
            <BigPost
                open={open}
                onClose={() => setOpen(false)}
                markdown={data.content}
                title={data.title}
            />
        </div>
    );
};
