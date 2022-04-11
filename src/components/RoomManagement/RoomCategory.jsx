import React from "react";
import {
  Typography,
  Box,
  Button,
  Tooltip,
  IconButton,
  Dialog,
  TextField,
  FormHelperText,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import AddCircleOutlineTwoToneIcon from "@material-ui/icons/AddCircleOutlineTwoTone";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import axios from "axios";
import { Table } from "antd";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const url = "http://localhost:3006/";
const hotelId = localStorage.getItem("hotelID");
const loginID = localStorage.getItem("loginID");

export default class RoomCategory extends React.Component {
  constructor() {
    super();
    this.state = {
      CatError: "",
      RoomError: "",
      shortCodeError: "",
      isPop: false,
      category: "",
      shortCode: "",
      noOfRooms: "",
      data: [],
      c_id: 0,
      isEdit: false,
      isMsgPop: false,
      msg: "",
    };
  }

  componentDidMount() {
    this.getRoomCategoryData();
  }

  async getRoomCategoryData() {
    await axios
      .post(`${url}api/roomCategory`, {
        rid: 0,
        hotelId: hotelId,
        flag: 0,
      })
      .then((res) => {
        if (res.data.response[0].length !== 0) {
          this.setState({ data: res.data.response[0] });
        }
      });
  }

  async saveCategory() {
    let category = this.state.category;
    let noOfRoom = this.state.noOfRooms;
    let shortCode = this.state.shortCode;
    let rid = this.state.c_id;

    noOfRoom = noOfRoom == "" ? 0 : noOfRoom;

    if (category == "" || category.length == 0) {
      this.setState({ CatError: "Enter category" });
      return false;
    }

    if (shortCode == "" || shortCode.length == 0) {
      this.setState({ shortCodeError: "Enter Short Code" });
      return false;
    }

    if (noOfRoom == 0 || noOfRoom.length == 0 || noOfRoom < 0) {
      this.setState({ RoomError: "Enter No of rooms" });
      return false;
    }

    await axios
      .post(
        this.state.isEdit
          ? `${url}api/roomCategory/update`
          : `${url}api/roomCategory/new`,
        this.state.isEdit
          ? {
              hotelId: hotelId,
              Rcategory: category,
              RInventory: noOfRoom,
              RShortCode: shortCode,
              Rstatus: "A",
              cid: rid,
              createdBy: loginID,
            }
          : {
              hotelId: hotelId,
              Category: category,
              InventoryItem: noOfRoom,
              shortCode: shortCode,
              createdBy: loginID,
            }
      )
      .then(
        (response) => {
          if (response.status === 200) {
            this.getRoomCategoryData();
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
          console.log(error);
        }
      );
  }

  reset() {
    this.setState({
      CatError: "",
      RoomError: "",
      shortCodeError: "",
      category: "",
      shortCode: "",
      noOfRooms: "",
      c_id: 0,
      isPop: false,
      isEdit: false,
    });
  }

  updateCateogry = (record) => {
    this.setState({
      isEdit: true,
      isPop: true,
      category: record.Category,
      shortCode: record.shortCode,
      noOfRooms: record.InventoryItem,
      c_id: record.c_id,
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
        key: 2,
        dataIndex: "Category",
        title: "Category",
      },
      {
        key: 3,
        dataIndex: "shortCode",
        title: "Short Code",
      },
      {
        key: 4,
        dataIndex: "InventoryItem",
        title: "No. Of Rooms",
      },
      {
        title: "Action",
        align: "center",
        key: 5,
        render: (record) => (
          <>
            <Tooltip placement="top" title="Edit">
              <a onClick={() => this.updateCateogry(record)}>
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
        <input type="hidden" value={this.state.c_id} />
        <Typography style={{ display: "flex", width: "100%" }}>
          <Typography
            variant="h6"
            style={{ textAlign: "center", width: "100%", paddingTop: "10px" }}
          >
            Room Category List
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
          columns={columns}
          dataSource={this.state.data}
          bordered
          pagination={{ pageSize: 50 }}
        />

        <Dialog
          onClose={() => this.setState({ isPop: false })}
          aria-labelledby="add-category-title"
          open={this.state.isPop}
        >
          <MuiDialogTitle disableTypography>
            <Typography variant="h6">Room Category List</Typography>
          </MuiDialogTitle>
          <MuiDialogContent dividers>
            <Typography gutterBottom>
              <TextField
                id="outlined-basic"
                label="Room Category *"
                variant="outlined"
                value={this.state.category}
                onChange={(e) => this.setState({ category: e.target.value })}
              />
              <FormHelperText style={{ color: "red" }}>
                {this.state.CatError}
              </FormHelperText>
            </Typography>
            <Typography gutterBottom>
              <TextField
                disabled={this.state.isEdit ? true : false}
                id="outlined-basic"
                label="Short Code *"
                variant="outlined"
                value={this.state.shortCode}
                onChange={(e) => this.setState({ shortCode: e.target.value })}
              />
              <FormHelperText style={{ color: "red" }}>
                {this.state.shortCodeError}
              </FormHelperText>
            </Typography>
            <Typography gutterBottom>
              <TextField
                id="outlined-basic"
                type="number"
                label="No. Of Rooms *"
                variant="outlined"
                value={this.state.noOfRooms}
                onChange={(e) => this.setState({ noOfRooms: e.target.value })}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Typography>
            <FormHelperText style={{ color: "red" }}>
              {this.state.RoomError}
            </FormHelperText>
          </MuiDialogContent>
          <MuiDialogActions>
            <Button
              className="save-btn mr-2"
              autoFocus
              onClick={() => this.saveCategory()}
              color="primary"
              variant="contained"
            >
              {this.state.isEdit ? "Update" : "Save"}
            </Button>
            <Button
              className="close-btn"
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
