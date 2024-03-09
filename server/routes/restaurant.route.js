import express from "express";
import { getRestaurant, getMenu, setItemStatus} from "../controllers/restaurant.controller.js";
import { getOrdersRes, setOrderStatus } from "../controllers/order.controller.js";
const restaurantRouter = express.Router();

restaurantRouter.get("/:rid", getRestaurant);
restaurantRouter.get("/menu/:rid", getMenu);
restaurantRouter.patch("/menu/:rid", setItemStatus);

//order 
restaurantRouter.get("/orders/:rid", getOrdersRes);
restaurantRouter.patch("/order/:rid", setOrderStatus);

export default restaurantRouter; 