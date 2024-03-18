import React, {useState} from "react";
import './menu.styles.css';


export const MenuItems = ({ menu, addToCart, cartItems}) => {
    const [cartBtnLabel, setCartBtnLabel] = useState("Add to Cart")

    if (!menu) {
        return;
    }

   menu = menu.map(item => {
        return {
            ...item,
            qty: 1
        }
    })

    const handleQuantityChange = (event, item) => {
        item.qty = parseInt(event.target.value);
    }

    const handleAddToCart = (item, qty) => {
        addToCart(item, qty);
    }

    return (
        <table className="table table-dark">
        <thead className="center-text">
            <tr>
                <th scope="col">Item</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
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
                            <select onChange={(event) => handleQuantityChange(event, item)}>
                                {[...Array(9).keys()].map(num => (
                                    <option key={num + 1} value={num + 1}>{num + 1}</option>
                                ))}
                            </select>
                        </td>
                        <td>
                            <button onClick={() => handleAddToCart(item)}>
                                Add to Cart
                            </button>
                        </td>
                    </tr>
            ))}
        </tbody>
        </table>
    )
}
