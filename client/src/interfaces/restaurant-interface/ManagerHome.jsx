import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import Spinner from "../../components/Spinner";

const ManagerHome = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .all([
        axios.get("http://localhost:8000/restaurant/menu/1"),
        axios.get("http://localhost:8000/restaurant/menu/2"),
      ])
      .then(
        axios.spread((menu1Response, menu2Response) => {
          const mergedItems = [
            ...menu1Response.data.data,
            ...menu2Response.data.data,
          ];
          setItems(mergedItems);
          setLoading(false);
        })
      )
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">All Items</h1>
        <div className="dropdown">
          <label htmlFor="dropdown">Choose an option: </label>
          <br></br>
          <select id="dropdown">
            <option value="id_1">Deliscio</option>
            <option value="id_2">Asianres</option>
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
              <th className="border border-slate-600 ">Item ID</th>
              <th className="border border-slate-600 ">Food Item</th>
              <th className="border border-slate-600 ">Availability</th>
              <th className="border border-slate-600 ">Restaurant Branch</th>
              <th className="border border-slate-600 ">Price</th>
              <th className="border border-slate-600 ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item._id} className="h-8">
                <td className="border border-slate-700  text-center">
                  {index + 1}
                </td>
                <td className="border border-slate-700  text-center">
                  {item.name}
                </td>
                <td className="border border-slate-700  text-center">
                  Available
                </td>
                <td className="border border-slate-700  text-center">
                  {item.rid === 1 ? "Deliscio" : "Asianres"}
                </td>
                <td className="border border-slate-700  text-center">
                  ${item.price / 100}
                </td>
                <td className="border border-slate-700  text-center">
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
