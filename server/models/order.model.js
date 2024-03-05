import mongoose, {Schema} from "mongoose";

const getPrice = (num) => {
    return (num/100).toFixed(2);
}

const setPrice = (num) => {
    return (num * 100).toFixed(0);
}

const OrderItemSchema = new Schema(
    {
        item: {
            name: {type: String},
            price: {type: Number,  get: getPrice}
        },
        quantity: {type: Number,  required: true },
        total: {type: Number,  get: getPrice} 
    }
)

const OrderSchema = new Schema(
    {
        items: [{type:[OrderItemSchema], required: true}],
        customer: {type: Schema.Types.ObjectId, ref: 'Customer'},
        restaurant: {type: Schema.Types.ObjectId, ref: 'Restaurant'},
        total:  {type: Number,  get: getPrice},
        orderAt: {
            type: Date,
            default: Date.now,
        }
    }
)

const Order = mongoose.model("Order", OrderSchema);
export default Order;