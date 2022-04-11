import React from "react";
import {
  Box,
  Typography,
  Button,
  Tooltip,
  Dialog,
  TextField,
  IconButton,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  FormHelperText,
  Snackbar,
  OutlinedInput,
  InputAdornment,
} from "@material-ui/core";

import { Table, Upload, Button as Btn } from "antd";
import MuiAlert from "@material-ui/lab/Alert";
import PersonAddTwoToneIcon from "@material-ui/icons/PersonAddTwoTone";
import AccessibilityNewTwoToneIcon from "@material-ui/icons/AccessibilityNewTwoTone";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import { UploadOutlined } from "@ant-design/icons";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import AddCircleOutlineTwoToneIcon from "@material-ui/icons/AddCircleOutlineTwoTone";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";
import UserDesignation from './Designation';
import axios from "axios";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const url = "http://localhost:3006/";
const hotelId = localStorage.getItem("hotelID");
const loginID = localStorage.getItem("loginID");

export default class User extends React.Component {
  constructor() {
    super();
    this.state = {
      isMsgPop: false,
      msg: "",
      isAddPop: false,
      isCUAPop: false,
      data: [],
      userRoleList:[],
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
      uType: "0",
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
      uTypeError: "",
    };
  }

  reset = () => {
    this.setState({
      isAddPop: false,
      isCUAPop: false,
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
      uType: "0",
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
      uTypeError: "",
    });
  };

  componentDidMount() {
    this.getHotelData();
    this.getHotelName();
    this.getUserRole();
  }

  onCuaPop = () => {
    this.setState({isCUAPop: false})
  }

  getHotelName = async () => {
    console.log(hotelId);

    await axios
      .post(`${url}api/Hotel`, {
        hotelCode: hotelId,
        flag: 4,
      })
      .then((res) => {
        if (res.data.response[0].length !== 0) {
          res.data.response[0].map((item) => {
            this.setState({
              hotelCode: item.HotelCode,
              hotelName: item.HotelName,
            });
          });
        }
      });
  };

  getHotelData = async () => {
    await axios
      .post(`${url}api/Hotel`, {
        hotelCode: hotelId,
        flag: 3,
      })
      .then((res) => {
        if (res.data.response[0].length !== 0) {
          this.setState({ data: res.data.response[0] });
        }
      });
  };

  getUserRole = async () => {
    await axios
      .post(`${url}api/configuration`, {
        chid: hotelId,
        flag: 1,
      })
      .then((res) => {
        if (res.data.response[0].length !== 0) {
          this.setState({ userRoleList: res.data.response[0] });
        }
      });
  };

