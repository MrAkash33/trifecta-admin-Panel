import React from "react";
import { Tabs } from "antd";
import ViewReservation from './ViewReservation';
import TravelAgentThirdParty from './TravelAgentThirdParty';
const { TabPane } = Tabs;

export default class ReservationNav extends React.Component {
  render() {
    const operations = <h3 style={{marginLeft:'1px'}}>Reservation</h3>;
    return (
      <Tabs type="card" tabBarExtraContent={operations}>
        <TabPane tab="Reservation" key="rs">
          <ViewReservation />
        </TabPane>
        <TabPane tab="Booking Reference" key="br">
          <TravelAgentThirdParty />
        </TabPane>
      </Tabs>
    );
  }
}
