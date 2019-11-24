import React from "react";
import { IconButton, Typography, Link, Box } from "@material-ui/core";
import ThumbUp from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbDown from "@material-ui/icons/ThumbDownAltOutlined";
import moment from "moment";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
    by: {
        marginLeft: 6,
        marginRight: 6,
        fontWeight: "unset"
    }
});

export const PostFooter = ({
    time,
    userID,
    voteCount,
    userVote,
    onUpvote,
    onDownvote,
    subreddit
}) => {
    const classes = useStyles({});
    return (
        <Box display="flex" flexDirection="row" alignItems="center" px={2}>
            <Box>
                <Typography>{voteCount}</Typography>
                <IconButton size="small" onClick={onUpvote}>
                    <ThumbUp
                        fontSize="small"
                        color={userVote === 1 ? "primary" : "inherit"}
                    />
                </IconButton>
                <IconButton size="small" onClick={onDownvote}>
                    <ThumbDown
                        fontSize="small"
                        color={userVote === -1 ? "error" : "inherit"}
                    />
                </IconButton>
            </Box>
            <Box flexGrow={1} alignSelf="flex-end">
                <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    display="inline"
                >
                    {time
                        ? moment
                              .duration(
                                  moment.unix(time.seconds).diff(moment())
                              )
                              .humanize(true)
                        : "just now"}
                </Typography>
                <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    display="inline"
                    classes={{ root: classes.by }}
                >
                    by
                </Typography>
                <Link href={`/u/${userID}`} variant="subtitle2">
                    {`/u/${userID}`}
                </Link>
            </Box>
            <Box justifySelf="flex-end">
                <Link href={`/r/${subreddit}`}>{`/r/${subreddit}`}</Link>
            </Box>
        </Box>
    );
};
