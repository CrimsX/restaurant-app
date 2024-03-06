import express from "express";
import { createOrder, getOrdersCustomer, getOrdersRes, setOrderStatus } from "../controllers/order.controller.js";

const orderRouter = express.Router();

orderRouter.post("/customer", createOrder) 
orderRouter.get("/customer/:cid", getOrdersCustomer)
orderRouter.get("/restaurant/:rid", getOrdersRes)
orderRouter.patch("/restaurant/:rid", setOrderStatus)

export default orderRouter; 