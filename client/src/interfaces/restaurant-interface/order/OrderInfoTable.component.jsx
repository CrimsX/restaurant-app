import React from 'react';
import { Table } from 'react-bootstrap';
import { getPrice } from '../DisplayItemFunctions';

const OrdersInfo = ({order}) => {
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
            </tr>
            ))
          }
          </tbody>
        </Table>
      );
}

export default OrdersInfo