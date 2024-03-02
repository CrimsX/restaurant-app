import mongoose, {Schema} from "mongoose";



const OrderItemSchema = new Schema(
    {
        item: {type: Schema.Types.ObjectId, ref: 'Item'},
        quantity: { type: Number, required: true },
        total: { type: Number, required: true} 
    }
)

const OrderSchema = new Schema(
    {
        items: [{type:[OrderItemSchema], required: true}],
        customer: {type: Schema.Types.ObjectId, ref: 'Customer'},
        restaurant: {type: Schema.Types.ObjectId, ref: 'Restaurant'},
        time: { type: Date, required: true},
        total: {type: String}
    }
)

const Order = mongoose.model("Order", OrderSchema);
export default Order;