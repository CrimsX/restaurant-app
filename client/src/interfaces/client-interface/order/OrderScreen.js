/*
display menu item as a grid
    when clicked, ask for quantity to add
        on the same pop up, click add to cart or cancel

*/
import React, { useEffect, useState }from 'react';
import { NavBar } from'../../../components/clientapp/navbar/navbar.components'

/*
buttons on nav bar (sticky buttons for now):
        view cart (enddrawer from the right (component))
            place order option
        view orderhistory (navigate to order history page)

List restaurants
*/
function Order() {
    return (
        <NavBar/>
    )}

export default Order;
