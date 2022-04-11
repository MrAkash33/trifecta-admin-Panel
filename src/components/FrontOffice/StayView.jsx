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


export default class CheckOut extends React.Component {
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
              <h3 className="mb-3">Check Out</h3>

              <div className="tab-content-1">
                <Grid container spacing={3}>
                  <Grid item lg={2} xs={12}>
                    <InputLabel id="demo-simple-select-label">
                      Booking Details
                    </InputLabel>
                    <Divider />
                  </Grid>

                  <Grid item lg={2} xs={4}>
                    <FormControl
                      className="float-left"
                      style={{ width: "100%" }}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Booking Details
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                      >
                        <MenuItem value={10}>Select</MenuItem>
                        <MenuItem value={20}>7</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item lg={2} xs={4}>
                    <FormControl className="mb-3" style={{ width: "100%" }}>
                      <TextField
                        id="outlined-search"
                        label="Room No. "
                        type="text"
                        variant="outlined"
                      />
                    </FormControl>
                  </Grid>

                  <Grid item lg={2} xs={4}>
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

                  <Grid item lg={2} xs={4}>
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

                  <Grid item lg={2} xs={4}>
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

                  <Grid item lg={2} xs={12}>
                    <InputLabel id="demo-simple-select-label">
                      Tariff Details
                    </InputLabel>
                    <Divider />
                  </Grid>

                  <Grid item lg={2} xs={3}>
                    <FormControl className="mb-3" style={{ width: "100%" }}>
                      <TextField
                        id="outlined-search"
                        label="Guest Name"
                        type="text"
                        variant="outlined"
                      />
                    </FormControl>
                  </Grid>

                  <Grid item lg={2} xs={3}>
                    <FormControl className="mb-3" style={{ width: "100%" }}>
                      <TextField
                        id="outlined-search"
                        label="Room Tariff"
                        type="text"
                        variant="outlined"
                      />
                    </FormControl>
                  </Grid>

                  <Grid item lg={2} xs={3}>
                    <FormControl className="mb-3" style={{ width: "100%" }}>
                      <TextField
                        id="outlined-search"
                        label="No. of Bed Extra"
                        type="text"
                        variant="outlined"
                      />
                    </FormControl>
                  </Grid>

                  <Grid item lg={2} xs={3}>
                    <FormControl className="mb-3" style={{ width: "100%" }}>
                      <TextField
                        id="outlined-search"
                        label="Extra Bed Charges"
                        type="text"
                        variant="outlined"
                      />
                    </FormControl>
                  </Grid>

                  <Grid item lg={2} xs={12}>
                    <InputLabel id="demo-simple-select-label">
                      Services Charges
                    </InputLabel>
                    <Divider />
                  </Grid>

                  <Grid item lg={2} xs={4}>
                    <FormControl className="mb-3" style={{ width: "100%" }}>
                      <TextField
                        id="outlined-search"
                        label="Room Service"
                        type="text"
                        variant="outlined"
                      />
                    </FormControl>
                  </Grid>

                  <Grid item lg={2} xs={4}>
                    <FormControl className="mb-3" style={{ width: "100%" }}>
                      <TextField
                        id="outlined-search"
                        label="Mini Bar"
                        type="text"
                        variant="outlined"
                      />
                    </FormControl>
                  </Grid>

                  <Grid item lg={2} xs={4}>
                    <FormControl className="mb-3" style={{ width: "100%" }}>
                      <TextField
                        id="outlined-search"
                        label="Laundry"
                        type="text"
                        variant="outlined"
                      />
                    </FormControl>
                  </Grid>

                  <Grid item lg={2} xs={4}>
                    <FormControl className="mb-3" style={{ width: "100%" }}>
                      <TextField
                        id="outlined-search"
                        label="Late Charge"
                        type="text"
                        variant="outlined"
                      />
                    </FormControl>
                  </Grid>

                  <Grid item lg={2} xs={4}>
                    <FormControl className="mb-3" style={{ width: "100%" }}>
                      <TextField
                        id="outlined-search"
                        label="Other"
                        type="text"
                        variant="outlined"
                      />
                    </FormControl>
                  </Grid>

                  <Grid item lg={2} xs={4}>
                    <Typography gutterBottom>
                      <InputLabel id="demo-simple-select-label">
                        Booking Source
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
                          label="Direct"
                        />

                        <FormControlLabel
                          value="p"
                          control={<Radio />}
                          label="Indirect"
                        />
                      </RadioGroup>
                    </Typography>
                  </Grid>

                  <Grid item lg={2} xs={12}>
                    <InputLabel id="demo-simple-select-label">
                      Discount & Taxes
                    </InputLabel>
                    <Divider />
                  </Grid>

                  <Grid item lg={2} xs={3}>
                    <FormControl className="mb-3" style={{ width: "100%" }}>
                      <TextField
                        id="outlined-search"
                        label="Total Charges"
                        type="text"
                        variant="outlined"
                      />
                    </FormControl>
                  </Grid>

                  <Grid item lg={2} xs={3}>
                    <FormControl className="mb-3" style={{ width: "100%" }}>
                      <TextField
                        id="outlined-search"
                        label="DIS %"
                        type="text"
                        variant="outlined"
                      />
                    </FormControl>
                  </Grid>

