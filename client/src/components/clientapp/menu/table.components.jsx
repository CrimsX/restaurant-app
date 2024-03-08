import React from "react";
import './table.styles.css';


export const MenuItems = ({ menu }) => {
    if (!menu) {
        return;
    }

    const checkStock = (available) => {
        if (available) {
            return "In Stock"
        }
        return "Out of Stock"
    }
    return (
        <table className="table table-dark">
        <thead className="center-text">
            <tr>
                <th scope="col">Item</th>
                <th scope="col">Availbility</th>
                <th scope="col">Price</th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody className="center-text">
            {menu.map(data => (
                    <tr key={data.rid}>
                        <td>{data.name}</td>
                        <td>{checkStock(data.available)}</td>
                        <td>{'$' + data.price}</td>
                        <td>
                            <button>
                                Add to Cart
                            </button>
                        </td>
                    </tr>
            ))}
        </tbody>
        </table>
    )
}
