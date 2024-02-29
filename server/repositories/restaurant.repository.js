import Restaurant from "../models/restaurant.model.js";

export const addRestaurantToRepo = async(body) => {
    const maxID = await Restaurant.find().sort({"cid": -1}).limit(1);
    if (maxID.length < 1) {
        body["rid"] = 1;
    } else {
        body["rid"] = maxID[0].rid + 1;
    }
    console.log(maxID)
    try {
        const restaurant = new Restaurant(body);
        const saved = restaurant.save();
        return saved;
    }catch (e) {
        throw error ("Error while create profile")
    }
}