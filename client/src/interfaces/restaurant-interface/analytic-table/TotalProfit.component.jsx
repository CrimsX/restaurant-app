import React, { useEffect } from 'react';
import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { Table } from 'react-bootstrap';
import { getPrice } from '../DisplayItemFunctions';
import { getProfit } from '../../../actions/restaurantAction';

const TotalProfit = ({rid}) => {
  const [profit, setProfit] = useState();
  const [currentRID, setCurrentRID] = useState(0);

  const {isError, isSuccess, isLoading, data, error} = useQuery({
    queryKey: ["profit", rid],
    queryFn:() => getProfit(rid),
    refetchOnMount:true
  })

  if (isSuccess) {
    if (currentRID !== rid) {
      if (data.data.length > 0) {
        setProfit(getPrice(data.data[0].totalAmount));
      }
      else {
        setProfit(getPrice(0));
      }
      setCurrentRID(rid);
    }
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Total Profit</th>
          </tr>
        </thead>
          <tbody>
            <tr>
              <td> ${profit} </td>
            </tr>
          </tbody>
      </Table>
    )
  }
} 

export default TotalProfit;