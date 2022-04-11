import React from "react";
import { Container, Typography, Grid } from "@material-ui/core";
import { Tabs,Button } from "antd";
import RoomCategory from "./RoomCategory";
import Floor from "./Floor";
import RoomNo from "./RoomNo";
import ViewTariff from "./ViewTariff";
import ViewInventory from "./ViewInventory";
import DynamicTariff from './DynamicTariff';
import axios from "axios";

const { TabPane } = Tabs;
const url = "http://localhost:3006/";
const hotelId = localStorage.getItem("hotelID");

export default class RoomManagementNav extends React.Component {
  constructor(){
    super();
    this.state={
      isTarrif:""
    }
  }

  componentDidMount(){
    this.getTarrif();
  }

  getTarrif = async()=>{
    await axios
      .post(`${url}api/Reservation/data`, {
        rstatus: "",
        hid: hotelId,
        rType: "",
        Category: 0,
        Rmealplan: 0,
        fromDate:"",
        toDate:"",
        flag: 2,
      })
      .then((res) => {
        if (res.data.response[0].length !== 0) {
          res.data.response[0].map((item) => {
            this.setState({
              isTarrif:item.tarrif,
            });
          });
        }
      });
  }

  render() {
    const operations = <h3 style={{marginLeft:'1px'}}>Room Management</h3>;
    return (
      <Tabs type="card" tabBarExtraContent={operations}>
        <TabPane tab="Room Category" key="rm">
          <RoomCategory />
        </TabPane>
        <TabPane tab="Floor" key="fr">
          <Floor />
        </TabPane>
        <TabPane tab="Room No" key="rn">
          <RoomNo />
        </TabPane>
        {
          this.state.isTarrif!="r"?
          <TabPane tab="Tariff Plan" key="tp">
            <ViewTariff />
          </TabPane>
          :null
        }
        <TabPane tab="Dynamic Tariff" key="dt">
          <DynamicTariff/>
        </TabPane>
        <TabPane tab="Inventory" key="in">
          <ViewInventory />
        </TabPane>
      </Tabs>
    );
  }
}
