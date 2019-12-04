import React, { useState, useCallback, useContext } from "react";
import {
    Modal,
    Paper,
    Box,
    Typography,
    TextField,
    RadioGroup,
    Radio,
    FormControl,
    FormLabel,
    FormControlLabel,
    Checkbox,
    Button,
    Fade,
    IconButton,
    Tooltip
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ReactMarkdown from "react-markdown";
import { Firestore, getTimestamp } from "./db-init";
import { AppContext } from "./App";
import { useRouteMatch } from "react-router-dom";
import PostAddIcon from "@material-ui/icons/PostAdd";

const HorizontalRadio = props => (
    <Box
        width="40%"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
    >
        {props.children}
    </Box>
);

const useStyles = makeStyles({
    paper: {
        width: "80%",
        height: "85%",
        outline: "none"
    },
    title: {
        width: "75%"
    },
    content: {
        width: "75%"
    },
    link: {
        width: "75%"
    }
});

export const PostCreator = ({ iconClass, ...props }) => {
    const classes = useStyles(props);
    const match = useRouteMatch("/r/:subreddit");

    const [open, setOpen] = useState(false);

    const [subreddit, setSubreddit] = useState("");
    const [type, setType] = useState("link");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [url, setUrl] = useState("");
    const [preview, setPreview] = useState(false);

    const { user } = useContext(AppContext);

    const createPost = useCallback(() => {
        const data = {
            title,
            time: getTimestamp(),
            voteCount: 0,
            viewCount: 0,
            userID: user.username,
            subreddit: subreddit
        };
        if (type === "link") {
            data.url = url;
        } else {
            data.content = content;
        }
        Firestore.collection("subreddits")
            .doc(subreddit)
            .get()
            .then(snapshot => {
                if (snapshot.exists) {
                    Firestore.collection("subreddits")
                        .doc(subreddit)
                        .collection("posts")
                        .doc()
                        .set(data)
                        .then(() => {
                            setOpen(false);
                            setType("link");
                            setTitle("");
                            setContent("");
                            setUrl("");
                            setPreview(false);
                        })
                        .catch(err => {
                            console.log(err);
                            window.alert("Something went wrong");
                        });
                } else {
                    window.alert("That subreddit does not exist");
                }
            });
    }, [subreddit, type, title, url, content, user]);

    return (
        <>
            <Tooltip title="New Post">
                <IconButton
                    size="small"
                    onClick={() => {
                        if (match) setSubreddit(match.params.subreddit);
                        setOpen(true);
                    }}
                >
                    <PostAddIcon className={iconClass} />
                </IconButton>
            </Tooltip>
            <Fade in={open}>
                <Modal
                    open={true}
                    onClose={() => setOpen(false)}
                    onEscapeKeyDown={() => setOpen(false)}
                    onBackdropClick={() => setOpen(false)}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <Paper elevation={18} classes={{ root: classes.paper }}>
                        <Box
                            position="relative"
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            m={2}
                            height="95%"
                        >
                            <Typography variant="h4">
                                Create a post...
                            </Typography>
                            <TextField
                                classes={{ root: classes.title }}
                                label="Subreddit"
                                value={`/r/${subreddit}`}
                                onChange={ev => {
                                    console.log(ev.target.value);
                                    setSubreddit(ev.target.value.substring(3));
                                }}
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                classes={{ root: classes.title }}
                                label="Title"
                                value={title}
                                onChange={ev => setTitle(ev.target.value)}
                                margin="normal"
                                variant="outlined"
                            />
                            <FormControl component={HorizontalRadio}>
                                <FormLabel component="legend">Type</FormLabel>
                                <RadioGroup
                                    name="type"
                                    value={type}
                                    onChange={ev => setType(ev.target.value)}
                                    row
                                >
                                    <FormControlLabel
                                        value="link"
                                        control={<Radio value="link" />}
                                        label="Link"
                                    />
                                    <FormControlLabel
                                        value="markdown"
                                        control={<Radio value="markdown" />}
                                        label="Markdown"
                                    />
                                </RadioGroup>
                            </FormControl>
                            {type === "markdown" && !preview && (
                                <TextField
                                    classes={{ root: classes.content }}
                                    label="Text/Markdown content"
                                    value={content}
                                    onChange={ev => setContent(ev.target.value)}
                                    margin="normal"
                                    variant="outlined"
                                    multiline
                                    rows={8}
                                />
                            )}
                            {type === "markdown" && preview && (
                                <Box
                                    border="1px solid rgba(0,0,0,0.23)"
                                    borderRadius="4px"
                                    width="75%"
                                    height="260px"
                                    overflow="scroll"
                                    marginTop="16px"
                                    marginBottom="8px"
                                >
                                    <ReactMarkdown source={content} />
                                </Box>
                            )}
                            {type === "markdown" && (
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={preview}
                                            onChange={(ev, value) =>
                                                setPreview(value)
                                            }
                                        />
                                    }
                                    label="Preview"
                                />
                            )}
                            {type === "link" && (
                                <TextField
                                    classes={{ root: classes.link }}
                                    label="URL"
                                    value={url}
                                    onChange={ev => setUrl(ev.target.value)}
                                    margin="normal"
                                    variant="outlined"
                                />
                            )}
                            <Box flexGrow={1} />
                            <Box alignSelf="flex-end">
                                <Button
                                    disabled={
                                        !title ||
                                        (type === "link" && !url) ||
                                        (type === "markdown" && !content) ||
                                        !user
                                    }
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                        createPost();
                                    }}
                                >
                                    {user ? "Create" : "Must be signed in"}
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                </Modal>
            </Fade>
        </>
    );
};
