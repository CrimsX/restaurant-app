/*
display menu item as a grid
    when clicked, ask for quantity to add
        on the same pop up, click add to cart or cancel

*/
import React, { useEffect, useState }from 'react';
import { NavBar } from'../../../components/clientapp/navbar/navbar.components'

import { useParams } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import { getAllOrdersP, getOrdersHistory } from '../../../actions/customerAction';

import './OrdersScreen.css';
//import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';

import { useQuery } from "@tanstack/react-query"; //react-query
//import { getOrdersHistory } from '../../../actions/restaurantAction';
import OrdersInfo from './OrderInfoTable.component';
//import { getPrice } from '../../restaurant-interface/DisplayItemFunctions';
//
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

const {isError, isSuccess, isLoading, data} = useQuery({
    queryKey: ["history", cid],
    queryFn:() => getOrdersHistory(cid),
  });

  if (isError) {
    return (
      <h4>Unable to retrieve list of orders </h4>
    )
  }

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

  /*
  useEffect(() => {
  const url = 'http://localhost:8000/customer/orders/all/1';
    axios.get(url)
    .then((res) => {
      //console.log(res.data.data);
        setOrders(res.data.data);
      })
      }, []);
      */

    const displayID = () => {
      //console.log(cid);
      //console.log(getAllOrdersP(cid));
      //console.log(getOrdersHistory(cid));
      //setOrders(getOrdersHistory(cid));
      //console.log(getOrdersHistoryMonth(cid));
      console.log(orders);
    console.log(restaurants[0].name);
    console.log(orders[0].items[0].item.name);
    console.log(orders[0].items[0].name);
    }

  const toggleRow = (orderID) => {
    setExpandedOrderID(orderID === expandedOrderID ? null : orderID);
  }

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

/*
    return (
        <div>
        <NavBar cartItems={cartItems}/>
      <h1>Order History</h1>
      
      <table className="ordersTable">
        <thead>
        <tr>
        <th>Restaurant</th>
        <th>Total Cost</th>
        <th>View Items</th>
      </tr>
      </thead>
          <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              
              <td>{order.restaurant.name}</td>
              <td>{(order.total / 100).toFixed(2)}</td>
              <td>
              <button onClick={() => toggleRow(order._id)}>
                {expandedOrderID === order._id ? 'Hide Items' : 'Show Items'}
                </button>
              </td>
              
            {expandedOrderID === order._id && (
            <tr>
            <td colSpan={orders.length}>
                    <table>
                      <thead>
                    <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Cost</th>
                    </tr>
                    </thead>
                    <tbody>
            {order.items.map(item => (
            <tr key={item._id}>
              <td>{item.item.name}</td>
            <td>{item.quantity}</td>
            <td>{(item.total / 100).toFixed(2)}</td>
            <button onClick={() => changeQuantity(item.quantity)}>Change Quantity</button>


            </tr>
                        ))
            }
            </tbody>
            </table>
            </td>
            </tr>
              )}
            </tr>
            ))}
        </tbody>
      </table>
      <Button onClick={displayID}>test</Button> 
      
      </div>
    )}
*/

export default Order;
