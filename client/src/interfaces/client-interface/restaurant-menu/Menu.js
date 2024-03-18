import React, {useState} from 'react';
import './Menu.css'
import { MenuItems } from '../../../components/clientapp/menu/menu.components'
import { useParams } from 'react-router-dom';
import { NavBar } from '../../../components/clientapp/navbar/navbar.components';

function Menu() {
  let { data } = useParams();
  const [cartItems, setCartItems] = useState([])
  const test = {
    "name": "McDonald's",
    "rid": 1,
    "email": "mcdonalds@example.com",
    "pw": "password",
    "address": {
      "street": "123 Main St",
      "city": "Anytown",
      "state": "CA",
      "zip": "12345"
    },
    "menu": [
      {
        "name": "Big Mac",
        "rid": 1,
        "available": true,
        "price": 4.99
      },
      {
        "name": "French Fries",
        "rid": 1,
        "available": true,
        "price": 2.49
      },
      {
        "name": "Chicken McNuggets",
        "rid": 1,
        "available": false,
        "price": 5.99
      }
    ],
    "orders": []
  };

  const addToCart = (data) => {
    if (cartItems.some(item => item.name === data.name)) {
      updateQty(data);
      setCartItems(cartItems);
    } else {
      cartItems.push(data);
      setCartItems(cartItems);
    }
  }

  const updateQty = (data) => {
    for (var item of cartItems) {
      if (data.name === item.name) {
        item.qty = data.qty;
        return;
      }
    }
  }

  const removeFromCart = (item) => {
    const updatedCartItems = cartItems.filter(cartItem => !(item.name === cartItem.name && item.rid === cartItem.rid));
    setCartItems(updatedCartItems);
  }

  return (
    <div>
      <NavBar cartItems={cartItems} removeFromCart={removeFromCart}/>

      <div className='container'>
        <div className='table'>
          <h1>{test.name}</h1>
          <MenuItems menu={test.menu} addToCart={addToCart} cartItems={cartItems}/ >
        </div>
      </div>
    </div>
  );
}

export default Menu;
