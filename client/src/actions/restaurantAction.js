import axios from "axios";

/*
  Hold all actions for restaurant related methods
  All data fetched from the endpoint contain status, success, and data field.
*/
const connection = "http://localhost:8000";

export const getRestaurant = async (rid) => {
  try {
    const url = connection + `/restaurant/${rid}`;
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error("Error fetching restaurant info:", error);
    throw error;
  }
};

//--------------------------------Menu Item Manipulation------------------------------

/**
 * Get all menu item for the restaurant (for restaurant side)
 * @param {*} rid
 * @returns
 */
export const getMenu = async (rid) => {
  try {
    const url = connection + `/restaurant/menu/${rid}`;
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error("Error fetching restaurant info:", error);
    throw error;
  }
};

/**
 * Get all menu item for a restaurant, item that are not available will not be shown
 * @param {*} rid
 * @returns
 */
const getMenuCustomer = async (rid) => {
  try {
    const url = connection + `/restaurant/menu/customer/${rid}`;
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error("Error fetching restaurant info:", error);
    throw error;
  }
};

/**
 * Add item to restaurant menu
 * @param {*} rid - restaurant id
 * @param {*} item - object containing item information and worker id to check for authorization
 * {
 *  name: name of the item,
 *  category: 1 = main, 2 = appetizer, 3 = dessert/beverage,
 *  price: float/decimal
 *  wid: id of the worker authorizing
 * }
 */
export const addItem = async (rid, item) => {
  try {
    const url = connection + `/restaurant/menu/${rid}`;
    const { data } = await axios.post(url, item);
    return data;
  } catch (error) {
    console.error("Error fetching restaurant info:", error);
    throw error;
  }
};

/**
 * Update existing item in menu using object id
 * @param {*} rid - restaurant id
 * @param {*} item - object holding object id of the item, the worker, price to be change to, status to be change to.
 * format:
 * {
 *  _id: object id of the menu item to be change,
 *  wid: id of the working making the change,
 *  price: the updated price (optional, does not need to be included if wish only to change status)
 *  status: 0 or 1 (change the item availability status, optional if only wish to change the price)
 * }
 */
export const updateItem = async (rid, item) => {
  try {
    const url = connection + `/restaurant/menu/${rid}`;
    const { data } = await axios.patch(url, item);
    return data;
  } catch (error) {
    console.error("Error fetching restaurant info:", error);
    throw error;
  }
};

/**
 * remove item from restaurant using the item object id
 * @param {*} rid - restaurant id
 * @param {*} item - object holding the item object id
 * {
 *  _id: string
 * }
 * @returns
 */
export const removeItem = async (rid, item) => {
  try {
    const url = connection + `/restaurant/menu/${rid}`;
    const { data } = await axios.delete(url, item);
    return data;
  } catch (error) {
    console.error("Error fetching restaurant info:", error);
    throw error;
  }
};
