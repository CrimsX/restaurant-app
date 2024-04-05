import React from 'react';
import { Table } from 'react-bootstrap';

import { reOrder } from '../../../actions/customerAction';
import { useParams } from 'react-router-dom';

import axios from 'axios';

const OrdersInfo = ({order, pending}) => {
  let { cid, rid } = useParams();
  const [selectedQuantity, setSelectedQuantity] = React.useState(1);

  // Adds a decimal point to the price
  const getPrice = (num) => {
    return (num / 100).toFixed(2);
  };

  // Changes the quantity of the item
  const handleQuantityChange = (event, quantity, item) => {
    setSelectedQuantity(event.target.value);
  }

  // Changes the quantity of the item
  const changeQuantityOrder = (row) => {
    //console.log("Change Quantity");
    console.log(row._id);
    console.log(row.item.rid);
    console.log(selectedQuantity);
    axios.patch(`http://localhost:8000/cart/reorder/${cid}`, {order_id: row._id, rid: row.item.rid});
  }

  return (
    <Table striped bordered hover>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
          {
            order.map(row => (
              <tr key = {row.item.mid}>
              <td>{row.item.name}</td>
              <td>{row.quantity}</td>
              <td>${getPrice(row.total)}</td>
              <td>
                {pending && 
                  <select
                    value={selectedQuantity}
                    onChange={(event) => handleQuantityChange(event)}
                    >
                    {[...Array(99).keys()].map(num => (
                      <option key={num + 1} value={num + 1}>{num + 1}</option>
                    ))}
                  </select>
                }
                {pending &&
                  <button className="btn btn-primary" onClick={() => changeQuantityOrder(row)}>Change Quantity</button>
                }
              </td>
            </tr>
            ))
          }
          </tbody>
        </Table>
      );
}

export default OrdersInfo
