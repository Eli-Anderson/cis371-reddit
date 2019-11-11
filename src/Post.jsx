import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useHover } from "web-api-hooks";
import { PostIneractions } from "./PostInteractions";
import {
    Fade,
    Collapse,
    Card,
    CardHeader,
    CardContent
} from "@material-ui/core";
import { BigPost } from "./BigPost";

export const Post = props => {
    const [open, setOpen] = useState(false);
    const [isHovered, bindHover] = useHover();

    return (
        <div {...bindHover} style={{ margin: 8, marginLeft: 30 }}>
            <Fade in={isHovered} style={{ position: "relative" }}>
                <div
                    style={{
                        position: "absolute",
                        left: 0
                    }}
                >
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
                    setOpen(true);
                }}
            >
                <CardHeader
                    style={{ textAlign: "left" }}
                    title={props.title}
                ></CardHeader>
                <CardContent>
                    <Collapse in={isHovered} collapsedHeight="36px">
                        <div style={{ overflowX: "scroll" }}>
                            <ReactMarkdown source={props.markdown} />
                        </div>
                    </Collapse>
                </CardContent>
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
