import React, { useEffect, useState }from 'react';
import { NavBar } from'../../../components/clientapp/navbar/navbar.components'
import './landingScreen.css'
import Restaurants from '../../../components/clientapp/restuarant-list/resutarant-tile-display/display.components'
/*
buttons on nav bar (sticky buttons for now):
        view cart (enddrawer from the right (component))
            place order option
        view orderhistory (navigate to order history page)

List restaurants
*/
function Home(data) {
    const [restaurants, setRestaurants] = useState([]);
    console.log(data);
    useEffect( () => {
        const test = [
            {
              "name": "McDonald's",
              "rid": 12345
            },
            {
              "name": "Pizza Hut",
              "rid": 67890
            },
            {
              "name": "Subway",
              "rid": 23456
            },
            {
              "name": "Starbucks",
              "rid": 78901
            },
            {
              "name": "Burger King",
              "rid": 34567
            }
          ]
        setRestaurants(test);
    }, []);

    return (
        <div>
            <NavBar/>
            <div className='body'>
                <Restaurants restuarants={restaurants} onClick/>
            </div>
        </div>

    )
}

export default Home;
