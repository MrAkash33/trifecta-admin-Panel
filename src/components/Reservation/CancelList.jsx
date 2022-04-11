import React from "react";
import { Table } from "antd";
import axios from "axios";

const url = "http://localhost:3006/";
const hotelId = localStorage.getItem("hotelID");

export default class CancelList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCancelPop: false,
      data: [],
    };
  }

  componentDidMount() {
    this.getReservation();
  }

  getReservation = async () => {
    await axios
      .post(`${url}api/Reservation`, {
        rid: 0,
        hotelId: hotelId,
        flag: 1,
      })
      .then(res => {
        if (res.data.response[0].length !== 0) {
          this.setState({ data: res.data.response[0] });
        }
      });
  };

  reset = () => {
    this.setState({
      isCancelPop: false,
    });
  };

  render() {
    const data = [
      {
        SRNo: "1",
        B_id: "HMS100001",
        NAME: "Vijay",
        ROOMNO: "101",
        CHECKINDATE: "2021/05/02",
        CHECKOUTDATE: "2021/05/02",
        ROOMPRICE: "200",
        EXTRABEDCHARGES: "1800",
        TOTALCHARGES: "1800",
        ADVPAYMENT: "200",
        NETCHARGES: "2000",
        CancelCharge: "200",
      },
      {
        SRNo: "2",
        B_id: "HMS100001",
        NAME: "Vijay",
        ROOMNO: "101",
        CHECKINDATE: "2021/05/02",
        CHECKOUTDATE: "2021/05/02",
        ROOMPRICE: "200",
        EXTRABEDCHARGES: "1800",
        TOTALCHARGES: "1800",
        ADVPAYMENT: "200",
        NETCHARGES: "2000",
        CancelCharge: "200",
      },
      {
        SRNo: "3",
        B_id: "HMS100001",
        NAME: "Vijay",
        ROOMNO: "101",
        CHECKINDATE: "2021/05/02",
        CHECKOUTDATE: "2021/05/02",
        ROOMPRICE: "200",
        EXTRABEDCHARGES: "1800",
        TOTALCHARGES: "1800",
        ADVPAYMENT: "200",
        NETCHARGES: "2000",
        CancelCharge: "200",
      },
      {
        SRNo: "4",
        B_id: "HMS100001",
        NAME: "Vijay",
        ROOMNO: "101",
        CHECKINDATE: "2021/05/02",
        CHECKOUTDATE: "2021/05/02",
        ROOMPRICE: "200",
        EXTRABEDCHARGES: "1800",
        TOTALCHARGES: "1800",
        ADVPAYMENT: "200",
        NETCHARGES: "2000",
        CancelCharge: "200",
      },
      {
        SRNo: "5",
        B_id: "HMS100001",
        NAME: "Vijay",
        ROOMNO: "101",
        CHECKINDATE: "2021/05/02",
        CHECKOUTDATE: "2021/05/02",
        ROOMPRICE: "200",
        EXTRABEDCHARGES: "1800",
        TOTALCHARGES: "1800",
        ADVPAYMENT: "200",
        NETCHARGES: "2000",
        CancelCharge: "200",
      },
      {
        SRNo: "6",
        B_id: "HMS100001",
        NAME: "Vijay",
        ROOMNO: "101",
        CHECKINDATE: "2021/05/02",
        CHECKOUTDATE: "2021/05/02",
        ROOMPRICE: "200",
        EXTRABEDCHARGES: "1800",
        TOTALCHARGES: "1800",
        ADVPAYMENT: "200",
        NETCHARGES: "2000",
        CancelCharge: "200",
      },
      {
        SRNo: "7",
        B_id: "HMS100001",
        NAME: "Vijay",
        ROOMNO: "101",
        CHECKINDATE: "2021/05/02",
        CHECKOUTDATE: "2021/05/02",
        ROOMPRICE: "200",
        EXTRABEDCHARGES: "1800",
        TOTALCHARGES: "1800",
        ADVPAYMENT: "200",
        NETCHARGES: "2000",
        CancelCharge: "200",
      },
      {
        SRNo: "8",
        B_id: "HMS100001",
        NAME: "Vijay",
        ROOMNO: "101",
        CHECKINDATE: "2021/05/02",
        CHECKOUTDATE: "2021/05/02",
        ROOMPRICE: "200",
        EXTRABEDCHARGES: "1800",
        TOTALCHARGES: "1800",
        ADVPAYMENT: "200",
        NETCHARGES: "2000",
        CancelCharge: "200",
      },
      {
        SRNo: "9",
        B_id: "HMS100001",
        NAME: "Vijay",
        ROOMNO: "101",
        CHECKINDATE: "2021/05/02",
        CHECKOUTDATE: "2021/05/02",
        ROOMPRICE: "200",
        EXTRABEDCHARGES: "1800",
        TOTALCHARGES: "1800",
        ADVPAYMENT: "200",
        NETCHARGES: "2000",
        CancelCharge: "200",
      },
      {
        SRNo: "10",
        B_id: "HMS100001",
        NAME: "Vijay",
        ROOMNO: "101",
        CHECKINDATE: "2021/05/02",
        CHECKOUTDATE: "2021/05/02",
        ROOMPRICE: "200",
        EXTRABEDCHARGES: "1800",
        TOTALCHARGES: "1800",
        ADVPAYMENT: "200",
        NETCHARGES: "2000",
        CancelCharge: "200",
      },
      {
        SRNo: "11",
        B_id: "HMS100001",
        NAME: "Vijay",
        ROOMNO: "101",
        CHECKINDATE: "2021/05/02",
        CHECKOUTDATE: "2021/05/02",
        ROOMPRICE: "200",
        EXTRABEDCHARGES: "1800",
        TOTALCHARGES: "1800",
        ADVPAYMENT: "200",
        NETCHARGES: "2000",
        CancelCharge: "200",
      },
      {
        SRNo: "12",
        B_id: "HMS100001",
        NAME: "Vijay",
        ROOMNO: "101",
        CHECKINDATE: "2021/05/02",
        CHECKOUTDATE: "2021/05/02",
        ROOMPRICE: "200",
        EXTRABEDCHARGES: "1800",
        TOTALCHARGES: "1800",
        ADVPAYMENT: "200",
        NETCHARGES: "2000",
        CancelCharge: "200",
      },
    ];

    const columns = [
      {
        title: "Sr.No.",
        dataIndex: "SRNo",
        key: "SRNo",
      },
      {
        title: "Booking Ref.",
        dataIndex: "B_id",
        key: "B_id",
      },
      {
        title: "NAME",
        dataIndex: "NAME",
        key: "NAME",
      },
      {
        title: "ROOM NO",
        dataIndex: "ROOMNO",
        key: "ROOMNO",
      },
      {
        title: "CHECKIN DATE",
        dataIndex: "CHECKINDATE",
        key: "CHECKINDATE",
      },
      {
        title: "CHECKOUT DATE",
        dataIndex: "CHECKOUTDATE",
        key: "CHECKOUTDATE",
      },
      {
        title: "ROOM PRICE",
        dataIndex: "ROOMPRICE",
        key: "ROOMPRICE",
      },
      {
        title: "EXTRABED CHARGES",
        dataIndex: "EXTRABEDCHARGES",
        key: "EXTRABEDCHARGES",
      },
      {
        title: "TOTAL CHARGES",
        dataIndex: "TOTALCHARGES",
        key: "TOTALCHARGES",
      },
      {
        title: "ADV. PAYMENT",
        dataIndex: "ADVPAYMENT",
        key: "ADVPAYMENT",
      },
      {
        title: "NET CHARGES",
        dataIndex: "NETCHARGES",
        key: "NETCHARGES",
      },
      {
        title: "Cancel Charge",
        dataIndex: "CancelCharge",
        key: "CancelCharge",
      },
    ];

    return (
      <>
        <Table
          className="table_data"
          columns={columns}
          dataSource={data}
          scroll={{ x: "calc(100px + 50%)", y: 240 }}
          bordered
          pagination={10}
        />
      </>
    );
  }
}
