import dbConnection from "./database/database.js";
import { addCustomerToRepo, createCartRepo } from "./repositories/customer.repository.js";
import { addRestaurantToRepo, addItemRepo, getRestaurantRepo } from "./repositories/restaurant.repository.js";
import { createOrderRepo } from "./repositories/order.repository.js";

dbConnection();
const customer =  {
    name: "Jack",
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
    price: "16.99"
}




const insertCustomer = async() => {
    let c = await addCustomerToRepo(customer);
    console.log(c);
} 

const insertRestaurant = async() => {
    let r = await addRestaurantToRepo(restaurant);
}


const createMenuItem = async() => {
    let i = await addItemRepo(1, testItem);
}

//create a shopping cart
const createCart = async() => {
    const order = {
        item: testItem,
        quantity: 2,
        total: testItem.price * 2
    }
    const info = {
        items: [order],
        rid: 1
    }
    createCartRepo(1, info);
}

const createOrder = async() => {
    createCartRepo();
}

const getRestaurant = async() => { 
    const res = await getRestaurantRepo(1);
    console.log(res);
}


