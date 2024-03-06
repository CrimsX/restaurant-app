import Cart from "../models/cart.model.js";

export const getCartRepo = async(query) => {
    try {
        let cart = await Cart.findOne(query).populate("items.item");
        return cart;
    } catch (e) {
        throw Error ("Error while getting cart")
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
        throw Error ("Error while creating cart")
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
                existingItem.quantity = existingItem.quantity + body.order.quantity; //update quantity
                existingItem.total = (parseFloat(existingItem.total) + body.order.total).toFixed(2); //update the price of the existing item
                cart.total = (parseFloat(cart.total) + body.order.total); //update the total price of cart
                let saved = await Cart.findOneAndUpdate(query, cart, {new: true});
                return saved;
            } else { //add new item
                let total = parseFloat(cart.total) + body.order.total; //update the price 
                cart = await Cart.findOneAndUpdate({cid: query.cid, rid: body.rid}, {$set: {total: total}, $push: {items: body.order}}, {new: true})          
                return cart;
            }
        }
        else { //cart is empty
            let total = parseFloat(cart.total) + body.order.total; //update the price
            let newcart = await Cart.findOneAndUpdate({cid: query.cid}, 
                {$set: {total: total, rid: body.rid}, $push: {items: body.order}}, {new: true})
            console.log(newcart);
            return newcart;
        }
    } catch (e) {
        throw Error ("Error while adding item to cart");
    }
}

//edit the user shopping cart
export const editCartRepo = async(query, body) => {
    try {
        let cart = await Cart.findOne(query).populate('items.item');
        if (!cart) { //create new cart if none exist
            return "Cart is empty"
        }
        if (cart.items.length > 0 && cart.rid > -1) { //cart is not empty
            const existingItem = cart.items.find(item => String(item.item._id) === String(body._id));
            if (existingItem) { //update quantity and price
                let saved;
                if (body.quantity < 1) { //remove item if quantity is 0
                    cart.total = (parseFloat(cart.total) - existingItem.total);
                    saved = await Cart.findOneAndUpdate(query, {$set: {total: cart.total}, $pull: {items: { item: body._id }}}, {new: true})
                }
                else { //update item quantity
                    existingItem.quantity = body.quantity; //update quantity
                    cart.total = (parseFloat(cart.total) - existingItem.total); //substract the previous total price for the item
                    existingItem.total = (parseFloat(existingItem.item.price) * body.quantity); //update the price of the existing item
                    cart.total = ((parseFloat(cart.total) +parseFloat(existingItem.total))); //update price
                    saved = await Cart.findOneAndUpdate(query, cart, {new: true});
                }
                return saved;
            } else { 
                return "Item does not exist"
            }
        }
    } catch (e) {
        throw Error ("Error while updating shopping cart")
    }

}

export const removeItemRepo = async(query, body) => {
        let cart = await Cart.findOne(query).populate('items.item');
        if (!cart) { //create new cart if none exist
            return "Cart is empty";
        }
        const existingItem = cart.items.find(item => String(item.item._id) === String(body._id));
        if (existingItem) { //update quantity and price
            cart.total = (parseFloat(cart.total) - existingItem.total); //update price 
            //remove item
            let saved = await Cart.findOneAndUpdate(query, {$set: {total: cart.total}, $pull: {items: { item: body._id }}}, {new: true});
            return saved;
        } 
        return ("Can't find item in cart");


}

//reset user cart by deleting and making new cart
export const resetCartRepo = async(query) => {
    try {
        let removed = await Cart.deleteOne(query); //delete cart
        query.total = 0;
        let newcart = await new Cart(query).save();
        return newcart;
    } catch (e) {
        throw Error ("Error while reseting cart");
    }

}

