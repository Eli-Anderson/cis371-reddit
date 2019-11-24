import React from "react";
import { Feed } from "./Feed";
import { Container, Row, Col } from "react-bootstrap";
import { AppHeader } from "./AppHeader";
import { useRouteMatch } from "react-router-dom";
import { PostCreator } from "./PostCreator";
import { Typography } from "@material-ui/core";
export const Home = props => {
    const match = useRouteMatch("/r/:subreddit");
    return (
        <>
            <Container fluid>
                <Row>
                    <Col>
                        <div style={{ height: 120, width: "100%" }} id="header">
                            <AppHeader />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={2}></Col>
                    <Col xs={8}>
                        <Typography variant="h3">
                            {(match && match.params.subreddit) || "All"}
                        </Typography>
                        <PostCreator
                            subreddit={match && match.params.subreddit}
                        />
                        <Feed subreddit={match && match.params.subreddit} />
                    </Col>
                    <Col xs={2}></Col>
                </Row>
                <Row>
                    <Col>
                        <div
                            style={{ height: 120, width: "100%" }}
                            id="footer"
                        ></div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
