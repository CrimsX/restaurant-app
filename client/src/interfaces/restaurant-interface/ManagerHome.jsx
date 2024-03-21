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
        // Gathering menu data
        const menuData1 = await getMenu(1);
        const menuData2 = await getMenu(2);

        // Combining arrays ... is a spread operator
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
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl">All Items</h1>
        <div className="flex items-center">
          <label className="mr-2">Choose an option:</label>
          <select
            id="dropdown"
            className="border rounded px-2 py-1"
            onChange={handleDropdownChange}
            value={selectedRestaurant}
          >
            <option value="">All</option>
            <option value="Deliscio">Deliscio</option>
            <option value="Asianres">Asianres</option>
          </select>
        </div>
        <Link to="/items/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl ml-4" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-400">
            <tr className="text-center">
              <th className="py-2 w-1/6">Item ID</th>
              <th className="py-2 w-2/6">Food Item</th>
              <th className="py-2 w-1/6">Availability</th>
              <th className="py-2 w-1/6">Restaurant Branch</th>
              <th className="py-2 w-1/6">Price</th>
              <th className="py-2 w-1/6">Actions</th>
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
                <tr
                  key={item._id}
                  className={index % 2 === 0 ? "bg-gray-100" : ""}
                >
                  <td className="py-2 border text-center"> {index + 1} </td>
                  <td className="py-2 border text-center"> {item.name} </td>
                  <td className="py-2 border text-center"> Available </td>
                  <td className="py-2 border text-center">
                    {item.rid === 1 ? "Deliscio" : "Asianres"}
                  </td>
                  <td className="py-2 border text-center">
                    ${item.price / 100}
                  </td>
                  <td className="py-2 px-5 border text-center">
                    <div className="flex justify-center gap-x-5">
                      <Link to={`/items/details/${item._id}`}>
                        <BsInfoCircle className="text-2xl text-green-800 hover:text-green-600" />
                      </Link>
                      <Link to={`/items/edit/${item._id}`}>
                        <AiOutlineEdit className="text-2xl text-yellow-600 hover:text-yellow-400" />
                      </Link>
                      <Link to={`/items/delete/${item._id}`}>
                        <MdOutlineDelete className="text-2xl text-red-600 hover:text-red-400" />
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
