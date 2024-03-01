import dbConnection from "./database/database.js";
import { addCustomerToRepo } from "./repositories/customer.repository.js";
import { addRestaurantToRepo, addItemRepo } from "./repositories/restaurant.repository.js";
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
    name: "Spring Roll",
    price: 20
}


const insertCustomer = async() => {
    let c = await addCustomerToRepo(customer);
    console.log(c);
} 

const insertRestaurant = async() => {
    let r = await addRestaurantToRepo(restaurant);
}

const createItem = async() => {
    let i = await addItemRepo(1, testItem);
}

createItem();


