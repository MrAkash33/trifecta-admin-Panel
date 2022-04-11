import React from "react";
import {
  Typography,
  Dialog,
  Button,
  TextField,
  Tooltip,
  Snackbar
} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import {Table} from 'antd';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import axios from "axios";
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';

const url = "http://localhost:3006/";
const hotelId = localStorage.getItem("hotelID");
const loginID = localStorage.getItem("loginID");

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class Amenities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPop: true,
      isEdit:false,
      aid:0,
      data: [],
      amenity: "",
      isMsgPop:false,
      msg: "",
    };
  }

  componentDidMount() {
    this.getAmenities();
  }

  getAmenities = async () => {
    await axios.post(`${url}api/Amenities`,{
      aid:0,
      hotelId:hotelId,
      flag:0
    }).then((res) => {
      if (res.data.response[0].length !== 0) {
        this.setState({ data: res.data.response[0] });
      }
    });
  };

  saveAmenities = async () => {
    let a = this.state.amenity;
    let aid = this.state.aid;

    if (a === "") {
      this.setState({
        isMsgPop:true,
        msg: "Enter Amenity"
      });     
      return false;
    }

    await axios
      .post(
        this.state.isEdit?
        `${url}api/Amenities/update`
        :
        `${url}api/Amenities/new`
        , 
        this.state.isEdit?
        {
          hotelId:hotelId,
          aid: aid,
          Aamenity: a,
          Acreatedby: loginID,
          astatus:1
        }
        :
        {
          hotelId:hotelId,
          Aamenity: a,
          CreatedBy: loginID,
        }
      )
      .then(
        (response) => {
          if (response.status === 200) {
            this.getAmenities();
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

  reset = () => {
    this.setState({
      amenity: "",
      isEdit:false,
      aid:0,
    });
  };

  closePop = () => {
    this.setState({
      isPop: false,
      isEdit:false,
      aid:0,
      isMsgPop:false,
      msg: "",
    });
    this.props.closeAminityPop();
  };

  updateAmenity = (record) => {
    this.setState({
      amenity: record.amenity,
      isEdit:true,
      isPop:true,
      aid:record.id,
    })
  };

  render() {
    const columns = [
      {
        dataIndex: "SrNo",
        title: "Sr.NO.",
        key: 1,
      },
      {
        dataIndex: "amenity",
        title: "Amenity",
        key: 2,
      },
      {
        title: "Action",
        key: 3,
        render: (record) => (
          <>
          <Tooltip placement="top" title="Edit">
            <a onClick={() => this.updateAmenity(record)}>
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
        fullWidth={true}
        maxWidth={"lg"}
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

        <input type="hidden" value={this.state.aid} />
        <MuiDialogTitle disableTypography>
          <Typography variant="h6">Add Amenities</Typography>
        </MuiDialogTitle>
        <MuiDialogContent dividers>
          <Typography gutterBottom>
            <Typography>
              <TextField
                id="amenities"
                label="Amenity"
                variant="outlined"
                onChange={(e) => this.setState({ amenity: e.target.value })}
                value={this.state.amenity}
              />
              &nbsp;&nbsp;
              <Button
                autoFocus
                color="primary"
                variant="contained"
                className="save-btn mr-2"
                onClick={() => this.saveAmenities()}
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
            <Table
              dataSource={this.state.data}
              columns={columns}
              bordered
              pagination={{ pageSize: 50 }}
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
