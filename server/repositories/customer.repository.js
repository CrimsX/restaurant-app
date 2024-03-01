import Customer from "../models/customer.model.js";
import Cart from "../models/cart.mode.js";

export const addCustomerToRepo = async(body) => {
    const maxID = await Customer.find().sort({"cid": -1}).limit(1);
    if (maxID.length < 1) {
        body["cid"] = 1;
    } else {
        body["cid"] = maxID[0].cid + 1; //increment current id
    }
    try {
        const customer = new Customer(body);
        const saved = await customer.save();
        return saved;
    }catch (e) {
        throw error ("Error while create profile")
    }
}

export const createCartRepo = async(query, info) => {
    const cid = query.cid; //customer ID
    let cart = await Cart.findOne({cid: cid});
    if (cart === null) {
        info["cid"] = cid;
        cart = new Cart
    }
}