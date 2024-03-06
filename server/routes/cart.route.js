import express from "express";
import { getCart, createCart, addToCart, resetCart, editCart, removeFromCart } from "../controllers/cart.controller.js";

const cartRouter = express.Router();

cartRouter.get("/:cid", getCart);
cartRouter.delete("/:cid", resetCart);
cartRouter.patch("/add/:cid", addToCart);
cartRouter.patch("/edit/:cid", editCart);
cartRouter.patch("/remove/:cid", removeFromCart);

export default cartRouter; 