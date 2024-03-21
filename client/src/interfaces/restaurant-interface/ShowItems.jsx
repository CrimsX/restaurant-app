import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import { getItemStatus, getPrice } from "./DisplayItemFunctions";

const ShowItem = () => {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/items/details/${id}`)
      .then((response) => {
        setItem(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <BackButton />
      <div>
        <h1 className="text-3xl my-4"> Show Item </h1>
        {loading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">Database ID</span>
              <span>{": " + item._id}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">Food Item</span>
              <span>{": " + item.name}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">
                Food Avalibility
              </span>
              <span>{": " + getItemStatus(item.available)}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">
                Restaurant Branch
              </span>
              <span>{": " + item.category}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">Price</span>
              <span>{": " + getPrice(item.price)}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">Create Time</span>
              <span>{": " + new Date(item.createdAt).toString()}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">
                Last Update Time
              </span>
              <span>{": " + new Date(item.updatedAt).toString()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowItem;
