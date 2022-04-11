import React from "react";
import {
  Typography,
  Dialog,
  Button,
  TextField,
  FormHelperText,
  Tooltip,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { Table } from "antd";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import FormControl from "@material-ui/core/FormControl";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";
import axios from "axios";

const url = "http://localhost:3006/";
const hotelId = localStorage.getItem("hotelID");
const loginID = localStorage.getItem("loginID");

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class Occupancy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMsgPop: false,
      msg: "",
      isPop: true,
      OccupancyType: "",
      OccupancyTypeError: "",
      Occupancy: "",
      OccupancyError: "",
      data: [],
    };
  }

  componentDidMount() {
    this.getOccupancyList();
  }

  getOccupancyList = async () => {
    await axios
      .post(`${url}api/Occupancy`, {
        Oid: 0,
        hotelId: hotelId,
        flag: 0,
      })
      .then((res) => {
        if (res.data.response[0].length !== 0) {
          this.setState({ data: res.data.response[0] });
        }
      });
  };

  saveOccupancy = async () => {
    let OccupancyType = this.state.OccupancyType;
    let Occupancy = this.state.Occupancy;
    Occupancy = Occupancy == "" ? 0 : Occupancy;

    if (OccupancyType.length == 0 || OccupancyType.trim() == "") {
      this.setState({ OccupancyTypeError: "Please enter Occupancy Type." });
      return false;
    }

    if (Occupancy <= 0) {
      this.setState({ OccupancyError: "Please enter Occupancy." });
      return false;
    }

    await axios
      .post(`${url}api/Occupancy/new`, {
        hotelId: hotelId,
        OccupancyType: OccupancyType,
        Occupancy: Occupancy,
        createdby: loginID,
      })
      .then(
        (response) => {
          if (response.status === 200) {
            this.getOccupancyList();
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

  reset = () => {
    this.setState({
      OccupancyType: "",
      OccupancyTypeError: "",
      Occupancy: "",
      OccupancyError: "",
    });
  };

  closePop = () => {
    this.setState({ isPop: false });
    this.props.closeOccupancy();
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
        dataIndex: "OccupancyType",
        title: "Occupancy Type",
      },
      {
        key: 3,
        dataIndex: "Occupancy",
        title: "Occupancy",
      },
    ];

    return (
      <Dialog
        onClose={() => this.closePop()}
        open={this.state.isPop}
        fullWidth={this.state.isPop}
        maxWidth={"lg"}
        aria-labelledby="add-category-title"
      >
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
        <input type="hidden" value={this.state.MID} />
        <MuiDialogTitle disableTypography>
          <Typography variant="h6">Occupancy</Typography>
        </MuiDialogTitle>
        <MuiDialogContent dividers>
          <Typography gutterBottom>
            <Typography>
              <FormControl variant="outlined">
                <TextField
                  id="OccupancyType"
                  label="Occupancy Type *"
                  variant="outlined"
                  value={this.state.OccupancyType}
                  onChange={(e) =>
                    this.setState({ OccupancyType: e.target.value })
                  }
                />
                <FormHelperText style={{ color: "red" }}>
                  {this.state.OccupancyTypeError}
                </FormHelperText>
              </FormControl>
              &nbsp;&nbsp;
              <FormControl variant="outlined">
                <TextField
                  id="Occupancy"
                  label="Occupancy *"
                  type="number"
                  variant="outlined"
                  value={this.state.Occupancy}
                  onChange={(e) => this.setState({ Occupancy: e.target.value })}
                />
                <FormHelperText style={{ color: "red" }}>
                  {this.state.OccupancyError}
                </FormHelperText>
              </FormControl>
              &nbsp;&nbsp;
              <Button
                autoFocus
                color="primary"
                variant="contained"
                className="save-btn mr-2"
                onClick={() => this.saveOccupancy()}
              >
                {this.state.isEdit ? "Update" : "Save"}
              </Button>
              &nbsp;&nbsp;
              <Button
                color="secondary"
                variant="contained"
                className="close-btn"
                onClick={() => this.reset()}
              >
                Reset
              </Button>
            </Typography>
          </Typography>
          <Typography gutterBottom>
            <Table dataSource={this.state.data} columns={columns} />
          </Typography>
        </MuiDialogContent>
        <MuiDialogActions>
          <Button
            onClick={() => this.closePop()}
            color="secondary"
            variant="contained"
            className="close-btn"
          >
            Close
          </Button>
        </MuiDialogActions>
      </Dialog>
    );
  }
}
