import Order from "../models/order.model.js";
import Customer from "../models/customer.model.js";
import Restaurant from "../models/restaurant.model.js";

export const createOrderRepo = async(query, body) => { 
        try {
        //this version will retrieve the user cart first using the cid
                let cart = await Order.findOne({cid: query.cid, status: -1}).populate("items.item");
                if (cart === null || cart.items.length < 0) {
                        return [false, "Empty cart"];
                }
                let customer = await Customer.findOne({cid: cart.cid}).select("_id");
                let restaurant = await Restaurant.findOne({rid: cart.rid}).select("_id");
                cart.order_id = new Date().valueOf(); //generate orderID
                cart.status = 0; //set cart to ordered
                cart.customer = customer._id;
                cart.restaurant = restaurant._id;
                cart.schedule = body.schedule;
                cart.orderAt = new Date();
                let order = await cart.save();
                return [true, order];
        } catch (e) {
                throw Error ("Error while creating order");
        }
    }

export const getOrdersRepo = async(query) => {
        try {
                let orders = await Order.find({cid: query.cid, status: {$gt: -1}}).populate("items.item"); //return an array
                return [true, orders];
        }
        catch (e) { 
                throw Error ("Error while retrieving orders")
        }
}

export const getOrdersRepo2 = async(query) => {
        try {
                let orders = await Order.find({rid: query.rid, status: {$gt: -1}}).populate("items.item"); //return an array
                return [true, orders];
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
                let orders = await Order.findOne({cid: cid, order_id: order_id, status: {$gt: -1}}).populate("items.item");
                return orders;
        }
        catch (e) { 
                throw Error ("Error while retrieving customer's orders")
        }
}

//query is the restaurant id
//Body will hold the employee code to check if they authorize to do so.
export const setOrderStatusRepo= async(rid, body) => {
        try {
                let order = await Order.findOneAndUpdate({rid: rid, order_id: body.order_id, status: {$gt: -1}}, {$set: {status: body.status}}, {new: true}).populate("items.item");
                if ( order === null ) {
                        return [false, "Order not found"];
                }
                return [true, order];
        }
        catch (e) { 
                throw Error ("Error while update order status")
        }
}

