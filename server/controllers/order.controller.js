import { createOrderRepo, getOrdersRepo, getSpecOrdeRepo, setOrderStatusRepo } from "../repositories/order.repository.js";

export const createOrder = async(req, res) => {
    const { cid } = req.body;
    try {
        const order = await createOrderRepo({cid: cid});
        return res.status(200).json({ 
            status: 200, 
            data: order
        });
    } catch (e) {
        return res.status(400).json({
            status: 400, 
            message: e.message
        });
    }
}

export const getOrdersCustomer = async(req, res) => {
    const { cid } = req.params;
    try {
        const orders = await getOrdersRepo({cid: cid});
        return res.status(200).json({ 
            status: 200, 
            data: orders
        });
    } catch (e) {
        return res.status(400).json({
            status: 400, 
            message: e.message
        });
    }
}

export const getOrdersRes = async(req, res) => {
    const { rid } = req.params;
    try {
        const orders = await getOrdersRepo({rid: rid});
        return res.status(200).json({ 
            status: 200, 
            data: orders
        });
    } catch (e) {
        return res.status(400).json({
            status: 400, 
            message: e.message
        });
    }
}

export const getSpecOrderCustomer = async(req, res) => {
    const { cid } = req.params;
    const { body } = req.body;
    try {
        const orders = await getSpecOrdeRepo(cid, body);
        return res.status(200).json({ 
            status: 200, 
            data: orders
        });
    } catch (e) {
        return res.status(400).json({
            status: 400, 
            message: e.message
        });
    }
}

export const setOrderStatus = async(req, res) => {
    const { rid } = req.params;
    try {
        const orders = await setOrderStatusRepo(rid, req.body);
        return res.status(200).json({ 
            status: 200, 
            data: orders
        });
    } catch (e) {
        return res.status(400).json({
            status: 400, 
            message: e.message
        });
    }
}
