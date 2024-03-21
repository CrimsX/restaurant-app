import Spinner from "../../components/Spinner";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
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
        const menuData3 = await getMenu(3);

        // Combining arrays ... is a spread operator
        const combinedItems = [
          ...menuData1.data,
          ...menuData2.data,
          ...menuData3.data,
        ];
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
        <h1 className="text-3xl">Items</h1>
        <div className="flex items-center">
          <label className="mr-2">Manager Login:</label>
          <select
            id="dropdown"
            className="border rounded px-2 py-1"
            onChange={handleDropdownChange}
            value={selectedRestaurant}
          >
            <option value="">All</option>
            <option value="Deliscio">Deliscio</option>
            <option value="Asianres">Asianres</option>
            <option value="Freckle.B">Freckle.B</option>
          </select>
        </div>
        <Link to="/items/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl ml-4" />
        </Link>
      </div>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Spinner />
        </div>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr className="text-center">
              <th className="py-2 w-1/6">Menu ID</th>
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
                  (selectedRestaurant === "Asianres" && item.rid === 2) ||
                  (selectedRestaurant === "Freckle.B" && item.rid === 3)
              )
              .map((item, index) => (
                <tr
                  key={item._id}
                  className={index % 2 === 0 ? "bg-gray-100" : ""}
                  style={{ transition: "background-color 0.25s" }}
                  // mouse hover effects on table
                  onMouseEnter={(e) => {
                    e.target.parentElement.classList.add("hover:bg-green-200");
                  }}
                  onMouseLeave={(e) => {
                    e.target.parentElement.classList.remove(
                      "hover:bg-gray-200"
                    );
                  }}
                >
                  <td className="py-2 border text-center">{item.mid}</td>
                  <td className="py-2 border text-center">{item.name}</td>
                  <td className="py-2 border text-center">
                    {item.available === true ? "Available" : "Sold Out"}
                  </td>
                  <td className="py-2 border text-center">
                    {item.rid === 1
                      ? "Deliscio"
                      : item.rid === 2
                      ? "Asianres"
                      : item.rid === 3
                      ? "FreckleB"
                      : ""}
                  </td>
                  <td className="py-2 border text-center">
                    ${(item.price / 100).toFixed(2)}
                  </td>
                  <td className="py-2 px-5 border text-center">
                    <div className="flex justify-center gap-x-5">
                      <Link to={`/items/edit/${item._id}`}>
                        <AiOutlineEdit className="text-2xl text-green-600 hover:text-green-400" />
                      </Link>
                      <Link to={`/items/delete/${item.rid}/${item.mid}`}>
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
