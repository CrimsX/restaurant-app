import React from "react";
import { Routes, Route } from "react-router-dom";

import Interface from './interfaces/home/Interface.js';
import Home from './interfaces/client-interface/landing/landingScreen.js';
import Menu from './interfaces/client-interface/restaurant-menu/Menu.js';
import Orders from './interfaces/client-interface/orders/OrdersScreen.js'


import ManagerHome from "./interfaces/restaurant-interface/ManagerHome.jsx";
import CreateItem from "./interfaces/restaurant-interface/CreateItem.jsx";
import ShowItems from "./interfaces/restaurant-interface/ShowItems.jsx";
import EditItem from "./interfaces/restaurant-interface/EditItem.jsx";
import DeleteItem from "./interfaces/restaurant-interface/DeleteItem.jsx";
/**
 * Sceen 1
 * ● Students must be able to see all available courses
 * ● Students must be able to register for classes
 * Note: When registering for classes the TimeOfDay must be considered. Students are not allowed to register in multiple classes that overlap on time.
 *
 * Screen 2
 * ● Students must be able to drop classes they are registered in
 * ● Students must be able to see all courses they are registered in
 */

function App() {
  return (
    <Routes>
      <Route path="/" element={<Interface />} />

      {/* Client Interface */}
      <Route path="/home" element={<Home />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/menu/:data" element={<Menu />} />

      {/* Restaurant Manager Interface */}
      <Route path="/RestaurantInterface/home" element={<ManagerHome />} />
      <Route path="/items/create" element={<CreateItem />} />
      <Route path="/items/details/:id" element={<ShowItems />} />
      <Route path="/items/edit/:id" element={<EditItem />} />
      <Route path="/items/delete/:id" element={<DeleteItem />} />
    </Routes>
  );
}

export default App;
