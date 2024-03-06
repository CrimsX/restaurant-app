import { createOrderRepo } from "../repositories/order.repository.js";

export const createOrder = async(req, res) {
    const { cid } = req.params;
    try {
        const order = await createCartRepo({cid: cid});
        return res.status(200).json({ 
            status: 200, 
            data: order;
        });
    } catch (e) {
        return res.status(400).json({
            status: 400, 
            message: e.message
        });
    }
}
