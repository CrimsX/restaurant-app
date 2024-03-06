import Cart from "../models/cart.model.js";

export const getCartRepo = async(query) => {
    try {
        let cart = await Cart.findOne(query);
        return cart;
    } catch (e) {
        throw error ("Error while getting cart")
    }
}

/**
 * Method to create a shopping cart
 */
export const createCartRepo = async(body) => {
    try {
        let cart = await Cart.findOne(body);
        if (cart === null) { //create new cart if none exist
            body.total = 0;
            cart = await new Cart(body); //create new cart with the item
            let saved = await cart.save();
            return saved;
        } else {
            return cart;
        }
    } catch (e) {
        throw error ("Error while creating cart")
    }
}

export const addItemToCartRepo = async(query, body) => {
    try {
        let cart = await Cart.findOne(query).populate('items.item');
        if (!cart) { //create new cart if none exist
            query.total = 0;
            cart = await new Cart(query).save();
        }
        if (cart.items.length > 0 && cart.rid > -1) { //cart is not empty
            if (cart.rid != body.rid){ //check if the add item is from the same restaurant
                return ("Item is not from the same restaurant");
            }
            const existingItem = cart.items.find(item => String(item.item._id) === String(body.order.item._id));
            if (existingItem) { //update qunatity and price if item already in cart
                existingItem.quantity += body.order.quantity;
                existingItem.total = parseFloat(existingItem.total) + body.order.total;
                cart.total = parseFloat(cart.total) + body.order.total;
                let saved = await cart.save();
                return saved;
            } else {
                let total = parseFloat(cart.total) + body.order.total; //update the price 
                cart = await Cart.findOneAndUpdate({cid: query.cid, rid: body.rid}, {$set: {total: total}, $push: {items: body.order}}, {new: true})            
                return cart;
            }
            
        }
        else { //cart is empty
            let total = parseFloat(cart.total) + body.order.total; //update the price
            let newcart = await Cart.findOneAndUpdate({cid: query.cid}, 
                {$set: {total: total, rid: body.rid}, $push: {items: body.order}}, {new: true})
            return newcart;
        }
    } catch (e) {
        throw error ("Error while adding item to cart")
    }
}


