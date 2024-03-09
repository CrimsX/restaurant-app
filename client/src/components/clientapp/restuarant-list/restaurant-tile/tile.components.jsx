import React from "react";
import './tile.styles.css'
import { useNavigate } from "react-router-dom";

export const Tile = ({ restaurant }) => {
    const { name, rid } = restaurant;
    let navigate = useNavigate();

    const routeToMenu = () => {
        console.log(rid.toString());
        const ridString = rid.toString()
        navigate(`/menu/`+ ridString)
    }

    return (
    <div className='tile-container' onClick={routeToMenu}>
        <h1 className="logo">{name[0]}</h1>
        <h2>{name}</h2>
    </div>
    )};
