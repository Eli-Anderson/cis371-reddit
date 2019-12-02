import React, { useContext } from "react";
import { AppContext } from "./App";
import { Button, Modal, makeStyles, Fade, Backdrop } from "@material-ui/core";
import { positions } from "@material-ui/system";

const useStyles = makeStyles(theme => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid grey",
        borderRadius: "2mm",
        padding: "1em",
        width: "50vw",
        boxShadow: theme.shadows[5],
        padding: "16px"
    },
    inputTable: {
        display: "grid",
        gridTemplateColumns: "repeat(2, auto)",
        borderRadius: "4px",
        gridGap: "2mm",
        fontSize: "16px",
        fontFamily: "Roboto, sans- serif"
    },
    buttonGroup: {
        width: "100 %",
        padding: "12px",
        marginRight: "auto",
        marginLeft: "auto",
        textAlign: "right",
        position: "relative"
    },
    login: {
        background: "green",
        color: "black",
        fontSize: "16px",
        alignItems: "center",
        borderRadius: "4px"
    },
    setup: {
        background: "red",
        color: "black",
        fontSize: "16px",
        alignItems: "center",
        borderRadius: "4px"
    }
}));

export const Header = props => {
    const classes = useStyles();
    
    return (
        <div>
            
        </div>
    );
};
