import React from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Grid,
  MenuItem,
  Snackbar,
  FormHelperText
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { UploadOutlined } from "@ant-design/icons";
import { Upload, message, Button as Btn } from "antd";
import axios from "axios";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const url = "http://localhost:3006/";
const loginID = localStorage.getItem("loginID");

export default class HotelRegistration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMsgPop: false,
      msg: "",
      hotelName: "",
      hotelNameError:"",
      compName: "",
      email: "",
      phone: "",
      logo: null,
      image: null,
      gstin: "",
      fax: "",
      tin: "",
      address: "",
      addressError:"",
      area: "",
      landmark: "",
      city: "",
      zipcode: "",
      state: "",
      country: "",
      serviceCharge: "",
      currency: "",
    };
  }
  
  componentDidMount(){
    this.reset();
  }

  async saveInfo(){
    let hotelName = this.state.hotelName;
    let compName = this.state.compName;
    let email = this.state.email;
    let phone = this.state.phone;
    let gstin = this.state.gstin;
    let fax = this.state.fax;
    let tin = this.state.tin;
    let address = this.state.address;
    let area = this.state.area;
    let landmark = this.state.landmark;
    let city = this.state.city;
    let zipcode = this.state.zipcode;
    let state = this.state.state;
    let country = this.state.country;
    let serviceCharge = this.state.serviceCharge;
    let currency = this.state.currency;
    let logo = this.state.logo;
    let image = this.state.image;

    serviceCharge = (serviceCharge == "") ? "0" : serviceCharge;

    if (hotelName == "" && hotelName.length == 0) {
      this.setState({ hotelNameError: "Please Enter Hotel Name" });
      return false;
    }

    if (address == "" && address.length == 0) {
      this.setState({ addressError: "Please Enter Address" });
      return false;
    }

    await axios
      .post(`${url}api/Hotel/new`, {
        hotelName: hotelName,
        compName: compName,
        email: email,
        phone: phone,
        gstin: gstin,
        fax: fax,
        tin: tin,
        address: address,
        area: area,
        landmark: landmark,
        city: city,
        zipcode: zipcode,
        state: state,
        country: country,
        serviceCharge: serviceCharge,
        currency: currency,
        logo: logo,
        image: image,
        HCreatedBy: loginID,
      })
      .then(
        (response) => {
          if (response.status === 200) {
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
  };

  reset = () => {
    this.setState({
      hotelName: "",
      hotelNameError: "",
      compName: "",
      email: "",
      phone: "",
      logo: null,
      image: null,
      gstin: "",
      fax: "",
      tin: "",
      address: "",
      addressError: "",
      area: "",
      landmark: "",
      city: "",
      zipcode: "",
      state: "",
      country: "",
      serviceCharge: "",
      currency: "",
    });
  };

  render() {
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

        <Typography variant="h6">Hotel Registration</Typography>
        <br />
        <Grid container spacing={3}>
          <Grid item xs={6} sm={4}>
            <Paper>
              <TextField
                className="w-100"
                id="outlined-basic"
                label="Hotel Name *"
                variant="outlined"
                value={this.state.hotelName}
                onChange={(e) => this.setState({ hotelName: e.target.value })}
              />
              <FormHelperText style={{ color: "red" }}>
                {this.state.hotelNameError}
              </FormHelperText>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Paper>
              <TextField
                className="w-100"
                id="outlined-basic"
                label="Company Name"
                variant="outlined"
                value={this.state.compName}
                onChange={(e) => this.setState({ compName: e.target.value })}
              />
            </Paper>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Paper>
              <TextField
                className="w-100"
                id="outlined-basic"
                label="Email"
                variant="outlined"
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </Paper>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Paper>
              <TextField
                className="w-100"
                id="outlined-basic"
                label="Phone No."
                variant="outlined"
                value={this.state.phone}
                onChange={(e) => this.setState({ phone: e.target.value })}
              />
            </Paper>
          </Grid>

          <Grid item xs={6} sm={4}>
            <Paper>
              {/* <Upload {...props} className="w-100">
                <Btn
                  style={{ height: " 4.070em", width: "100%" }}
                  icon={<UploadOutlined />}
                >
                  Logo Upload
                </Btn>
              </Upload> */}
              Logo Upload
            </Paper>
          </Grid>

          <Grid item xs={6} sm={4}>
            <Paper>image Upload</Paper>
          </Grid>

          <Grid item xs={6} sm={4}>
            <Paper>
              <TextField
                className="w-100"
                id="outlined-basic"
                label="GSTIN"
                variant="outlined"
                value={this.state.gstin}
                onChange={(e) => this.setState({ gstin: e.target.value })}
              />
            </Paper>
          </Grid>

          <Grid item xs={6} sm={4}>
            <Paper>
              <TextField
                className="w-100"
                id="outlined-basic"
                label="Fax"
                variant="outlined"
                value={this.state.fax}
                onChange={(e) => this.setState({ fax: e.target.value })}
              />
            </Paper>
          </Grid>

          <Grid item xs={6} sm={4}>
            <Paper>
              <TextField
                className="w-100"
                id="outlined-basic"
                label="Tin No."
                variant="outlined"
                value={this.state.tin}
                onChange={(e) => this.setState({ tin: e.target.value })}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} sm={12}>
            <Paper>
              <TextField
                className="w-100"
                id="outlined-basic"
                label="Address *"
                variant="outlined"
                value={this.state.address}
                onChange={(e) => this.setState({ address: e.target.value })}
              />              
              <FormHelperText style={{ color: "red" }}>
                {this.state.addressError}
              </FormHelperText>
            </Paper>
          </Grid>

          <Grid item xs={6} sm={4}>
            <Paper>
              <TextField
                className="w-100"
                id="outlined-basic"
                label="Area"
                variant="outlined"
                value={this.state.area}
                onChange={(e) => this.setState({ area: e.target.value })}
              />
            </Paper>
          </Grid>

          <Grid item xs={6} sm={4}>
            <Paper>
              <TextField
                className="w-100"
                id="outlined-basic"
                label="Landmark"
                variant="outlined"
                value={this.state.landmark}
                onChange={(e) => this.setState({ landmark: e.target.value })}
              />
            </Paper>
          </Grid>

          <Grid item xs={6} sm={4}>
            <Paper>
              <TextField
                className="w-100"
                id="outlined-basic"
                label="City"
                variant="outlined"
                value={this.state.city}
                onChange={(e) => this.setState({ city: e.target.value })}
              />
            </Paper>
          </Grid>

          <Grid item xs={6} sm={4}>
            <Paper>
              <TextField
                className="w-100"
                id="outlined-basic"
                label="Zip Code"
                variant="outlined"
                value={this.state.zipcode}
                onChange={(e) => this.setState({ zipcode: e.target.value })}
              />
            </Paper>
          </Grid>

          <Grid item xs={6} sm={4}>
            <Paper>
              <TextField
                className="w-100"
                id="outlined-basic"
                label="State"
                variant="outlined"
                value={this.state.state}
                onChange={(e) => this.setState({ state: e.target.value })}
              />
            </Paper>
          </Grid>

          <Grid item xs={6} sm={4}>
            <Paper>
              <TextField
                className="w-100"
                id="outlined-basic"
                label="Country"
                variant="outlined"
                value={this.state.country}
                onChange={(e) => this.setState({ country: e.target.value })}
              />
            </Paper>
          </Grid>

          <Grid item xs={6} sm={4}>
            <Paper>
              <TextField
                className="w-100"
                id="outlined-basic"
                label="Service Charges (if any %)"
                variant="outlined"
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                value={this.state.serviceCharge}
                onChange={(e) =>
                  this.setState({ serviceCharge: e.target.value })
                }
              />
            </Paper>
          </Grid>

          <Grid item xs={6} sm={4}>
            <Paper>
              <TextField
                className="w-100"
                id="outlined-basic"
                label="Currency Format"
                value={this.state.currency}
                onChange={(e) => this.setState({ currency: e.target.value })}
                variant="outlined"
              ></TextField>
            </Paper>
          </Grid>
        </Grid>
        <br />
        <Grid item xs={12} sm={12} className="text-center">
          <Button className="save-btn mr-2" onClick={() => this.saveInfo()}>
            Submit
          </Button>
          <Button className="close-btn" onClick={() => this.reset()}>
            Reset
          </Button>
        </Grid>
      </Box>
    );
  }
}
