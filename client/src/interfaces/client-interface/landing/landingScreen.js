import React, { useEffect, useState }from 'react';
import axios from 'axios';
import { NavBar } from'../../../components/clientapp/navbar/navbar.components'
import './landingScreen.css'
import Restaurants from '../../../components/clientapp/restuarant-list/resutarant-tile-display/display.components'

//Home page that displays list of restaurants 
function Home(data) {
    const [restaurants, setRestaurants] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    useEffect( () => {
      axios.get('http://localhost:8000/restaurant/restaurants')
      .then((res) => {
        setRestaurants(res.data.data);
      })
    }, []);

    return (
        <div>
            <NavBar cartItems={cartItems}/>
            <div className='body'>
              <h1 className='title'>Restaurant's</h1>
              <Restaurants restaurants={restaurants} onClick/>
            </div>
        </div>

    )
}

export default Home;
