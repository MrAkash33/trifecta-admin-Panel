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

export default class MealPlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPop: true,
      isEdit: false,
      MID: 0,
      plan: "",
      data: [],
      shortcode: "",
      PlanError: "",
      isMsgPop: false,
      msg: "",
    };
  }

  componentDidMount() {
    this.getMealPlan();
  }

  closePop = () => {
    this.setState({ isPop: false });
    this.props.closeMealType();
  };

  getMealPlan = async () => {
    await axios
      .post(`${url}api/MealPlan`, {
        mid: 0,
        hotelId: hotelId,
        flag: 0,
      })
      .then((res) => {
        if (res.data.response[0].length !== 0) {
          this.setState({ data: res.data.response[0] });
        }
      });
  };

  reset = () => {
    this.setState({
      plan: "",
      shortcode: "",
      PlanError: "",
      isEdit: false,
      MID: 0,
    });
  };

  saveMealPlan = async () => {
    let p = this.state.plan;
    let sc = this.state.shortcode;
    let MID = this.state.MID;

    if (p == "" || p.length == 0) {
      this.setState({ PlanError: "Enter Meal Plan" });
      return false;
    } else {
      await axios
        .post(
          this.state.isEdit
            ? `${url}api/MealPlan/update`
            : `${url}api/MealPlan/new`,
          this.state.isEdit
            ? {
                hotelId: hotelId,
                mid: MID,
                Mplan: p,
                MShortCode: sc,
                Mstatus: 1,
                Mcreatedby: loginID,
              }
            : {
                hotelId: hotelId,
                Mplan: p,
                MShortCode: sc,
                CreatedBy: loginID,
              }
        )
        .then(
          (response) => {
            if (response.status === 200) {
              this.getMealPlan();
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
    }
  };

  updateMealPlan = (record) => {
    this.setState({
      isPop: true,
      isEdit: true,
      MID: record.id,
      plan: record.plan,
      shortcode: record.ShortCode,
    });
  };

  render() {
    const columns = [
      {
        dataIndex: "SrNo",
        title: "Sr.NO.",
        key: 1,
      },
      {
        dataIndex: "plan",
        title: "Meal Plan",
        key: 2,
      },
      {
        dataIndex: "ShortCode",
        title: "Short Code",
        key: 3,
      },
      {
        title: "Action",
        key: 4,
        render: (record) => (
          <>
            <Tooltip placement="top" title="Edit">
              <a onClick={() => this.updateMealPlan(record)}>
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
          <Typography variant="h6">Add Meal Plan</Typography>
        </MuiDialogTitle>
        <MuiDialogContent dividers>
          <Typography gutterBottom>
            <Typography>
              <FormControl variant="outlined">
                <TextField
                  id="mealplan"
                  label="Meal Plan *"
                  variant="outlined"
                  value={this.state.plan}
                  onChange={(e) => this.setState({ plan: e.target.value })}
                />
                <FormHelperText style={{ color: "red" }}>
                  {this.state.PlanError}
                </FormHelperText>
              </FormControl>
              &nbsp;&nbsp;
              <FormControl variant="outlined">
                <TextField
                  id="ShortCode"
                  label="Short Code"
                  variant="outlined"
                  value={this.state.shortcode}
                  onChange={(e) => this.setState({ shortcode: e.target.value })}
                />
              </FormControl>
              &nbsp;&nbsp;
              <Button
                autoFocus
                color="primary"
                variant="contained"
                className="save-btn mr-2"
                onClick={() => this.saveMealPlan()}
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
