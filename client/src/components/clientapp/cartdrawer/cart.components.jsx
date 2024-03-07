import React, { useState } from "react";
import { Button } from 'react-bootstrap';
import { Drawer } from "antd";
import './cart.styles.css'

export const Cart = () => {
    const [open, setOpen] = useState(false);
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
                    <p>this is the drawer</p>
                    <div className="bottom">
                        <Button>Checkout</Button>
                    </div>
                </div>
            </Drawer>
        </div>
    );
}
