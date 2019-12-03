import React, { useState, useEffect, useRef, useContext } from "react";
import { PostFooter } from "./PostFooter";
import { Card, CardHeader, CircularProgress } from "@material-ui/core";
import { BigPost } from "./BigPost";
import { Firestore, increment } from "./db-init";
import { AppContext } from "./App";

export const Post = ({ postID, subreddit }) => {
    const userVoteListener = useRef(null);
    const voteCountListener = useRef(null);
    const [open, setOpen] = useState(false);
    const [userVote, setUserVote] = useState(null);
    const [data, setData] = useState(null);

    const { user } = useContext(AppContext);

    useEffect(() => {
        if (user) {
            if (!userVoteListener.current) {
                userVoteListener.current = Firestore.collection("users")
                    .doc(user.username)
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
        }
    }, [postID, user]);

    useEffect(() => {
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

    const tryVote = (voteChange, voteAmount) => {
        if (user) {
            if (voteChange) {
                Firestore.collection("subreddits")
                    .doc(subreddit)
                    .collection("posts")
                    .doc(postID)
                    .update({
                        voteCount: increment(voteChange)
                    });
            }
            Firestore.collection("users")
                .doc(user.username)
                .collection("votes")
                .doc(postID)
                .set({
                    value: voteAmount
                });
        }
    };

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
                        subreddit={subreddit}
                        time={data.time}
                        userID={data.userID}
                        voteCount={data.voteCount}
                        userVote={userVote}
                        onUpvote={() => {
                            let voteChange = 0;
                            let voteAmount = 0;

                            if (userVote === -1) {
                                voteChange = 2;
                                voteAmount = 1;
                            } else if (!userVote) {
                                voteChange = 1;
                                voteAmount = 1;
                            } else if (userVote === 1) {
                                voteChange = -1;
                                voteAmount = 0;
                            }
                            tryVote(voteChange, voteAmount);
                        }}
                        onDownvote={() => {
                            let voteChange = 0;
                            let voteAmount = 0;

                            if (userVote === 1) {
                                voteChange = -2;
                                voteAmount = -1;
                            } else if (!userVote) {
                                voteChange = -1;
                                voteAmount = -1;
                            } else if (userVote === -1) {
                                voteChange = 1;
                                voteAmount = 0;
                            }
                            tryVote(voteChange, voteAmount);
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
