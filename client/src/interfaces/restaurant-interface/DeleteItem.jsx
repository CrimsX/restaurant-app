import React, { useState } from "react";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import { removeItem } from "../../actions/restaurantAction";

const DeleteItem = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { rid, mid } = useParams();

  const handleDeleteItem = async () => {
    setLoading(true);
    try {
      await removeItem(rid, { mid: mid, wid: 1 });
      setLoading(false);
      navigate("/RestaurantInterface/home");
    } catch (error) {
      setLoading(false);
      alert(`Check console:\nResturant ID: ${rid}\nMenu ID: ${mid}`);
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3x1 my-4">Delete Item</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Delete this item?</h3>
        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDeleteItem}
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default DeleteItem;
