import React from "react";
import {Tile} from '../restaurant-tile/tile.components';
import "./display.styles.css";

//Component to organize tiles into a grid. Called in landingScreen.JS as "Restaurants"
export const TileList = ({ restuarants }) => (
    <div className="tilelist">
        {restuarants.map(restaurant => (
        <Tile key={restaurant.id} restaurant={restaurant} />
        ))}
    </div>
    );

export default TileList;