  saveAdmin = async () => {
    let hotelCode = this.state.hotelCode;
    let hid = hotelId;
    let fullName = this.state.fullName;
    let gender = this.state.gender;
    let mobile = this.state.mobile;
    let email = this.state.email;
    let designation = this.state.designation;
    let profile = this.state.profile;
    let uName = this.state.uName;
    let pwd = this.state.pwd;
    let uType = this.state.uType;
    let status = this.state.status;

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
    const CUAColumns = [];
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
        <Typography style={{ display: "flex", width: "100%" }}>
          <Typography
            variant="h6"
            style={{ textAlign: "center", width: "100%", paddingTop: "10px" }}
          >
            User List
          </Typography>
          <Tooltip title="Add User" aria-label="AddUser">
            <IconButton aria-label="AddUser">
              <PersonAddTwoToneIcon
                onClick={() => this.setState({ isAddPop: true })}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Control User Access" aria-label="CUA">
            <IconButton aria-label="CUA">
              <AccessibilityNewTwoToneIcon
                onClick={() => this.setState({ isCUAPop: true })}
              />
            </IconButton>
          </Tooltip>
        </Typography>
        <Table
          dataSource={this.state.data}
          columns={columns}
          bordered
          pagination={{ pageSize: 50 }}
        />

        <Dialog
          onClose={() => this.setState({ isAddPop: false })}
          aria-labelledby="add-category-title"
          open={this.state.isAddPop}
        >
          <MuiDialogTitle disableTypography>
            <Typography variant="h6">Add User</Typography>
          </MuiDialogTitle>
          <MuiDialogContent dividers>
            <Typography gutterBottom>
              <FormControl variant="outlined" className="mb-2 modal_width">
                <TextField
                  id="hotalCode"
                  label="Hotel Code *"
                  disabled
                  variant="outlined"
                  value={this.state.hotelCode}
                />
                <FormHelperText style={{ color: "red" }}>
                  {this.state.hotelCodeError}
                </FormHelperText>
              </FormControl>
              &nbsp;&nbsp;
              <FormControl variant="outlined" className="mb-2 modal_width">
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
              <FormControl variant="outlined" className="modal_width">
                <TextField
                  id="fullName"
                  label="Full Name *"
                  variant="outlined"
                  value={this.state.fullName}
                  onChange={e => this.setState({ fullName: e.target.value })}
                />
                <FormHelperText style={{ color: "red" }}>
                  {this.state.fullNameError}
                </FormHelperText>
              </FormControl>
              &nbsp;&nbsp;
              <FormControl variant="outlined" className="modal_width">
                <InputLabel id="demo-simple-select-outlined-label">
                  Gender *
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={this.state.gender}
                  onChange={e => this.setState({ gender: e.target.value })}
                  label="Gender *"
                >
                  <MenuItem value="M">Male</MenuItem>
                  <MenuItem value="F">Female</MenuItem>
                </Select>
              </FormControl>
            </Typography>
            <Typography gutterBottom>
              <FormControl variant="outlined" className="modal_width">
                <TextField
                  id="mobileNo"
                  label="Mobile No. *"
                  variant="outlined"
                  type="number"
                  inputProps={{
                    min: 0,
                  }}
                  value={this.state.mobile}
                  onChange={e => this.setState({ mobile: e.target.value })}
                />
                <FormHelperText style={{ color: "red" }}>
                  {this.state.mobileError}
                </FormHelperText>
              </FormControl>
              &nbsp;&nbsp;
              <FormControl variant="outlined" className="modal_width">
                <TextField
                  id="emailID"
                  label="Email No *"
                  variant="outlined"
                  value={this.state.email}
                  onChange={e => this.setState({ email: e.target.value })}
                />
                <FormHelperText style={{ color: "red" }}>
                  {this.state.emailError}
                </FormHelperText>
              </FormControl>
            </Typography>
            <Typography gutterBottom>
              <FormControl variant="outlined" className="modal_width">
                <InputLabel id="demo-simple-select-outlined-label">
                  Designation *
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={this.state.designation}
                  onChange={e => this.setState({ designation: e.target.value })}
                  label="designation"
                >
                  <MenuItem value="n">None</MenuItem>
                  <MenuItem value="f">Front Office</MenuItem>
                  <MenuItem value="s">Steward</MenuItem>
                  <MenuItem value="h">House Keeping</MenuItem>
                </Select>
                <FormHelperText style={{ color: "red" }}>
                  {this.state.designationError}
                </FormHelperText>
              </FormControl>
              <Tooltip title="Add Designation" aria-label="add">
                <IconButton
                  aria-label="Add Designation"
                  onClick={() => this.setState({ isCUAPop: true })}
                >
                  <AddCircleOutlineTwoToneIcon />
                </IconButton>
              </Tooltip>
              &nbsp;&nbsp;
              <Upload>
                <Btn
                  className="select-btn"
                  style={{ height: " 4.070em" }}
                  icon={<UploadOutlined />}
                >
                  Profile Upload
                </Btn>
              </Upload>
            </Typography>
            <Typography gutterBottom>
              <FormControl variant="outlined" className="modal_width">
                <TextField
                  id="userName"
                  label="User Name *"
                  variant="outlined"
                  value={this.state.uName}
                  onChange={e => this.setState({ uName: e.target.value })}
                />
                <FormHelperText style={{ color: "red" }}>
                  {this.state.uNameError}
                </FormHelperText>
              </FormControl>
              &nbsp;&nbsp;
              <FormControl variant="outlined" className="modal_width">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password *
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={this.state.showPassword ? "text" : "password"}
                  value={this.state.pwd}
                  onChange={e => this.setState({ pwd: e.target.value })}
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
              <FormControl variant="outlined" className="modal_width">
                <InputLabel id="demo-simple-select-outlined-label">
                  User Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={this.state.uType}
                  onChange={e => this.setState({ uType: e.target.value })}
                  label="User Type"
                >
                  <MenuItem value="0">-User Type-</MenuItem>
                  {this.state.userRoleList.map(item => (
                    <MenuItem value={item.id}>{item.userRole}</MenuItem>
                  ))}
                </Select>
                <FormHelperText style={{ color: "red" }}>
                  {this.state.uTypeError}
                </FormHelperText>
              </FormControl>
              &nbsp;&nbsp;
              <FormControl variant="outlined" className="modal_width">
                <InputLabel id="demo-simple-select-outlined-label">
                  Status
                </InputLabel>
                <Select
                  disabled={this.state.isEdit ? false : true}
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={this.state.status}
                  onChange={e => this.setState({ status: e.target.value })}
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
              className="save-btn mr-2"
              variant="contained"
              onClick={() => this.saveAdmin()}
            >
              Save
            </Button>
            <Button
              className="close-btn"
              variant="contained"
              onClick={() => this.reset()}
            >
              Close
            </Button>
          </MuiDialogActions>
        </Dialog>

        {this.state.isCUAPop ? (
          <UserDesignation onCuaPop={this.onCuaPop} />
        ) : null}
      </Box>
    );
  }
}
