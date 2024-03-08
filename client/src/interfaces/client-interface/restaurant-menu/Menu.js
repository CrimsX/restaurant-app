import React from 'react';
import { useParams } from 'react-router-dom';

function Menu() {
  let { data } = useParams();
    return (
      <p>{data}</p>
    );
  }

export default Menu;
