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
import MuiAlert from '@material-ui/lab/Alert';
import {Table} from 'antd';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import FormControl from "@material-ui/core/FormControl";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import axios from "axios";

const url = "http://localhost:3006/";
const loginID = localStorage.getItem("loginID");

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export default class UserRole extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPop: true,
      isEdit: false,
      URID: 0,
      UserRole: "",
      data: [],
      UserRoleError: "",
      isMsgPop: false,
      msg: "",
    };
  }

  reset = () => {
    this.setState({
      URID: 0,
      UserRole: "",
      UserRoleError: "",
      isEdit: false,
    });
  };

  closePop = () => {
    this.setState({ isPop: false });
    this.props.closeUserRole();
  };

  componentDidMount(){
      this.getUserRole();
  }

  getUserRole = async () => {
    await axios.post(`${url}api/UserRole`,{
      Uid:0,
      hotelID:this.props.hotelId,
      flag:0
    }).then((res) => {
      if (res.data.response[0].length !== 0) {
        this.setState({ data: res.data.response[0] });
      }
    });
  };

  saveUserRole= async ()=>{
      let UserRole = this.state.UserRole;
      if(UserRole.trim()=="" && UserRole.trim().length==0){
        this.setState({
            UserRoleError:"Please enter a user type",
        })  
        return false;
      }

      await axios
        .post(
          this.state.isEdit?
          `${url}api/UserRole/new`
          :`${url}api/UserRole/new`
          , 
          
          this.state.isEdit?
          {
            hotelId:this.props.hotelId,
            UuserRole: UserRole,
            Ucreatedby: loginID,
          }
          :
          {
            hotelId:this.props.hotelId,
            UuserRole: UserRole,
            Ucreatedby: loginID,
          }
        )
        .then(
          (response) => {
            if (response.status === 200) {
              this.getUserRole();
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
            });
          }
        );

  }

  render() {
    const columns = [{
        dataIndex: "SrNo",
        title: "Sr.NO.",
        key: 1,
      },
      {
        dataIndex: "userRole",
        title: "User Type",
        key: 2,
      },
      {
        title: "Action",
        key: 4,
        render: (record) => (
          <>
          <Tooltip placement="top" title="Edit">
            <a>
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
      },];

    return (
        <Dialog
        onClose={() => this.closePop()}
        open={true}
        fullWidth={true}
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
        <input type="hidden" value={this.state.URID} />
        <MuiDialogTitle disableTypography>
          <Typography variant="h6">Add User Type</Typography>
        </MuiDialogTitle>
        <MuiDialogContent dividers>
          <Typography gutterBottom>
            <Typography>
              <FormControl variant="outlined">
                <TextField
                  id="UserRole"
                  label="User Type *"
                  variant="outlined"
                  value={this.state.UserRole}
                  onChange={(e) => this.setState({ UserRole: e.target.value })}
                />
                <FormHelperText style={{ color: "red" }}>
                  {this.state.UserRoleError}
                </FormHelperText>
              </FormControl>
              &nbsp;&nbsp;
              <Button
                autoFocus
                color="primary"
                variant="contained"
                className="save-btn mr-2"
                onClick={()=>this.saveUserRole()}
              >
                {this.state.isEdit? "Update" : "Save"}
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
            <Table
              dataSource={this.state.data}
              columns={columns}
              bordered
            />
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