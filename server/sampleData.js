import dbConnection from "./database/database.js";
import Cart from "./models/cart.model.js";
import Item from "./models/item.model.js";
import { addCustomerToRepo, getCustomerRepo } from "./repositories/customer.repository.js";
import { addRestaurantToRepo, addItemRepo, getRestaurantRepo } from "./repositories/restaurant.repository.js";
import { createOrderRepo, getOrdersRepo } from "./repositories/order.repository.js";
import { addItemToCartRepo, editCartRepo } from "./repositories/cart.repository.js";

dbConnection();
const customer =  [{
    name: "Jack",
    username: "Jackker",
    email: "jack@mymail.com",
    pw: "12345",
    address: {
        street: "123 Nowhere",
        city: "Leduc", 
        postalcode: "TEEHEE"
    } },
    {
        name: "John",
        username: "Johnster",
        email: "jjohn@mymail.com",
        pw: "67890",
        address: {
            street: "133 Nowhere",
            city: "Edmonton", 
            postalcode: "T05H6Y"
        }
    }

]

const restaurant = [{
    name: "Deliscio",
    email: "Iwant@pizza.ca",
    pw: "pizzaria",
    address: {
        street: " 456 somewwhere",
        city: "Leduck",
        postalcode: "HEEHEE"
    }}, 
    {
    name: "Asianres",
    email: "Asianres@pizza.ca",
    pw: "springrolls",
    address: {
        street: " 789 somewwhere",
        city: "Tedmonton",
        postalcode: "H33H33"
    }},
]

const testItem = [
    {
        name: "Special Pizza",
        price: 24.99
    },
    {
        name: "Spring Rolls",
        price: 16.99
    }, 
    {
        name: "Pho Bo Vien",
        price: 18.99
    }
]

//create a customer
const insertCustomer = async() => {
    let c = await addCustomerToRepo(customer[1]);
    c = await addCustomerToRepo(customer[0]);
} 

//create a restaurant
const insertRestaurant = async() => {
    let q = await addRestaurantToRepo(restaurant[0]);
    let r = await addRestaurantToRepo(restaurant[1]);
}

//add menu items to restaurants
const createMenuItem = async() => {
    let i = await addItemRepo({rid: 1}, testItem[0]);
    let j = await addItemRepo({rid: 2}, testItem[1]);
    j = await addItemRepo({rid: 2}, testItem[2]);
}

//create a shopping cart
const addToCart = async() => {
    const q = 1;
    let test_item = await Item.findOne({name: "Special Pizza"})
    let test_item2 = await Item.findOne({name: "Spring Rolls"})
    const order = {
        item: test_item,
        quantity: q,
        total: test_item.price * q
    }
    const info = {
        order: order,
        rid: test_item.rid
    }

    const order2 = {
        item: test_item2,
        quantity: q,
        total: test_item2.price * q
    }
    const info2 = {
        order: order2,
        rid: test_item2.rid
    }
    //let c = await addItemToCartRepo({cid: 2}, info);
    let c = await addItemToCartRepo({cid: 1}, info2);

}

const createOrder = async() => {
    //let body = await Cart.findOne({cid: 1})
    let order = await createOrderRepo({cid:1});
    console.log(order.items.item);
}

const getRestaurant = async() => { 
    const res = await getRestaurantRepo({rid: 1});
    console.log(res);
}

const getOrders = async() => {
    const orders = await getOrdersRepo({cid: 1});
    console.log(orders);
}
 
const editCart = async() => {
    const body = {
        _id: "65e89b41311cdddbf5c72845",
        quantity: 0
    }
    let cart = await editCartRepo({cid: 1}, body);
    console.log(cart);

}

//insertCustomer();
//insertRestaurant();
//createMenuItem();