import React from "react";
import { Radio, Checkbox as aCheckbox, Table } from "antd";
import {
  Tooltip,
  IconButton,
  Paper,
  Grid,
  TextField,
  Box,
  Typography,
  Button,
  Snackbar,
  Select,
  MenuItem,
} from "@material-ui/core";
import AddCircleOutlineTwoToneIcon from "@material-ui/icons/AddCircleOutlineTwoTone";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";
import UserRole from "./UserRole";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const url = "http://localhost:3006/";
const loginID = localStorage.getItem("loginID");

export default class Configuration extends React.Component {
  constructor() {
    super();
    this.state = {
      isUserRolePop: false,
      isMsgPop: false,
      msg: "",
      hid: 0,
      hotelCode: "",
      hotelName: "",
      tariff: "f",
      checkeUsrdData: [],
      checkedDiscountData: [],
      Store: 0,
      housekeeping: 0,
      directBooking: 0,
      pos: 0,
      cmi: 0,
      Ctaxconf: "",
      uTypeData: [],
      discountList: [],
      discountData: [],
      isData: false,
    };
  }

  getUserRole = async (hotelId) => {
    let useList = [];
    await axios.post(`${url}api/UserRole`,{
      Uid:0,
      hotelID:hotelId,
      flag:0
    }).then((res) => {
      if (res.data.response[0].length !== 0) {
        res.data.response[0].map((item) => {
          useList.push({ label: item.userRole, value: item.id });
        });
        this.setState({ uTypeData: useList });
      }
    });
  };

  getDiscount = async (hotelID) => {
    let discountList = [];
    await axios.post(`${url}api/Discount`,{
      did:0,
      hotelId: hotelID,
      flag:0,
    }).then((res) => {
      if (res.data.response[0].length !== 0) {
        this.setState({ discountData: res.data.response[0] });
        res.data.response[0].map((item) => {
          discountList.push({ label: item.discountON, value: item.id });
        });
        this.setState({ discountList: discountList });
      }
    });
  };

  reset = () => {
      this.setState({
          hid: 0,
          hotelCode: "",
          hotelName: "",
          tariff: "f",
          checkeUsrdData: [],
          checkedDiscountData: [],
          Store: 0,
          housekeeping: 0,
          directBooking: 0,
          pos: 0,
          cmi: 0,
          Ctaxconf: "",
        });
  };

  getConfiguration = async (value) => {
    await axios.post(`${url}api/configuration`,{
        chid:value,
        flag:0
    }).then((res) => {
      if (res.data.response[0].length !== 0) {
        res.data.response[0].map((item) => {
          this.setState({
            hid: item.hid,
            tariff: item.tarrif,
            checkeUsrdData: item.userType.split(",").map(Number),
            checkedDiscountData: item.discount.split(",").map(Number),
            Store: item.store,
            housekeeping: item.housekeeping,
            directBooking: item.directBooking,
            pos: item.pos,
            cmi: item.channelManager,
            Ctaxconf: "",
            isData:true,
          });
        });
      }
      else{
          //this.reset();
          this.setState({isData:false});
      }
    });
  };

  getHotelName = async (value) => {
    this.reset();
    this.setState({
      hotelCode: value,
    });

    await axios
      .post(`${url}api/Hotel`, {
        hotelCode: value,
        flag: 1,
      })
      .then((res) => {
        if (res.data.response[0].length !== 0) {
          res.data.response[0].map((item) => {
            this.setState({
              hid: item.Hid,
              hotelCode: item.HotelCode,
              hotelName: item.HotelName,
            });
            
            this.getConfiguration(item.Hid);
            this.getUserRole(item.Hid);
            this.getDiscount(item.Hid);
          });
        }
      });
  };

  closeUserRole = () => {
    this.getUserRole(this.state.hid);
    this.setState({
      isUserRolePop: false,
    });
  };

  saveConfig = async () => {
    let hid = this.state.hid;
    let tariff = this.state.tariff;
    let checkeUsrdData = this.state.checkeUsrdData;
    let checkedDiscountData = this.state.checkedDiscountData;
    let Store = this.state.Store;
    let housekeeping = this.state.housekeeping;
    let directBooking = this.state.directBooking;
    let pos = this.state.pos;
    let cmi = this.state.cmi;
    let Ctaxconf = this.state.Ctaxconf;

    await axios
      .post(`${url}api/configuration/new`, {
        Chid: hid,
        Ctarrif: tariff,
        CuserType: checkeUsrdData,
        Cdiscount: checkedDiscountData,
        Cstore: Store,
        Chousekeeping: housekeeping,
        CdirectBooking: directBooking,
        Cpos: pos,
        CchannelManager: cmi,
        Ctaxconf: Ctaxconf,
        Ccreatedby: loginID,
      })
      .then(
        (response) => {
          if (response.status === 200) {
            this.setState({
              isMsgPop: true,
              msg: response.data.response[0][0].message,
            });
            this.getConfiguration(hid);
            this.getUserRole(hid);
            this.getDiscount(hid);
          }
        },
        (error) => {
          this.setState({
            isMsgPop: true,
            msg: error,
          });
        }
      );
  };

