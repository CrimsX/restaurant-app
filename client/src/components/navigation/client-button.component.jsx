import React from "react";
import { useNavigate } from "react-router-dom";
import "./client-button.styles.css"
import "bootstrap/dist/css/bootstrap.min.css"

export const NavToClientApp = () => {

    let navigate = useNavigate();

    const routeToClientApp = () => {
        navigate(`/home`)
    }
    return (
        <button type="button" class="btn btn-success btn-custom"
        onClick={routeToClientApp}>Client Interface</button>
    )
};
