import mongoose, {Schema} from "mongoose";

const OrderItemSchema = new mongoose.Schema(
    {
        item: {type: Schema.Types.ObjectId, ref: 'Item'},
        quantity: { type: Number, required: true },
        total: { type: Number, required: true} 
    }
)

const CartSchema = new mongoose.Schema(
    {
        items: [{type:[OrderItemSchema], required: true}],
        cid: {type: Number, required: true},
        rid: {type: Number, required: true},
        total: {type: Number, required: true}
    }
)

const Cart = mongoose.model("Cart", CartSchema);
export default Cart;
