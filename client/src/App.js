import React from 'react';
import { Routes, Route } from "react-router-dom";
import Interface from './interfaces/home/Interface.js';
import Home from './interfaces/client-interface/landing/landingScreen.js';
import Menu from './interfaces/client-interface/restaurant-menu/Menu.js';
import Orders from './interfaces/client-interface/order/OrderScreen.js'


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
        <Route path="/home" element={<Home />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/menu/:data" element={<Menu />} />
      </Routes>
  );
}


export default App;
