import React from "react";
import RoomsDashboard from "./RoomsDashboard";
import { Container, Grid, Typography,Button } from "@material-ui/core";
import {Table} from 'antd';

const CheckinColumns = [
  {
    key: 1,
    dataIndex: "Name",
    title: "Name",
  },
  {
    key: 2,
    dataIndex: "BookingRef",
    title: "Booking Ref.",
  },
  {
    key: 3,
    title: "Action",
    render: (record) => (
        <>
          <Button className="save-btn mr-2" variant="contained">Check In</Button>
        </>
      ),
  },
];
const CheckoutColumns=[{
    key: 1,
    dataIndex: "Name",
    title: "Name",
  },
  {
    key: 2,
    dataIndex: "BookingRef",
    title: "Booking Ref.",
  },
  {
    key: 3,
    title: "Action",
    render: (record) => (
        <>
          <Button className="save-btn mr-2" variant="contained">Check Out</Button>
        </>
      ),
  },];

const rateColumns=[{
    key: 1,
    dataIndex: "Category",
    title: "Category",
  },
  {
    key: 2,
    dataIndex: "MealPlan",
    title: "Meal Plan",
  },
  {
    key: 3,
    dataIndex: "Rate",
    title: "Rate",
  },];


const stayColumns=[];


export default class Home extends React.Component {
    state = {
        checkinData:[],
        checkoutData:[],
        rateData:[],
        stayViewData:[],
    }

    componentDidMount(){
        this.setState({
            checkinData : [{"Name":"Vijay", "BookingRef":"HOT20162020"}],
            checkoutData : [{"Name":"Vijay", "BookingRef":"HOT20162020"}],
            rateData:[{"Category":"Delux","MealPlan":"E.P.","Rate":"2000"}],
        })
    }

  render() {
    return (
      <>
        <Container>
          <Grid container>
            <Grid lg={4} className="space_bx">
              <div className="boxx_wrapper">
                <Typography variant="h6">Check In</Typography>
              </div>
              <div className="wraper_lay">
                <Table
                  dataSource={this.state.checkinData}
                  columns={CheckinColumns}
                  bordered
                  pagination={{ pageSize: 10 }}
                />
              </div>
            </Grid>
            <Grid lg={4} className="space_bx">
              <div className="boxx_wrapper">
                <Typography variant="h6">Check Out</Typography>
              </div>
              <div className="wraper_lay">
              <Table
                  dataSource={this.state.checkoutData}
                  columns={CheckoutColumns}
                  bordered
                  pagination={{ pageSize: 10 }}
                />
              </div>
            </Grid>
            <Grid lg={4} className="space_bx">
              <div className="boxx_wrapper">
                <Typography variant="h6">Rate of the day</Typography>
              </div>
              <div className="wraper_lay">
              <Table
                  dataSource={this.state.rateData}
                  columns={rateColumns}
                  bordered
                  pagination={{ pageSize: 10 }}
                />
              </div>
            </Grid>
          </Grid>
        </Container>
        <div></div>
        <div>
          <RoomsDashboard />
        </div>
        <Container>
          <Grid container>
            <Grid lg={12}>
              <div className="boxx_wrapper">
                <Typography variant="h6">Stay View</Typography>
              </div>
              <div className="wraper_lay">
              <Table
                  dataSource={this.state.stayViewData}
                  columns={stayColumns}
                  bordered
                  pagination={{ pageSize: 10 }}
                />
              </div>
            </Grid>
            </Grid>
        </Container>
      </>
    );
  }
}
