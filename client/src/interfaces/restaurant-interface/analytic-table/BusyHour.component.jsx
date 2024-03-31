import React, { useEffect } from 'react';
import { useState } from 'react';
import { Table } from 'react-bootstrap';
import { useQuery } from "@tanstack/react-query"; //react-query
import { getPopularHours } from '../../../actions/restaurantAction';

const BusiestHours = ({rid}) => {
  const [hours, setHours] = useState([]);
  const [currentRID, setCurrentRID] = useState(0);

  const {isError, isSuccess, isLoading, data, error} = useQuery({
    queryKey: ["hour", rid],
    queryFn:() => getPopularHours(rid),
  })

  if (isSuccess) {
    if ((hours.length < 1 && data.data.length > 1) || currentRID !== rid) { //set rendering limit
      setHours(data.data)
      setCurrentRID(rid);
    } 
    if (hours.length > 0 && hours !== undefined) {
      return (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order Time (hour)</th>
              <th>Number of Orders</th>
            </tr>
          </thead>
          <tbody>
          {
            hours.map(row => (
              <tr key = {row._id}>
              <td>{row._id}</td>
              <td>{row.count}</td>
            </tr>
            ))
          }
          </tbody>
        </Table>
      );
    } else {
      return (
        <h4> No Busy Hours Data Available </h4>
      )
    }
  }
}

export default BusiestHours;