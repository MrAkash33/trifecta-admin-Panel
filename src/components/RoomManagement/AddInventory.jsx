import React from "react";
import {
  Typography,
  Button,
  Dialog,
  TextField,
  FormControl,
  InputLabel,
  FormGroup,
  Grid,
  Paper,
  Snackbar,
  Select,
  MenuItem,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import { Table } from "antd";
import axios from "axios";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const url = "http://localhost:3006/";
const hotelId = localStorage.getItem("hotelID");
const loginID = localStorage.getItem("loginID");

let today = new Date();
let Tyear = today.getFullYear();
let Tmonth =
  today.getMonth() + 1 < 10
    ? "0" + (today.getMonth() + 1)
    : today.getMonth() + 1;
let Tday = today.getDate();
const TodayDate = Tyear + "-" + Tmonth + "-" + Tday;

export default class AddInventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPop: true,
      isMsgPop: false,
      msg: "",
      data: [],
      fromDate: TodayDate,
      toDate: TodayDate,
      chennal: 0,
    };
  }

  reset = () => {
    this.setState({
      fromDate: TodayDate,
      toDate: TodayDate,
      chennal: 0,
    });
    
    this.getCategory();
  };

  closePop = () => {
    this.setState({
      isPop: false,
      fromDate: TodayDate,
      toDate: TodayDate,
      chennal: 0,
    });
    this.props.closeInventoryPop();
  };

  componentDidMount(){
    this.getCategory();
  }

  saveList = async() => {
    let fromDate = this.state.fromDate;
    let toDate = this.state.toDate;
    let chennal = this.state.chennal;

    await axios
      .post(`${url}api/Inventory/new`,
        {
          hotelId:hotelId,
          chennal:chennal,
          fromDate: fromDate,
          toDate:toDate,
          data:"",
          CreatedBy: loginID,
        }
      )
      .then(
        (response) => {
          if (response.status === 200) {
            this.setState({
              isMsgPop:true,
              msg: response.data.response[0][0].message
            });
            this.reset();
          }
        },
        (error) => {
          this.setState({
            isMsgPop:true,
            msg: error
          })
        }
      );
  };

  getCategory = async () => {
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
  };

  render() {
    const columns = [
      {
        dataIndex: "Category",
        title: "Category",
        align: "center",
        key: 1,
      },
      {
        title: "Inventory",
        align: "center",
        key: 2,
        render: (record) => (
          <>
            <TextField
              id="outlined-basic"
              type="number"
              variant="outlined"
              inputProps={{
                min: 0,
              }}
            />
          </>
        ),
      },
    ];

    return (
      <Dialog
        onClose={() => this.closePop()}
        aria-labelledby="add-category-title"
        open={this.state.isPop}
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
        <MuiDialogTitle disableTypography>
          <Typography variant="h6">Add Inventory</Typography>
        </MuiDialogTitle>
        <MuiDialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormGroup row>
                <FormControl variant="outlined" style={{ minWidth: 150 }}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Channel
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={this.state.chennal}
                    onChange={(e) => this.setState({ chennal: e.target.value })}
                    label="Channel"
                  >
                    <MenuItem value="0">-None-</MenuItem>
                    <MenuItem value="1">Master</MenuItem>
                  </Select>
                </FormControl>
              </FormGroup>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="dateFrom"
                label="Form Date"
                type="date"
                value={this.state.fromDate}
                onChange={(e) => this.setState({ fromDate: e.target.value })}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: TodayDate,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="dateTo"
                label="To"
                type="date"
                value={this.state.toDate}
                onChange={(e) => this.setState({ toDate: e.target.value })}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: TodayDate,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Paper>
                <Table
                  dataSource={this.state.data}
                  bordered
                  columns={columns}
                />
              </Paper>
            </Grid>
          </Grid>
        </MuiDialogContent>
        <MuiDialogActions>
          <Button
            color="primary"
            variant="contained"
            className="save-btn mr-2"
            onClick={() => this.saveList()}
          >
            Save
          </Button>
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
