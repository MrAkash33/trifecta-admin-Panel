import React from "react";
import {
  Box,
  Typography,
  Button,
  Tooltip,
  Dialog,
  TextField,
  FormHelperText,
  IconButton,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Snackbar,
  OutlinedInput,
  InputAdornment,
} from "@material-ui/core";
import { Table, Upload, Button as Btn } from "antd";
import MuiAlert from "@material-ui/lab/Alert";
import { UploadOutlined } from "@ant-design/icons";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import AddCircleOutlineTwoToneIcon from "@material-ui/icons/AddCircleOutlineTwoTone";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";

import axios from "axios";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const url = "http://localhost:3006/";
const loginID = localStorage.getItem("loginID");

export default class SuperAdminList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMsgPop: false,
      msg: "",
      isPop: false,
      data: [],
      hid: 0,
      hotelCode: "",
      hotelName: "",
      fullName: "",
      gender: "M",
      mobile: "",
      email: "",
      designation: "n",
      profile: null,
      uName: "",
      pwd: "123456",
      uType: "A",
      status: "A",
      isEdit: false,
      showPassword: false,
      hotelCodeError: "",
      fullNameError: "",
      mobileError: "",
      emailError: "",
      designationError: "",
      uNameError: "",
      pwdError: "",
    };
  }

  componentDidMount() {
    this.getHotelData();
  }

  reset = () => {
    this.setState({
      hid: 0,
      hotelCode: "",
      hotelName: "",
      fullName: "",
      gender: "M",
      mobile: "",
      email: "",
      designation: "n",
      profile: null,
      uName: "",
      pwd: "123456",
      uType: "A",
      status: "A",
      isEdit: false,
      isPop: false,
      showPassword: false,
      hotelCodeError: "",
      fullNameError: "",
      mobileError: "",
      emailError: "",
      designationError: "",
      uNameError: "",
      pwdError: "",
    });
  };

  getHotelName = async (value) => {
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
          console.log(res.data.response[0]);
          res.data.response[0].map((item) => {
            this.setState({
              hid: item.Hid,
              hotelCode: item.HotelCode,
              hotelName: item.HotelName,
            });
          });
        }
      });
  };

  saveAdmin = async () => {
    let hotelCode = this.state.hotelCode;
    let hid = this.state.hid;
    let fullName = this.state.fullName;
    let gender = this.state.gender;
    let mobile = this.state.mobile;
    let email = this.state.email;
    let designation = this.state.designation;
    let profile = this.state.profile;
    let uName = this.state.uName;
    let pwd = this.state.pwd;
    let uType = this.state.uType;
    let status = this.state.hid;

    if (hotelCode == "" || hotelCode.length == 0) {
      this.setState({ hotelCodeError: "Please Enter Hotel Code" });
      return false;
    }

    if (fullName == "" || fullName.length == 0) {
      this.setState({ fullNameError: "Please Enter Full Name" });
      return false;
    }

    if (mobile == "" || mobile.length == 0) {
      this.setState({ mobileError: "Please Enter Mobile No." });
      return false;
    }

    if (email == "" || email.length == 0) {
      this.setState({ emailError: "Please Enter email" });
      return false;
    }

    if (designation == "n") {
      this.setState({ designationError: "Select Designation" });
      return false;
    }

    if (uName == "" || uName.length == 0) {
      this.setState({ uNameError: "Please Enter Username" });
      return false;
    }

    if (pwd == "" || pwd.length == 0) {
      this.setState({ pwdError: "Please Enter Password" });
      return false;
    }

    await axios
      .post(`${url}api/Admin/new`, {
        AHotelID: hid,
        AfullName: fullName,
        AGender: gender,
        APhone: mobile,
        AEmail: email,
        ADesignation: designation,
        AprofilePic: profile,
        AuName: uName,
        Apasscode: pwd,
        AuType: uType,
        createdBy: loginID,
      })
      .then(
        (response) => {
          if (response.status === 200) {
            this.setState({
              isMsgPop: true,
              msg: response.data.response[0][0].message,
            });
            this.getHotelData();
            this.reset();
          }
        },
        (error) => {
          this.setState({
            isMsgPop: true,
            msg: error,
          });
          console.log(error);
        }
      );
  };

  getHotelData = async () => {
    await axios
      .post(`${url}api/Hotel`, {
        hotelCode: "",
        flag: 2,
      })
      .then((res) => {
        if (res.data.response[0].length !== 0) {
          this.setState({ data: res.data.response[0] });
        }
      });
  };

  render() {
    const columns = [
      {
        dataIndex: "SrNo",
        title: "Sr.NO.",
        key: 1,
        align: "center",
      },
      {
        dataIndex: "HotelName",
        title: "Hotel Name",
        key: 2,
      },
      {
        dataIndex: "GSTIN",
        title: "GSTIN",
        key: 3,
        align: "center",
      },
      {
        dataIndex: "Designation",
        title: "Designation",
        key: 4,
        align: "center",
      },
      {
        dataIndex: "uName",
        title: "User Name",
        key: 5,
      },
      {
        title: "Password",
        key: 6,
        render: (record) => (
          <>
            {this.state.showPassword ? record.passcode : "********"}
            <IconButton
              aria-label="toggle password visibility"
              onClick={() =>
                this.setState({
                  showPassword: !this.state.showPassword,
                })
              }
              edge="end"
            >
              {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </>
        ),
      },
      {
        dataIndex: "Status",
        title: "Status",
        key: 6,
        align: "center",
      },
      {
        title: "Action",
        key: 7,
        render: (record) => (
          <>
            <Tooltip placement="top" title="Edit">
              <a>
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
        <input type="hidden" value={this.state.hid} />
        <Typography style={{ display: "flex", width: "100%" }}>
          <Typography
            variant="h6"
            style={{ textAlign: "center", width: "100%", paddingTop: "10px" }}
          >
            Hotel Detail
          </Typography>
          <Typography className="text-right">
            <Tooltip title="Add" aria-label="add">
              <IconButton aria-label="Add">
                <AddCircleOutlineTwoToneIcon
                  onClick={() => this.setState({ isPop: true })}
                />
              </IconButton>
            </Tooltip>
          </Typography>
        </Typography>
        <Dialog
          onClose={() => this.setState({ isPop: false })}
          aria-labelledby="add-category-title"
          open={this.state.isPop}
        >
          <MuiDialogTitle disableTypography>
            <Typography variant="h6">Add Admin</Typography>
          </MuiDialogTitle>
          <MuiDialogContent dividers>
            <Typography gutterBottom>
              <FormControl variant="outlined" className="mb-2">
                <TextField
                  id="hotalCode"
                  label="Hotel Code *"
                  variant="outlined"
                  value={this.state.hotelCode}
                  onChange={(e) => this.getHotelName(e.target.value)}
                />
                <FormHelperText style={{ color: "red" }}>
                  {this.state.hotelCodeError}
                </FormHelperText>
              </FormControl>
              &nbsp;&nbsp;
              <FormControl variant="outlined" className="mb-2">
                <TextField
                  id="hotelName"
                  disabled
                  label="Hotel Name"
                  variant="outlined"
                  value={this.state.hotelName}
                />
                <FormHelperText style={{ color: "red" }}>
                  {this.state.hotelNameError}
                </FormHelperText>
              </FormControl>
              &nbsp;&nbsp;
              <FormControl variant="outlined" style={{ minWidth: 150 }}>
                <TextField
                  id="fullName"
                  label="Full Name *"
                  variant="outlined"
                  value={this.state.fullName}
                  onChange={(e) => this.setState({ fullName: e.target.value })}
                />
                <FormHelperText style={{ color: "red" }}>
                  {this.state.fullNameError}
                </FormHelperText>
              </FormControl>
              &nbsp;&nbsp;
              <FormControl variant="outlined" style={{ minWidth: 150 }}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Gender *
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={this.state.gender}
                  onChange={(e) => this.setState({ gender: e.target.value })}
                  label="Gender *"
                >
                  <MenuItem value="M">Male</MenuItem>
                  <MenuItem value="F">Female</MenuItem>
                </Select>
              </FormControl>
            </Typography>
            <Typography gutterBottom>
              <FormControl variant="outlined" style={{ minWidth: 150 }}>
                <TextField
                  id="mobileNo"
                  label="Mobile No. *"
                  variant="outlined"
                  type="number"
                  inputProps={{
                    min: 0,
                  }}
                  value={this.state.mobile}
                  onChange={(e) => this.setState({ mobile: e.target.value })}
                />
                <FormHelperText style={{ color: "red" }}>
                  {this.state.mobileError}
                </FormHelperText>
              </FormControl>
              &nbsp;&nbsp;
              <FormControl variant="outlined" style={{ minWidth: 150 }}>
                <TextField
                  id="emailID"
                  label="Email No *"
                  variant="outlined"
                  value={this.state.email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
                <FormHelperText style={{ color: "red" }}>
                  {this.state.emailError}
                </FormHelperText>
              </FormControl>
            </Typography>
            <Typography gutterBottom>
              <FormControl variant="outlined" style={{ minWidth: 150 }}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Designation *
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={this.state.designation}
                  onChange={(e) =>
                    this.setState({ designation: e.target.value })
                  }
                  label="designation"
                >
                  <MenuItem value="n">None</MenuItem>
                  <MenuItem value="O">Owner</MenuItem>
                  <MenuItem value="M">Manager</MenuItem>
                </Select>
                <FormHelperText style={{ color: "red" }}>
                  {this.state.designationError}
                </FormHelperText>
              </FormControl>
              &nbsp;&nbsp;
              <Upload className="w-100">
                <Btn
                  style={{ height: " 4.070em", width: "100%" }}
                  icon={<UploadOutlined />}
                >
                  Profile Upload
                </Btn>
              </Upload>
            </Typography>
            <Typography gutterBottom>
              <FormControl variant="outlined" style={{ minWidth: 150 }}>
                <TextField
                  id="userName"
                  label="User Name *"
                  variant="outlined"
                  value={this.state.uName}
                  onChange={(e) => this.setState({ uName: e.target.value })}
                />
                <FormHelperText style={{ color: "red" }}>
                  {this.state.uNameError}
                </FormHelperText>
              </FormControl>
              &nbsp;&nbsp;
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password *
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={this.state.showPassword ? "text" : "password"}
                  value={this.state.pwd}
                  onChange={(e) => this.setState({ pwd: e.target.value })}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() =>
                          this.setState({
                            showPassword: !this.state.showPassword,
                          })
                        }
                        edge="end"
                      >
                        {this.state.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
                <FormHelperText style={{ color: "red" }}>
                  {this.state.pwdError}
                </FormHelperText>
              </FormControl>
            </Typography>
            <Typography gutterBottom>
              <FormControl variant="outlined" style={{ minWidth: 150 }}>
                <TextField
                  id="userType"
                  disabled
                  label="User Type"
                  variant="outlined"
                  value="Admin"
                />
              </FormControl>
              &nbsp;&nbsp;
              <FormControl variant="outlined" style={{ minWidth: 150 }}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Status
                </InputLabel>
                <Select
                  disabled={this.state.isEdit ? false : true}
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={this.state.status}
                  onChange={(e) => this.setState({ status: e.target.value })}
                  label="Status"
                >
                  <MenuItem value="A">Active</MenuItem>
                  <MenuItem value="D">Deactive</MenuItem>
                </Select>
              </FormControl>
            </Typography>
          </MuiDialogContent>
          <MuiDialogActions>
            <Button
              autoFocus
              className="save-btn"
              onClick={() => this.saveAdmin()}
            >
              Save
            </Button>
            <Button className="close-btn" onClick={() => this.reset()}>
              Close
            </Button>
          </MuiDialogActions>
        </Dialog>
        <Table
          dataSource={this.state.data}
          columns={columns}
          bordered
          pagination={{ pageSize: 50 }}
        />
      </Box>
    );
  }
}
