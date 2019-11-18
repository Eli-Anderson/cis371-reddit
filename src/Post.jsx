import React, { useState } from "react";
import { useHover } from "web-api-hooks";
import { PostIneractions } from "./PostInteractions";
import { Fade, Card, CardHeader, CardContent, Link } from "@material-ui/core";
import { BigPost } from "./BigPost";

export const Post = props => {
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
                        href={`/u/${props.user.name}`}
                    >
                        {props.user.name}
                    </Link>
                    <PostIneractions
                        onUpvote={() => {
                            console.log("upvoted");
                        }}
                        onDownvote={() => {
                            console.log("downvoted");
                        }}
                        user={props.user.name}
                    />
                </div>
            </Fade>
            <Card
                style={{ cursor: "pointer" }}
                onClick={() => {
                    if (props.markdown) setOpen(true);
                    else window.open(props.url, "_blank");
                }}
            >
                <CardHeader
                    style={{ textAlign: "left" }}
                    title={props.title}
                ></CardHeader>
            </Card>
            <BigPost
                open={open}
                onClose={() => setOpen(false)}
                markdown={props.markdown}
                title={props.title}
            />
        </div>
    );
};
