import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import { addItem } from "../../actions/restaurantAction";

const CreateItem = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [wid, setWid] = useState("");
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false); // State to track visibility of additional inputs
  const navigate = useNavigate();
  const location = useLocation();

  const getQueryParam = (name) => {
    const params = new URLSearchParams(location.search);
    return params.get(name);
  };

  const handleSaveItem = async () => {
    const restaurantId = getQueryParam("restaurantId");

    const itemData = {
      name,
      price,
      // Check if category is empty, if true set it to "1", otherwise use the entered value
      category: category.length === 0 ? "1" : category,
      // Check if worker ID is empty, if true set it to "1", otherwise use the entered value
      wid: wid.length === 0 ? "1" : wid,
    };

    setLoading(true);

    if (name.length === 0 || price.length === 0) {
      alert("Please fill in all fields");
      setLoading(false);
    } else {
      try {
        await addItem(restaurantId, itemData);
        setLoading(false);
        navigate("/RestaurantInterface/home");
      } catch (error) {
        setLoading(false);
        alert("Error adding item. Check console.");
        console.error("Error adding item:", error);
      }
    }
  };

  const toggleShowMore = () => {
    setShowMore(!showMore); // Toggle visibility state
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Food Item</h1>
      {loading && <Spinner />}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl max-w-[600px] p-4 mx-auto">
        {/* Item  */}
        <div className="my-4 flex items-center">
          <label className="text-xl mr-4 text-gray-500 flex-shrink-0 w-28">
            Food Item *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-grow border-2 border-gray-500 px-2 py-1 rounded-md hover:bg-gray-100 transition-colors duration-300"
            required
          />
        </div>

        {/* Price */}
        <div className="my-4 flex items-center">
          <label className="text-xl mr-4 text-gray-500 flex-shrink-0 w-28">
            Price *
          </label>
          <input
            type="number"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="flex-grow border-2 border-gray-500 px-2 py-1 rounded-md hover:bg-gray-100 transition-colors duration-300"
            required
          />
        </div>

        {/* Button to toggle visibility of additional inputs */}
        <div className="flex justify-center">
          <button
            className={`p-2 rounded-md mt-4 ${
              showMore ? "bg-red-500" : "bg-blue-500"
            } text-white`}
            style={{ cursor: "pointer" }}
            onClick={toggleShowMore}
          >
            {showMore ? "Basic Fields" : "Advance Fields"}
          </button>
        </div>

        {/* Additional inputs (Category and Worker ID) */}
        {showMore && (
          <>
            {/* Category */}
            <div className="my-4 flex items-center">
              <label className="text-xl mr-4 text-gray-500 flex-shrink-0 w-28">
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="flex-grow border-2 border-gray-500 px-2 py-1 rounded-md hover:bg-gray-100 transition-colors duration-300"
                required
              />
            </div>

            {/* Worker ID */}
            <div className="my-4 flex items-center">
              <label className="text-xl mr-4 text-gray-500 flex-shrink-0 w-28">
                Worker ID
              </label>
              <input
                type="number"
                min="0"
                value={wid}
                onChange={(e) => setWid(e.target.value)}
                className="flex-grow border-2 border-gray-500 px-2 py-1 rounded-md hover:bg-gray-100 transition-colors duration-300"
                required
              />
            </div>
          </>
        )}

        <button
          className="p-2 bg-sky-300 rounded-md mt-4 self-start"
          onClick={handleSaveItem}
        >
          Add Item
        </button>
      </div>
    </div>
  );
};

export default CreateItem;
