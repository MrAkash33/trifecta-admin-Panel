import React from "react";
import { Box } from "@material-ui/core";
import { Tabs } from "antd";
import GSTCalculation from "./GSTCalculation";
import HotelRegistration from "./HotelRegistration";
import UserAccessFeature from "./UserAccessFeature";
import AccessReport from "./AccessReport"; 
const { TabPane } = Tabs;

export default class SubAdminNav extends React.Component {
  render() {
    const operations = <h3 style={{ marginLeft: "1px" }}>Admin</h3>;
    return (
      <Box>
        <Tabs defaultActiveKey="1" type="card" tabBarExtraContent={operations}>
          <TabPane tab="Hotel Details" key="1">
            <HotelRegistration />
          </TabPane>
          <TabPane tab="User Access Feature" key="2">
            <UserAccessFeature />
          </TabPane>
          <TabPane  tab="User Access Report" key="4">
            <AccessReport/>
          </TabPane>
          <TabPane tab="Gst Calculation" key="3">
            <GSTCalculation />
          </TabPane>
        </Tabs>
      </Box>
    );
  }
}
