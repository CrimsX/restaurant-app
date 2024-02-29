import dbConnection from "./database/database.js";
import { addCustomerToRepo, createCartRepo } from "./repositories/customer.repository.js";
import { addRestaurantToRepo } from "./repositories/restaurant.repository.js";

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


const insertCustomer = async() => {
    let c = await addCustomerToRepo(customer);
    console.log(c);
} 

const insertRestaurant = async() => {
    let r = await addRestaurantToRepo(restaurant);
    console.log(r);
}

const createCart = async() => {
    createCartRepo(1);
}

createCart();


