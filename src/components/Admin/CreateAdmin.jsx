import React from 'react';
import { Box,
    Typography,
    TextField,
    InputLabel,
    Select,
    MenuItem,
    FormControl } from '@material-ui/core';
import { UploadOutlined } from '@ant-design/icons';
import { Upload, message,Button as Btn } from 'antd';
const hotelId = localStorage.getItem("hotelID");
const loginID = localStorage.getItem("loginID");

export default class CreateAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isPop: false,
          data: [],
          fullName: "",
          gender: "M",
          mobile: "",
          email: "",
          designation: "n",
          profile: null,
          uName: "",
          pwd: "",
          uType: "SA",
          status: "A",
        };
      }
    
      reset = () => {
        this.setState({
          fullName: "",
          gender: "M",
          mobile: "",
          email: "",
          designation: "",
          profile: null,
          uName: "",
          pwd: "",
          uType: "SA",
          status: "A",
        });
      };

    render() {
        return (
            <Box>
                <Typography gutterBottom>
              <FormControl variant="outlined" style={{ minWidth: 150 }}>
                <TextField
                  id="fullName"
                  label="Full Name"
                  variant="outlined"
                  value={this.state.fullName}
                  onChange={(e) => this.setState({ fullName: e.target.value })}
                />
              </FormControl>
              &nbsp;&nbsp;
              <FormControl variant="outlined" style={{ minWidth: 150 }}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Gender
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={this.state.gender}
                  onChange={(e) => this.setState({ gender: e.target.value })}
                  label="Gender"
                >
                  <MenuItem value="M">Male</MenuItem>
                  <MenuItem value="F">Female</MenuItem>
                </Select>
              </FormControl>
            </Typography>
            <Typography gutterBottom>
              <FormControl variant="outlined" style={{ minWidth: 150 }}>
                <TextField
                  id="mobileNo"
                  label="Mobile No."
                  variant="outlined"
                  type="number"
                  inputProps={{
                    min: 0,
                  }}
                  value={this.state.mobile}
                  onChange={(e) => this.setState({ mobile: e.target.value })}
                />
              </FormControl>
              &nbsp;&nbsp;
              <FormControl variant="outlined" style={{ minWidth: 150 }}>
                <TextField
                  id="emailID"
                  label="Email No"
                  variant="outlined"
                  value={this.state.email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
              </FormControl>
            </Typography>
            <Typography gutterBottom>
              <FormControl variant="outlined" style={{ minWidth: 150 }}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Designation
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={this.state.designation}
                  onChange={(e) =>
                    this.setState({ designation: e.target.value })
                  }
                  label="designation"
                >
                  <MenuItem value="n">None</MenuItem>
                  <MenuItem value="O">Owner</MenuItem>
                  <MenuItem value="M">Manager</MenuItem>
                </Select>
              </FormControl>
              &nbsp;&nbsp;
              <Upload className="w-100">
                <Btn
                  style={{ height: " 4.070em", width: "100%" }}
                  icon={<UploadOutlined />}
                >
                  Profile Upload
                </Btn>
              </Upload>
            </Typography>
            <Typography gutterBottom>
            <FormControl variant="outlined" style={{ minWidth: 150 }}>
                <TextField
                  id="userName"
                  label="User Name"
                  variant="outlined"
                  value={this.state.uName}
                  onChange={(e) => this.setState({ uName: e.target.value })}
                />
              </FormControl>
              &nbsp;&nbsp;
              <FormControl variant="outlined" style={{ minWidth: 150 }}>
                <TextField
                  id="pwd"
                  label="Password"
                  variant="outlined"
                  type="password"
                  value={this.state.pwd}
                  onChange={(e) => this.setState({ pwd: e.target.value })}
                />
              </FormControl>
            </Typography>
            <Typography gutterBottom>
            <FormControl variant="outlined" style={{ minWidth: 150 }}>
                <InputLabel id="demo-simple-select-outlined-label">
                  User Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={this.state.uType}
                  onChange={(e) =>
                    this.setState({ uType: e.target.value })
                  }
                  label="User Type"
                >
                  <MenuItem value="SA">Super Admin</MenuItem>
                  <MenuItem value="A">Admin</MenuItem>
                </Select>
              </FormControl>
              &nbsp;&nbsp;
              <FormControl variant="outlined" style={{ minWidth: 150 }}>
                <InputLabel id="demo-simple-select-outlined-label">
                  User Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={this.state.status}
                  onChange={(e) =>
                    this.setState({ status: e.target.value })
                  }
                  label="User Type"
                >
                  <MenuItem value="A">Active</MenuItem>
                  <MenuItem value="D">Deactive</MenuItem>
                </Select>
              </FormControl>
            </Typography>
            </Box>
        )
    }
}
