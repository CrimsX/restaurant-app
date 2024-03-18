import React, {useState} from "react";
import './menu.styles.css';


export const MenuItems = ({ menu, addToCart, cartItems}) => {

    if (!menu) {
        return;
    }

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
                            <button onClick={() => handleAddToCart(item)}>
                                Add to Cart
                            </button>
                        </td>
                    </tr>
            ))}
        </tbody>
        </table>
    );
}
