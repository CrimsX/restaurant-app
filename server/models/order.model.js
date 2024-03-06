import mongoose, {Schema} from "mongoose";

const getPrice = (num) => {
    return (num/100).toFixed(2);
}

const setPrice = (num) => {
    return (num * 100).toFixed(0);
}

const getSchedule = (num) => { 
    if (num < 0) {
        return "Immediate Pickup";
    }
    else {
        return "Later Pickup";
    }
}

const getStatus = (num) => {
    switch(num) {
        case 1:
            return "In-progress";
        case 2: 
            return "Awaiting-Pickup"
        case 3: 
            return "Completed"
        default:
            return "Ordered"
    }
}

const OrderItemSchema = new Schema(
    {
        item: {type: Schema.Types.ObjectId, ref: 'Items'},
        quantity: {type: Number,  required: true },
        total: {type: Number,  get: getPrice} 
    }
)

const OrderSchema = new Schema(
    {
        order_id: {type: Number, required: true},
        items: [{type:OrderItemSchema, required: true}],
        customer: {type: Schema.Types.ObjectId, ref: 'Customer'},
        restaurant: {type: Schema.Types.ObjectId, ref: 'Restaurant'},
        total:  {type: Number,  get: getPrice},
        status: {type: Number, get: getStatus, default: 0},
        schedule: {type: Number, get: getSchedule, default: -1},
        pickup: {type: Date},
        createdAt: {
            type: Date,
            default: Date.now,
        }

    }
)

const Order = mongoose.model("Order", OrderSchema);
export default Order;