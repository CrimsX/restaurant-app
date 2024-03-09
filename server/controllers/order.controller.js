import { createOrderRepo, getOrdersRepo, getOrdersRepo2, getSpecOrdeRepo, setOrderStatusRepo } from "../repositories/order.repository.js";

export const createOrder = async(req, res) => {
    const { cid } = req.params;
    try {
        const order = await createOrderRepo({cid: cid}, req.body);
        return res.status(200).json({ 
            status: 200, 
            success: order[0],
            data: order[1]
        });
    } catch (e) {
        return res.status(400).json({
            status: 400, 
            success: false,
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
            success: orders[0],
            data: orders[1]
        });
    } catch (e) {
        return res.status(400).json({
            status: 400, 
            success: false,
            message: e.message
        });
    }
}

export const getOrdersRes = async(req, res) => {
    const { rid } = req.params;
    try {
        const orders = await getOrdersRepo2({rid: rid});
        return res.status(200).json({ 
            status: 200, 
            success: orders[0],
            data: orders[1]
        });
    } catch (e) {
        return res.status(400).json({
            status: 400, 
            success: false,
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
            success: false,
            message: e.message
        });
    }
}

export const setOrderStatus = async(req, res) => {
    const { rid } = req.params;
    try {
        const order = await setOrderStatusRepo(rid, req.body);
        return res.status(200).json({ 
            status: 200, 
            success: order[0],
            data: order[1]
        });
    } catch (e) {
        return res.status(400).json({
            status: 400, 
            success: false,
            message: e.message
        });
    }
}
