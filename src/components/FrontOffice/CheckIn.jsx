import React from "react";
import Link from '@material-ui/core/Link';
import { Tabs, Radio } from 'antd';
import { Checkbox } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
// import Radio from "@material-ui/core/Radio";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import AddCircleOutlineTwoToneIcon from "@material-ui/icons/AddCircleOutlineTwoTone";
import {
    Select,
    InputLabel,
    Typography,
    MenuItem,
    RadioGroup,
    FormControlLabel,
    Tooltip,
    Box,
    Button,
    Grid,
    FormControl,
    TextField,
    IconButton,
    Divider
} from "@material-ui/core/";


const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};


function onChange(checkedValues) {
    console.log('checked = ', checkedValues);
}

const options = [
    { label: 'Business', value: 'Business' },
    { label: 'Transit', value: 'Transit' },
    { label: 'Official', value: 'Official' },
    { label: 'Employment', value: 'Employment' },
    { label: 'Education', value: 'Education' },
    { label: 'Religion', value: 'Religion' },
    { label: 'Sports', value: 'Sports' },
    { label: 'Conference', value: 'Conference' },
    { label: 'Medical Health', value: 'Medical Health' },
    { label: 'Visit Friend / Relation', value: 'Visit Friend / Relation' },
    { label: 'Holiday', value: 'Holiday' },
    { label: 'Other', value: 'Other' },
];


const options11 = [
    { label: 'health declaration ', value: 'health declaration' },
    { label: 'Hotel Terms & Condition', value: 'Hotel Terms & Condition' },

];


