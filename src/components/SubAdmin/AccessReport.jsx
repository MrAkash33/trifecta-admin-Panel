import React from 'react';
import { Box, Typography } from '@material-ui/core';
import {Table} from 'antd';
import axios from "axios";
const url = "http://localhost:3006/";
const hotelId = localStorage.getItem("hotelID");

export default class AccessReport extends React.Component{
    constructor(){
        super();
        this.state={
            data:[],
        }
    }

    componentDidMount(){
        this.getAccessReport();
    }

    getAccessReport = async() => {
        await axios
      .post(`${url}api/Reservation/data`, {
        rstatus: "",
        hid: hotelId,
        rType: "",
        Category: 0,
        Rmealplan: 0,
        fromDate:"",
        toDate:"",
        flag: 3,
      })
      .then((res) => {
        if (res.data.response[0].length !== 0) {
          this.setState({data:res.data.response[0]})
        }
      });
    }


    render(){
        const columns =[
            {
                dataIndex: "SrNo",
                title: "Sr.NO.",
                key: 1,
              }, 
              {
                dataIndex: "BookingRef",
                title: "Booking ID",
                key: 2,
              },            
              {
                dataIndex: "userName",
                title: "user Name",
                key: 3,
              }, 
              {
                dataIndex: "OperationType",
                title: "Operation Type",
                key: 4,
              }, 
              {
                dataIndex: "OperationTime",
                title: "Operation Time",
                key: 5,
              }, 
        ]
        return (
            <Box>
                <Typography variant="h6">Access Report</Typography>
                <Table 
                    bordered
                    dataSource={this.state.data}
                    columns={columns}
                />
            </Box>
        )
    }
}