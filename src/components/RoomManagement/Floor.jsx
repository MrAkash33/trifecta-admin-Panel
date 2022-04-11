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
import MuiAlert from "@material-ui/lab/Alert";
import { Table } from "antd";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineTwoToneIcon from "@material-ui/icons/AddCircleOutlineTwoTone";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import axios from "axios";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const url = "http://localhost:3006/";
const loginID = localStorage.getItem("loginID");

export default class Floor extends React.Component {
  constructor() {
    super();
    this.state = {
      isPop: false,
      Floor: "",
      Title: "",
      data: [],
      floorError: "",
      floorNoError : "",
      id: 0,
      isEdit: false,
      isMsgPop: false,
      msg: "",
      hotelID:localStorage.getItem("hotelID"),
    };
  }

  componentDidMount() {
    this.getFloorData();
  }

  async getFloorData() {
    await axios.post(`${url}api/floor`,{
      Fid:0,
      hotelId:this.state.hotelID,
      flag:0,
    }).then((res) => {
      if (res.data.response[0].length !== 0) {
        this.setState({ data: res.data.response[0] });
      }
    });
  }

  async saveFloor() {
    let Floor = this.state.Floor;
    let Title = this.state.Title;
    let fid = this.state.id;
    let hotelID = this.state.hotelID;

    Floor = Floor == "" ? "0" : Floor;

    if (Title == "" && Title.length == 0) {
      this.setState({ floorError: "Enter Name/Title" });
      return false;
    }

    if (Floor < 0){
      this.setState({floorNoError:"Floor No can't be negative"});
      return false;
    }

    await axios
      .post(
        this.state.isEdit ? `${url}api/floor/update` : `${url}api/floor/new`,
        this.state.isEdit
          ? {
              fid: fid,
              hotelID: hotelID,
              FFloor: Floor,
              Ftitle: Title,
              Fstatus: 1,
              CreatedBy: loginID,
              
            }
          : {
              Floor: Floor,
              hotelID: hotelID,
              Title: Title,
              CreatedBy: loginID,
            }
      )
      .then(
        (result) => {
          if (result.status === 200) {
            this.getFloorData();
            this.setState({
              isMsgPop: true,
              msg: result.data.response[0][0].message,
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
  }

  updateRoom = (record) => {
    this.setState({
      isEdit: true,
      isPop: true,
      id: record.id,
      Floor: record.Floor,
      Title: record.Title,
    });
  };

  reset() {
    this.setState({
      Floor: "",
      Title: "",
      isPop: false,
      floorError: "",
      floorNoError : "",
      id: 0,
      isEdit: false,
    });
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
        dataIndex: "Title",
        title: "Name",
        key: 2,
      },
      {
        dataIndex: "Floor",
        title: "Floor No.",
        key: 3,
      },
      {
        title: "Action",
        key: 4,
        align: "center",
        render: (record) => (
          <>
            <Tooltip placement="top" title="Edit">
              <a onClick={() => this.updateRoom(record)}>
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
        <input type="hidden" value={this.state.id} />

        <Typography style={{ display: "flex", width: "100%" }}>
          <Typography
            variant="h6"
            style={{ textAlign: "center", width: "100%", paddingTop: "10px" }}
          >
            Floor List
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

        <Box>
          <Dialog
            onClose={() => this.setState({ isPop: false })}
            aria-labelledby="add-category-title"
            open={this.state.isPop}
          >
            <MuiDialogTitle disableTypography>
              <Typography variant="h6">
                {this.state.isEdit ? "Edit" : "Add"} Floor
              </Typography>
            </MuiDialogTitle>
            <MuiDialogContent dividers>
              <Typography gutterBottom>
                <TextField
                  id="outlined-basic"
                  label="Name / Title *"
                  variant="outlined"
                  value={this.state.Title}
                  onChange={(e) => this.setState({ Title: e.target.value })}
                />
                <FormHelperText style={{ color: "red" }}>
                  {this.state.floorError}
                </FormHelperText>
              </Typography>
              <Typography gutterBottom>
                <TextField
                  id="outlined-basic"
                  label="Floor Number"
                  type="number"
                  variant="outlined"
                  value={this.state.Floor}
                  InputProps={{ inputProps: { min: 0 } }}
                  onChange={(e) => this.setState({ Floor: e.target.value })}
                />
              </Typography>
                <FormHelperText style={{ color: "red" }}>
                  {this.state.floorNoError}
                </FormHelperText>
            </MuiDialogContent>
            <MuiDialogActions>
              <Button
                className="save-btn mr-2" 
                autoFocus
                onClick={() => this.saveFloor()}
                color="primary"
                variant="contained"
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
      </Box>
    );
  }
}
