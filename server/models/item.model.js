import mongoose, {Schema} from "mongoose";

const ItemSchema = new Schema(
    {
        name: { type: String, required: true},
        price: { type: Number, required: true }
    }
)

const Item = mongoose.model("Item", ItemSchema);
export default Item;