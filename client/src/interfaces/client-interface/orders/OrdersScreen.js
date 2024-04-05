import React, { useEffect, useState, useRef }from 'react';

import { useParams } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query"; //react-query
import { placeOrder, removeFromCart, updateCart, getAllOrdersP, getOrdersHistory } from '../../../actions/customerAction';

import './OrdersScreen.css';

import { NavBar } from'../../../components/clientapp/navbar/navbar.components'
import DialogueBox from '../../../components/clientapp/checkout/checkout';
import Accordion from 'react-bootstrap/Accordion';
import OrdersInfo from './OrderInfoTable.component';

import axios from 'axios';

/*
display menu item as a grid
    when clicked, ask for quantity to add
        on the same pop up, click add to cart or cancel

*/

/*
buttons on nav bar (sticky buttons for now):
        view cart (enddrawer from the right (component))
            place order option
        view orderhistory (navigate to order history page)

List restaurants
*/

/*
 * cart/reorder/2
 * reorder
  * rid
  * order_id
*/

function Order() {
  let { cid, rid } = useParams(); //Data contains the restaurant ID to fetch restaurant from db
  const [cartItems, setCartItems] = useState([])
  const [quantities, setQuantities] = useState({});
  const [showAddedToCartMsg, setShowAddedToCartMsg] = useState(false);
  const [showAlreadyInCart, setShowAlreadyInCart] = useState(false);
  const [showDifferentResAlert, setShowDifferentResAlert] = useState(false);
  const [showOrderConfirmedMsg, setShowOrderConfirmedMsg] = useState(false);
  const [addedItem, setAddedItem] = useState('');
  const [timerId1, setTimerId1] = useState(null);
  const [timerId2, setTimerId2] = useState(null);
  const [timerId3, setTimerId3] = useState(null);
  const [timerId4, setTimerId4] = useState(null);
  const isMounted = useRef(false);
  const [dialogueVisible, setDialogueVisible] = useState(false);

  let i = 0;


  /*
   * Nav bar
   */ 
  // Get cart items
  useEffect (() => {
    if (!isMounted.current) {
      isMounted.current = true; // Set to true after initial render
      return; // Don't execute further code on initial render
    }
    setCartItems([]);
    axios.get(`http://localhost:8000/customer/cart/` + cid)
    .then((res) => {
      if ("Cart is Empty" === res.data.data) {
        return;
      }
      for (var items of res.data.data.items){
        quantities[items.item.name] = items.quantity
        cartItems.push(items.item);
      }
      setQuantities(quantities);
      setCartItems(cartItems);
    })
    .catch(error => {
      console.error('Error fetching cart items:', error);
    });
  }, [cid]);

  //Function to add item to cart when add to cart button is pressed
  const addToCart = (data) => {
    //Check if item is already in cart
    if (cartItems.some(item => item.name === data.name)) {
      displayAlreadyInCart();
      return
    // Condition to check if items in cart contains item from different restuarants
    } else if (cartItems.length !== 0 && data.rid !== cartItems[0].rid) {
      displayDifferentResAlert();
      return;
    } else {
        axios.patch(`http://localhost:8000/customer/cart/add/${cid}`, {
        mid: data.mid,
        quantity: 1,
        rid: data.rid,
      })
      .then((res) => {
        cartItems.push(data);
        setCartItems(cartItems);
        quantities[data.name] = 1
        displayAddedToCartAlert(data);
      })
      .catch(error => {
        console.error('Error adding to cart', error);
      });
    }
  }

  // Alert message when item is already in cart
  const displayAlreadyInCart = () => {
    setShowAlreadyInCart(true);
    if (timerId1) {
      clearTimeout(timerId1);
    }
    // Set new timer
    const newTimerId = setTimeout(() => {
      setShowAlreadyInCart(false);
    }, 3000);
    setTimerId1(newTimerId);
  }

  // Alert message when item is from different restaurant
  const displayDifferentResAlert = () => {
    setShowDifferentResAlert(true);
    if (timerId3) {
      clearTimeout(timerId3);
    }
    // Set new timer
    const newTimerId = setTimeout(() => {

      setShowDifferentResAlert(false);
    }, 7000);
    setTimerId3(newTimerId);
  }

  //Alerts message when item is added to cart
  const displayAddedToCartAlert = (data) => {
    setAddedItem(data);
    setShowAddedToCartMsg(true);

    // reset timer if add to cart clicked before 3 seconds is up
    if (timerId2) {
      clearTimeout(timerId2);
    }

    // Set new timer
    const newTimerId = setTimeout(() => {
      setShowAddedToCartMsg(false);
    }, 3000);
    setTimerId2(newTimerId);
  }

  // Remove item from cartItems if item matches restaurant id and name
  const removeItem = (item) => {
    removeFromCart(parseInt(cid), item);
    const updatedCartItems = cartItems.filter(cartItem => !(item.name === cartItem.name && item.rid === cartItem.rid));
    setCartItems(updatedCartItems);
  }

  //Creates a quantity hashmap with item name as key to track how many of one item is in the cart
  //If key does not exist in this hashmap but item exists in cart, treat it as 1. Will fix later
  const handleQuantityChange = (event, item) => {
    quantities[item.name] = parseInt(event.target.value);
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [item.name]: event.target.value
    }));
    updateCart(cid, item, quantities[item.name]);
  }

  // Toggle dialogue box
  const toggleDialogue = () => {
    setDialogueVisible(!dialogueVisible);
  };

  /**
   *
   * @param {object} cartItems object containing items representing which items are in the cart
   * @param {hashmap} quantites hashmap containing the quantity of items ordered. key of hashmap is the item name,
   * value is the quantity ordered.
   */
  const checkout = () => {
    toggleDialogue();
  }

  // Order
  const order = (pickupOption) => {
    console.log(pickupOption);
    const result = placeOrder(parseInt(cid), {schedule: parseInt(pickupOption)});
    if (result) {
      setCartItems([]);
      displayOrderConfirmedAlert();
    }
  }

  // Alert message when order is confirmed
  const displayOrderConfirmedAlert = () => {
    setShowOrderConfirmedMsg(true);

    // reset timer if add to cart clicked before 3 seconds is up
    if (timerId4) {
      clearTimeout(timerId4);
    }

    // Set new timer
    const newTimerId = setTimeout(() => {
      setShowOrderConfirmedMsg(false);
    }, 3000);
    setTimerId4(newTimerId);

  } 

  /*
   * Order history
   */
  // Get order history
  const {isError, isSuccess, isLoading, data} = useQuery({
    queryKey: ["history", cid],
    queryFn:() => getOrdersHistory(cid),
  });

  // Error message
  if (isError) {
    return (
      <h4>Unable to retrieve list of orders </h4>
    )
  }

  // Loading message
  if (isLoading) {
    return (
      <h4>Please wait, retrieving orders history </h4>
    )
  }

  // Add decimal point to the price
  const getPrice = (num) => {
    return (num / 100).toFixed(2);
  };

  // Convert date to locale date
  const convertDate = (date) => {
    let locale = new Date(date);
    return locale.toLocaleDateString();
  }

  // Convert order status to readable string
  const convertOrderStatus = (status) => {
    switch(status) {
      case 1:
        return "In-progress";
      case 2: 
        return "Awaiting-Pickup"
      case 3: 
        return "Completed"
      default:
        return "Ordered"
    }
  }

  // Change quantity of item in order history
  const changeQuantity = (quantity) => {
    // change quantity
  }

  if (isSuccess) {
    if (data.data.length > 0) {
      return (
        <div>
          <NavBar cid={cid} cartItems={cartItems} quantities={quantities} handleChange={handleQuantityChange} removeFromCart={removeItem} checkout={checkout}/>
          {dialogueVisible && <DialogueBox onSubmit={order} onClose={toggleDialogue} />}
          <h1>Order History</h1>
          <div className="orderInfoTable">
            <Accordion>
            {
              data.data.map(order => (
                <Accordion.Item key={i++} eventKey={i++}>
                  <Accordion.Header>
                    Restaurant: {order.restaurant.name} &emsp; &emsp; 
                    Order ID: {order.order_id} &emsp; &emsp; 
                    Date: {convertDate(order.orderAt)} &emsp; &emsp; 
                    Order Status: {convertOrderStatus(order.status)}
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>
                      Name: {order.customer.name} <br></br> 
                      Customer ID: {order.customer.cid} <br></br> 
                    </p>
                    <OrdersInfo order={order.items}> </OrdersInfo>
                    <h5>Grand Total: ${getPrice(order.total)}</h5>
                  </Accordion.Body>
                </Accordion.Item>
              ))
            }
            </Accordion>
          </div>
        </div>
      )
    }
  }
}

export default Order;
