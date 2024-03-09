import React from "react";
import {Tile} from '../restaurant-tile/tile.components';
import "./display.styles.css";


export const TileList = ({ restuarants }) => (
    <div className="tilelist">
        {restuarants.map(restaurant => (
        <Tile key={restaurant.id} restaurant={restaurant} />
        ))}
    </div>
    );

export default TileList;
