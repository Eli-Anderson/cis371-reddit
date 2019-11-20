import React, { useState } from "react";
import { useHover } from "web-api-hooks";
import { PostIneractions } from "./PostInteractions";
import { Fade, Card, CardHeader, CardContent, Link } from "@material-ui/core";
import { BigPost } from "./BigPost";
import { Firestore } from "./db-init";

export const Post = ({
    postID,
    content,
    link,
    time,
    title,
    userID,
    viewCount,
    voteCount
}) => {
    console.log(voteCount);
    const [open, setOpen] = useState(false);
    const [isHovered, bindHover] = useHover();

    return (
        <div
            {...bindHover}
            style={{ margin: 8, marginLeft: 30, overflow: "visible" }}
        >
            <Fade
                in={isHovered}
                style={{ position: "relative", overflow: "visible" }}
            >
                <div
                    style={{
                        position: "absolute",
                        left: 0,
                        overflow: "visible"
                    }}
                >
                    <Link
                        style={{
                            position: "relative",
                            top: -14,
                            left: 26
                        }}
                        href={`/u/${userID}`}
                    >
                        {userID}
                    </Link>
                    <PostIneractions
                        onUpvote={() => {
                            console.log(voteCount + 1);
                            Firestore.collection("subreddits")
                                .doc("cis371")
                                .collection("posts")
                                .doc(postID)
                                .update({
                                    voteCount: voteCount + 1
                                });
                        }}
                        onDownvote={() => {
                            console.log("downvoted");
                        }}
                        user={userID}
                    />
                </div>
            </Fade>
            <Card
                style={{ cursor: "pointer" }}
                onClick={() => {
                    if (content) setOpen(true);
                    else window.open(link, "_blank");
                }}
            >
                <CardHeader
                    style={{ textAlign: "left" }}
                    title={title}
                ></CardHeader>
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
