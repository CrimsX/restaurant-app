import express from "express";
import { getCustomer } from "../controllers/customer.controller.js";
import { getCart, addToCart, resetCart, editCart, removeFromCart } from "../controllers/cart.controller.js";
import { createOrder, getOrdersCustomer } from "../controllers/order.controller.js";
const customerRouter = express.Router();

customerRouter.get("/:cid", getCustomer);

//cart information
customerRouter.get("/cart/:cid", getCart);
customerRouter.delete("/cart/:cid", resetCart); //reset cart
customerRouter.patch("/cart/add/:cid", addToCart); //add item to cart
customerRouter.patch("/cart/edit/:cid", editCart); //edit item quantity from cart
customerRouter.patch("/cart/remove/:cid", removeFromCart); //remove an item from cart

//orders information
customerRouter.patch("/order/:cid", createOrder); //create order from cart
customerRouter.get("/orders/:cid", getOrdersCustomer)

export default customerRouter; 