import React from "react";
import { Container, Typography, Grid } from "@material-ui/core";
import { Tabs,Button } from "antd";

import CheckIn from "./CheckIn";
import CheckOut from "./CheckOut";
import StayView from "./StayView";
import RoomShifting from "./RoomShifting";
import EditBooking from "./EditBooking";
import EarlyCheckOut from "./EarlyCheckOut";

const { TabPane } = Tabs;

export default class RoomManagementNav extends React.Component {
  render() {
    const operations = <h3 style={{marginLeft:'1px'}}>Front Office</h3>;
    return (
      <Tabs type="card" tabBarExtraContent={operations}>
        <TabPane tab="CheckIn" key="rm">
          <CheckIn />
        </TabPane>
        <TabPane tab="CheckOut" key="fr">
          <CheckOut />
        </TabPane>
        <TabPane tab="StayView" key="rn">
          <StayView />
        </TabPane>
        <TabPane tab="RoomShifting" key="tp">
          <RoomShifting />
        </TabPane>
        <TabPane tab="EditBooking" key="eb">
          <EditBooking />
        </TabPane>
        <TabPane tab="EarlyCheckOut" key="ec">
          <EarlyCheckOut />
        </TabPane>
      </Tabs>
    );
  }
}
