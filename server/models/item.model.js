import mongoose, {Schema} from "mongoose";

const getPrice = (num) => {
    return (num/100).toFixed(2);
}

const setPrice = (num) => {
    return (num * 100).toFixed(0);
}

const getItemStatus = (bol) => {
    if (bol) {
        return "Available";
    }
    else {
        return "Sold out"
    }
}

//Status: true for available, false for unavailable
const ItemSchema = new Schema(
    {
        name: { type: String, required: true},
        rid: {type: Number},
        available: { type: Boolean, default: false},
        price: { type: Number, get: getPrice, set: setPrice ,required: true }
    }
)



const Item = mongoose.model("Item", ItemSchema);
export default Item;