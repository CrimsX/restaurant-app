import React, { useEffect, useState }from 'react';

import { useParams } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query"; //react-query
import { getAllOrdersP, getOrdersHistory } from '../../../actions/customerAction';

import './OrdersScreen.css';

import { NavBar } from'../../../components/clientapp/navbar/navbar.components'
import Accordion from 'react-bootstrap/Accordion';
import OrdersInfo from './OrderInfoTable.component';

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
  const [cartItems, setCartItems] = useState([])
  const {cid} = useParams();
  const [orders, setOrders] = useState([])
  const [restaurants, setRestaurants] = useState([])
  const [expandedOrderID, setExpandedOrderID] = useState(null);
  let i = 0;

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
          <NavBar cartItems={cartItems}/> 
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
