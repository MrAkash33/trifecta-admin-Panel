import React from "react";
import {
  Dialog,
  Snackbar,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import { Checkbox, Row, Col } from "antd";
import PostAddIcon from "@material-ui/icons/PostAdd";
import axios from "axios";

const url = "http://localhost:3006/";
const hotelId = localStorage.getItem("hotelID");
const loginID = localStorage.getItem("loginID");

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class ToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      todo: "",
      todoError: "",
      isToDoPop: true,
      checkedData:[]
    };
  }

  componentDidMount() {
    this.getToDo();
  }

  getToDo = async () => {
    await axios
      .post(`${url}api/ToDo`, {
        hotelId: hotelId,
        flag: 0,
      })
      .then((res) => {
        if (res.data.response[0].length !== 0) {
          this.setState({
            data: res.data.response[0],
          });
        }
      });
  };

  saveTodo = async () => {
    let todo = this.state.todo;
    if (todo == "") {
      this.setState({ todoError: "Please enter a To Do Task." });
      return false;
    }

    await axios
      .post(`${url}api/ToDo/new`, {
        HotelId: hotelId,
        todo: todo,
        createdBy: loginID,
      })
      .then(
        (response) => {
          if (response.status === 200) {
            this.setState({
              isMsgPop: true,
              msg: response.data.response[0][0].message,
              todo: "",
              todoError: "",
            });
            this.getToDo();
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
        data: [],
        todo: "",
        todoError: "",
        isToDoPop: true,
        checkedData:[]
    });
    this.props.closeToDoPop();
  };

  doneTask = (e)=>{
    this.setState({
        checkedData: e,
      });
  } 

  saveDoneTodo = async()=>
  {
      if(this.state.checkedData.length==0){
         this.setState({
            isMsgPop: true,
            msg: "Please select at least one task.",
         });
         return false;
      }

      await axios
      .post(`${url}api/ToDo/update`, {
        hotelId: hotelId,
        tid: this.state.checkedData.join(),
        createdBy: loginID,
      })
      .then(
        (response) => {
          if (response.status === 200) {
            this.setState({
              isMsgPop: true,
              msg: response.data.response[0][0].message,
              todo: "",
              todoError: "",
            });
            this.getToDo();
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
          onClose={() => this.setState({ isToDoPop: false })}
          aria-labelledby="add-category-title"
          open={this.state.isToDoPop}
        >
          <MuiDialogTitle disableTypography>
            <Typography variant="h6">To Do</Typography>
          </MuiDialogTitle>
          <MuiDialogContent dividers>
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-todo">To Do</InputLabel>
              <OutlinedInput
                id="outlined-adornment-todo"
                type={"text"}
                value={this.state.todo}
                onChange={(e) => this.setState({ todo: e.target.value })}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="todo"
                      onClick={() => this.saveTodo()}
                    >
                      <PostAddIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <br />
            <br />
            <Typography gutterBottom>
              <Checkbox.Group onChange={(e)=>this.doneTask(e)}>
                {this.state.data.map((item) => (
                  <Row>
                    <Col>
                      <Checkbox value={item.id}>{item.ToDo}</Checkbox>
                    </Col>
                  </Row>
                ))}
              </Checkbox.Group>
            </Typography>
          </MuiDialogContent>
          <MuiDialogActions>
            <Button
              autoFocus
              color="primary"
              variant="contained"
              className="save-btn mr-2"
              onClick={()=>this.saveDoneTodo()}
            >
              Done Task
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
