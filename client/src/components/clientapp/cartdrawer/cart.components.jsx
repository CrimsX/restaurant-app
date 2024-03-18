import React, { useState } from "react";
import { Button } from 'react-bootstrap';
import { Drawer } from "antd";
import './cart.styles.css'

export const Cart = ({cartItems, removeFromCart}) => {
    const [open, setOpen] = useState(false);

    const calcPrice = (price, qty) =>{
        const total = parseFloat(price) * parseFloat(qty);
        return total.toFixed(2);
    }

    const removeItem = (item) => {
        removeFromCart(item);
    }
    return (
        <div>
            <Button
            onClick={() => {
                setOpen(true)
                }}
            variant="primary">
                Cart
            </Button>
            <Drawer open={open}
                title="Cart"

                onClose={() => {
                    setOpen(false);
                }}
            >
                <div className="drawer-content">
                    {cartItems.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                    <table className="table">
                        <thead className="center-text">
                            <tr>
                                <th scope="col">Item</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Price</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody className="center-text">
                            {cartItems
                            .map(item => (
                                    <tr key={item.name}>
                                        <td>{item.name}</td>
                                        <td>{item.qty}</td>
                                        <td>{'$' + calcPrice(item.price, item.qty)}</td>
                                        <td>
                                            <button onClick={() => removeItem(item)}>
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                            ))}
                        </tbody>
                    </table>
                    )}
                    <div className="bottom">
                        <Button>Checkout</Button>
                    </div>
                </div>
            </Drawer>
        </div>
    );
}
