import React from "react";
import {
  Container,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Typography,
  Button,
  TextField,
  Grid,
  Box,
  FormHelperText,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import logo from "../../assets/logo.png";
import banner from "../../assets/4420.svg";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import axios from "axios";

const url = "http://localhost:3006/";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hid: 0,
      uName: "",
      uNameError: "",
      hotelCode: "",
      hotelCodeError: "",
      pwd: "",
      pwdError: "",
      uType: 0,
      uTypeError: "",
      showPassword: false,
      hotelName: "",
      uTypeList: [],
    };
  }

  callLogin = async () => {
    let uName = this.state.uName;
    let hotelCode = this.state.hotelCode;
    let pwd = this.state.pwd;
    let uType = this.state.uType;

    if (hotelCode.trim() == "" && hotelCode.trim().length == 0) {
      this.setState({
        hotelCodeError: "Please enter hotel code.",
      });
      return false;
    }

    if (uName.trim() == "" && uName.trim().length == 0) {
      this.setState({
        uNameError: "Please enter user name.",
      });
      return false;
    }

    if (pwd.trim() == "" && pwd.trim().length == 0) {
      this.setState({
        pwdError: "Please enter password.",
      });
      return false;
    }

    if (uType == 0) {
      this.setState({
        uTypeError: "Please select user type.",
      });
      return false;
    }

    localStorage.setItem("loginID", 1);
    localStorage.setItem("loginName", uName);
    localStorage.setItem("hotelID", 1);
    localStorage.setItem("uType", "A");
    localStorage.setItem("hotelName", "Trifecta HMS");
    this.props.onLogin(true);
  };

  getUserRole = async hid => {
  };

  getHotelName = async value => {
    this.setState({
      hotelCode: value,
    });
  };

  reset = () => {
    this.setState({
      hid: 0,
      uName: "",
      uNameError: "",
      hotelCode: "",
      hotelCodeError: "",
      pwd: "",
      pwdError: "",
      uType: 0,
      uTypeError: "",
      hotelName: "",
    });
  };

  render() {
    return (
      <>
        <Grid className="top-header">
          <Container>
            <Grid container>
              <Grid lg={6}>
                <img className="login-logo" src={logo} />
                <h5 className="sub2">Trifecta HMS</h5>
              </Grid>
              <Grid lg={6} className="s-title">
                <Typography varient="subtitle" className="c-wrap">
                  Trifecta Hotel Management Software
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Grid>
        <Container>
          <Grid container className="wrapperMain">
            <Grid item lg={6}>
              <Box p={4}>
                <img className="banner" src={banner} />
              </Box>
            </Grid>
            <Grid item lg={6}>
              <Box p={4}>
                <Typography gutterBottom className="wrappertext">
                  <img className="login-logo" src={logo} />
                  <h2 className="login-head">Babridge Solutions</h2>
                </Typography>
                <Box>
                  <Grid className="center-g">
                    <FormControl
                      variant="outlined"
                      className="mb-4 size_bx"
                    >
                      <TextField
                        id="hotelcode"
                        label="Hotel Code *"
                        variant="outlined"
                        value={this.state.hotelCode}
                        onChange={e => this.getHotelName(e.target.value)}
                      />
                      <FormHelperText style={{ color: "red" }}>
                        {this.state.hotelCodeError}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid className="center-g">
                    <FormControl
                      variant="outlined"
                      className="mb-4 size_bx"
                    >
                      <TextField
                        id="fullName"
                        label="User Name *"
                        variant="outlined"
                        value={this.state.uName}
                        onChange={e => this.setState({ uName: e.target.value })}
                      />
                      <FormHelperText style={{ color: "red" }}>
                        {this.state.uNameError}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid className="center-g">
                    <FormControl
                      variant="outlined"
                      className="mb-4 size_bx"
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password *
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={this.state.showPassword ? "text" : "password"}
                        value={this.state.pwd}
                        onChange={e => this.setState({ pwd: e.target.value })}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() =>
                                this.setState({
                                  showPassword: !this.state.showPassword,
                                })
                              }
                              edge="end"
                            >
                              {this.state.showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      <FormHelperText style={{ color: "red" }}>
                        {this.state.pwdError}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid className="center-g">
                    <FormControl
                      className="size_bx"
                      variant="outlined"
                      style={{ minWidth: 150 }}
                    >
                      <InputLabel id="demo-simple-select-outlined-label">
                        USER TYPE *
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        label="Third Party"
                        value={this.state.uType}
                        onChange={e => this.setState({ uType: e.target.value })}
                      >
                        <MenuItem value="0">Select</MenuItem>
                        <MenuItem value="1">Admin</MenuItem>
                      </Select>
                      <FormHelperText style={{ color: "red" }}>
                        {this.state.uTypeError}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid className="center-g">
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => this.callLogin()}
                    >
                      Login
                    </Button>
                    &nbsp;&nbsp;
                    <Button
                      variant="contained"
                      color=""
                      onClick={() => this.reset()}
                    >
                      Reset
                    </Button>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
        <Grid>
          <Typography varient="subtitle3" className="footer">
            Copyright to Baybridge Solutions
          </Typography>
        </Grid>
      </>
    );
  }
}
