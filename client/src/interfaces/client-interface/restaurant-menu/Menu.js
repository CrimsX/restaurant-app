import React, { useEffect, useState } from 'react';
import './Menu.css'
import axios from 'axios';
import { MenuItems } from '../../../components/clientapp/menu/menu.components';
import { useParams } from 'react-router-dom';
import { NavBar } from '../../../components/clientapp/navbar/navbar.components';
import { addedToCartMsg } from '../../../components/clientapp/alerts/added-to-cart.components';

//Menu screen that displays items that are being sold by the restaurant if in stock
function Menu() {
  let { data } = useParams(); //Data contains the restaurant ID to fetch restaurant from db
  const [restaurant, setRestaurant] = useState([]);
  const [cartItems, setCartItems] = useState([])
  const [showAddedToCartMsg, setShowAddedToCartMsg] = useState(false);
  const [addedItem, setAddedItem] = useState('');
  const [timerId, setTimerId] = useState(null);
  const testing = 2

  useEffect(() => {
    axios.get('http://localhost:8000/restaurant/' + data)
    .then((res) => {
      setRestaurant(res.data.data);
    })
  }, []);

  //Function to add item to cart when add to cart button is pressed

  /*
  TODO: when this function is called, it should also store items in the backend.
  */

  const addToCart = (data) => {
    if (cartItems.some(item => item.name === data.name)) {
      return
    } else {
      axios.patch('http://localhost:8000/customer/cart/add/' + '1', {
        mid: data.mid,
        quantity: 1,
        rid: data.rid,
      })
      .then((res) => {
        cartItems.push(data);
        setCartItems(cartItems);
        displayAddedToCartAlert(data);
      })
    }
  }

  //Alerts message when item is added to cart
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

  // Remove item from cartItems if item matches restaurant id and name

  /*
  TODO: when this function is called, it should remove the item in the backend. Set initial quantity to 1.
         Quantity is handles in the cart component.
  */
  const removeFromCart = (item) => {
    const updatedCartItems = cartItems.filter(cartItem => !(item.name === cartItem.name && item.rid === cartItem.rid));
    setCartItems(updatedCartItems);
  }

  /*
  TODO:
  */

  /**
   *
   * @param {object} cartItems object containing items representing which items are in the cart
   * @param {hashmap} quantites hashmap containing the quantity of items ordered. key of hashmap is the item name,
   * value is the quantity ordered.
   */
  const checkout = (cartItems, quantites) => {
    console.log(cartItems);
    console.log(quantites);
    console.log(testing)
  }

  return (
    <div>
      <NavBar cartItems={cartItems} removeFromCart={removeFromCart} checkout={checkout}/>

      <div className='container'>
        <div className='table'>
          <h1>{restaurant.name} </h1>
          {showAddedToCartMsg && addedToCartMsg(addedItem)}
          <MenuItems menu={restaurant.menu} addToCart={addToCart} cartItems={cartItems}/ >
        </div>
      </div>
    </div>
  );
}

export default Menu;
