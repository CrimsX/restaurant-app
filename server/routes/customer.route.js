import express from "express";
import { getCustomer } from "../controllers/customer.controller.js";

const customerRouter = express.Router();

customerRouter.get("/:cid", getCustomer);

export default customerRouter; 