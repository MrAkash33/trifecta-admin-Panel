import React from "react";
import {
  Box,
  Typography,
  Button,
  Tooltip,
  Dialog,
  TextField,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import { Table } from "antd";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import AddCircleOutlineTwoToneIcon from "@material-ui/icons/AddCircleOutlineTwoTone";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Amenities from "./Amenities";
import axios from "axios";
import FormHelperText from "@material-ui/core/FormHelperText";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";
import PostAddIcon from '@material-ui/icons/PostAdd';
import RoomStatus from './RoomStatus';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const url = "http://localhost:3006/";
const hotelId = localStorage.getItem("hotelID");
const loginID = localStorage.getItem("loginID");

export default class RoomNo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPop: false,
      isEdit: false,
      rid: 0,
      floor: "0",
      roomCategory: "0",
      roomType: "A",
      checkedEB: false,
      isAmenities: false,
      roomCategoryData: [],
      floorData: [],
      data: [],
      amenitiesData: [],
      checkedData: [],
      roomNo: "",
      baseOcc: 1,
      maxOcc: 1,
      extraBed: 0,
      description: "",
      CatError: "",
      FloorError: "",
      RoomError: "",
      baseError: "",
      maxError: "",
      isMsgPop: false,
      msg: "",
      isRoomStatusPop:false,
    };
  }

  componentDidMount() {
    this.getRoomList();
    this.getRoomCategoryData();
    this.getFloorData();
    this.getAmenities();
  }

  getRoomList = async () => {
    await axios
      .post(`${url}api/RoomList`, {
        rid: 0,
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

  getFloorData = async () => {
    await axios
      .post(`${url}api/floor`, {
        Fid: 0,
        hotelId: hotelId,
        flag: 0,
      })
      .then((res) => {
        if (res.data.response[0].length !== 0) {
          this.setState({ floorData: res.data.response[0] });
        }
      });
  };

  getAmenities = async () => {
    await axios
      .post(`${url}api/Amenities`, {
        aid: 0,
        hotelId: hotelId,
        flag: 0,
      })
      .then((res) => {
        if (res.data.response[0].length !== 0) {
          this.setState({ amenitiesData: res.data.response[0] });
        }
      });
  };

  getFloor = (event) => {
    this.setState({
      floor: event.target.value,
    });
  };

  getRoomCategory = (event) => {
    this.setState({ roomCategory: event.target.value });
  };

  getRoomType = (event) => {
    this.setState({ roomType: event.target.value });
  };

  handleEB = (event) => {
    this.setState({ checkedEB: !this.state.checkedEB });
  };

  reset = () => {
    this.setState({
      isPop: false,
      floor: "0",
      roomCategory: "0",
      roomType: "A",
      checkedEB: false,
      isAmenities: false,
      roomNo: "",
      baseOcc: 1,
      maxOcc: 1,
      extraBed: 0,
      description: "",
      checkedData: [],
      CatError: "",
      FloorError: "",
      RoomError: "",
      baseError: "",
      maxError: "",
      rid: 0,
      isEdit: false,
    });
  };

  closeAminityPop = () => {
    this.setState({ isAmenities: false });
    this.getAmenities();
  };

  closeRoomStatus = () =>{
    this.setState({
      rid: 0,
      isRoomStatusPop:false,
    })
  }

  handleToggle = (value) => () => {
    const currentIndex = this.state.checkedData.indexOf(value);
    const newChecked = [...this.state.checkedData];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({ checkedData: newChecked });
  };

  saveList = async () => {
    let LRoom_no = this.state.roomNo;
    let LRoom_category = this.state.roomCategory;
    let LRoom_type = this.state.roomType;
    let LFloor = this.state.floor;
    let LBaseOcc = this.state.baseOcc;
    let LMaxOcc = this.state.maxOcc;
    let LExtraBed = this.state.extraBed;
    let LAmenities = this.state.checkedData.join();
    let LDescription = this.state.description;
    let rid = this.state.rid;

    LBaseOcc = LBaseOcc == "" ? 1 : LBaseOcc;
    LMaxOcc = LMaxOcc == "" ? 2 : LMaxOcc;
    LExtraBed = LExtraBed == "" ? 0 : LExtraBed;

    if (LRoom_category == 0) {
      this.setState({
        CatError: "Select Room Category",
      });
      return false;
    }

    if (LFloor == 0) {
      this.setState({
        FloorError: "Select a floor",
      });
      return false;
    }

    if (LRoom_no.length === 0) {
      this.setState({
        RoomError: "Enter room no",
      });
      return false;
    }

    if (LBaseOcc < 1) {
      this.setState({ baseError: "Base occupancy can't be less then 1" });
      return false;
    }

    if (LMaxOcc < 1) {
      this.setState({ maxError: "Max occupancy can't be less then 1" });
      return false;
    }

    if (LMaxOcc < LBaseOcc) {
      this.setState({
        maxError: "Max occupancy can't be less then Base occupancy",
      });
      return false;
    }

    await axios
      .post(
        this.state.isEdit
          ? `${url}api/RoomList/update`
          : `${url}api/RoomList/new`,
        this.state.isEdit
          ? {
              hotelId: hotelId,
              rid: rid,
              LRoom_no: LRoom_no,
              LRoom_category: LRoom_category,
              LRoom_type: LRoom_type,
              LFloor: LFloor,
              LBaseOcc: LBaseOcc,
              LMaxOcc: LMaxOcc,
              LExtraBed: LExtraBed,
              LAmenities: LAmenities,
              LDescription: LDescription,
              CreatedBy: loginID,
            }
          : {
              hotelId: hotelId,
              LRoom_no: LRoom_no,
              LRoom_category: LRoom_category,
              LRoom_type: LRoom_type,
              LFloor: LFloor,
              LBaseOcc: LBaseOcc,
              LMaxOcc: LMaxOcc,
              LExtraBed: LExtraBed,
              LAmenities: LAmenities,
              LDescription: LDescription,
              CreatedBy: loginID,
            }
      )
      .then(
        (response) => {
          if (response.status === 200) {
            this.getRoomList();
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

  updateRoomNo = (record) => {
    this.setState({
      isPop: true,
      isEdit: true,
      rid: record.r_id,
      floor: record.FloorID,
      roomCategory: record.Room_category,
      roomType: record.Room_Type,
      roomNo: record.Room_no,
      baseOcc: record.BaseOcc,
      maxOcc: record.MaxOcc,
      extraBed: record.ExtraBed,
      description: record.Description,
      checkedEB: record.ExtraBed > 0 ? true : false,
      checkedData: record.Amenities.split(",").map(Number),
    });
  };

  callRoomStaus = (record) =>{
    this.setState({
      isRoomStatusPop:true,
      rid:record.r_id,
    })
  }

  render() {
    const columns = [
      {
        dataIndex: "SrNo",
        title: "Sr.NO.",
        key: 1,
        align: "center",
      },
      {
        dataIndex: "Room_no",
        title: "Room No.",
        key: 2,
      },
      {
        dataIndex: "Category",
        title: "Category",
        key: 3,
      },
      {
        dataIndex: "RoomTypeText",
        title: "Room Type",
        key: 4,
      },
      {
        dataIndex: "Floor",
        title: "Floor",
        key: 5,
      },
      {
        dataIndex: "BaseOcc",
        title: "Base Occupancy",
        key: 6,
      },
      {
        dataIndex: "MaxOcc",
        title: "Max Occupancy",
        key: 7,
      },
      {
        dataIndex: "ExtraBed",
        title: "Extra Bed",
        key: 8,
      },
      {
        title: "Action",
        key: 9,
        align: "center",
        render: (record) => (
          <>
          <Tooltip placement="top" title="Room Status">
              <a onClick={() => this.callRoomStaus(record)}>
                <PostAddIcon />
              </a>
            </Tooltip>
          &nbsp;|&nbsp;
            <Tooltip placement="top" title="Edit">
              <a onClick={() => this.updateRoomNo(record)}>
                <EditTwoToneIcon />
              </a>
            </Tooltip>
            &nbsp;|&nbsp;
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
        <input type="hidden" value={this.state.rid} />
        <Typography style={{ display: "flex", width: "100%" }}>
          <Typography
            variant="h6"
            style={{ textAlign: "center", width: "100%", paddingTop: "10px" }}
          >
            Room No List
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
              {this.state.isEdit ? "Edit Room" : "Add New Room"}
            </Typography>
          </MuiDialogTitle>
          <MuiDialogContent dividers>
            <Typography gutterBottom>
              <FormControl variant="outlined" className="modal_widtht">
                <InputLabel id="demo-simple-select-outlined-label">
                  Room Category <span style={{ fontSize: 20 }}>*</span>
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={this.state.roomCategory}
                  onChange={e => this.getRoomCategory(e)}
                  label="Room Category"
                >
                  <MenuItem value="0">None</MenuItem>
                  {this.state.roomCategoryData.map(item => (
                    <MenuItem value={item.c_id} key={item.c_id}>
                      {item.Category}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText style={{ color: "red" }}>
                  {this.state.CatError}
                </FormHelperText>
              </FormControl>
              &nbsp;&nbsp;
              <FormControl variant="outlined" className="modal_widtht">
                <InputLabel htmlFor="floorID">
                  Floor <span style={{ fontSize: 20 }}>*</span>
                </InputLabel>
                <Select
                  value={this.state.floor}
                  onChange={e => this.getFloor(e)}
                  label="Floor"
                >
                  <MenuItem value="0">None</MenuItem>
                  {this.state.floorData.map(item => (
                    <MenuItem value={item.id} key={item.id}>
                      {item.Title}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText style={{ color: "red" }}>
                  {this.state.FloorError}
                </FormHelperText>
              </FormControl>
              &nbsp;&nbsp;
              <FormControl variant="outlined" className="modal_widtht">
                <InputLabel id="demo-simple-select-outlined-label">
                  Room Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={this.state.roomType}
                  onChange={e => this.getRoomType(e)}
                  label="Room Type"
                >
                  <MenuItem value="A">AC</MenuItem>
                  <MenuItem value="N">Non Ac</MenuItem>
                </Select>
              </FormControl>
            </Typography>
            <Typography gutterBottom className="modal_widtht yert">
              <TextField
                id="roomNo"
                label="Room No *"
                variant="outlined"
                value={this.state.roomNo}
                onChange={e => this.setState({ roomNo: e.target.value })}
              />
              <FormHelperText style={{ color: "red" }}>
                {this.state.RoomError}
              </FormHelperText>
            </Typography>
            <Typography gutterBottom className="modal_wit">
              <FormControl className="modal_widtht">
                <TextField
                  id="baseOcc"
                  label="Base Occupancy"
                  type="number"
                  variant="outlined"
                  value={this.state.baseOcc}
                  onChange={e => this.setState({ baseOcc: e.target.value })}
                  InputProps={{ inputProps: { min: 0 } }}
                />
                <FormHelperText style={{ color: "red" }}>
                  {this.state.baseError}
                </FormHelperText>
              </FormControl>
              &nbsp;&nbsp;
              <FormControl className="modal_widtht">
                <TextField
                  id="maxOcc"
                  label="Max Occupancy"
                  type="number"
                  variant="outlined"
                  InputProps={{ inputProps: { min: 0 } }}
                  value={this.state.maxOcc}
                  onChange={e => this.setState({ maxOcc: e.target.value })}
                />
                <FormHelperText style={{ color: "red" }}>
                  {this.state.maxError}
                </FormHelperText>
              </FormControl>
            </Typography>
            <Typography gutterBottom>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.checkedEB}
                    onChange={e => this.handleEB(e)}
                    name="base"
                    color="primary"
                  />
                }
                label="Extra Bed"
              />
              {this.state.checkedEB ? (
                <>
                  <TextField
                    id="extraBed"
                    label="No. Of Extra Bed"
                    variant="outlined"
                    InputProps={{ inputProps: { min: 0 } }}
                    value={this.state.extraBed}
                    onChange={e => this.setState({ extraBed: e.target.value })}
                  />
                </>
              ) : null}
            </Typography>
            <Typography gutterBottom>
              Amenities
              <Tooltip title="Amenities" aria-label="add">
                <IconButton
                  aria-label="Add"
                  onClick={() => this.setState({ isAmenities: true })}
                >
                  <AddCircleOutlineTwoToneIcon />
                </IconButton>
              </Tooltip>
              <List
                style={{
                  position: "relative",
                  overflow: "auto",
                  maxHeight: 180,
                }}
              >
                {this.state.amenitiesData.map(item => {
                  const labelId = `checkbox-list-label-${item.id}`;
                  return (
                    <ListItem
                      key={item.id}
                      role={undefined}
                      dense
                      button
                      onClick={this.handleToggle(item.id)}
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={
                            this.state.checkedData.indexOf(item.id) !== -1
                          }
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText id={labelId} primary={item.amenity} />
                    </ListItem>
                  );
                })}
              </List>
              {this.state.isAmenities ? (
                <Amenities closeAminityPop={this.closeAminityPop} />
              ) : null}
            </Typography>
            <Typography gutterBottom>
              <TextField
                id="aboutroom"
                label="About Room"
                variant="outlined"
                onChange={e => this.setState({ description: e.target.value })}
                value={this.state.description}
              />
            </Typography>
          </MuiDialogContent>
          <MuiDialogActions>
            <Button
              autoFocus
              onClick={() => this.saveList()}
              color="primary"
              variant="contained"
              className="save-btn mr-2"
            >
              {this.state.isEdit ? "Update" : "Save"}
            </Button>
            <Button
              onClick={() => this.reset()}
              color="secondary"
              variant="contained"
              className="close-btn"
            >
              Close
            </Button>
          </MuiDialogActions>
        </Dialog>
        {this.state.isRoomStatusPop ? (
          <RoomStatus
            rid={this.state.rid}
            closeRoomStatus={this.closeRoomStatus}
          />
        ) : null}
      </Box>
    );
  }
}
