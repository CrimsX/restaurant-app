import { getCartRepo, createCartRepo, addItemToCartRepo} from "../repositories/cart.repository.js";

export const getCart = async(req, res) => {
    const { cid } = req.params;
    try {
        const cart = await getCartRepo({cid: cid})
        return res.status(200).json({ 
            status: 200, 
            data: cart
        });
    } catch (e) {
        return res.status(400).json({
            status: 400, 
            message: e.message
        });
    }
} 

export const createCart = async(req, res) => {
    try {
        const cart = await createCartRepo(req.body);
        return res.status(200).json({ 
            status: 200, 
            data: cart
        });
    } catch (e) {
        return res.status(400).json({
            status: 400, 
            message: e.message
        });
    }
}

export const addToCart = async(req, res) => {
    const { cid } = req.params;
    try {
        const cart = await addItemToCartRepo({cid: cid}, req.body);
        return res.status(200).json({ 
            status: 200, 
            data: cart
        });
    } catch (e) {
        return res.status(400).json({
            status: 400, 
            message: e.message
        });
    }
}

