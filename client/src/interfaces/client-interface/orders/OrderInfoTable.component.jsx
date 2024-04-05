import React from 'react';
import { Table } from 'react-bootstrap';

import { reOrder } from '../../../actions/customerAction';
import { useParams } from 'react-router-dom';

import axios from 'axios';

const OrdersInfo = ({order, pending}) => {
  let { cid, rid } = useParams();

  // Adds a decimal point to the price
  const getPrice = (num) => {
    return (num / 100).toFixed(2);
  };

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
