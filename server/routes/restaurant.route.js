import express from "express";
import { getRestaurant, getMenu, getMenuCustomer,updateItem, removeItem, addItem, getMenuItem, getAllRestaurants, getEmployees } from "../controllers/restaurant.controller.js";
import { getOrdersRes, setOrderStatus, getOrdersHistory } from "../controllers/order.controller.js";
import { getProfit, getPopularItem, getPopularHours } from "../controllers/analytic.controller.js";
const restaurantRouter = express.Router();

restaurantRouter.get("/restaurants", getAllRestaurants)
restaurantRouter.get("/:rid", getRestaurant);
restaurantRouter.get("/menu/:rid", getMenu);
restaurantRouter.get("/menu/:rid/:mid", getMenuItem);
restaurantRouter.get("/menu/customer/:rid", getMenuCustomer);
restaurantRouter.patch("/menu/:rid", updateItem);
restaurantRouter.delete("/menu/:rid", removeItem);
restaurantRouter.post("/menu/:rid", addItem);

//order 
restaurantRouter.get("/orders/:rid", getOrdersRes);
restaurantRouter.get("/orders/history/:rid", getOrdersHistory);
restaurantRouter.patch("/order/:rid", setOrderStatus);

//analytic
restaurantRouter.get("/analytic/profit/:rid", getProfit);
restaurantRouter.get("/analytic/items/:rid", getPopularItem);
restaurantRouter.get("/analytic/hours/:rid", getPopularHours);

//employee 
restaurantRouter.get("/employees/:rid", getEmployees);


export default restaurantRouter; 