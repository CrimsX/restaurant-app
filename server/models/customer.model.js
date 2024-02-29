import mongoose, {Schema} from "mongoose";

const addressSchema = new mongoose.Schema(
    {
        street: {type: String, required: true},
        suite: {type: String, required: false},
        city: {type: String, required: true}, 
        postalcode: {type: String, required: true},
    }
);

const CustomerSchema = new mongoose.Schema (
    {
        name: {type: String, required: true },
        cid: { type: Number, required: true },
        email: {type: String, required: true },
        pw: {type: String, required: true },
        address: {type: addressSchema, required: true},
        orders: [{type: Schema.Types.ObjectId, ref: 'Order'}], 
        cart: {type: Schema.Types.ObjectId, ref: 'Cart'}
    }
)

const Customer = mongoose.model("Customer", CustomerSchema)
export default Customer;
