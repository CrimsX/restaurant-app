import { getCustomerRepo } from "../repositories/customer.repository.js";

export const getCustomer = async(req, res) => {
    const { cid } = req.params;
    try {
        const customer = await getCustomerRepo({cid: cid})
        return res.status(200).json({ 
            status: 200, 
            data: customer
        });
    } catch (e) {
        return res.status(400).json({
            status: 400, 
            message: e.message
        });
    }
}