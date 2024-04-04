import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import { updateItem, getMenuItem } from "../../actions/restaurantAction";
import { getPrice } from "./DisplayItemFunctions";

const EditItem = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { rid, mid } = useParams();
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("1");

  const {isSuccess, data} = useQuery({
    queryKey: ["item", rid, mid],
    queryFn:() => getMenuItem(rid, mid),
  })

  const handleSaveItem = async () => {
    setLoading(true);

    if (price.length === 0) {
      alert("Please fill in all fields");
      setLoading(false);
    } else {
      try {
        await updateItem(rid, {
          mid: mid,
          wid: 1,
          price: price,
          status: Number(status),
        });
        setLoading(false);
        navigate("/RestaurantInterface/home");
      } catch (error) {
        setLoading(false);
        alert("Error adding item. Check console.");
        console.error("Error adding item:", error);
      }
    }
  };

  if (isSuccess) {
    if (price.length < 1) {
      setPrice(getPrice(data.data.price));
    }
    return (
      <div className="p-4">
        <BackButton />
        <h1 className="text-3xl my-4">Edit Food Item</h1>
        {loading && <Spinner />}
        <div className="flex flex-col border-2 border-sky-400 rounded-xl max-w-[600px] p-4 mx-auto">
          <div className="my-4 flex items-center">
            <label className="text-xl mr-4 text-gray-500 flex-shrink-0 w-28">
              Price $
            </label>
            <input
              type="number"
              min="0"
              step = "0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="flex-grow border-2 border-gray-500 px-2 py-1 rounded-md hover:bg-gray-100 transition-colors duration-300"
              required
            />
          </div>

          <div className="my-4 flex items-center">
            <label className="text-xl mr-4 text-gray-500 flex-shrink-0 w-28">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="flex-grow border-2 border-gray-500 px-2 py-1 rounded-md hover:bg-gray-100 transition-colors duration-300"
              required
            >
              <option value="0">Sold Out</option>
              <option value="1">Available</option>
            </select>
          </div>

          <button
            className="p-2 bg-sky-300 rounded-md mt-8 self-start"
            onClick={handleSaveItem}
          >
            Save Item
          </button>
        </div>
      </div>
    );
  }
};

export default EditItem;
