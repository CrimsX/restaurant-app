import dbConnection from "./database/database.js";
import Cart from "./models/cart.model.js";
import Item from "./models/item.model.js";
import { addCustomerToRepo, getCustomerRepo } from "./repositories/customer.repository.js";
import { addRestaurantToRepo, addItemRepo, getRestaurantRepo } from "./repositories/restaurant.repository.js";
import { createOrderRepo } from "./repositories/order.repository.js";
import { createCartRepo, addItemToCartRepo } from "./repositories/cart.repository.js";
import { ObjectId } from "mongoose";

dbConnection();
const customer =  {
    name: "Jack",
    username: "Jackker",
    email: "jack@mymail.com",
    pw: "12345",
    address: {
        street: "123 Nowhere",
        city: "Leduc", 
        postalcode: "TEEHEE"
    }
}

const restaurant = {
    name: "Deliscio",
    email: "Iwant@pizza.ca",
    pw: "pizzaria",
    address: {
        street: " 456 somewwhere",
        city: "Leduck",
        postalcode: "HEEHEE"
    }
}

const testItem = {
    name: "Spring Rolls",
    price: 16.99
}

//create a customer
const insertCustomer = async() => {
    let c = await addCustomerToRepo(customer);
    console.log(c);
} 

//create a restaurant
const insertRestaurant = async() => {
    let r = await addRestaurantToRepo(restaurant);
}

//add menu item to restaurant, only if 
const createMenuItem = async() => {
    let i = await addItemRepo({cid: 1}, testItem);
}

//create a shopping cart
const addToCart = async() => {
    const q = 2;
    let test_item = await Item.findOne({name: "Spring Rolls"})
    const order = {
        item: test_item,
        quantity: q,
        total: test_item.price * q
    }
    const info = {
        order: order,
        rid: test_item.rid
    }
    const c = await addItemToCartRepo({cid: 2}, info);
    console.log(c);
}

const createOrder = async() => {
    let cart = await Cart.findOne({cid: 1});
    createOrderRepo(cart);
}

const getRestaurant = async() => { 
    const res = await getRestaurantRepo({rid: 1});
    console.log(res);
}

const test = async() => {
    let cart = await Cart.findOne({cid: 1, rid: 1, items: { $elemMatch: {item: ObjectId('65e36c2dc4c18783781e48b5')}}})
    console.log(cart);
}

addToCart();