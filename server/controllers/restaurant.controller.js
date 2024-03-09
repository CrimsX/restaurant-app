import { setItemStatusRepo, getRestaurantRepo, getMenuRepo } from "../repositories/restaurant.repository.js";

export const getRestaurant = async(req, res) => {
    const { rid } = req.params;
    try {
        const restaurant = await getRestaurantRepo({rid: rid})
        return res.status(200).json({ 
            status: 200, 
            success: restaurant[0],
            data: restaurant[1]
        });
    } catch (e) {
        return res.status(400).json({
            status: 400, 
            success: false,
            message: e.message
        });
    }
}

export const getMenu = async(req, res) => {
    const { rid } = req.params;
    try {
        const menu = await getMenuRepo({rid: rid})
        return res.status(200).json({ 
            status: 200,
            success: menu[0],
            data: menu[1]
        });
    } catch (e) {
        return res.status(400).json({
            status: 400, 
            success: false,
            message: e.message
        });
    }
}

export const setItemStatus = async(req, res) => {
    const { rid } = req.params;
    try {
        const menu = await setItemStatusRepo({rid: rid}, req.body)
        return res.status(200).json({ 
            status: 200, 
            success: menu[0],
            data: menu[1]
        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            success: false,
            message: e.message
        });
    }
}