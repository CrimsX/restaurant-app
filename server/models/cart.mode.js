import mongoose, {Schema} from "mongoose";

const getPrice = (num) => {
    return (num/100).toFixed(2);
}

const setPrice = (num) => {
    return (num * 100).toFixed(0);
}

const OrderItemSchema = new mongoose.Schema(
    {
        item: { 
            name: {type: String},
            price: {type: Number,  get: getPrice, set: setPrice}
        },
        quantity: { type: Number, required: true },
        total: { type: Number,  get: getPrice, set: setPrice, required: true} 
    }
)

const CartSchema = new mongoose.Schema( 
    {
        items: [{type: OrderItemSchema}],
        cid: {type: Number},
        rid: {type: Number},
        total: {type: Number,  get: getPrice, set: setPrice}
    }
)

const Cart = mongoose.model("Cart", CartSchema);
export default Cart;
