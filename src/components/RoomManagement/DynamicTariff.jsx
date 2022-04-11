import React from "react";
import {
  Box,
  Typography,
  Button,
  Tooltip,
  Dialog,
  TextField,
  RadioGroup,
  FormControlLabel,
  FormHelperText,
  Snackbar,
} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import MuiAlert from "@material-ui/lab/Alert";
import { Table, Checkbox as aCheckbox } from "antd";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineTwoToneIcon from "@material-ui/icons/AddCircleOutlineTwoTone";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Radio from "@material-ui/core/Radio";
import MealPlan from "./MealPlan";
import axios from "axios";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const url = "http://localhost:3006/";

let today = new Date();
let Tyear = today.getFullYear();
let Tmonth =
  today.getMonth() + 1 < 10
    ? "0" + (today.getMonth() + 1)
    : today.getMonth() + 1;
let Tday = today.getDate();
const TodayDate = Tyear + "-" + Tmonth + "-" + Tday;

const dayList = [
  { label: "Sun", value: 1 },
  { label: "Mon", value: 2 },
  { label: "Tue", value: 3 },
  { label: "Wed", value: 4 },
  { label: "Thu", value: 5 },
  { label: "Fri", value: 6 },
  { label: "Sat", value: 7 },
];

export default class DynamicTariff extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPop: false,
      tid: 0,
      isEdit: false,
      type: "p",
      thirdParty: "0",
      roomCategory: "0",
      occupancy: "0",
      isThird: "n",
      roomType: "A",
      mPlan: "0",
      chargeType: "S",
      isMealPop: false,
      data: [],
      roomCategoryData: [],
      mealPlanList: [],
      checkedData: [1, 2, 3, 4, 5, 6, 7],
      RoomCharge: 0,
      BedCharge: 0,
      fromDate: TodayDate,
      toDate: TodayDate,
      CategoryError: "",
      OccupancyError: "",
      RoomChargeError: "",
      BedChargeError: "",
      MealPlanError: "",
      isMsgPop: false,
      msg: "",
    };
  }

  reset() {
    this.setState({
      isPop: false,
      tid: 0,
      isEdit: false,
      type: "p",
      thirdParty: "0",
      roomCategory: "0",
      occupancy: "0",
      isThird: "n",
      roomType: "A",
      mPlan: "0",
      checkedData: [1, 2, 3, 4, 5, 6, 7],
      RoomCharge: 0,
      BedCharge: 0,
      fromDate: TodayDate,
      toDate: TodayDate,
      chargeType: "S",
      CategoryError: "",
      OccupancyError: "",
      RoomChargeError: "",
      BedChargeError: "",
      MealPlanError: "",
    });
  }

  componentDidMount() {
    this.getRoomCategoryData();
    this.getMealPlanList();
    this.getViewTariffSummary();
  }

  getViewTariffSummary = async () => {
    await axios.get(`${url}api/Tariff`).then((res) => {
      if (res.data.response[0].length !== 0) {
        this.setState({ data: res.data.response[0] });
      }
    });
  };

  getRoomCategoryData = async () => {
    await axios.get(`${url}api/roomCategory`).then((res) => {
      if (res.data.response[0].length !== 0) {
        this.setState({ roomCategoryData: res.data.response[0] });
      }
    });
  };

  getMealPlanList = async () => {
    await axios.get(`${url}api/MealPlan`).then((res) => {
      if (res.data.response[0].length !== 0) {
        this.setState({ mealPlanList: res.data.response[0] });
      }
    });
  };

  getMealPlan = (event) => {
    this.setState({ mPlan: event.target.value });
  };

  getThirdParty = (event) => {
    this.setState({ thirdParty: event.target.value });
  };

  getRoomCategory = (event) => {
    this.setState({ roomCategory: event.target.value });
  };

  getOccupancy = (event) => {
    this.setState({ occupancy: event.target.value });
  };

  getType = (event) => {
    this.setState({
      type: event.target.value,
      isThird: event.target.value !== "p" ? "y" : "n",
    });
  };

  getRoomType = (event) => {
    this.setState({ roomType: event.target.value });
  };

  closeMealType = () => {
    this.setState({ isMealPop: false });
    this.getMealPlanList();
  };

  chargeType = (event) => {
    this.setState({
      chargeType: event.target.value,
    });

    if (event.target.value == "S") {
      this.setState({
        fromDate: TodayDate,
        toDate: TodayDate,
      });
    }
  };

  saveList = async () => {
    const TPartyType = this.state.type;
    const TThirdParty = this.state.thirdParty;
    const TRoomCategory = this.state.roomCategory;
    const TOccupancy = this.state.occupancy;
    const TRoomType = this.state.roomType;
    const TChargeType = this.state.chargeType;
    const TRoomCharge = this.state.RoomCharge;
    const TBedCharge = this.state.BedCharge;
    const TMealPlan = this.state.mPlan;
    const TFromDate = this.state.fromDate;
    const TToDate = this.state.toDate;
    const TDays = this.state.checkedData.join();
    const TCreatedBy = 0;
    const tid = this.state.tid;

    if (TRoomCategory == 0) {
      this.setState({
        CategoryError: "Select Category",
      });
      return false;
    }

    if (TOccupancy == "0") {
      this.setState({
        OccupancyError: "Select Occupancy",
      });
      return false;
    }

    if (TRoomCharge == 0 || TRoomCharge < 0) {
      this.setState({
        RoomChargeError: "Enter Room Charge",
      });
      return false;
    }

    if (TBedCharge == 0 || TBedCharge < 0) {
      this.setState({
        BedChargeError: "Enter Bed Charge",
      });
      return false;
    }

    if (TMealPlan == 0) {
      this.setState({
        MealPlanError: "Select Meal Plan",
      });
      return false;
    }

    await axios
      .post(
        this.state.isEdit ? `${url}api/Tariff/update` : `${url}api/Tariff/new`,
        this.state.isEdit
          ? {
              tid: tid,
              TPartyType: TPartyType,
              TThirdParty: TThirdParty,
              TRoomCategory: TRoomCategory,
              TOccupancy: TOccupancy,
              TRoomType: TRoomType,
              TChargeType: TChargeType,
              TRoomCharge: TRoomCharge,
              TBedCharge: TBedCharge,
              TMealPlan: TMealPlan,
              TFromDate: TFromDate,
              TToDate: TToDate,
              TDays: TDays,
              TCreatedBy: TCreatedBy,
            }
          : {
              TPartyType: TPartyType,
              TThirdParty: TThirdParty,
              TRoomCategory: TRoomCategory,
              TOccupancy: TOccupancy,
              TRoomType: TRoomType,
              TChargeType: TChargeType,
              TRoomCharge: TRoomCharge,
              TBedCharge: TBedCharge,
              TMealPlan: TMealPlan,
              TFromDate: TFromDate,
              TToDate: TToDate,
              TDays: TDays,
              TCreatedBy: TCreatedBy,
            }
      )
      .then(
        (response) => {
          if (response.status === 200) {
            this.getViewTariffSummary();
            this.setState({
              isMsgPop: true,
              msg: response.data.response[0][0].message,
            });
            this.reset();
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

  updateTariff = (record) => {
    this.setState({
      isPop: true,
      tid: record.t_id,
      isEdit: true,
      type: record.PartyTypeID,
      isThird: record.PartyTypeID !== "p" ? "y" : "n",
      thirdParty: record.ThirdPartyID,
      roomCategory: record.RoomCategory,
      occupancy: record.OccupancyID,
      roomType: record.RoomTypeID,
      mPlan: record.MealPlan,
      RoomCharge: record.RoomCharge,
      BedCharge: record.BedCharge,
      fromDate: record.OFromDate,
      toDate: record.OToDate,
      chargeType: record.ChargeTypeID,
      checkedData: record.Days.split(",").map(Number),
    });
  };

  onDays = (value) => {
    this.setState({
      checkedData: value,
    });
  };

  render() {
   

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
        <input type="hidden" value={this.state.tid} />
        <Typography style={{ display: "flex", width: "100%" }}>
          <Typography
            variant="h6"
            style={{ textAlign: "center", width: "100%", paddingTop: "10px" }}
          >
            Dynamic Tariff List
          </Typography>
          <Typography className="text-right">
            <Tooltip title="Add" aria-label="add">
              <IconButton
                aria-label="Add"
                onClick={() => this.setState({ isPop: true })}
              >
                <AddCircleOutlineTwoToneIcon />
              </IconButton>
            </Tooltip>
          </Typography>
        </Typography>

        <Typography gutterBottom>
              <RadioGroup
                aria-label="type"
                name="type"
                onChange={(e) => this.getType(e)}
                row
                value={this.state.type}
              >
                <FormControlLabel value="c" control={<Radio />} label="C.M." />
                <FormControlLabel
                  value="p"
                  control={<Radio />}
                  label="P.M.S."
                />
                <FormControlLabel value="b" control={<Radio />} label="Both" />
              </RadioGroup>
            </Typography>


            <Typography gutterBottom>
                <FormControl variant="outlined" style={{ minWidth: 150 }}>
                  {/* <InputLabel id="demo-simple-select-outlined-label">
                    Booking Ref.
                  </InputLabel> */}
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={this.state.thirdParty}
                    onChange={(e) => this.getThirdParty(e)}
                    label="Third Party"
                  >
                    <MenuItem value="0">Surge Price</MenuItem>
                    <MenuItem value="-1">Discount Price</MenuItem>
                  </Select>
                </FormControl>
              </Typography>


              <Grid container>
        <Grid item xs={6}>
        <Typography gutterBottom className="mt-4 mb-4">
              <InputLabel id="demo-simple-select-outlined-label">
                 Select Date Range 
                  </InputLabel>
              <TextField
                id="frmdate"
                label="From *"
                type="date"
                value={this.state.fromDate}
                onChange={(e) => this.setState({ fromDate: e.target.value })}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: TodayDate,
                }}
              />
              &nbsp;-&nbsp;
              <TextField
                id="todate"
                label="To *"
                type="date"
                value={this.state.toDate}
                onChange={(e) => this.setState({ toDate: e.target.value })}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: TodayDate,
                }}
              />
            </Typography>
        </Grid>


        <Grid item xs={6}>

        <Typography gutterBottom>
                <FormControl variant="outlined" style={{ minWidth: 150 }}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Meal Plan
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={this.state.thirdParty}
                    onChange={(e) => this.getThirdParty(e)}
                    label="Third Party"
                  >
                    <MenuItem value="0">None</MenuItem>
                    <MenuItem value="-1">Master</MenuItem>
                  </Select>
                </FormControl>
              </Typography>
          </Grid>
       



        <Grid item xs={12}>
        <table class="table table-bordered">
    <thead>
      <tr>
        <th colSpan="5">Room Details</th>
        <th colSpan="11">Occupancy Rate (INR)</th>
       
      </tr>
      <tr>
        <th>Room Category</th>
        <th>Base Rate</th>
        <th>Min Rate</th>
        <th>Max Rate</th>
        <th>Max Room</th>
        <th>0-10%</th>
        <th>11-20%</th>
        <th>21-30%</th>
        <th>31-40%</th>
        <th>41-50%</th>
        <th>51-60%</th>
        <th>61-70%</th>
        <th>71-80%</th>
        <th>81-90%</th>
        <th>91-95%</th>
        <th>96-100%</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>R</td>
        <td>400</td>
        <td>3500</td>
        <td>7000</td>
        <td>3</td>
        <td>200</td>
        <td>300</td>
        <td>400</td>
        <td>700</td>
        <td>300</td>
        <td>500</td>
        <td>600</td>
        <td>700</td>
        <td>800</td>
        <td>900</td>
        <td>1000</td>
      </tr>
    </tbody>
  </table>
  </Grid>


          {/* <MuiDialogActions className="text-center m-auto">
               <Button className="save-btn"
                autoFocus
                onClick={() => this.saveFloor()}>
                {this.state.isEdit ? "Update" : "Save"}
               </Button>
               <Button className="close-btn"
                onClick={() => this.reset()}>
                Close
               </Button>
          </MuiDialogActions> */}


  </Grid>
             


              

     






















        <Dialog
          onClose={() => this.setState({ isPop: false })}
          aria-labelledby="add-category-title"
          open={this.state.isPop}
        >
          <MuiDialogTitle disableTypography>
            <Typography variant="h6">
              {this.state.isEdit ? "Edit" : "Add"} Tariff
            </Typography>
          </MuiDialogTitle>
          <MuiDialogContent dividers>
            <Typography gutterBottom>
              <RadioGroup
                aria-label="type"
                name="type"
                onChange={(e) => this.getType(e)}
                row
                value={this.state.type}
              >
                <FormControlLabel value="c" control={<Radio />} label="C.M." />
                <FormControlLabel
                  value="p"
                  control={<Radio />}
                  label="P.M.S."
                />
                <FormControlLabel value="b" control={<Radio />} label="Both" />
              </RadioGroup>
            </Typography>

            <Typography gutterBottom>
                <FormControl variant="outlined" style={{ minWidth: 150 }}>
                  {/* <InputLabel id="demo-simple-select-outlined-label">
                    Booking Ref.
                  </InputLabel> */}
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={this.state.thirdParty}
                    onChange={(e) => this.getThirdParty(e)}
                    label="Third Party"
                  >
                    <MenuItem value="0">Surge Price</MenuItem>
                    <MenuItem value="-1">Discount Price</MenuItem>
                  </Select>
                </FormControl>
              </Typography>


              <Grid container>
        <Grid item xs={12}>
        <Typography gutterBottom className="mt-4 mb-4">
              <InputLabel id="demo-simple-select-outlined-label">
                 Select Date Range 
                  </InputLabel>
              <TextField
                id="frmdate"
                label="From *"
                type="date"
                value={this.state.fromDate}
                onChange={(e) => this.setState({ fromDate: e.target.value })}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: TodayDate,
                }}
              />
              &nbsp;-&nbsp;
              <TextField
                id="todate"
                label="To *"
                type="date"
                value={this.state.toDate}
                onChange={(e) => this.setState({ toDate: e.target.value })}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: TodayDate,
                }}
              />
            </Typography>
        </Grid>


        <Grid item xs={12}>

        <Typography gutterBottom>
                <FormControl variant="outlined" style={{ minWidth: 150 }}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Meal Plan
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={this.state.thirdParty}
                    onChange={(e) => this.getThirdParty(e)}
                    label="Third Party"
                  >
                    <MenuItem value="0">None</MenuItem>
                    <MenuItem value="-1">Master</MenuItem>
                  </Select>
                </FormControl>
              </Typography>
          </Grid>
       



        <Grid item xs={12}>
          <div style={{minWidth:"500px", overflow:"auto"}}>
        <table class="table table-bordered responsive-table">
    <thead>
      <tr>
        <th colSpan="5">Room Details</th>
        <th colSpan="11">Occupancy Rate (INR)</th>
       
      </tr>
      <tr>
        <th>Room Category</th>
        <th>Base Rate</th>
        <th>Min Rate</th>
        <th>Max Rate</th>
        <th>Max Room</th>
        <th>0-10%</th>
        <th>11-20%</th>
        <th>21-30%</th>
        <th>31-40%</th>
        <th>41-50%</th>
        <th>51-60%</th>
        <th>61-70%</th>
        <th>71-80%</th>
        <th>81-90%</th>
        <th>91-95%</th>
        <th>96-100%</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>R</td>
        <td> <input type="number" class="form-control field-wdth" placeholder="500" /></td>
        <td><input type="number" class="form-control field-wdth" placeholder="400" /></td>
        <td><input type="number" class="form-control field-wdth" placeholder="300" /></td>
        <td><input type="number" class="form-control field-wdth" placeholder="4" /></td>
        <td><input type="number" class="form-control field-wdth" placeholder="500" /></td>
        <td><input type="number" class="form-control field-wdth" placeholder="600" /></td>
        <td><input type="number" class="form-control field-wdth" placeholder="700" /></td>
        <td><input type="number" class="form-control field-wdth" placeholder="800" /></td>
        <td><input type="number" class="form-control field-wdth" placeholder="500" /></td>
        <td><input type="number" class="form-control field-wdth" placeholder="500" /></td>
        <td><input type="number" class="form-control field-wdth" placeholder="500" /></td>
        <td><input type="number" class="form-control field-wdth" placeholder="500" /></td>
        <td><input type="number" class="form-control field-wdth" placeholder="500" /></td>
        <td><input type="number" class="form-control field-wdth" placeholder="500" /></td>
        <td><input type="number" class="form-control field-wdth" placeholder="500" /></td>
      </tr>
    </tbody>
  </table>
  </div>
  </Grid>


          {/* <MuiDialogActions className="text-center m-auto">
               <Button className="save-btn"
                autoFocus
                onClick={() => this.saveFloor()}>
                {this.state.isEdit ? "Update" : "Save"}
               </Button>
               <Button className="close-btn"
                onClick={() => this.reset()}>
                Close
               </Button>
          </MuiDialogActions> */}


  </Grid>

          
          
          </MuiDialogContent>
          <MuiDialogActions>
            <Button className="save-btn"
              autoFocus
              onClick={() => this.saveList()}
              // color="primary"
              // variant="contained"
            >
              {this.state.isEdit ? "Update" : "Save"}
            </Button>
            <Button className="close-btn"
              onClick={() => this.reset()}
              // color="secondary"
              // variant="contained"
            >
              Close
            </Button>
          </MuiDialogActions>
        </Dialog>
      </Box>
    );
  }
}
