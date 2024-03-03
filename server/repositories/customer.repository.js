import Customer from "../models/customer.model.js";
import Cart from "../models/cart.mode.js";
import Restaurant from "../models/restaurant.model.js";

export const addCustomerToRepo = async(body) => {
    const maxID = await Customer.find().sort({"cid": -1}).limit(1);
    if (maxID.length < 1) {
        body["cid"] = 1;
    } else {
        body["cid"] = maxID[0].cid + 1; //increment current id
    }
    try {
        const customer = await new Customer(body);
        const saved = await customer.save();
        return saved;
    }catch (e) {
        throw error ("Error while create profile")
    }
}

export const getCustomerRepo = async(query) => {
    try {
        const customer = await Customer.findOne(query).select("-pw");
        console.log(customer);
        return customer;
    } catch (e) {
        throw error ("Error while attempting to retrieve profile")
    }
} 

/**
 * Method to create a shopping cart or add item to a shopping
 * @param {} query - contain the customer id
 * @param {*} info - contain array of OrderItem object and restaurant id
 * @returns 
 */
export const createCartRepo = async(query, body) => {
    let cart = await Cart.findOne(query);
    let saved; 
    try {
        if (cart === null) { //create new cart if none exist
            body.cid = query.cid;
            body.total = "33.98"
            cart = await new Cart(info); //create new cart with the item
            saved = await cart.save();
            return saved;
        } else {
            if (cart.rid != body.rid){ //check if the add item is from the same restaurant
                return ("Item is not from the same restaurant");
            }
            let total = parseFloat(cart.total) + info.items[0].total; //update the price 
            let newcart = await Cart.findOneAndUpdate({cid: cid, rid: body.rid}, {$set: {total: total}, $push: {items: body.items}}, {new: true})
            return newcart;
        }
    } catch (e) {
        throw error ("Error while creating cart")
    }
}



