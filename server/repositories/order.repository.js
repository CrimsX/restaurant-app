import Order from "../models/order.model.js";
import Cart from "../models/cart.mode.js";
import Customer from "../models/customer.model.js";
import Restaurant from "../models/restaurant.model.js";

export const createOrderRepo = async(info) => {
    let order = await Cart.findOne({customer: 1});
    console.log(order);
}