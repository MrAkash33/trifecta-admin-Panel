import React from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  Dialog,
  TextField,
  AppBar,
  Toolbar,
  Snackbar,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  Paper,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import axios from "axios";
import CloseIcon from "@material-ui/icons/Close";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { ThreeSixtyTwoTone } from "@material-ui/icons";

const url = "http://localhost:3006/";
const hotelId = localStorage.getItem("hotelID");
const loginID = localStorage.getItem("loginID");
const HotelName = "abc hms"//localStorage.getItem("hotelName");

const BookingRefID =
  HotelName.split(" ")
    .map(function (item) {
      return item[0];
    })
    .join("") + Math.round(new Date().getTime() / 1000);

let today = new Date();
let Tyear = today.getFullYear();
let Tmonth =
  today.getMonth() + 1 < 10
    ? "0" + (today.getMonth() + 1)
    : today.getMonth() + 1;

let Tday = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();

let nDay = today.getDate() + 1;

nDay = nDay < 10 ? "0" + nDay : nDay;

const TodayDate = Tyear + "-" + Tmonth + "-" + Tday;
const NextDate = Tyear + "-" + Tmonth + "-" + nDay;

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class NewReservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPop: true,
      isMsgPop: false,
      msg: "",
      selectedDate: TodayDate,
      NextDate: NextDate,
      checkinTime: "12:00",
      checkoutTime: "10:00",
      Reference: "n",
      CompName: 0,
      compList: [],
      guest: "",
      roomCategory: "0",
      roomCategoryList: [],
      roomType: "NN",
      roomNo: 0,
      roomList: [],
      mealPlan: "0",
      mealPlanList: [],
      Occupancy: "0_0",
      OccupancyList: [],
      tarrif: "b",
      roomCharge: 0,
      netRoomCharge: 0,
      pax: 1,
      child: 0,
      ExtraBed: 0,
      bedCharge: 0,
      totalBedCharge: 0,
      netBedCharge: 0,
      guestList: [],
      guestData: "",
      isDoneGuest: false,
      subTotal: 0,
      discount: 0,
      discountList: "",
      taxableAmnt: 0,
      CGST: 0,
      SGST: 0,
      totalAmount: 0,
      advPayment: 0,
      PaymentType: "n",
      netPayment: 0,
    };
  }

  reset = () => {
    this.setState({
      isPop: true,
      isMsgPop: false,
      msg: "",
      selectedDate: TodayDate,
      NextDate: NextDate,
      checkinTime: "12:00",
      checkoutTime: "10:00",
      Reference: "n",
      CompName: 0,
      compList: [],
      guest: "",
      roomCategory: "0",
      roomCategoryList: [],
      roomType: "NN",
      roomNo: 0,
      roomList: [],
      mealPlan: "0",
      mealPlanList: [],
      Occupancy: "0_0",
      OccupancyList: [],
      tarrif: "b",
      roomCharge: 0,
      netRoomCharge: 0,
      pax: 1,
      child: 0,
      ExtraBed: 0,
      bedCharge: 0,
      totalBedCharge: 0,
      netBedCharge: 0,
      guestList: [],
      guestData: "",
      isDoneGuest: false,
      subTotal: 0,
      discount: 0,
      discountList: "",
      taxableAmnt: 0,
      CGST: 0,
      SGST: 0,
      totalAmount: 0,
      advPayment: 0,
      PaymentType: "n",
      netPayment: 0,
    });
    this.props.closeResPop();
  };

  componentDidMount() {
    this.getMealPlanList();
    this.getRoomCategory();
    this.getDiscount();
    this.getOccupancyList();
  }

  getOccupancyList = async () => {
    await axios
      .post(`${url}api/Occupancy`, {
        Oid: 0,
        hotelId: hotelId,
        flag: 0,
      })
      .then((res) => {
        if (res.data.response[0].length !== 0) {
          this.setState({ OccupancyList: res.data.response[0] });
        }
      });
  };

  getDiscount = async () => {
    await axios
      .post(`${url}api/configuration`, {
        chid: hotelId,
        flag: 3,
      })
      .then((res) => {
        if (res.data.response[0].length !== 0) {
          res.data.response[0].map((item) => {
            this.setState({ discountList: item.discType });
          });
        }
      });
  };

  getMealPlanList = async () => {
    await axios
      .post(`${url}api/MealPlan`, {
        mid: 0,
        hotelId: hotelId,
        flag: 0,
      })
      .then((res) => {
        if (res.data.response[0].length !== 0) {
          this.setState({ mealPlanList: res.data.response[0] });
        }
      });
  };

  getReference = async (e) => {
    this.setState({ Reference: e.target.value });
    await axios
      .post(`${url}api/BookingRef`, {
        BookRef: e.target.value,
        hotelId: hotelId,
        flag: 1,
      })
      .then((res) => {
        if (res.data.response[0].length !== 0) {
          this.setState({ compList: res.data.response[0] });
        }
      });
  };

  getRoomCategory = async () => {
    await axios
      .post(`${url}api/roomCategory`, {
        rid: 0,
        hotelId: hotelId,
        flag: 0,
      })
      .then((res) => {
        if (res.data.response[0].length !== 0) {
          this.setState({ roomCategoryList: res.data.response[0] });
        }
      });
  };

  getRoomType = (event) => {
    this.setState({
      roomType: event.target.value,
    });
    this.getRoomNo(event.target.value);
  };

  getRoomNo = async (roomType) => {
    let category = this.state.roomCategory;
    let rType = roomType; //this.state.roomType;
    let rstatus = "vacant";

    await axios
      .post(`${url}api/Reservation/data`, {
        rstatus: rstatus,
        hid: hotelId,
        Occupancy: 0,
        rType: rType,
        Category: category,
        fromDate: "",
        toDate: "",
        Rmealplan: 0,
        flag: 0,
      })
      .then((res) => {
        if (res.data.response[0].length !== 0) {
          this.setState({ roomList: res.data.response[0] });
        } else {
          this.setState({ roomList: [], roomNo: "0" });
        }
      });
  };

  getOccupancy = async (event) => {
    let category = this.state.roomCategory;
    let rType = this.state.roomType;
    let Rmealplan = this.state.mealPlan;
    let Occupancy = event.target.value.split("_")[0];
    let rstatus = "vacant";
    let fromDate = this.state.selectedDate;
    let toDate = this.state.NextDate;
    this.setState({
      Occupancy: event.target.value,
      pax: event.target.value.split("_")[1],
    });

    await axios
      .post(`${url}api/Reservation/data`, {
        rstatus: rstatus,
        hid: hotelId,
        Occupancy: Occupancy,
        rType: rType,
        Category: category,
        Rmealplan: Rmealplan,
        fromDate: fromDate,
        toDate: toDate,
        flag: 1,
      })
      .then((res) => {
        if (res.data.response[0].length !== 0) {
          res.data.response[0].map((item) => {
            this.setState({
              roomCharge: item.tarrif != "r" ? item.RoomCharge : 0,
              bedCharge: item.tarrif != "r" ? item.BedCharge : 0,
              tarrif: item.tarrif,
            });
          });
        } else {
          this.setState({
            isMsgPop: true,
            msg: "Please Set Charges.",
            roomCharge: 0,
            bedCharge: 0,
            tarrif: "b",
          });
        }
      });
  };

  getExtraBed = (e) => {
    let extrabed = this.state.bedCharge;
    this.setState({
      ExtraBed: e.target.value,
      totalBedCharge: extrabed * e.target.value,
    });
  };

  callPayment = (val) => {
    this.setState({
      advPayment: val,
      netPayment: this.state.totalAmount - val,
    });
  };

  callNext = (val) => {
    let Tyear = val.split("-")[0];

    let Tmonth = val.split("-")[1];

    let Tday = parseInt(val.split("-")[2]) + 1;
    Tday = Tday < 10 ? "0" + Tday : Tday;

    let NextDate = Tyear + "-" + Tmonth + "-" + Tday;

    this.setState({
      selectedDate: val,
      NextDate: NextDate,
    });
  };

  addData = () => {
    let guest = this.state.guest;
    let Rcategory = this.state.roomCategory;
    let RType = this.state.roomType;
    let RoomNo = this.state.roomNo;
    let MealPlan = this.state.mealPlan;
    let RoomCharge = this.state.roomCharge;
    let Adult = this.state.pax;
    let child = this.state.child;
    let extrabed = this.state.ExtraBed;
    let eBedCharge = this.state.totalBedCharge;

    let date1 = new Date(this.state.selectedDate);
    let date2 = new Date(this.state.NextDate);
    let diffInMs = Math.abs(date2 - date1);
    diffInMs = diffInMs / (1000 * 60 * 60 * 24);
    let subTotal = diffInMs * RoomCharge + diffInMs * eBedCharge;

    let roomCategoryName = this.state.roomCategoryList.find((item) => {
      return item.c_id === Rcategory;
    });

    let MealPlanName = this.state.mealPlanList.find((item) => {
      return item.id === MealPlan;
    });

    let RoomNoName = this.state.roomList.find((item) => {
      return item.r_id === RoomNo;
    });

    let guestList = this.state.guestList;
    let guestData = "";

    guestList.push({
      Name: guest,
      CategoryName: roomCategoryName.Category,
      Category: Rcategory,
      Type: RType,
      RoomNo: RoomNo,
      RoomNoName: RoomNoName.Room_no,
      MealPlan: MealPlan,
      MealPlanName: MealPlanName.plan,
      RoomCharge: RoomCharge,
      Adult: Adult,
      Child: child,
      ExtraBed: extrabed,
      ExtraCharge: eBedCharge,
    });

    guestList.map((item) => {
      if (guestData.trim == "" || guestData.length == 0) {
        guestData =
          "'" +
          item.Name +
          "'," +
          item.Category +
          ",'" +
          item.Type +
          "'," +
          item.RoomNo +
          "," +
          item.MealPlan +
          "," +
          item.RoomCharge +
          "," +
          item.Adult +
          "," +
          item.Child +
          "," +
          item.ExtraBed +
          "," +
          item.ExtraCharge;
      } else {
        guestData +=
          "#'" +
          item.Name +
          "'," +
          item.Category +
          ",'" +
          item.Type +
          "'," +
          item.RoomNo +
          "," +
          item.MealPlan +
          "," +
          item.RoomCharge +
          "," +
          item.Adult +
          "," +
          item.Child +
          "," +
          item.ExtraBed +
          "," +
          item.ExtraCharge;
      }
    });

    this.setState({
      guestList,
      guestData,
      subTotal: subTotal + this.state.subTotal,
      netRoomCharge: this.state.netRoomCharge + RoomCharge,
      netBedCharge: this.state.netBedCharge + eBedCharge,
    });

    this.resetAfterAdd();
  };

  setDiscount = (val) => {
    let discount = val;
    let subTotal = this.state.subTotal;
    let roomCharge = this.state.netRoomCharge;
    let totalBedCharge = this.state.netBedCharge;
    let date1 = new Date(this.state.selectedDate);
    let date2 = new Date(this.state.NextDate);
    let diffInMs = Math.abs(date2 - date1);
    diffInMs = diffInMs / (1000 * 60 * 60 * 24);

    roomCharge = this.state.discountList.match("RC")
      ? (diffInMs * roomCharge * discount) / 100
      : 0;

    totalBedCharge = this.state.discountList.match("EB")
      ? (diffInMs * totalBedCharge * discount) / 100
      : 0;

    let taxableAmnt = subTotal - (roomCharge + totalBedCharge);

    let cgst = (taxableAmnt * 6) / 100;

    let totalAmount = taxableAmnt + cgst + cgst;

    this.setState({
      taxableAmnt: taxableAmnt,
      CGST: cgst,
      SGST: cgst,
      discount: val,
      totalAmount: totalAmount,
    });
  };

  doneList = () => {
    let guestList = this.state.guestList;

    if (guestList.length == 0 && guestList == "") {
      this.setState({
        isMsgPop: true,
        msg: "Enter a guest info.",
      });
      return false;
    }

    this.setState({
      isDoneGuest: true,
    });
  };

  resetAfterAdd = () => {
    this.setState({
      guest: "",
      roomCategory: "0",
      roomType: "NN",
      roomNo: 0,
      roomList: [],
      mealPlan: "0",
      Occupancy: "0_0",
      tarrif: "b",
      roomCharge: 0,
      pax: 1,
      child: 0,
      ExtraBed: 0,
      bedCharge: 0,
      totalBedCharge: 0,
    });
  };

  resetList = () => {
    this.setState({
      guest: "",
      roomCategory: "0",
      roomType: "NN",
      roomNo: 0,
      roomList: [],
      mealPlan: "0",
      Occupancy: "0_0",
      tarrif: "b",
      roomCharge: 0,
      pax: 1,
      child: 0,
      ExtraBed: 0,
      bedCharge: 0,
      totalBedCharge: 0,
      guestList: [],
      guestData: "",
      isDoneGuest: false,
      subTotal: 0,
      discount: 0,
      discountList: "",
      taxableAmnt: 0,
      CGST: 0,
      SGST: 0,
      totalAmount: 0,
      advPayment: 0,
      PaymentType: "n",
      netPayment: 0,
    });
  };

  render() {
    return (
      <Dialog onClose={() => this.reset()} fullScreen open={this.state.isPop}>
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
        <AppBar style={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => this.reset()}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6">New Reservation</Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Box>
            <br />
            <Grid container spacing={2}>
              <Grid  item>
                <Typography gutterBottom>
                  <TextField
                    id="checkinDate"
                    label="Check-In Date *"
                    variant="outlined"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={this.state.selectedDate}
                    onChange={(e) => this.callNext(e.target.value)}
                    inputProps={{
                      min: TodayDate,
                    }}
                  />
                </Typography>
              </Grid>
              <Grid  item>
                <Typography gutterBottom>
                  <TextField
                    id="outlined-basic"
                    label="Check-Out Date *"
                    variant="outlined"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={this.state.NextDate}
                    onChange={(e) =>
                      this.setState({ NextDate: e.target.value })
                    }
                    inputProps={{
                      min: NextDate,
                    }}
                  />
                </Typography>
              </Grid>
              <Grid  item>
                <Typography gutterBottom>
                  <TextField
                    id="outlined-basic"
                    label="Check-In *"
                    variant="outlined"
                    type="time"
                    value={this.state.checkinTime}
                    onChange={(e) =>
                      this.setState({ checkinTime: e.target.value })
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                  />
                </Typography>
              </Grid>
              <Grid  item>
                <Typography gutterBottom>
                  <TextField
                    id="outlined-basic"
                    label="Check-Out *"
                    variant="outlined"
                    type="time"
                    value={this.state.checkoutTime}
                    onChange={(e) =>
                      this.setState({ checkoutTime: e.target.value })
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                  />
                </Typography>
              </Grid>
              <Grid  item>
                <Typography gutterBottom>
                  <FormControl variant="outlined" style={{ minWidth: 150 }}>
                    <InputLabel id="demo-simple-select-outlined-label">
                      Booking Reference *
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={this.state.Reference}
                      onChange={(e) => this.getReference(e)}
                      label=">Booking Reference"
                    >
                      <MenuItem value="n">-Booking Reference-</MenuItem>
                      <MenuItem value="ID">Individual</MenuItem>
                      <MenuItem value="RE">Relatives</MenuItem>
                      <MenuItem value="FR">Friends</MenuItem>
                      <MenuItem value="HS">Hotel Staff</MenuItem>
                      <MenuItem value="TA">Travel Agent</MenuItem>
                      <MenuItem value="TP">Third Party Side</MenuItem>
                    </Select>
                  </FormControl>
                </Typography>
              </Grid>
              {this.state.Reference == "TA" || this.state.Reference == "TP" ? (
                <Grid container item xs>
                  <Typography gutterBottom>
                    <FormControl variant="outlined" style={{ minWidth: 150 }}>
                      <InputLabel id="demo-simple-select-outlined-label">
                        Company Name
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={this.state.CompName}
                        onChange={(e) =>
                          this.setState({ CompName: e.target.value })
                        }
                        label=">Company  Name"
                      >
                        <MenuItem value="0">-Company Name-</MenuItem>
                        {this.state.compList.map((item) => (
                          <MenuItem value={item.id} key={item.id}>
                            {item.Company_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Typography>
                </Grid>
              ) : null}
            </Grid>

            <Box sx={{ border: "1px dashed grey" }}>
              <Grid spacing={5}>
                <Grid item >
                  <Typography gutterBottom>
                    <TextField
                      id="outlined-basic"
                      label="Guest Name *"
                      variant="outlined"
                      value={this.state.guest}
                      onChange={(e) => this.setState({ guest: e.target.value })}
                    />
                  </Typography>
                </Grid>
                <Grid item >
                  <Typography gutterBottom>
                    <FormControl variant="outlined" style={{ minWidth: 150 }}>
                      <InputLabel id="demo-simple-select-outlined-label">
                        Room Category *
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={this.state.roomCategory}
                        onChange={(e) =>
                          this.setState({
                            roomCategory: e.target.value,
                            roomList: [],
                            roomNo: "0",
                          })
                        }
                        label="Room Category"
                      >
                        <MenuItem value="0">None</MenuItem>
                        {this.state.roomCategoryList.map((item) => (
                          <MenuItem value={item.c_id} key={item.c_id}>
                            {item.Category}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Typography>
                </Grid>
                <Grid container item xs>
                  <Typography gutterBottom>
                    <FormControl variant="outlined" style={{ minWidth: 150 }}>
                      <InputLabel id="demo-simple-select-outlined-label">
                        Room Type *
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={this.state.roomType}
                        onChange={(e) => this.getRoomType(e)}
                        label="Room Type"
                      >
                        <MenuItem value="NN">None</MenuItem>
                        <MenuItem value="A">AC</MenuItem>
                        <MenuItem value="N">Non Ac</MenuItem>
                      </Select>
                    </FormControl>
                  </Typography>
                </Grid>
                <Grid container item xs>
                  <Typography gutterBottom>
                    <FormControl variant="outlined" style={{ minWidth: 150 }}>
                      <InputLabel id="demo-simple-select-outlined-label">
                        Room No *
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={this.state.roomNo}
                        onChange={(e) =>
                          this.setState({ roomNo: e.target.value })
                        }
                        label="Room No"
                      >
                        <MenuItem value="0">-Select-</MenuItem>
                        {this.state.roomList.map((item) => (
                          <MenuItem value={item.r_id}>{item.Room_no}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Typography>
                </Grid>
                <Grid container item xs>
                  <Typography gutterBottom>
                    <FormControl variant="outlined" style={{ minWidth: 150 }}>
                      <InputLabel id="demo-simple-select-outlined-label">
                        Meal Plan *
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={this.state.mealPlan}
                        onChange={(e) =>
                          this.setState({ mealPlan: e.target.value })
                        }
                        label="Meal Plan"
                      >
                        <MenuItem value="0">None</MenuItem>
                        {this.state.mealPlanList.map((item) => (
                          <MenuItem value={item.id} key={item.id}>
                            {item.plan}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={5}>
                <Grid container item xs>
                  <Typography gutterBottom>
                    <FormControl variant="outlined" style={{ minWidth: 150 }}>
                      <InputLabel id="demo-Occupancy">Occupancy *</InputLabel>
                      <Select
                        labelId="demo-Occupancy"
                        id="demo-Occupancy"
                        value={this.state.Occupancy}
                        onChange={(e) => this.getOccupancy(e)}
                        label="Occupancy"
                      >
                        <MenuItem value="0_0">-Select-</MenuItem>
                        {this.state.OccupancyList.map((item) => (
                          <MenuItem value={item.id + "_" + item.Occupancy}>
                            {item.OccupancyType}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Typography>
                </Grid>
                <Grid container item xs>
                  <Typography gutterBottom>
                    <TextField
                      id="outlined-number"
                      enabled={this.state.tarrif == "f" ? false : true}
                      label="Room Charges *"
                      variant="outlined"
                      type="number"
                      InputLabelProps={{ shrink: true }}
                      value={this.state.roomCharge}
                      onChange={(e) =>
                        this.setState({ roomCharge: e.target.value })
                      }
                    />
                  </Typography>
                </Grid>
                <Grid container item xs>
                  <TextField
                    id="outlined-number"
                    type="number"
                    label="Adults *"
                    disabled
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ inputProps: { min: "1", step: "1" } }}
                    value={this.state.pax}
                    onChange={(e) => this.setState({ pax: e.target.value })}
                  />
                </Grid>
                <Grid container item xs>
                  <TextField
                    id="outlined-number"
                    label="Child"
                    variant="outlined"
                    type="number"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ inputProps: { min: "0", step: "1" } }}
                    defaultValue={this.state.child}
                  />
                </Grid>
                <Grid container item xs>
                  <Typography gutterBottom>
                    <FormControl variant="outlined" style={{ minWidth: 150 }}>
                      <InputLabel id="demo-simple-select-outlined-label">
                        Extra Bed
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={this.state.ExtraBed}
                        onChange={(e) => this.getExtraBed(e)}
                        label=">Extra Bed"
                      >
                        <MenuItem value="0">-None-</MenuItem>
                        <MenuItem value="1">1</MenuItem>
                        <MenuItem value="2">2</MenuItem>
                        <MenuItem value="3">3</MenuItem>
                        <MenuItem value="4">4 </MenuItem>
                      </Select>
                    </FormControl>
                  </Typography>
                </Grid>
                <Grid container item xs>
                  <Typography gutterBottom>
                    <TextField
                      id="outlined"
                      label="Extra Bed Charge"
                      variant="outlined"
                      type="number"
                      enabled={this.state.tarrif == "f" ? false : true}
                      value={this.state.totalBedCharge}
                      onChange={(e) =>
                        this.setState({
                          bedCharge: e.target.value,
                          totalBedCharge: e.target.value,
                        })
                      }
                    />
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid container item xs>
                  <Typography gutterBottom>
                    <Button
                      autoFocus
                      color="primary"
                      variant="contained"
                      className="save-btn mr-2"
                      onClick={() => this.addData()}
                    >
                      Add +
                    </Button>
                  </Typography>
                  &nbsp;&nbsp;
                  <Typography gutterBottom>
                    <Button
                      color="secondary"
                      variant="contained"
                      className="close-btn"
                      onClick={() => this.resetList()}
                    >
                      Reset
                    </Button>
                  </Typography>
                </Grid>
              </Grid>
              <TableContainer>
                <TableHead>
                  <TableRow>
                    <TableCell>Sr. No.</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Room No</TableCell>
                    <TableCell>Meal Plan</TableCell>
                    <TableCell>Room Charge</TableCell>
                    <TableCell>Adult</TableCell>
                    <TableCell>Child</TableCell>
                    <TableCell>Extra Bed</TableCell>
                    <TableCell>Extra Charge</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.guestList.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{item.Name}</TableCell>
                      <TableCell>{item.CategoryName}</TableCell>
                      <TableCell>{item.RoomNoName}</TableCell>
                      <TableCell>{item.MealPlanName}</TableCell>
                      <TableCell>{item.RoomCharge}</TableCell>
                      <TableCell>{item.Adult}</TableCell>
                      <TableCell>{item.Child}</TableCell>
                      <TableCell>{item.ExtraBed}</TableCell>
                      <TableCell>{item.ExtraCharge}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </TableContainer>

              <Button
                className="save-btn mr-2"
                variant="contained"
                onClick={() => this.doneList()}
              >
                Done Guest List
              </Button>
            </Box>
            <br />
            <br />
            {this.state.isDoneGuest ? (
              <>
                <Grid container spacing={5}>
                  <Grid container item xs>
                    <Typography gutterBottom>
                      <TextField
                        id="outlined-basic"
                        label="Sub Total *"
                        variant="outlined"
                        disabled
                        value={this.state.subTotal}
                      />
                    </Typography>
                  </Grid>
                  <Grid container item xs>
                    <Typography gutterBottom>
                      <TextField
                        id="outlined-basic"
                        label="Discount @ % *"
                        variant="outlined"
                        value={this.state.discount}
                        onChange={(e) => this.setDiscount(e.target.value)}
                      />
                    </Typography>
                  </Grid>
                  <Grid container item xs>
                    <Typography gutterBottom>
                      <TextField
                        id="outlined-basic"
                        label="Taxable Amount *"
                        variant="outlined"
                        disabled
                        value={this.state.taxableAmnt}
                      />
                    </Typography>
                  </Grid>
                  <Grid container item xs>
                    <Typography gutterBottom>
                      <TextField
                        type="number"
                        disabled
                        id="outlined-basic"
                        label="CGST @ 6%"
                        variant="outlined"
                        value={this.state.CGST}
                      />
                    </Typography>
                  </Grid>
                  <Grid container item xs>
                    <Typography gutterBottom>
                      <TextField
                        disabled
                        type="number"
                        id="outlined-basic"
                        label="SGST @ 6%"
                        variant="outlined"
                        value={this.state.SGST}
                      />
                    </Typography>
                  </Grid>
                  <Grid container item xs>
                    <Typography gutterBottom>
                      <TextField
                        disabled
                        id="outlined-basic"
                        label="Total Amount *"
                        variant="outlined"
                        value={this.state.totalAmount}
                      />
                    </Typography>
                  </Grid>
                  <Grid container item xs>
                    <Typography gutterBottom>
                      <TextField
                        id="outlined-basic"
                        label="Adv. Payment *"
                        variant="outlined"
                        value={this.state.advPayment}
                        onChange={(e) => this.callPayment(e.target.value)}
                      />
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid container item xs>
                    <Typography gutterBottom>
                      <FormControl variant="outlined" style={{ minWidth: 150 }}>
                        <InputLabel id="demo-simple-select-outlined-label">
                          Adv. Payment Type *
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value={this.state.PaymentType}
                          onChange={(e) =>
                            this.setState({ PaymentType: e.target.value })
                          }
                          label="Adv. Payment Type"
                        >
                          <MenuItem value="n">-None-</MenuItem>
                          <MenuItem value="Cash">Cash</MenuItem>
                          <MenuItem value="Card">Card</MenuItem>
                          <MenuItem value="Neft">NEFT</MenuItem>
                          <MenuItem value="Paypal">PayPal</MenuItem>
                          <MenuItem value="paytm">paytm</MenuItem>
                        </Select>
                      </FormControl>
                    </Typography>
                  </Grid>
                  <Grid container item xs>
                    <Typography gutterBottom>
                      <TextField
                        id="outlined-basic"
                        label="Net Amount *"
                        variant="outlined"
                        disabled
                        value={this.state.netPayment}
                      />
                    </Typography>
                  </Grid>
                </Grid>
              </>
            ) : null}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button className="save-btn mr-2" color="primary" variant="contained">
            Save
          </Button>
          &nbsp;&nbsp;
          <Button
            onClick={() => this.reset()}
            color="secondary"
            variant="contained"
            className="close-btn"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
