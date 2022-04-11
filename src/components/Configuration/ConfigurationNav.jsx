import React from "react";
import { Tabs } from "antd";
import Salary from './Salary';
import Rental from './Rental';
import CommissionList from './CommissionList';
import NewExpense from './NewExpense';
import NewPurchase from './NewPurchase';
import DaySummary from './DaySummary';
import SaleReport from './SaleReport';
import Statement from './Statement';

const { TabPane } = Tabs;

export default class ConfigurationNav extends React.Component {
  render() {
    const operations = <h3 style={{ marginLeft: "1px" }}>Configuration</h3>;
    return (
      <Tabs type="card" tabBarExtraContent={operations}>
        <TabPane tab="Salary" key="sa">
          <Salary />
        </TabPane>
        <TabPane tab="Rental" key="re">
          <Rental />
        </TabPane>
        <TabPane tab="Commission List" key="cl">
          <CommissionList />
        </TabPane>
        <TabPane tab="Expense" key="ex">
          <NewExpense />
        </TabPane>
        <TabPane tab="Purchase" key="pr">
          <NewPurchase />
        </TabPane>
        <TabPane tab="Day Summary" key="ds">
          <DaySummary />
        </TabPane>
        <TabPane tab="Sale Report" key="sr">
          <SaleReport />
        </TabPane>
        <TabPane tab="P & L Statement" key="pls">
          <Statement />
        </TabPane>
      </Tabs>
    );
  }
}
