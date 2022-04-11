import React from "react";
import {
  Dialog,
  Snackbar,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Button,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import axios from "axios";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const url = "http://localhost:3006/";
const hotelId = localStorage.getItem("hotelID");
const loginID = localStorage.getItem("loginID");

export default class RoomStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRoomStatusPop: true,
      //rid: this.props.rid,
      RoomStatus: "n",
      RoomStatusError: "",
      isMsgPop: false,
      msg: "",
    };
  }

  updateStatus = async () => {
    let RoomStatus = this.state.RoomStatus;
    if (RoomStatus == "n") {
      this.setState({ RoomStatusError: "Please Select Room Status." });
      return false;
    }

    await axios
      .post(`${url}api/RoomList/RoomStatus/Update`, {
        hotelID: hotelId,
        rid: this.props.rid,
        Rstatus:RoomStatus,
        createdBy: loginID,
      })
      .then(
        (response) => {
          if (response.status === 200) {
            this.setState({
              isMsgPop: true,
              msg: response.data.response[0][0].message,
              RoomStatus: "n",
              RoomStatusError: "",
            });
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

  reset = () => {
    this.setState({
      RoomStatus: "n",
      RoomStatusError: "",
      isRoomStatusPop: false,
    });
    this.props.closeRoomStatus();
  };

  render() {
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
          onClose={() => this.setState({ isRoomStatusPop: false })}
          aria-labelledby="add-category-title"
          open={this.state.isRoomStatusPop}
        >
          <MuiDialogTitle disableTypography>
            <Typography variant="h6">Update Room Status</Typography>
          </MuiDialogTitle>
          <MuiDialogContent dividers>
            <Typography gutterBottom>
              <FormControl variant="outlined">
                <InputLabel id="demo-simple-select-outlined-label">
                  Room Status <span style={{ fontSize: 20 }}>*</span>
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={this.state.RoomStatus}
                  onChange={(e) =>
                    this.setState({ RoomStatus: e.target.value })
                  }
                  label="Room Status"
                  style={{ minWidth: 150 }}
                >
                  <MenuItem value="n">None</MenuItem>
                  <MenuItem value="vacant">Vacant</MenuItem>
                  {/* <MenuItem value="occupied">Occupied</MenuItem>
                  <MenuItem value="reserved">Reserved</MenuItem> */}
                  <MenuItem value="housekeeping">Housekeeping</MenuItem>
                  <MenuItem value="block">Block</MenuItem>
                </Select>
                <FormHelperText style={{ color: "red" }}>
                  {this.state.RoomStatusError}
                </FormHelperText>
              </FormControl>
            </Typography>
          </MuiDialogContent>
          <MuiDialogActions>
            <Button
              autoFocus
              color="primary"
              variant="contained"
              className="save-btn mr-2"
              onClick={() => this.updateStatus()}
            >
              Save
            </Button>
            <Button
              color="secondary"
              variant="contained"
              className="close-btn"
              onClick={() => this.reset()}
            >
              Close
            </Button>
          </MuiDialogActions>
        </Dialog>
      </>
    );
  }
}
