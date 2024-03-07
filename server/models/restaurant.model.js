import mongoose, {Schema} from "mongoose";

const addressSchema = new Schema(
    {
        street: {type: String, required: true},
        suite: {type: String, required: false},
        city: {type: String, required: true}, 
        postalcode: {type: String, required: true},
    }
);

const RestaurantSchema = new Schema(
    {
        name: { type: String, required: true },
        rid: { type: Number, required: true },
        email: {type: String, required: true },
        pw: {type: String, required: true },
        address: {type: addressSchema, required: true},
        menu: [{type: Schema.Types.ObjectId, ref: 'Item'}],
    }
)

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
export default Restaurant;