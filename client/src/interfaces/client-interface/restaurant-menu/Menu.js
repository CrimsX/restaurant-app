import React, {useState} from 'react';
import './Menu.css'
import { MenuItems } from '../../../components/clientapp/menu/menu.components'
import { useParams } from 'react-router-dom';
import { NavBar } from '../../../components/clientapp/navbar/navbar.components';
import { addedToCartMsg } from '../../../components/clientapp/alerts/added-to-cart.components'


function Menu() {
  let { data } = useParams();
  const [cartItems, setCartItems] = useState([])
  const [showAddedToCartMsg, setShowAddedToCartMsg] = useState(false);
  const [addedItem, setAddedItem] = useState('');
  const [timerId, setTimerId] = useState(null);

  const test = {
    name: "McDonald's",
    rid: 1,
    email: "mcdonalds@example.com",
    pw: "password",
    address: {
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "12345",
    },
    menu: [
      {
        name: "Big Mac",
        rid: 1,
        available: true,
        price: 4.99,
      },
      {
        name: "French Fries",
        rid: 1,
        available: true,
        price: 2.49,
      },
      {
        "name": "Chicken McNuggets",
        "rid": 1,
        "available": true,
        "price": 5.99
      },
    ],
    orders: [],
  };
  const addToCart = (data) => {
    if (cartItems.some(item => item.name === data.name)) {
      return
    } else {
      cartItems.push(data);
      setCartItems(cartItems);
      displayAddedToCartAlert(data);
    }
  }

  const displayAddedToCartAlert = (data) => {
    setAddedItem(data);
    setShowAddedToCartMsg(true);

    // reset timer if add to cart clicked before 3 seconds is up
    if (timerId) {
      clearTimeout(timerId);
    }

    // Set new timer
    const newTimerId = setTimeout(() => {
      setShowAddedToCartMsg(false);
    }, 3000);
    setTimerId(newTimerId);
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
          {showAddedToCartMsg && addedToCartMsg(addedItem)}
          <MenuItems menu={test.menu} addToCart={addToCart} cartItems={cartItems}/ >
        </div>
      </div>
    </div>
  );
}

export default Menu;
