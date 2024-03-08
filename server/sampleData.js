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
        city: "Edmonton",
        postalcode: "HEEHEE"
    }}, 
    {
    name: "Asianres",
    email: "Asianres@pizza.ca",
    pw: "springrolls",
    address: {
        street: " 789 somewwhere",
        city: "Edmonton",
        postalcode: "H33H33"
    }},
    {
        name: "Freckle.B",
        email: "freckle@burger.ca",
        pw: "freckle",
        address: {
            street: " 231 saints row",
            city: "Edmonton",
            postalcode: "S6R T3P"
    }}
]

const delisios = [
    {
        name: "Special Pizza",
        price: 24.99
    },
    {
        name: "Royal Hawaiian Pizza",
        price: 16.99
    },
    {
        name: "Meat Lover Pizza",
        price: 20.99
    },
    {
        name: " Buffalo Chicken Fingers",
        price: 17.99
    },
    {
        name: " Mac & Cheese",
        price: 19.99
    }, 
    {
        name: "Chicken Mushroom Fettuccini",
        price: 22.79
    },
    {
        name: "New York Cheesecake",
        price: 9.29
    },
    {
        name: "Soju and Melona",
        price: 12.99
    }
];

const asianres = [
    {
        name: "Spring Rolls",
        price: 16.99
    },
    {
        name: "Pho Bo Vien",
        price: 18.99
    },
    {
        name: "Pho Dac Biet",
        price: 20.99
    },
    {
        name: "Phoritto",
        price: 15.99
    },
    {
        name: " Tofu Fries",
        price: 9.99
    },
    {
        name: "Cafe Sua Da",
        price: 5.99
    }, 
    {
        name: "Rice n Porkchops",
        price: 17.99
    },
    {
        name: "Vietnamese Sub",
        price: 17.50
    }
];

const freckle = [
    {
        name: "The Original Burger",
        price: 16.99
    }, 
    {
        name: "Kingburger Supreme",
        price: 18.99
    },
    { 
        name: "Classic Chicken Sandwich",
        price: 15.99
    },
    {
        name: "6 Chicken Tenders",
        price: 19.99
    },
    {
        name: "Crispy Fries",
        price: 3.99
    },
    {
        name: "Onion Rings",
        price: 4.99
    },
    {
        name: "Best Milkshake",
        price: 6.69
    },
    {
        name: "Fountain Pop",
        price: 2.99
    }
];



//create a customer
const insertCustomer = async() => {
    let c = await addCustomerToRepo(customer[1]);
    c = await addCustomerToRepo(customer[0]);
} 

//create a restaurant
const insertRestaurant = async(items) => {
    let q = await addRestaurantToRepo(restaurant[2]);
}

//add menu items to restaurants
const createMenuItem = async(rid, items) => {
    for (let item of items) {
        await addItemRepo({rid: rid}, item)
    }
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
//createMenuItem(1, delisios);