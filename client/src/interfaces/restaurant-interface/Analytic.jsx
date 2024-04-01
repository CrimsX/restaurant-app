import React, { useState } from "react";
import BackButton from "../../components/BackButton";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import PopularItems from "./analytic-table/PopularItem.component";
import BusiestHours from "./analytic-table/BusyHour.component";
import RIDSelector from "./analytic-table/SelectRID.component";
import TotalProfit from "./analytic-table/TotalProfit.component";
import "./Analytic.styles.css"

const Analytic = () => {
  const [rid, setRID] = useState(1);

  const selectRID = select => {
    setRID(select);
  }

  return (
    <div className="head"> 
      <BackButton />
        <h1 className="text-3xl my-4"> Analytic </h1>
        <RIDSelector selectRID={selectRID}> </RIDSelector>
      <div className="analytic">
        

        <TotalProfit rid = {rid}> </TotalProfit>

        <Tabs
          id="tabs"
        >
          <Tab eventKey="pop_items" title="Popular Items">
            <PopularItems rid = {rid}> </PopularItems>
          </Tab>
          <Tab eventKey="busy_hours" title="Busiest Hours">
            <BusiestHours rid = {rid}> </BusiestHours>
          </Tab>
        </Tabs>
        </div>
    </div>
  );
}

export default Analytic;