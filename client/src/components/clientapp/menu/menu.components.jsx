import React, {useState} from "react";
import './menu.styles.css';
import { AiTwotonePlusSquare } from "react-icons/ai";

// MenuItems component. This is a table that displays the menu items name, price, and a "Add to Cart" button
export const MenuItems = ({ menu, addToCart, cartItems}) => {

    //Display nothing if the menu is empty
    if (!menu) {
        return;
    }

    //Handles add to cart button click. Handled in Menu.js
    const handleAddToCart = (item, qty) => {
        addToCart(item, qty);
    }

    return (
        <table className="table">
        <thead className="center-text">
            <tr>
                <th scope="col">Item</th>
                <th scope="col">Price</th>
                <th scope="col">Add to Cart</th>
            </tr>
        </thead>
        <tbody className="center-text">
            {menu
            .filter(data => data.available)
            .map(item => (
                    <tr key={item.name}>
                        <td>{item.name}</td>
                        <td>{'$' + item.price}</td>
                        <td>
                            <AiTwotonePlusSquare className="add-to-cart" onClick={() => handleAddToCart(item)}>
                            </AiTwotonePlusSquare>
                        </td>
                    </tr>
            ))}
        </tbody>
        </table>
    );
}
