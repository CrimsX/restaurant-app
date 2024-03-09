import React from 'react';
import './Menu.css'
import { MenuItems } from '../../../components/clientapp/menu/table.components'
import { useParams } from 'react-router-dom';
import { NavBar } from '../../../components/clientapp/navbar/navbar.components';

function Menu() {
  let { data } = useParams();
  const test = {
    "name": "McDonald's",
    "rid": 1,
    "email": "mcdonalds@example.com",
    "pw": "password",
    "address": {
      "street": "123 Main St",
      "city": "Anytown",
      "state": "CA",
      "zip": "12345"
    },
    "menu": [
      {
        "name": "Big Mac",
        "rid": 1,
        "available": true,
        "price": 4.99
      },
      {
        "name": "French Fries",
        "rid": 1,
        "available": true,
        "price": 2.49
      },
      {
        "name": "Chicken McNuggets",
        "rid": 1,
        "available": false,
        "price": 5.99
      }
    ],
    "orders": []
  };
    return (
      <div>
        <NavBar/>

        <div className='container'>
          <div className='table'>
            <h1>{test.name}</h1>
            <MenuItems menu={test.menu}/ >
          </div>
        </div>
      </div>
    );
  }

export default Menu;
