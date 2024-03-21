import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import { updateItem } from "../../actions/restaurantAction";

const EditItem = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [wid, setWid] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveItem = async () => {
    const itemData = {
      name,
      category,
      price,
      wid,
    };

    setLoading(true);

    try {
      await updateItem(1, itemData);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      alert("Error adding item. Check console.");
      console.error("Error adding item:", error);
    }
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Food Item</h1>
      {loading && <Spinner />}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl max-w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Food Item</label>
          <input
            id="foodItem"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-2 border-gray-500 px-2 py-1 rounded-md"
            required
          />
        </div>

        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Category</label>
          <input
            id="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border-2 border-gray-500 px-2 py-1 rounded-md"
            required
          />
        </div>

        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Price</label>
          <input
            id="price"
            type="number"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border-2 border-gray-500 px-2 py-1 rounded-md"
            required
          />
        </div>

        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Worker ID</label>
          <input
            id="wid"
            type="number"
            min="0"
            value={wid}
            onChange={(e) => setWid(e.target.value)}
            className="border-2 border-gray-500 px-2 py-1 rounded-md"
            required
          />
        </div>

        <button
          className="p-2 bg-sky-300 rounded-md mt-8"
          onClick={handleSaveItem}
        >
          Add Item
        </button>
      </div>
    </div>
  );
};

export default EditItem;
