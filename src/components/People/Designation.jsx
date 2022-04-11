import React from "react";
import {
  Typography,
  Button,
  Dialog,
  TextField,
  Snackbar,
  FormHelperText,
  Tooltip,
} from "@material-ui/core";
import { Table } from "antd";
import MuiAlert from "@material-ui/lab/Alert";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";
import axios from "axios";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const url = "http://localhost:3006/";
const hotelId = localStorage.getItem("hotelID");
const loginID = localStorage.getItem("loginID");

export default class UserDesignation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMsgPop: false,
      msg: "",
      did: 0,
      data: [],
      isCUAPop: true,
      designation: "",
      designationError: "",
      isEdit: false,
    };
  }

  componentDidMount() {
    this.getDesignation();
  }

  getDesignation = async () => {
    await axios
      .post(`${url}api/Designation`, {
        did: 0,
        hotelId: hotelId,
        flag: 0,
      })
      .then((res) => {
        if (res.data.response[0].length !== 0) {
          this.setState({ data: res.data.response[0] });
        }
      });
  };

  onClosePopup = () => {
    this.setState({ isCUAPop: false });
    this.props.onCuaPop();
  };

  reset = () => {
    this.setState({
      designation: "",
      designationError: "",
      did: 0,
      isEdit: false,
    });
  };

  updateDesig = (record) => {
    this.setState({
      did: record.id,
      designation: record.designation,
      isEdit: true,
    });
  };

  saveInfo = async () => {
    let designation = this.state.designation;
    let did = this.state.did;
    if (designation.trim() == "" && designation.trim().length == 0) {
      this.setState({
        designationError: "Please enter designation.",
      });
    }

    await axios
      .post(
        this.state.isEdit
          ? `${url}api/Designation/update`
          : `${url}api/Designation/new`,
        this.state.isEdit
          ? {
              hotelId: hotelId,
              did: did,
              Ddesignation: designation,
              createdby: loginID,
            }
          : {
              hotelId: hotelId,
              Ddesignation: designation,
              createdby: loginID,
            }
      )
      .then(
        (result) => {
          if (result.status === 200) {
            this.getDesignation();
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
        dataIndex: "designation",
        title: "Designation",
        key: 2,
      },
      {
        title: "Action",
        key: 3,
        align: "center",
        render: (record) => (
          <>
            <Tooltip placement="top" title="Edit">
              <a onClick={() => this.updateDesig(record)}>
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
      <Dialog
        onClose={() => this.onClosePopup()}
        aria-labelledby="add-category-title"
        open={this.state.isCUAPop}
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
        <input type="hidden" value={this.state.did} />
        <MuiDialogTitle disableTypography>
          <Typography variant="h6">Add Designation</Typography>
        </MuiDialogTitle>
        <MuiDialogContent dividers>
          <Typography gutterBottom>
            <TextField
              id="outlined-basic"
              label="Add Designation"
              variant="outlined"
              value={this.state.designation}
              style={{ width: "100%" }}
              onChange={e => this.setState({ designation: e.target.value })}
            />
            <FormHelperText style={{ color: "red" }}>
              {this.state.designationError}
            </FormHelperText>
          </Typography>

          <Typography gutterBottom>
            <Table dataSource={this.state.data} columns={columns} bordered />
          </Typography>
        </MuiDialogContent>
        <MuiDialogActions>
          <Button
            autoFocus
            color="primary"
            className="save-btn mr-2"
            variant="contained"
            onClick={() => this.saveInfo()}
          >
            {this.state.isEdit ? "Update" : "Save"}
          </Button>
          <Button
            color="secondary"
            className="close-btn"
            variant="contained"
            onClick={() => this.onClosePopup()}
          >
            Close
          </Button>
        </MuiDialogActions>
      </Dialog>
    );
  }
}
