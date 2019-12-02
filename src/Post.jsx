import React, { useState, useEffect, useRef } from "react";
import { PostFooter } from "./PostFooter";
import { Card, CardHeader } from "@material-ui/core";
import { BigPost } from "./BigPost";
import { Firestore, increment } from "./db-init";

export const Post = ({
    postID,
    content,
    url,
    time,
    title,
    userID,
    viewCount,
    voteCount
}) => {
    const userVoteListener = useRef(null);
    const [open, setOpen] = useState(false);
    const [userVote, setUserVote] = useState(null);

    useEffect(() => {
        if (!userVoteListener.current) {
            userVoteListener.current = Firestore.collection("users")
                .doc("andeelij")
                .collection("votes")
                .doc(postID)
                .onSnapshot(snapshot => {
                    console.log(snapshot);
                    if (snapshot.exists) {
                        setUserVote(snapshot.data().value);
                    }
                });
        } else {
            userVoteListener.current(); // unsubscribe
        }
    }, [postID]);

    return (
        <div>
            <Card style={{ margin: 6 }}>
                <CardHeader
                    onClick={() => {
                        if (content) setOpen(true);
                        else window.open(url, "_blank");
                    }}
                    style={{ textAlign: "left", cursor: "pointer" }}
                    title={title}
                ></CardHeader>
                <div style={{ backgroundColor: "#fafafa" }}>
                    <PostFooter
                        subreddit={"cis371"}
                        time={time}
                        userID={userID}
                        voteCount={voteCount}
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
                markdown={content}
                title={title}
            />
        </div>
    );
};
