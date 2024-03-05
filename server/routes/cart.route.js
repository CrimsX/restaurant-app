import express from "express";
import { getCart, createCart, addToCart } from "../controllers/cart.controller.js";

const cartRouter = express.Router();

cartRouter.get("/:cid", getCart);
cartRouter.post("/", createCart);
cartRouter.patch("/:cid", addToCart)

export default cartRouter; 