import React from "react";
import MUIDataTable from "mui-datatables";
import {
  Typography,
  Box,
  Button,
  Tooltip,
  IconButton,
  Dialog,
  TextField,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { Table } from "antd";
import FormControl from "@material-ui/core/FormControl";
import AddCircleOutlineTwoToneIcon from "@material-ui/icons/AddCircleOutlineTwoTone";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import axios from "axios";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";

const url = "http://localhost:3006/";
const hotelId = localStorage.getItem("hotelID");
const loginID = localStorage.getItem("loginID");

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class GSTCalculation extends React.Component {
  constructor() {
    super();
    this.state = {
      isPop: false,
      finYearList: [],
      data: [],
      fid: 0,
      finYear: 0,
      toDate: "",
      fromDate: "",
      gst: 0,
      cgst: 0,
      sgst: 0,
      min: 0,
      max: 0,
      isMsgPop: false,
      msg: "",
    };
  }

  componentDidMount() {
    this.getFinYear();
    this.getGstConfigData();
  }

  getGstConfigData = async () => {
    await axios
      .post(`${url}api/GstConfig`, {
        hid: hotelId,
        flag: 0,
      })
      .then((res) => {
        if (res.data.response[0].length !== 0) {
          this.setState({ data: res.data.response[0] });
        }
      });
  };

  async getFinYear() {
    await axios
      .post(`${url}api/finyear`, {
        fid: 0,
        flag: 0,
      })
      .then((res) => {
        if (res.data.response[0].length !== 0) {
          this.setState({ finYearList: res.data.response[0] });
        }
      });
  }

  getDates = async (fid) => {
    await axios
      .post(`${url}api/finyear`, {
        fid: fid,
        flag: 0,
      })
      .then((res) => {
        if (res.data.response[0].length !== 0) {
          res.data.response[0].map((item) => {
            this.setState({
              toDate: item.toDate,
              fromDate: item.fromDate,
              finYear: fid,
            });
          });
        }
      });
  };

  setGst = (gst) => {
    this.setState({
      gst,
      sgst: gst / 2,
      cgst: gst / 2,
    });
  };

  saveGstConfig = async () => {
    let fid = this.state.fid;
    let finYear = this.state.finYear;
    let toDate = this.state.toDate;
    let fromDate = this.state.fromDate;
    let gst = this.state.gst;
    let min = this.state.min;
    let max = this.state.max;

    await axios
      .post(
        this.state.isEdit
          ? `${url}api/GstConfig/update`
          : `${url}api/GstConfig/new`,
        this.state.isEdit
          ? {
              fid: fid,
              hotelId: hotelId,
              finyear: finYear,
              fromDate: fromDate,
              toDate: toDate,
              min: min,
              max: max,
              gst: gst,
              createdBy: loginID,
            }
          : {
              hotelId: hotelId,
              finyear: finYear,
              fromDate: fromDate,
              toDate: toDate,
              min: min,
              max: max,
              gst: gst,
              createdBy: loginID,
            }
      )
      .then(
        (response) => {
          if (response.status === 200) {
            this.getGstConfigData();
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

  updateGstConfig = (record) => {
    this.setState({
      isPop: true,
      fid: record.id,
      isEdit: true,
      finYear: record.finYearID,
      toDate: record.toDateid,
      fromDate: record.fromDateid,
      gst: record.gst,
      cgst: record.cgst,
      sgst: record.sgst,
      min: record.min,
      max: record.max,
    });
  };

  reset = () => {
    this.setState({
      fid: 0,
      isEdit: false,
      finYear: 0,
      toDate: "",
      fromDate: "",
      gst: 0,
      cgst: 0,
      sgst: 0,
      min: 0,
      max: 0,
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
        dataIndex: "finYear",
        title: "Fin Year",
        key: 2,
      },
      {
        dataIndex: "dateRange",
        title: "Date Range",
        key: 3,
      },
      {
        dataIndex: "RateRange",
        title: "Rate Range",
        key: 4,
      },
      {
        dataIndex: "cgst",
        title: "CGST %",
        key: 5,
      },
      {
        dataIndex: "sgst",
        title: "SGST %",
        key: 6,
      },

      {
        dataIndex: "gst",
        title: "GST %",
        key: 7,
      },
      {
        title: "Action",
        key: 8,
        align: "center",
        render: (record) => (
          <>
            <Tooltip placement="top" title="Edit">
              <a>
                <EditTwoToneIcon onClick={() => this.updateGstConfig(record)} />
              </a>
            </Tooltip>
            &nbsp;|&nbsp;
            <Tooltip placement="top" title="Delete">
              <a
                onClick={() =>
                  this.setState({ isMsgPop: true, msg: "Under Process" })
                }
              >
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
        <input type="hidden" value={this.state.fid} />
        <Typography style={{ display: "flex", width: "100%" }}>
          <Typography
            variant="h6"
            style={{ textAlign: "center", width: "100%", paddingTop: "10px" }}
          >
            GST Calculation
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
            <Typography variant="h6">Add GST Rates</Typography>
          </MuiDialogTitle>
          <MuiDialogContent dividers>
            <Typography gutterBottom>
              <FormControl variant="outlined" className="w-100 mt-2">
                <InputLabel id="demo-simple-select-outlined-label">
                  Finacial Year
                </InputLabel>
                <Select
                  id="demo-simple-select-outlined"
                  label="Finacial Year"
                  value={this.state.finYear}
                  onChange={(e) => this.getDates(e.target.value)}
                >
                  <MenuItem value="0">-Select-</MenuItem>
                  {this.state.finYearList.map((item) => (
                    <MenuItem value={item.id}>{item.finYear}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Typography>

            <Typography gutterBottom>
              <p className="mb-0 mt-0">&nbsp;</p>
              <TextField
                id="date"
                label="From"
                type="date"
                value={this.state.fromDate}
                onChange={(e) => this.setState({ fromDate: e.target.value })}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              &nbsp;-&nbsp;
              <TextField
                id="date"
                label="To"
                type="date"
                value={this.state.toDate}
                onChange={(e) => this.setState({ toDate: e.target.value })}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Typography>

            <Typography gutterBottom>
              <p className="mb-0 mt-0">&nbsp;</p>
              <p className="mb-0">
                <b>Rate Range</b>
              </p>
              <TextField
                label="From"
                type="number"
                value={this.state.min}
                onChange={(e) => this.setState({ min: e.target.value })}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              &nbsp;-&nbsp;
              <TextField
                label="To"
                type="number"
                value={this.state.max}
                onChange={(e) => this.setState({ max: e.target.value })}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Typography>
            <Typography gutterBottom>
              <p className="mb-0 mt-0">&nbsp;</p>
              <p className="mb-0">
                <b>GST Calculation</b>
              </p>
              <TextField
                id="outlined-basic"
                className="mt-3 w-100"
                label="GST %"
                variant="outlined"
                value={this.state.gst}
                onChange={(e) => this.setGst(e.target.value)}
              />
            </Typography>
            <Typography gutterBottom>
              <TextField
                id="date"
                label="CGST %"
                type="number"
                disabled
                value={this.state.cgst}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              &nbsp;-&nbsp;
              <TextField
                id="date"
                label="SGST %"
                type="number"
                disabled
                value={this.state.sgst}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Typography>
          </MuiDialogContent>
          <MuiDialogActions>
            <Button
              autoFocus
              className="save-btn mr-2"
              variant="contained"
              onClick={() => this.saveGstConfig()}
            >
              {this.state.isEdit ? "Update" : "Save"}
            </Button>
            <Button
              onClick={() => this.reset()}
              color="secondary"
              variant="contained"
              className="close-btn"
              onClick={() => this.reset()}
            >
              Reset
            </Button>
          </MuiDialogActions>
        </Dialog>
      </Box>
    );
  }
}
