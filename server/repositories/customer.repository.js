import Customer from "../models/customer.model.js";
import Cart from "../models/cart.model.js";
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
        throw Error ("Error while create profile")
    }
}

export const getCustomerRepo = async(query) => {
    try {
        const customer = await Customer.findOne(query).select("-pw -_id");
        return customer;
    } catch (e) {
        throw Error ("Error while attempting to retrieve profile")
    }
} 




