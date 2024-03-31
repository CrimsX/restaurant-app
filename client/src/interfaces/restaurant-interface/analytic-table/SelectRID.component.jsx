import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Form } from "react-bootstrap";
import { getAllRestaurants } from "../../../actions/restaurantAction";

const RIDSelector = ({selectRID}) => {
  const {isError, isSuccess, isLoading, data, error} = useQuery({
    queryKey: ["restaurants"],
    queryFn: getAllRestaurants,
    refetchOnMount: true,
  })

  const handleChange = async (option) => { //handle change for selecting SID in dropbox
    selectRID(option.target.value);
  }

  if (isSuccess) {
    return (
      <Form.Select aria-label="Default select example" onChange={handleChange}>
        {
          data.data.map( row => (
            <option key = {row.rid} value={row.rid}> {row.name} </option>
          ))
        }
      </Form.Select>
    )
  }
}

export default RIDSelector;