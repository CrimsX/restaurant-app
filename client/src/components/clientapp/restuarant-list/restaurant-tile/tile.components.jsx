import React from "react";
import './tile.styles.css'

export const Tile = ({ restaurant }) => {
    const { name, rid } = restaurant;

    return (
    <div className='tile-container'>
        <h1 className="logo">{name[0]}</h1>
        <h2>{name}</h2>
    </div>
    )};
