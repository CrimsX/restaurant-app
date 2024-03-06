import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";
import Customer from "../models/customer.model.js";
import Restaurant from "../models/restaurant.model.js";

export const createOrderRepo1 = async(body) => { //this version takes the cart object 
        try {
                if (body === null || body.items.length < 0) {
                        return "Empty cart";
                }
                let customer = await Customer.findOne({cid: body.cid}).select("_id");
                let restaurant = await Restaurant.findOne({rid: body.rid}).select("_id");
                let order = new Order({order_id: new Date().valueOf()});
                order.customer = customer._id;
                order.restaurant = restaurant._id;
                order.items = body.items;
                order.total = body.total;
                let saved = (await order.save()).populate("items.item");
                let removed = await Cart.deleteOne({cid: body.cid}); //delete cart
                return saved;
        } catch (e) {
                throw Error ("Error while creating order")
        }
}

export const createOrderRepo = async(query) => { 
        //this version will retrieve the user cart first using the cid
        try {
                let body = await Cart.findOne(query);
                if (body === null || body.items.length < 0) {
                        return "Empty cart";
                }
                let customer = await Customer.findOne({cid: body.cid}).select("_id");
                let restaurant = await Restaurant.findOne({rid: body.rid}).select("_id");
                let order = new Order({order_id: new Date().valueOf()});
                order.customer = customer._id;
                order.restaurant = restaurant._id;
                order.cid = body.cid;
                order.rid = body.rid;
                order.items = body.items;
                order.total = body.total;
                let saved = (await order.save()).populate("items.item");
                let removed = await Cart.deleteOne({cid: body.cid}); //delete cart
                return saved;
        } catch (e) {
                throw Error ("Error while creating order")
        }
}

export const getOrdersRepo = async(query) => {
        try {
                let orders = await Order.find(query).populate("items.item"); //return an array
                return orders;
        }
        catch (e) { 
                throw Error ("Error while retrieving orders")
        }
}



//for searching for specific order
export const getSpecOrdeRepo = async(query, body) => {
        try {
                const cid = query.cid;
                const order_id = body.order_id;
                let orders = await Order.findOne({cid: cid, order_id: order_id}).populate("items.item");
                return orders;
        }
        catch (e) { 
                throw Error ("Error while retrieving customer's orders")
        }
}

//query is the restaurant id
export const setOrderStatusRepo= async(rid, body) => {
        try {
                let order = await Order.findOneAndUpdate({rid: rid, order_id: body.order_id}, {$set: {status: body.status}}, {new: true}).populate("items.item");
                return order;
        }
        catch (e) { 
                throw Error ("Error while update order status")
        }
}

