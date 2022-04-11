import React from "react";
import {
  Box,
  Typography,
  Button,
  Tooltip,
  Dialog,
  TextField,
  FormHelperText,
  Snackbar,
} from "@material-ui/core";
import { Table } from "antd";
import MuiAlert from "@material-ui/lab/Alert";
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
import axios from "axios";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";

const url = "http://localhost:3006/";
const hotelId = localStorage.getItem("hotelID");
const loginID = localStorage.getItem("loginID");

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class TravelAgentThirdParty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPop: false,
      bookingRef: "n",
      bookingRefError: "",
      acType: "s",
      name: "",
      compName: "",
      compNameError: "",
      gstin: "",
      mob: "",
      email: "",
      address: "",
      acname: "",
      acnumber: "",
      bank: "",
      ifsc: "",
      branch: "",
      bank_address: "",
      data: [],
      tid: 0,
      isEdit: false,
      isMsgPop: false,
      msg: "",
    };
  }

  reset = () => {
    this.setState({
      isPop: false,
      bookingRef: "n",
      acType: "s",
      name: "",
      compName: "",
      compNameError: "",
      bookingRefError: "",
      gstin: "",
      mob: "",
      email: "",
      address: "",
      acname: "",
      acnumber: "",
      bank: "",
      ifsc: "",
      branch: "",
      bank_address: "",
      tid: 0,
      isEdit: false,
    });
  };

  componentDidMount() {
    this.getBookingData();
  }

  getBookingRef = (event) => {
    this.setState({ bookingRef: event.target.value });
  };

  getAcType = (event) => {
    this.setState({ acType: event.target.value });
  };

  getBookingData = async () => {
    await axios
      .post(`${url}api/BookingRef`, {
        BookRef: 0,
        hotelId: hotelId,
        flag: 0,
      })
      .then((res) => {
        if (res.data.response[0].length !== 0) {
          this.setState({ data: res.data.response[0] });
        }
      });
  };

  saveBookingRef = async () => {
    const TRefType = this.state.bookingRef;
    const TNames = this.state.name;
    const TCompany_name = this.state.compName;
    const TGSTIN = this.state.gstin;
    const TMobileNo = this.state.mob;
    const TEmail = this.state.email;
    const TAddress = this.state.address;
    const TACName = this.state.acname;
    const TACNumber = this.state.acnumber;
    const TACType = this.state.acType;
    const TBank = this.state.bank;
    const TIFSC = this.state.ifsc;
    const TBranch = this.state.branch;
    const TBankAddress = this.state.bank_address;
    const tid = this.state.tid;

    if (TRefType == "n") {
      this.setState({
        bookingRefError: "Select Booking Reference",
      });
      return false;
    }

    if (TCompany_name == "" || TCompany_name.length == 0) {
      this.setState({
        compNameError: "Enter Company Name",
      });
      return false;
    }

    await axios
      .post(
        this.state.isEdit
          ? `${url}api/BookingRef/update`
          : `${url}api/BookingRef/new`,
        this.state.isEdit
          ? {
              hotelId: hotelId,
              tid: tid,
              TRefType: TRefType,
              TNames: TNames,
              TCompany_name: TCompany_name,
              TGSTIN: TGSTIN,
              TMobileNo: TMobileNo,
              TEmail: TEmail,
              TAddress: TAddress,
              TACName: TACName,
              TACNumber: TACNumber,
              TACType: TACType,
              TBank: TBank,
              TIFSC: TIFSC,
              TBranch: TBranch,
              TBankAddress: TBankAddress,
              TCreatedBy: loginID,
            }
          : {
              hotelId: hotelId,
              TRefType: TRefType,
              TNames: TNames,
              TCompany_name: TCompany_name,
              TGSTIN: TGSTIN,
              TMobileNo: TMobileNo,
              TEmail: TEmail,
              TAddress: TAddress,
              TACName: TACName,
              TACNumber: TACNumber,
              TACType: TACType,
              TBank: TBank,
              TIFSC: TIFSC,
              TBranch: TBranch,
              TBankAddress: TBankAddress,
              TCreatedBy: loginID,
            }
      )
      .then(
        (response) => {
          if (response.status === 200) {
            this.getBookingData();
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

  updateRef = (record) => {
    this.setState({
      tid: record.id,
      bookingRef: record.RefTypeID,
      acType: record.ACTypeID,
      name: record.Names,
      compName: record.Company_name,
      gstin: record.GSTIN,
      mob: record.MobileNo,
      email: record.Email,
      address: record.Address,
      acname: record.ACName,
      acnumber: record.ACNumber,
      bank: record.Bank,
      ifsc: record.IFSC,
      branch: record.Branch,
      bank_address: record.BankAddress,
      isEdit: true,
      isPop: true,
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
        dataIndex: "Company_name",
        title: "Company Name",
        key: 2,
      },
      {
        dataIndex: "RefType",
        title: "Booking Ref.",
        key: 3,
      },
      {
        dataIndex: "GSTIN",
        title: "GSTIN",
        key: 4,
      },
      {
        dataIndex: "Email",
        title: "Email",
        key: 5,
      },
      {
        dataIndex: "MobileNo",
        title: "Mobile No",
        key: 6,
      },
      {
        title: "Action",
        key: 7,
        render: (record) => (
          <>
            <Tooltip placement="top" title="Edit">
              <a onClick={() => this.updateRef(record)}>
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
        <input type="hidden" value={this.state.tid} />
        <Typography style={{ display: "flex", width: "100%" }}>
          <Typography
            variant="h6"
            style={{ textAlign: "center", width: "100%", paddingTop: "10px" }}
          >
            Booking Reference List
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
              {this.state.isEdit ? "Edit " : "Add "}
              Booking Reference
            </Typography>
          </MuiDialogTitle>
          <MuiDialogContent dividers>
            <Typography gutterBottom>
              <FormControl variant="outlined" style={{ minWidth: 150 }}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Booking Ref.
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={this.state.bookingRef}
                  onChange={(e) => this.getBookingRef(e)}
                  label="Room Category"
                >
                  <MenuItem value="n">None</MenuItem>
                  <MenuItem value="TA">Travel Agent</MenuItem>
                  <MenuItem value="TP">Third Party</MenuItem>
                </Select>
                <FormHelperText style={{ color: "red" }}>
                  {this.state.bookingRefError}
                </FormHelperText>
              </FormControl>
            </Typography>
            <Box>
              <Typography variant="h6">Basic Details</Typography>
              <Typography gutterBottom>
                <FormControl variant="outlined" style={{ minWidth: 150 }}>
                  <TextField
                    id="name"
                    label="Name"
                    variant="outlined"
                    value={this.state.name}
                    onChange={(e) => this.setState({ name: e.target.value })}
                  />
                </FormControl>
                &nbsp;&nbsp;
                <FormControl variant="outlined" style={{ minWidth: 150 }}>
                  <TextField
                    id="compname"
                    label="Comp. Name *"
                    variant="outlined"
                    value={this.state.compName}
                    onChange={(e) =>
                      this.setState({ compName: e.target.value })
                    }
                  />
                  <FormHelperText style={{ color: "red" }}>
                    {this.state.compNameError}
                  </FormHelperText>
                </FormControl>
              </Typography>
              <Typography gutterBottom>
                <TextField
                  id="gstin"
                  label="GSTIN"
                  variant="outlined"
                  value={this.state.gstin}
                  onChange={(e) => this.setState({ gstin: e.target.value })}
                />
                &nbsp;&nbsp;
                <TextField
                  id="mobno"
                  label="Mobile No."
                  variant="outlined"
                  type="number"
                  value={this.state.mob}
                  onChange={(e) => this.setState({ mob: e.target.value })}
                  inputProps={{
                    min: 0,
                  }}
                />
              </Typography>
              <Typography gutterBottom>
                <TextField
                  id="email"
                  label="Email"
                  variant="outlined"
                  value={this.state.email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
                &nbsp;&nbsp;
                <TextField
                  id="Address"
                  label="Address"
                  variant="outlined"
                  value={this.state.address}
                  onChange={(e) => this.setState({ address: e.target.value })}
                />
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6">Bank Details</Typography>
              <Typography gutterBottom>
                <TextField
                  id="acname"
                  label="A/c Name"
                  variant="outlined"
                  value={this.state.acname}
                  onChange={(e) => this.setState({ acname: e.target.value })}
                />
                &nbsp;&nbsp;
                <TextField
                  id="acnumber"
                  label="A/c Number"
                  type="number"
                  variant="outlined"
                  value={this.state.acnumber}
                  onChange={(e) => this.setState({ acnumber: e.target.value })}
                />
              </Typography>
              <Typography gutterBottom>
                <FormControl variant="outlined" style={{ minWidth: 150 }}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    A/c Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={this.state.acType}
                    onChange={(e) => this.getAcType(e)}
                    label="A/c Type"
                  >
                    <MenuItem value="s">Saving</MenuItem>
                    <MenuItem value="c">Current</MenuItem>
                  </Select>
                </FormControl>
                &nbsp;&nbsp;
                <TextField
                  id="bank"
                  label="Bank"
                  variant="outlined"
                  value={this.state.bank}
                  onChange={(e) => this.setState({ bank: e.target.value })}
                />
              </Typography>
              <Typography gutterBottom>
                <TextField
                  id="ifsc"
                  label="IFSC"
                  variant="outlined"
                  value={this.state.ifsc}
                  onChange={(e) => this.setState({ ifsc: e.target.value })}
                />
                &nbsp;&nbsp;
                <TextField
                  id="branch"
                  label="Branch"
                  variant="outlined"
                  value={this.state.branch}
                  onChange={(e) => this.setState({ branch: e.target.value })}
                />
              </Typography>
              <Typography gutterBottom>
                <TextField
                  id="bankAdress"
                  label="Bank Address"
                  variant="outlined"
                  value={this.state.bank_address}
                  onChange={(e) =>
                    this.setState({ bank_address: e.target.value })
                  }
                />
              </Typography>
            </Box>
          </MuiDialogContent>
          <MuiDialogActions>
            <Button
              autoFocus
              onClick={() => this.saveBookingRef()}
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
      </Box>
    );
  }
}
