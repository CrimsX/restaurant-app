import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const ManagerHome = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8000/restaurant/menu/1")
      .then((response) => {
        setItems(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Items List</h1>
        <Link to="/items/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border-seperate border-spacing-2">
          <thead>
            <tr className="text-center">
              <th className="border border-slate-600 rounded-md">Item ID</th>
              <th className="border border-slate-600 rounded-md">Food Item</th>
              <th className="border border-slate-600 rounded-md">
                Availability
              </th>
              <th className="border border-slate-600 rounded-md">
                Restaurant Branch
              </th>
              <th className="border border-slate-600 rounded-md">Price</th>
              <th className="border border-slate-600 rounded-md">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item._id} className="h-8">
                <td className="border border-slate-700 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {item.name}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {/* {item.available} */}
                  Available
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {item.category === 1
                    ? "Deliscio"
                    : item.category === 2
                    ? "Restaurant 2"
                    : item.category === 3
                    ? "Restaurant 3"
                    : "Unknown Category"}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  ${item.price / 100}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
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