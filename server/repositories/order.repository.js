import Order from "../models/order.model.js";
import Cart from "../models/cart.mode.js";
import Customer from "../models/customer.model.js";
import Restaurant from "../models/restaurant.model.js";

export const createOrderRepo = async(info) => { //not complete, but is able to create cart in test
    let cart = {};
    let customer = await Customer.findOne({cid: info.cid}).select("_id");
    let restaurant = await Restaurant.findOne({rid: info.rid}).select("_id");
    cart["customer"] = customer;
    cart["restaurant"] = restaurant
    cart["items"] = info.items;
    let order = new Order(cart);
    let saved = await order.save();
}