  render() {
    const disColumns = [
      {
        dataIndex: "discountON",
        title: "PARTICULAR",
        key: 1,
      },
      {
        title: "TAX SLABS",
        key: 2,
        render: (record) => (
          <Select id="slab" style={{ minWidth: 120 }} defaultValue={"N"}>
            <MenuItem value="A">CUSTOM</MenuItem>
            <MenuItem value="G">GST</MenuItem>
            <MenuItem value="N">NO GST</MenuItem>
          </Select>
        ),
      },
      {
        title: "GST CONFIGURATION %",
        key: 3,
        render: (record) => (
          <TextField id="CONFIGURATION" variant="outlined" type="number" />
        ),
      },
    ];
    return (
      <Box>
        <Snackbar
          open={this.state.isMsgPop}
          autoHideDuration={6000}
          onClose={() => this.setState({ isMsgPop: false })}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => this.setState({ isMsgPop: false })}
            severity="info"
          >
            {this.state.msg}
          </Alert>
        </Snackbar>
        <input type="hidden" value={this.state.hid} />
        <Grid container spacing={3}>
          <Grid item xs={6} sm={4}>
            <Paper>
              <TextField
                className="w-100"
                id="outlined-secondary"
                label="Hotel Code *"
                variant="outlined"
                value={this.state.hotelCode}
                onChange={(e) => this.getHotelName(e.target.value)}
              />
            </Paper>
          </Grid>

          <Grid item xs={6} sm={4}>
            <Paper>
              <TextField
                disabled
                className="w-100"
                id="outlined-secondary"
                label="Hotel Name *"
                variant="outlined"
                value={this.state.hotelName}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} sm={12}>
            <p className="mb-2">
              <b>Room Tariff *</b>
            </p>
            <Radio.Group
              onChange={(e) => this.setState({ tariff: e.target.value })}
              value={this.state.tariff}
            >
              <Radio value="f">Fixed Rate</Radio>
              <Radio value="r">Reservation Time</Radio>
              <Radio value="b">Both</Radio>
            </Radio.Group>
          </Grid>

          <Grid item xs={12} sm={12}>
            <Typography>
              <Typography>
                <b>User Type</b>
                <Tooltip title="Add User Type" aria-label="add">
                  <IconButton
                    aria-label="Add"
                    onClick={() => this.setState({ isUserRolePop: true })}
                  >
                    <AddCircleOutlineTwoToneIcon />
                  </IconButton>
                </Tooltip>
              </Typography>
            </Typography>
            <Typography gutter>
              <aCheckbox.Group
                options={this.state.uTypeData}
                value={this.state.checkeUsrdData}
                onChange={(e) => this.setState({ checkeUsrdData: e })}
              />
            </Typography>
          </Grid>
          {this.state.isUserRolePop ? (
            <UserRole closeUserRole={this.closeUserRole} hotelId={this.state.hid} />
          ) : null}
          <Grid item xs={12} sm={12}>
            <Typography>
              <Typography>
                <b>Discount</b>
                <Tooltip title="Add Discount" aria-label="add">
                  <IconButton aria-label="Add">
                    <AddCircleOutlineTwoToneIcon
                      onClick={() =>
                        this.setState({ isMsgPop: true, msg: "Under Process" })
                      }
                    />
                  </IconButton>
                </Tooltip>
              </Typography>
            </Typography>
            <Typography gutter>
              <aCheckbox.Group
                options={this.state.discountList}
                value={this.state.checkedDiscountData}
                onChange={(e) => this.setState({ checkedDiscountData: e })}
              />
            </Typography>
          </Grid>

          <Grid item xs={3} sm={3}>
            <p className="mb-2">
              <b>Store</b>
            </p>
            <Radio.Group
              onChange={(e) => this.setState({ Store: e.target.value })}
              value={this.state.Store}
            >
              <Radio value={1}>Yes</Radio>
              <Radio value={0}>No</Radio>
            </Radio.Group>
          </Grid>

          <Grid item xs={3} sm={3}>
            <p className="mb-2">
              <b>House Keeping</b>
            </p>
            <Radio.Group
              onChange={(e) => this.setState({ housekeeping: e.target.value })}
              value={this.state.housekeeping}
            >
              <Radio value={1}>Yes</Radio>
              <Radio value={0}>No</Radio>
            </Radio.Group>
          </Grid>

          <Grid item xs={3} sm={3}>
            <p className="mb-2">
              <b>Direct Booking *</b>
            </p>
            <Radio.Group
              onChange={(e) => this.setState({ directBooking: e.target.value })}
              value={this.state.directBooking}
            >
              <Radio value={1}>Yes</Radio>
              <Radio value={0}>No</Radio>
            </Radio.Group>
          </Grid>

          <Grid item xs={3} sm={3}>
            <p className="mb-2">
              <b>POS *</b>
            </p>
            <Radio.Group
              onChange={(e) => this.setState({ pos: e.target.value })}
              value={this.state.pos}
            >
              <Radio value={1}>Yes</Radio>
              <Radio value={0}>No</Radio>
            </Radio.Group>
          </Grid>

          <Grid item xs={12} sm={12}>
            <p className="mb-2">
              <b>Channel Manager Integration *</b>
            </p>
            <Radio.Group
              onChange={(e) => this.setState({ cmi: e.target.value })}
              value={this.state.cmi}
            >
              <Radio value={1}>Yes</Radio>
              <Radio value={0}>No</Radio>
            </Radio.Group>
          </Grid>

          <Grid item xs={12} sm={12}>
            <Typography>
              <b>Tax Configuration</b>
            </Typography>
            <Table dataSource={this.state.discountData} columns={disColumns} />
          </Grid>

          <Grid item xs={12} sm={12} className="text-center">
            <Button className="save-btn mr-2" onClick={() => this.saveConfig()}>
              {this.state.isData ? "Update" : "Save"}
            </Button>
            {this.state.isData ? null : (
              <Button className="close-btn" onClick={() => this.reset()}>
                Reset
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
    );
  }
}