                  <Grid item lg={2} xs={3}>
                    <FormControl className="mb-3" style={{ width: "100%" }}>
                      <TextField
                        id="outlined-search"
                        label="DIS %"
                        type="text"
                        variant="outlined"
                      />
                    </FormControl>
                  </Grid>

                  <Grid item lg={2} xs={3}>
                    <FormControl className="mb-3" style={{ width: "100%" }}>
                      <TextField
                        id="outlined-search"
                        label="Taxable Amount"
                        type="text"
                        variant="outlined"
                      />
                    </FormControl>
                  </Grid>

                  <Grid item lg={2} xs={4}>
                    <FormControl className="mb-3" style={{ width: "100%" }}>
                      <TextField
                        id="outlined-search"
                        label="CGST Amount "
                        type="text"
                        variant="outlined"
                      />
                    </FormControl>
                  </Grid>

                  <Grid item lg={2} xs={4}>
                    <FormControl className="mb-3" style={{ width: "100%" }}>
                      <TextField
                        id="outlined-search"
                        label="SGST Amount "
                        type="text"
                        variant="outlined"
                      />
                    </FormControl>
                  </Grid>

                  <Grid item lg={2} xs={4}>
                    <FormControl className="mb-3" style={{ width: "100%" }}>
                      <TextField
                        id="outlined-search"
                        label="Total Amount "
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
                    <Typography>
                      <Tooltip title="Add" aria-label="add">
                        <IconButton
                          aria-label="Add"
                          onClick={() => this.setState({ isPop: true })}
                        >
                          <AddCircleOutlineTwoToneIcon />
                        </IconButton>
                      </Tooltip>
                    </Typography>
                  </Grid>

                  <Grid item lg={2} xs={4}>
                    <InputLabel id="demo-simple-select-label">
                      Advance Payment Date
                    </InputLabel>
                    <FormControl className="mb-3" style={{ width: "100%" }}>
                      <TextField
                        id="outlined-search"
                        type="date"
                        variant="outlined"
                      />
                    </FormControl>
                  </Grid>

                  <Grid item lg={2} xs={4}>
                    <InputLabel id="demo-simple-select-label">
                      Advance Payment Amount
                    </InputLabel>
                    <FormControl className="mb-3" style={{ width: "100%" }}>
                      <TextField
                        id="outlined-search"
                        type="text"
                        variant="outlined"
                      />
                    </FormControl>
                  </Grid>

                  <Grid item lg={2} xs={4}>
                    <InputLabel id="demo-simple-select-label">
                      Advance Payment Mode
                    </InputLabel>
                    <FormControl className="mb-3" style={{ width: "100%" }}>
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

                  <Grid item lg={2} xs={12}>
                    <InputLabel id="demo-simple-select-label">
                      Final Payment
                    </InputLabel>
                    <Typography>
                      <Tooltip title="Add" aria-label="add">
                        <IconButton
                          aria-label="Add"
                          onClick={() => this.setState({ isPop: true })}
                        >
                          <AddCircleOutlineTwoToneIcon />
                        </IconButton>
                      </Tooltip>
                    </Typography>
                  </Grid>

                  <Grid item lg={2} xs={4}>
                    <InputLabel id="demo-simple-select-label">
                      Final Payment Date
                    </InputLabel>
                    <FormControl className="mb-3" style={{ width: "100%" }}>
                      <TextField
                        id="outlined-search"
                        type="date"
                        variant="outlined"
                      />
                    </FormControl>
                  </Grid>

                  <Grid item lg={2} xs={4}>
                    <InputLabel id="demo-simple-select-label">
                      Final Payment Amount
                    </InputLabel>
                    <FormControl className="mb-3" style={{ width: "100%" }}>
                      <TextField
                        id="outlined-search"
                        type="text"
                        variant="outlined"
                      />
                    </FormControl>
                  </Grid>

                  <Grid item lg={2} xs={4}>
                    <InputLabel id="demo-simple-select-label">
                      Final Payment Mode
                    </InputLabel>
                    <FormControl className="mb-3" style={{ width: "100%" }}>
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

                  <Grid item lg={2} xs={12}>
                    <InputLabel id="demo-simple-select-label">
                      Return Payment
                    </InputLabel>
                    <Typography>
                      <Tooltip title="Add" aria-label="add">
                        <IconButton
                          aria-label="Add"
                          onClick={() => this.setState({ isPop: true })}
                        >
                          <AddCircleOutlineTwoToneIcon />
                        </IconButton>
                      </Tooltip>
                    </Typography>
                  </Grid>

                  <Grid item lg={2} xs={4}>
                    <InputLabel id="demo-simple-select-label">
                      Amount
                    </InputLabel>
                    <FormControl className="mb-3" style={{ width: "100%" }}>
                      <TextField
                        id="outlined-search"
                        type="text"
                        variant="outlined"
                      />
                    </FormControl>
                  </Grid>

                  <Grid item lg={2} xs={4}>
                    <InputLabel id="demo-simple-select-label">
                      Mode of Return Payment
                    </InputLabel>
                    <FormControl className="mb-3" style={{ width: "100%" }}>
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

                  <Grid item lg={12} xs={12}>
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
            </div>
          </Box>
        );
    }
}
