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
import Occupancy from "./Occupancy";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const url = "http://localhost:3006/";
const hotelId = localStorage.getItem("hotelID");
const loginID = localStorage.getItem("loginID");

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

export default class ViewTariff extends React.Component {
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
      occupancyList:[],
      checkedData: [1, 2, 3, 4, 5, 6, 7],
      isOccupancy:false,
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
    this.getOccupancyList();
  }

  getViewTariffSummary = async () => {
    await axios
      .post(`${url}api/Tariff`, {
        tid: 0,
        hotelId: hotelId,
        flag: 0,
      })
      .then((res) => {
        if (res.data.response[0].length !== 0) {
          this.setState({ data: res.data.response[0] });
        }
      });
  };

  getRoomCategoryData = async () => {
    await axios
      .post(`${url}api/roomCategory`, {
        rid: 0,
        hotelId: hotelId,
        flag: 0,
      })
      .then((res) => {
        if (res.data.response[0].length !== 0) {
          this.setState({ roomCategoryData: res.data.response[0] });
        }
      });
  };

  getOccupancyList = async () => {
    await axios
      .post(`${url}api/Occupancy`, {
        Oid: 0,
        hotelId: hotelId,
        flag: 0,
      })
      .then((res) => {
        if (res.data.response[0].length !== 0) {
          this.setState({ occupancyList: res.data.response[0] });
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

  closeOccupancy = () =>{
    this.setState({isOccupancy:false});
    this.getOccupancyList();
  }

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
    const TCreatedBy = loginID;
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
              hotelId: hotelId,
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
              hotelId: hotelId,
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
    const columns = [
      {
        dataIndex: "SrNo",
        title: "Sr.NO.",
        align: "center",
        key: 1,
      },
      {
        dataIndex: "PartyType",
        title: "Booking Ref.",
        key: 2,
      },
      {
        dataIndex: "ThirdParty",
        title: "Third Party",
        key: 3,
      },
      {
        dataIndex: "Category",
        title: "Category",
        key: 4,
      },
      {
        dataIndex: "Occupancy",
        title: "Occupancy",
        key: 5,
      },
      {
        dataIndex: "RoomType",
        title: "Room Type",
        key: 6,
      },
      {
        dataIndex: "ChargeType",
        title: "Charge Type",
        key: 7,
      },
      {
        dataIndex: "RoomCharge",
        title: "Room Charge",
        key: 8,
      },
      {
        dataIndex: "BedCharge",
        title: "Bed Charge",
        key: 9,
      },
      {
        dataIndex: "plan",
        title: "Plan",
        key: 10,
      },
      {
        dataIndex: "FromDate",
        title: "From Date",
        key: 11,
      },
      {
        dataIndex: "ToDate",
        title: "To Date",
        key: 12,
      },
      {
        title: "Action",
        align: "center",
        key: 13,
        render: (record) => (
          <>
            <Tooltip placement="top" title="Edit">
              <a onClick={() => this.updateTariff(record)}>
                <EditTwoToneIcon />
              </a>
            </Tooltip>
            &nbsp;
            <Tooltip placement="top" title="Delete">
              <a>
                <DeleteForeverTwoToneIcon />
              </a>
            </Tooltip>
          </>
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
        <input type="hidden" value={this.state.tid} />
        <Typography style={{ display: "flex", width: "100%" }}>
          <Typography
            variant="h6"
            style={{ textAlign: "center", width: "100%", paddingTop: "10px" }}
          >
            Tariff List
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
        <Table
          dataSource={this.state.data}
          columns={columns}
          bordered
          pagination={{ pageSize: 50 }}
        />

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
            {this.state.isThird === "y" ? (
              <Typography gutterBottom>
                <FormControl variant="outlined" style={{ minWidth: 150 }}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Booking Ref.
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
            ) : null}
            <Typography gutterBottom>
              <FormControl variant="outlined" style={{ minWidth: 150 }}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Room Category *
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={this.state.roomCategory}
                  onChange={(e) => this.getRoomCategory(e)}
                  label="Room Category"
                >
                  <MenuItem value="0">None</MenuItem>
                  {this.state.roomCategoryData.map((item) => (
                    <MenuItem value={item.c_id} key={item.c_id}>
                      {item.Category}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText style={{ color: "red" }}>
                  {this.state.CategoryError}
                </FormHelperText>
              </FormControl>
              &nbsp;&nbsp;
              <FormControl variant="outlined" style={{ minWidth: 150 }}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Occupancy *
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={this.state.occupancy}
                  onChange={(e) => this.getOccupancy(e)}
                  label="Occupancy"
                >
                  <MenuItem value="0">None</MenuItem>
                  {
                    this.state.occupancyList.map((item)=>(
                      <MenuItem value={item.id}>{item.OccupancyType}</MenuItem>
                    ))
                  }
                </Select>
                <FormHelperText style={{ color: "red" }}>
                  {this.state.OccupancyError}
                </FormHelperText>
              </FormControl>
              <Tooltip title="Add Occupancy" aria-label="add">
                <IconButton
                  aria-label="Add"
                  onClick={() => this.setState({ isOccupancy: true })}
                >
                  <AddCircleOutlineTwoToneIcon />
                </IconButton>
              </Tooltip>
              {
                this.state.isOccupancy?<Occupancy closeOccupancy={this.closeOccupancy} /> : null 
              }
              &nbsp;&nbsp;
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
                  <MenuItem value="A">AC</MenuItem>
                  <MenuItem value="N">Non Ac</MenuItem>
                </Select>
              </FormControl>
            </Typography>
            <Typography gutterBottom>
              <RadioGroup
                aria-label="charges"
                name="charges"
                row
                onChange={(e) => this.chargeType(e)}
                value={this.state.chargeType}
              >
                <FormControlLabel
                  value="S"
                  control={<Radio />}
                  label="Single Day Charge *"
                />
                <FormControlLabel
                  value="Y"
                  control={<Radio />}
                  label="Your Choice *"
                />
              </RadioGroup>
            </Typography>
            <Typography gutterBottom>
              <FormControl style={{ minWidth: 150 }}>
                <TextField
                  id="outlined-basic"
                  label="Room Charge *"
                  type="number"
                  variant="outlined"
                  inputProps={{
                    min: 0,
                  }}
                  value={this.state.RoomCharge}
                  onChange={(e) =>
                    this.setState({ RoomCharge: e.target.value })
                  }
                />
                <FormHelperText style={{ color: "red" }}>
                  {this.state.RoomChargeError}
                </FormHelperText>
              </FormControl>
              &nbsp;&nbsp;
              <FormControl style={{ minWidth: 150 }}>
                <TextField
                  id="outlined-basic"
                  label="Bed Charge *"
                  type="number"
                  variant="outlined"
                  inputProps={{
                    min: 0,
                  }}
                  value={this.state.BedCharge}
                  onChange={(e) => this.setState({ BedCharge: e.target.value })}
                />
                <FormHelperText style={{ color: "red" }}>
                  {this.state.BedChargeError}
                </FormHelperText>
              </FormControl>
            </Typography>
            <Typography gutterBottom>
              <FormControl variant="outlined" style={{ minWidth: 150 }}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Meal Plan *
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={this.state.mPlan}
                  onChange={(e) => this.getMealPlan(e)}
                  label="Meal Plan"
                >
                  <MenuItem value="0">None</MenuItem>
                  {this.state.mealPlanList.map((item) => (
                    <MenuItem value={item.id} key={item.id}>
                      {item.plan}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText style={{ color: "red" }}>
                  {this.state.MealPlanError}
                </FormHelperText>
              </FormControl>
              &nbsp;&nbsp;
              <Tooltip title="Meal Plan" aria-label="add">
                <IconButton
                  aria-label="Add"
                  onClick={() => this.setState({ isMealPop: true })}
                >
                  <AddCircleOutlineTwoToneIcon />
                </IconButton>
              </Tooltip>
              {this.state.isMealPop ? (
                <MealPlan closeMealType={this.closeMealType} />
              ) : null}
            </Typography>
            <Typography gutterBottom>
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
            <Typography gutter>
              <aCheckbox.Group
                options={dayList}
                value={this.state.checkedData}
                onChange={(e) => this.onDays(e)}
              />
            </Typography>
          </MuiDialogContent>
          <MuiDialogActions>
            <Button
              autoFocus
              onClick={() => this.saveList()}
              variant="contained"
              className="save-btn mr-2"
            >
              {this.state.isEdit ? "Update" : "Save"}
            </Button>
            <Button
              onClick={() => this.reset()}
              variant="contained"
              className="close-btn"
            >
              Close
            </Button>
          </MuiDialogActions>
        </Dialog>
      </Box>
    );
  }
}
