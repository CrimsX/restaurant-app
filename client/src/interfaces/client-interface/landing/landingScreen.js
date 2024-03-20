import React, { useEffect, useState }from 'react';
import { NavBar } from'../../../components/clientapp/navbar/navbar.components'
import './landingScreen.css'
import Restaurants from '../../../components/clientapp/restuarant-list/resutarant-tile-display/display.components'

//Home page that displays list of restaurants 
function Home(data) {
    const [restaurants, setRestaurants] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    /*
    TODO: fetch list of restuarants from db in the useEffect
    */
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
            <NavBar cartItems={cartItems}/>
            <div className='body'>
              <h1 className='title'>Restaurant's</h1>
              <Restaurants restuarants={restaurants} onClick/>
            </div>
        </div>

    )
}

export default Home;