export default class CheckIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isInventoryPop: false,
        };
    }




    state = { size: 'small' };

    onChange = e => {
        this.setState({ size: e.target.value });
    };


    closeInventoryPop = () => {
        this.setState({ isInventoryPop: false });
    };

    render() {
        const { TabPane } = Tabs;
        const { size } = this.state;
        return (
          <Box className="addinventory">
            <div>
              <h3 className="mb-3">Room Shfiting</h3>

              <div>
                <Tabs defaultActiveKey="1" type="card" size={size}>
                  <TabPane tab="Check In" key="1">
                    <div className="tab-content">
                      <Grid container spacing={3}>
                        <Grid item xs={6}>
                          <FormControl
                            className="float-left"
                            style={{ width: "35.2%" }}
                          >
                            <InputLabel id="demo-simple-select-label">
                              Booking Id *
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                            >
                              <MenuItem value={10}>
                                -Select Booking Id-
                              </MenuItem>
                              <MenuItem value={20}>7</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                          <Typography gutterBottom>
                            <InputLabel id="demo-simple-select-label">
                              Select
                            </InputLabel>
                            <RadioGroup
                              aria-label="type"
                              name="type"
                              onChange={e => this.getType(e)}
                              row
                              value={this.state.type}
                            >
                              <FormControlLabel
                                value="c"
                                control={<Radio />}
                                label="Self Check-In"
                              />

                              <FormControlLabel
                                value="p"
                                control={<Radio />}
                                label="Frunt Desk"
                              />
                            </RadioGroup>
                          </Typography>
                        </Grid>

                        <Grid item xs={6}>
                          <FormControl
                            className="mb-3"
                            style={{ width: "35.2%" }}
                          >
                            <TextField
                              id="outlined-search"
                              label="QR Code & Link"
                              type="search"
                              variant="outlined"
                            />
                          </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                          <div className="text-center m-auto w-100 mt-4">
                            <Button
                              variant="contained"
                              color="primary"
                              className="mr-3"
                            >
                              {" "}
                              Share{" "}
                            </Button>
                            <Button variant="contained" color="secondary">
                              Reset{" "}
                            </Button>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  </TabPane>

                  <TabPane tab="Guest Form" key="2">
                    <div className="tab-content">
                      <Grid container spacing={3}>
                        <Grid item xs={6}>
                          <FormControl
                            className="float-left"
                            style={{ width: "30.6%" }}
                          >
                            <InputLabel id="demo-simple-select-label">
                              Booking Id *
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                            >
                              <MenuItem value={10}>
                                -Select Booking Id-
                              </MenuItem>
                              <MenuItem value={20}>7</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item xs={6}></Grid>

                        <Grid item lg={2} xs={12}>
                          <InputLabel
                            id="demo-simple-select-label"
                            style={{
                              borderBottom: "1px solid #c8c8c8",
                              paddingBottom: "12px",
                            }}
                          >
                            Booking Details :
                          </InputLabel>
                        </Grid>

                        <Grid item lg={2} xs={4}>
                          <FormControl
                            className="mb-3"
                            style={{ width: "100%" }}
                          >
                            <TextField
                              id="outlined-search"
                              label="Guest Name *"
                              type="text"
                              variant="outlined"
                            />
                          </FormControl>
                        </Grid>

                        <Grid item lg={2} xs={4}>
                          <FormControl
                            className="mb-3"
                            style={{ width: "100%" }}
                          >
                            <TextField
                              id="outlined-search"
                              label="Contact No*"
                              type="text"
                              variant="outlined"
                            />
                          </FormControl>
                        </Grid>

                        <Grid item lg={2} xs={4}>
                          <FormControl
                            className="mb-3"
                            style={{ width: "100%" }}
                          >
                            <TextField
                              id="outlined-search"
                              label="Email Id*"
                              type="text"
                              variant="outlined"
                            />
                          </FormControl>
                        </Grid>

                        <Grid item lg={2} xs={6}>
                          <FormControl
                            className="mb-3"
                            style={{ width: "100%" }}
                          >
                            <TextField
                              id="outlined-search"
                              label="Permament Address*"
                              type="search"
                              variant="outlined"
                            />
                          </FormControl>
                        </Grid>

                        <Grid item lg={2} xs={6}>
                          <FormControl
                            className="mb-3"
                            style={{ width: "100%" }}
                          >
                            <TextField
                              id="outlined-search"
                              label="Address Ref in India*"
                              type="search"
                              variant="outlined"
                            />
                          </FormControl>
                        </Grid>

                        <Grid item lg={2} xs={6}>
                          <form>
                            <TextField
                              className="w-100"
                              id="date"
                              label="Check-in Date"
                              type="date"
                              defaultValue="2017-05-24"
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                          </form>
                        </Grid>

                        <Grid item lg={2} xs={6}>
                          <form>
                            <TextField
                              className="w-100"
                              id="time"
                              label="Check-in Time"
                              type="time"
                              defaultValue="07:30"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              inputProps={{
                                step: 300, // 5 min
                              }}
                            />
                          </form>
                        </Grid>

                        <Grid item lg={2} xs={6}>
                          <form>
                            <TextField
                              className="w-100"
                              id="date"
                              label="Check-Out Date"
                              type="date"
                              defaultValue="2017-05-24"
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                          </form>
                        </Grid>

                        <Grid item lg={2} xs={6}>
                          <form>
                            <TextField
                              className="w-100"
                              id="time"
                              label="Check-Out Time"
                              type="time"
                              defaultValue="07:30"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              inputProps={{
                                step: 300, // 5 min
                              }}
                            />
                          </form>
                        </Grid>

                        <Grid item lg={2} xs={4}>
                          <FormControl
                            className="mb-3"
                            style={{ width: "100%" }}
                          >
                            <TextField
                              id="outlined-search"
                              label="No. of Days"
                              type="text"
                              variant="outlined"
                            />
                          </FormControl>
                        </Grid>

                        <Grid item lg={2} xs={4}>
                          <FormControl
                            className="mb-3"
                            style={{ width: "100%" }}
                          >
                            <TextField
                              id="outlined-search"
                              label="Next Destination"
                              type="text"
                              variant="outlined"
                            />
                          </FormControl>
                        </Grid>

                        <Grid item lg={2} xs={4}>
                          <Typography gutterBottom>
                            <InputLabel id="demo-simple-select-label">
                              GST Details
                            </InputLabel>
                            <RadioGroup
                              aria-label="type"
                              name="type"
                              onChange={e => this.getType(e)}
                              row
                              value={this.state.type}
                            >
                              <FormControlLabel
                                value="c"
                                control={<Radio />}
                                label="Yes"
                              />

                              <FormControlLabel
                                value="p"
                                control={<Radio />}
                                label="No"
                              />
                            </RadioGroup>
                          </Typography>
                        </Grid>

                        <Grid item lg={2} xs={4}>
                          <FormControl
                            className="mb-3"
                            style={{ width: "100%" }}
                          >
                            <TextField
                              id="outlined-search"
                              label="Customers GST Number"
                              type="text"
                              variant="outlined"
                            />
                          </FormControl>
                        </Grid>

                        <Grid item lg={2} xs={4}>
                          <FormControl
                            className="mb-3"
                            style={{ width: "100%" }}
                          >
                            <TextField
                              id="outlined-search"
                              label="Company Name"
                              type="text"
                              variant="outlined"
                            />
                          </FormControl>
                        </Grid>

                        <Grid item lg={2} xs={4}>
                          <FormControl
                            className="mb-3"
                            style={{ width: "100%" }}
                          >
                            <TextField
                              id="outlined-search"
                              label="Company Address"
                              type="text"
                              variant="outlined"
                            />
                          </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                          <InputLabel id="demo-simple-select-label">
                            Purpose of Visit
                          </InputLabel>
                          <Checkbox.Group
                            options={options}
                            defaultValue={["Pear"]}
                            onChange={onChange}
                          />
                        </Grid>

                        <Grid item lg={2} xs={6}>
                          <FormControl
                            className="mb-3"
                            style={{ width: "100%" }}
                          >
                            <Upload {...props}>
                              <Button icon={<UploadOutlined />}>
                                Upload Id Proof Frontside
                              </Button>
                            </Upload>
                          </FormControl>
                        </Grid>

                        <Grid item lg={2} xs={6}>
                          <FormControl
                            className="mb-3"
                            style={{ width: "100%" }}
                          >
                            <Upload {...props}>
                              <Button icon={<UploadOutlined />}>
                                Upload Id Proof Backsite
                              </Button>
                            </Upload>
                          </FormControl>
                        </Grid>

                        <Grid item lg={2} xs={12}>
                          <Checkbox.Group
                            options={options11}
                            defaultValue={["Pear"]}
                            onChange={onChange}
                          />
                        </Grid>

                        <Grid item lg={2} xs={4}>
                          <FormControl
                            className="mb-3"
                            style={{ width: "100%" }}
                          >
                            <TextField
                              id="outlined-search"
                              label="Guest Signature*"
                              type="text"
                              variant="outlined"
                            />
                          </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                          <div className="text-center m-auto w-100 mt-4">
                            <Button
                              variant="contained"
                              color="primary"
                              className="mr-3"
                            >
                              {" "}
                              Submit{" "}
                            </Button>
                            <Button variant="contained" color="secondary">
                              Reset{" "}
                            </Button>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  </TabPane>

                  <TabPane tab="Review Check-In" key="3">
                    <div className="tab-content">
                      <Grid container spacing={3}>
                        <Grid item lg={2} xs={6}>
                          <FormControl
                            className="float-left"
                            style={{ width: "100%" }}
                          >
                            <InputLabel id="demo-simple-select-label">
                              Preview of Guest From
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                            >
                              <MenuItem value={10}>Select</MenuItem>
                              <MenuItem value={20}>Header</MenuItem>
                              <MenuItem value={20}>Hotel Logo</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item lg={2} xs={12}>
                          <InputLabel id="demo-simple-select-label">
                            Tariff Details
                          </InputLabel>
                          <Divider />
                        </Grid>

                        <Grid item lg={2} xs={3}>
                          <FormControl
                            className="mb-3"
                            style={{ width: "100%" }}
                          >
                            <TextField
                              id="outlined-search"
                              label="Room Tariff"
                              type="text"
                              variant="outlined"
                            />
                          </FormControl>
                        </Grid>

                        <Grid item lg={2} xs={3}>
                          <FormControl
                            className="mb-3"
                            style={{ width: "100%" }}
                          >
                            <TextField
                              id="outlined-search"
                              label="No. of Bed"
                              type="text"
                              variant="outlined"
                            />
                          </FormControl>
                        </Grid>

                        <Grid item lg={2} xs={3}>
                          <FormControl
                            className="mb-3"
                            style={{ width: "100%" }}
                          >
                            <TextField
                              id="outlined-search"
                              label="Customer Bed Charge"
                              type="text"
                              variant="outlined"
                            />
                          </FormControl>
                        </Grid>

                        <Grid item lg={2} xs={3}>
                          <FormControl
                            className="mb-3"
                            style={{ width: "100%" }}
                          >
                            <TextField
                              id="outlined-search"
                              label="Early Check In"
                              type="text"
                              variant="outlined"
                            />
                          </FormControl>
                        </Grid>

                        <Grid item lg={2} xs={12}>
                          <InputLabel id="demo-simple-select-label">
                            Discount & Taxes
                          </InputLabel>
                          <Divider />
                        </Grid>

                        <Grid item lg={2} xs={4}>
                          <FormControl
                            className="mb-3"
                            style={{ width: "100%" }}
                          >
                            <TextField
                              id="outlined-search"
                              label="Sub Total Charges"
                              type="text"
                              variant="outlined"
                            />
                          </FormControl>
                        </Grid>

                        <Grid item lg={2} xs={4}>
                          <FormControl
                            className="mb-3"
                            style={{ width: "100%" }}
                          >
                            <TextField
                              id="outlined-search"
                              label="Dis %"
                              type="text"
                              variant="outlined"
                            />
                          </FormControl>
                        </Grid>

                        <Grid item lg={2} xs={4}>
                          <FormControl
                            className="mb-3"
                            style={{ width: "100%" }}
                          >
                            <TextField
                              id="outlined-search"
                              label="Taxable Amt"
                              type="text"
                              variant="outlined"
                            />
                          </FormControl>
                        </Grid>

                        <Grid item lg={2} xs={4}>
                          <FormControl
                            className="mb-3"
                            style={{ width: "100%" }}
                          >
                            <TextField
                              id="outlined-search"
                              label="CGST Amt"
                              type="text"
                              variant="outlined"
                            />
                          </FormControl>
                        </Grid>

                        <Grid item lg={2} xs={4}>
                          <FormControl
                            className="mb-3"
                            style={{ width: "100%" }}
                          >
                            <TextField
                              id="outlined-search"
                              label="SGST Amt"
                              type="text"
                              variant="outlined"
                            />
                          </FormControl>
                        </Grid>

                        <Grid item lg={2} xs={4}>
                          <FormControl
                            className="mb-3"
                            style={{ width: "100%" }}
                          >
                            <TextField
                              id="outlined-search"
                              label="Total Amt"
                              type="text"
                              variant="outlined"
                            />
                          </FormControl>
                        </Grid>

                        <Grid item lg={2} xs={12}>
                          <InputLabel id="demo-simple-select-label">
                            Payment Details
                          </InputLabel>
                          <Divider />
                        </Grid>

                        <Grid item lg={2} xs={12}>
                          <InputLabel id="demo-simple-select-label">
                            Advance Payment
                          </InputLabel>
                        </Grid>

                        <Grid item lg={2} xs={3}>
                          <InputLabel id="demo-simple-select-label">
                            Advance Payment Date
                          </InputLabel>
                          <FormControl
                            className="mb-3"
                            style={{ width: "100%" }}
                          >
                            <TextField
                              id="outlined-search"
                              type="date"
                              variant="outlined"
                            />
                          </FormControl>
                        </Grid>

                        <Grid item lg={2} xs={3}>
                          <InputLabel id="demo-simple-select-label">
                            Advance Payment Amount
                          </InputLabel>
                          <FormControl
                            className="mb-3"
                            style={{ width: "100%" }}
                          >
                            <TextField
                              id="outlined-search"
                              type="text"
                              variant="outlined"
                            />
                          </FormControl>
                        </Grid>

                        <Grid item lg={2} xs={3}>
                          <InputLabel id="demo-simple-select-label">
                            Advance Payment Mode
                          </InputLabel>
                          <FormControl
                            className="mb-3"
                            style={{ width: "100%" }}
                          >
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                            >
                              <MenuItem value={10}>Select</MenuItem>
                              <MenuItem value={20}>UPI</MenuItem>
                              <MenuItem value={20}>Netbanking</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item lg={2} xs={3}>
                          <InputLabel id="demo-simple-select-label">
                            Due Amount
                          </InputLabel>
                          <FormControl
                            className="mb-3"
                            style={{ width: "100%" }}
                          >
                            <TextField
                              id="outlined-search"
                              type="text"
                              variant="outlined"
                            />
                          </FormControl>
                        </Grid>

                        <Grid item lg={2} xs={12}>
                          <div className="text-center m-auto w-100 mt-4">
                            <Button
                              variant="contained"
                              color="primary"
                              className="mr-3"
                            >
                              {" "}
                              Submit{" "}
                            </Button>
                            <Button variant="contained" color="secondary">
                              Reset{" "}
                            </Button>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  </TabPane>

                  <TabPane tab="Check-In List" key="4">
                    <div className="tab-content">
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <table class="table table-bordered">
                            <thead>
                              <tr>
                                <th>Sr.no</th>
                                <th>Name</th>
                                <th>PAXCount</th>
                                <th>Booking Id</th>
                                <th>Check In Date</th>
                                <th>Check In Time</th>
                                <th>Check Out Date</th>
                                <th>Room No</th>
                                <th>Breakfast</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>1</td>
                                <td>DREE</td>
                                <td>2+0=2</td>
                                <td>7</td>
                                <td>2021-03-01</td>
                                <td>23:32:16</td>
                                <td>2021-03-02</td>
                                <td>201</td>
                                <td>No</td>
                              </tr>
                            </tbody>
                          </table>
                        </Grid>
                      </Grid>
                    </div>
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </Box>
        );
    }
}
