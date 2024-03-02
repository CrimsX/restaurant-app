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

/**
 * Method to create a shopping cart or add item to a shopping
 * @param {} query - contain the customer id
 * @param {*} info - contain array of OrderItem object and restaurant id
 * @returns 
 */
export const createCartRepo = async(query, info) => {
    //const cid = query.cid; //use this version if pass through route
    const cid = query; //customer ID
    let cart = await Cart.findOne({cid: cid});
    let saved; 
    try {
        if (cart === null) { //create new cart if none exist
            info.cid = cid;
            info.total = "33.98"
            cart = await new Cart(info); //create new cart with the item
            saved = await cart.save();
            console.log(saved);
            return saved;
        } else {
            if (cart.rid != info.rid){ //check if the add item is from the same restaurant
                console.log("Not from the same restaurant");
                return;
            }
            let total = parseFloat(cart.total) + info.items[0].total; //update the price 
            let newcart = await Cart.findOneAndUpdate({cid: cid, rid: info.rid}, {$set: {total: total}, $push: {items: info.items}}, {new: true})
            return newcart;
        }
    } catch (e) {
        throw error ("Error while creating cart")
    }
}



