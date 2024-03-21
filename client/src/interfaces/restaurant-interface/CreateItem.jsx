import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import { addItem } from "../../actions/restaurantAction";

const CreateItems = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [wid, setWid] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //const {} = useParams(); // will comeback to this when employee login is done

  const handleSaveItem = async () => {
    const itemData = {
      name,
      category,
      price,
      wid,
    };

    setLoading(true);

    try {
      await addItem(3, itemData);
      setLoading(false);
      navigate("/RestaurantInterface/home");
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
        <div className="my-4 flex items-center">
          <label className="text-xl mr-4 text-gray-500 flex-shrink-0 w-28">
            Food Item
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-grow border-2 border-gray-500 px-2 py-1 rounded-md"
            required
          />
        </div>

        <div className="my-4 flex items-center">
          <label className="text-xl mr-4 text-gray-500 flex-shrink-0 w-28">
            Category
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="flex-grow border-2 border-gray-500 px-2 py-1 rounded-md"
            required
          />
        </div>

        <div className="my-4 flex items-center">
          <label className="text-xl mr-4 text-gray-500 flex-shrink-0 w-28">
            Price
          </label>
          <input
            type="number"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="flex-grow border-2 border-gray-500 px-2 py-1 rounded-md"
            required
          />
        </div>

        <div className="my-4 flex items-center">
          <label className="text-xl mr-4 text-gray-500 flex-shrink-0 w-28">
            Worker ID
          </label>
          <input
            type="number"
            min="0"
            value={wid}
            onChange={(e) => setWid(e.target.value)}
            className="flex-grow border-2 border-gray-500 px-2 py-1 rounded-md"
            required
          />
        </div>

        <button
          className="p-2 bg-sky-300 rounded-md mt-8 self-start"
          onClick={handleSaveItem}
        >
          Add Item
        </button>
      </div>
    </div>
  );
};

export default CreateItems;
