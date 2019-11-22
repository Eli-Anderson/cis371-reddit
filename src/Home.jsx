import React from "react";
import { Feed } from "./Feed";
import { Container, Row, Col } from "react-bootstrap";
import { AppHeader } from "./AppHeader";
import { useRouteMatch } from "react-router-dom";
export const Home = props => {
    const match = useRouteMatch("/r/:subreddit");
    console.log(match?.subreddit);
    return (
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
                    <Feed />
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
    );
};
