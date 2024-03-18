import Restaurant from "../models/restaurant.model.js";
import Employee from "../models/employee.model.js";
import Item from "../models/item.model.js";
import Order from "../models/order.model.js";

export const addRestaurantToRepo = async(body) => {
    const maxID = await Restaurant.find().sort({"rid": -1}).limit(1);
    if (maxID.length < 1) {
        body["rid"] = 1;
    } else {
        body["rid"] = maxID[0].rid + 1;
    }
    try {
        const restaurant = new Restaurant(body);
        const saved = await restaurant.save();
        return [true, saved];
    } catch (e) {
        throw error ("Error while create profile")
    }
}

export const getRestaurantRepo = async(query) => {
    try {
        const restaurant = await Restaurant.findOne(query).populate("menu","-_id").select('-_id -email');
        return [true, restaurant];
    } catch (e) {
        throw Error ("Error while retrieving restaurant information")
    }
}

export const getMenuRepo = async(query) => {
    try {
        const restaurant = await Restaurant.findOne(query).populate("menu");
        return [true, restaurant.menu];
    } catch (e) {
        throw Error ("Error while retrieving restaurant information")
    }
}

//filter out the unavailable item for customer
export const getMenuRepoCustomer = async(query) => {
    try {
        const restaurant = await Restaurant.findOne(query).populate("menu");
        //filter to only show available item
        const customer_menu = restaurant.menu.filter((item) => item.available === true);
        return [true, customer_menu];
    } catch (e) {
        throw Error ("Error while retrieving restaurant information")
    }
}

//remove item using object id of menu item
export const removeItemRepo = async(query, body) => {
    try {
        const authorizer = await Employee.findOne({rid: query.rid, wid: body.wid});
        if (authorizer.wid > 2 || authorizer === null) {
            return [false, "You are not authorize to make change to this item"];
        }
        const item = await Item.findOneAndDelete({rid: query.rid, _id: body._id});
        if (item === null) {
            return [false, "Cannot find item"]
        }
        const restaurant = await Restaurant.findOneAndUpdate({rid: query.rid}, {$pull: {menu: item._id}}, {new: true}).populate("menu");
        return [true, restaurant.menu];
    } catch (e) {
        throw Error ("Error while retrieving deleting menu item")
    }
}

export const addItemRepo = async(query, body) => {
    try {
        const authorizer = await Employee.findOne({rid: query.rid, wid: body.wid});
        if (authorizer.wid > 2 || authorizer === null) {
            return [false, "You are not authorize to make change to this item"];
        }
        const newItem = new Item(body);
        newItem.rid = query.rid;
        const saved = await newItem.save();
        const restaurant = await Restaurant.findOneAndUpdate({rid: query.rid}, {$push: {menu: saved._id}}, {new: true}).populate("menu");
        return [true, restaurant.menu];
    }  catch (e) {
        throw Error ("Error while adding new item")
    }
}

export const updateItemRepo = async(query, body) => {
    try { 
        const authorizer = await Employee.findOne({rid: query.rid, wid: body.wid});
        const item = await Item.findOne({_id: body._id, rid: query.rid})
        if (item === null) {
            return [false, "Item not found"];
        }
        if (authorizer.wid > 2 || item.rid != authorizer.rid || authorizer === null) {
            return [false, "You are not authorize to make change to this item"];
        }
        if (body.hasOwnProperty('status')) { //set order status
            if (body.status === 0)
                item.available = false;
            else 
                item.available = true;
        }
        if (body.hasOwnProperty("price")) {
            item.price = body.price;
        }
        const saved = await item.save();
        return [true, saved];
    } catch (e) {
        throw Error ("Error while changing item avaibility")
    }
}


export const addEmployeeRepo = async(query, body) => {
    try {
        const maxID = await Employee.find({rid: query.rid}).sort({"wid": -1}).limit(1); //find the maxID of the restaurant
        if (maxID.length < 1) {
            body["wid"] = 1;
        } else {
            body["wid"] = maxID[0].wid + 1;
        }
        const employee = new Employee(body);
        employee.rid = query.rid;
        let saved = await employee.save();
        const restaurant = await Restaurant.findOneAndUpdate({rid: query.rid}, {$push: {employees: saved._id}}, {new: true});
        return [true, restaurant];
    } catch (e) {
        throw Error ("Error while adding creating worker's profile")
    }
}