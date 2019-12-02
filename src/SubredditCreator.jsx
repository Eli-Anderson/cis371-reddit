import React, { useState, useCallback } from "react";
import {
    Modal,
    Paper,
    Box,
    Typography,
    TextField,
    Button,
    Fade
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Firestore, getTimestamp } from "./db-init";

const useStyles = makeStyles({
    paper: {
        width: "80%",
        height: "80%",
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

export const SubredditCreator = ({ defaultValues, onSuccess, ...props }) => {
    const classes = useStyles(props);

    const [open, setOpen] = useState(false);

    const [id, setID] = useState((defaultValues && defaultValues.id) || "");
    const [name, setName] = useState(
        (defaultValues && defaultValues.name) || ""
    );

    const createSubreddit = useCallback(() => {
        const data = {
            name,
            time: getTimestamp(),
            userID: "andeelij"
        };
        Firestore.collection("subreddits")
            .doc(id)
            .set(data)
            .then(() => {
                setOpen(false);
                setID("");
                setName("");
            })
            .then(onSuccess)
            .catch(err => {
                console.log(err);
                window.alert("Something went wrong");
            });
    }, [name, id, onSuccess]);

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setOpen(true)}
            >
                {(defaultValues && defaultValues.label) || "New Subreddit"}
            </Button>
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
                                Create a subreddit...
                            </Typography>
                            <TextField
                                classes={{ root: classes.title }}
                                label="Unique ID"
                                value={`/r/${id}`}
                                onChange={ev =>
                                    setID(ev.target.value.substring(3))
                                }
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                classes={{ root: classes.title }}
                                label="Display Name"
                                value={name}
                                onChange={ev => setName(ev.target.value)}
                                margin="normal"
                                variant="outlined"
                            />
                            <Box flexGrow={1} />
                            <Box alignSelf="flex-end">
                                <Button
                                    disabled={!id || !name}
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                        createSubreddit();
                                    }}
                                >
                                    Create
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                </Modal>
            </Fade>
        </>
    );
};
