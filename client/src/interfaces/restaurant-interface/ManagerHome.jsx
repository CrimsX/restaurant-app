import Spinner from "../../components/Spinner";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { getMenu } from "../../actions/restaurantAction";

const ManagerHome = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState("");

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const menuData1 = await getMenu(1);
        const menuData2 = await getMenu(2);
        const combinedItems = [...menuData1.data, ...menuData2.data];
        setItems(combinedItems);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching menu data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDropdownChange = (event) => {
    setSelectedRestaurant(event.target.value);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">All Items</h1>
        <div>
          <label>Choose an option: </label>
          <br></br>
          <select
            id="dropdown"
            onChange={handleDropdownChange}
            value={selectedRestaurant}
          >
            <option value="">All</option>
            <option value="Deliscio">Deliscio</option>
            <option value="Asianres">Asianres</option>
          </select>
        </div>

        <Link to="/items/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr className="text-center">
              <th>Item ID</th>
              <th>Food Item</th>
              <th>Availability</th>
              <th>Restaurant Branch</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items
              .filter(
                (item) =>
                  !selectedRestaurant ||
                  (selectedRestaurant === "Deliscio" && item.rid === 1) ||
                  (selectedRestaurant === "Asianres" && item.rid === 2)
              )
              .map((item, index) => (
                <tr key={item._id} className="h-8">
                  <td className="border text-center">{index + 1}</td>
                  <td className="border text-center">{item.name}</td>
                  <td className="border text-center">Available</td>
                  <td className="border text-center">
                    {item.rid === 1 ? "Deliscio" : "Asianres"}
                  </td>
                  <td className="border text-center">${item.price / 100}</td>
                  <td className="border text-center">
                    <div className="flex justify-center gap-x-4">
                      <Link to={`/items/details/${item._id}`}>
                        <BsInfoCircle className="text-2xl text-green-800" />
                      </Link>
                      <Link to={`/items/edit/${item._id}`}>
                        <AiOutlineEdit className="text-2xl text-yellow-600" />
                      </Link>
                      <Link to={`/items/delete/${item._id}`}>
                        <MdOutlineDelete className="text-2xl text-red-600" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManagerHome;
