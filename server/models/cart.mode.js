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
        items: [{type: OrderItemSchema}],
        customer: {type: Schema.Types.ObjectId, ref: 'Customer'},
        restaurant: {type: Schema.Types.ObjectId, ref: 'Restaurant'},
        total: {type: Number}
    }
)

const OrderItem = mongoose.model("OrderItem", OrderItemSchema);
export default OrderItem;
