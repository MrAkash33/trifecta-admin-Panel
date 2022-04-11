import React from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  Dialog,
  TextField,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import {Table} from 'antd';
import MuiAlert from "@material-ui/lab/Alert";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import axios from "axios";

const url = "http://localhost:3006/";
const hotelId = localStorage.getItem("hotelID");

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

//localStorage.removeItem(key);

export default class ReservationGuest extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      isPop: true,
      isMsgPop:false,
      msg:"",
      roomCategory:0,
      roomCategoryList:[],
      guestName:"",
      roomType:"NN",
      roomList:[],
      roomNo:0,
      mealPlan:0,
      mealPlanList:[],
      roomCharge: 0,
      bedCharge: 0,
      tarrif: "b", 
      totalBedCharge:0,
      subTotal:0,
    }
  }

  componentDidMount(){
    this.getRoomCategory();
  }

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
    let rType = roomType;//this.state.roomType;
    let rstatus = "vacant";

    await axios
      .post(`${url}api/Reservation/data`, {
        rstatus: rstatus,
        hid: hotelId,
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
        }
      });
  };

  getMealPlan = async (event) => {
    let category = this.state.roomCategory;
    let rType = this.state.roomType;
    let rstatus = "vacant";
    let fromDate = this.props.selectedDate;
    let toDate = this.props.NextDate;
    this.setState({ mealPlan: event.target.value });

    await axios
      .post(`${url}api/Reservation/data`, {
        rstatus: rstatus,
        hid: hotelId,
        rType: rType,
        Category: category,
        Rmealplan: event.target.value,
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
        }
        else{
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

  callClosePop = () => {
    this.setState({ isPop: false });
    this.props.callClose();
  };

  addData = () => {
    let roomCharge = this.state.roomCharge;
    let totalBedCharge = this.state.totalBedCharge;
    let date1 = new Date(this.props.selectedDate);
    let date2 = new Date(this.props.NextDate);
    let diffInMs = Math.abs(date2 - date1);
    diffInMs = diffInMs / (1000 * 60 * 60 * 24);

    let subTotal = diffInMs * roomCharge + diffInMs * totalBedCharge;
    this.setState({ subTotal: subTotal });
  };

  render() {
    const columns = [
      {
        key: 1,
        dataIndex: "Name",
        title: "Name",
      },
      {
        key: 2,
        dataIndex: "Category",
        title: "Category",
      },
      {
        key: 3,
        dataIndex: "Type",
        title: "Type",
      },
      {
        key: 4,
        dataIndex: "MealPlan",
        title: "MealPlan",
      },
      {
        key: 5,
        dataIndex: "RoomCharge",
        title: "RoomCharge",
      },
      {
        key: 6,
        dataIndex: "Adult",
        title: "Adult",
      },
      {
        key: 7,
        dataIndex: "Child",
        title: "Child",
      },
      {
        key: 8,
        dataIndex: "ExtraBed",
        title: "ExtraBed",
      },
      {
        key: 9,
        dataIndex: "ExtraCharge",
        title: "ExtraCharge",
      },
    ];

    return (
      <>
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
      <Dialog
        onClose={() => this.callClosePop()}
        aria-labelledby="add-category-title"
        open={this.state.isPop}
      >        
        <MuiDialogTitle disableTypography>
          <Typography variant="h6">Add Guests</Typography>
        </MuiDialogTitle>
        <MuiDialogContent dividers>
          <Box sx={{ border: "1px dashed grey" }}>
            <Grid container spacing={5}>
              <Grid container item xs>
                <Typography gutterBottom>
                  <TextField
                    id="outlined-basic"
                    label="Guest Name *"
                    variant="outlined"
                    value={this.state.guestName}
                    onChange={(e)=>this.setState({guestName:e.target.value})}
                  />
                </Typography>
              </Grid>
              <Grid container item xs>
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
                      onChange={(e) => this.getMealPlan(e)}
                      label="Occupancy"
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
                  >
                    Reset
                  </Button>
                </Typography>
              </Grid>
            </Grid>
            <Table
              columns={columns}
              dataSource={this.state.data}
              bordered
              pagination={{ pageSize: 10 }}
            />
            <br />
          </Box>
        </MuiDialogContent>
        <MuiDialogActions>
          <Button
            autoFocus
            className="save-btn mr-2"
            color="primary"
            variant="contained"
          >
            Done
          </Button>
          <Button
            onClick={() => this.callClosePop()}
            color="secondary"
            variant="contained"
            className="close-btn"
          >
            Close
          </Button>
        </MuiDialogActions>
      </Dialog>
      </>
    );
  }
}
