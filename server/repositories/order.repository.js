import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";
import Customer from "../models/customer.model.js";
import Restaurant from "../models/restaurant.model.js";

//create order from cart
//query in format of { cid: customer id }
export const createOrderRepo = async(query) => { //not complete, but is able to create cart in test
        try {
                let cart = await Cart.findOne(query);
                console.log(cart === null);
                if (cart === null || cart.items.length < 0) {
                        return "Empty cart";
                }
                let customer = await Customer.findOne({cid: cart.cid}).select("_id");
                let restaurant = await Restaurant.findOne({rid: cart.rid}).select("_id");
                let order = new Order({order_id: new Date().valueOf()});
                order.customer = customer._id;
                order.restaurant = restaurant._id;
                order.items = cart.items;
                order.total = cart.total;
                let saved = await order.save();
                let removed = await Cart.deleteOne({query}); //delete cart
                return saved;
        } catch (e) {
                throw error ("Error while creating order")
        }
}