import Restaurant from "../models/restaurant.model.js";
import Item from "../models/item.model.js";

export const addRestaurantToRepo = async(body) => {
    const maxID = await Restaurant.find().sort({"cid": -1}).limit(1);
    if (maxID.length < 1) {
        body["rid"] = 1;
    } else {
        body["rid"] = maxID[0].rid + 1;
    }
    try {
        const restaurant = new Restaurant(body);
        const saved = await restaurant.save();
        return saved;
    } catch (e) {
        throw error ("Error while create profile")
    }
}

export const addItemRepo = async(query, body) => {
    //const rid = query.rid; //use this version if pass through route
    const rid = query;
    try {
        const newItem = new Item(body);
        const saved = await newItem.save();
        const restaurant = await Restaurant.findOneAndUpdate({rid: query}, {$push: {menu: saved._id}}, {new: true});
        console.log(restaurant);
    }  catch (e) {
        throw error ("Error while adding new item")
    }
}