import dbConnection from "./database/database.js";
import Cart from "./models/cart.model.js";
import { addCustomerToRepo, getCustomerRepo } from "./repositories/customer.repository.js";
import { addRestaurantToRepo, addItemRepo, getRestaurantRepo } from "./repositories/restaurant.repository.js";
import { createOrderRepo } from "./repositories/order.repository.js";
import { createCartRepo, addItemToCartRepo } from "./repositories/cart.repository.js";

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
    const order = {
        item: testItem,
        quantity: q,
        total: testItem.price * q
    }
    const info = {
        order: order,
        rid: 2
    }
    const c = await addItemToCartRepo({cid: 1}, info);
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
    const c = await createCartRepo({cid: 1})
    console.log(c.items.length);
}

test();