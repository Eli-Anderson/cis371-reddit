import React from "react";
import {
    Card,
    Modal,
    Grid,
    CardContent,
    CardHeader,
    Fab
} from "@material-ui/core";
import ReactMarkdown from "react-markdown";
import Close from "@material-ui/icons/Close";

export const BigPost = props => {
    return (
        <Modal open={props.open} onClose={props.onClose}>
            <Grid
                container
                style={{ width: "100%", height: "100%" }}
                justify="center"
                alignContent="center"
            >
                <Grid item style={{ width: "80%", height: "80%" }}>
                    <div
                        style={{
                            width: "100%",
                            height: "100%"
                        }}
                    >
                        <Fab>
                            <Close />
                        </Fab>
                        <Card
                            style={{
                                width: "100%",
                                height: "100%",
                                overflow: "scroll",
                                padding: 20
                            }}
                        >
                            <CardHeader title={props.title} />
                            <CardContent>
                                <ReactMarkdown source={props.markdown} />
                            </CardContent>
                        </Card>
                    </div>
                </Grid>
            </Grid>
        </Modal>
    );
};
