import React from "react";
import Link from '@material-ui/core/Link';
import { Tabs, Radio } from 'antd';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import AddCircleOutlineTwoToneIcon from "@material-ui/icons/AddCircleOutlineTwoTone";
import {
  Select,
  InputLabel,
  Typography,
  MenuItem,
  Tooltip,
  Box,
  Button,
  Grid,
  FormControl,
  TextField,
  IconButton
} from "@material-ui/core/";


export default class EarlyCheckOut extends React.Component {
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


<h3 className="mb-4 mt-2">Early Check Out</h3>

<div>
      
<Typography className="text-right">
            <Tooltip title="Add" aria-label="add">
              <IconButton
                aria-label="Add"
                onClick={() => this.setState({ isPop: true })}
              >
                <AddCircleOutlineTwoToneIcon />
              </IconButton>
            </Tooltip>
          </Typography>


        <Tabs defaultActiveKey="1" type="card" size={size}>
          <TabPane tab="Update Check Out Details" key="1">
              <div className="tab-content">
    <Grid container spacing={3}>
        <Grid item xs={4}>
        <FormControl className="float-left" style={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-label">Booking Id no *</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                >
                  <MenuItem value={10}>-Select Booking Id-</MenuItem>
                  <MenuItem value={20}>7</MenuItem>
                </Select>
              </FormControl>
        </Grid>

        <Grid item xs={4}>
            <form >
                <TextField className="w-100"
                    id="date"
                    label="Check Out Date"
                    type="date"
                    defaultValue="2017-05-24"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </form>
        </Grid>

        <Grid item xs={4}>
        <form >
  <TextField className="w-100"
    id="time"
    label="Check Out Time:*"
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

        <Grid item xs={12}>
        <div className="text-center m-auto w-100 mt-4">
            <Button variant="contained" color="primary" className="mr-3">
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
          <TabPane tab="Early Check Out List" key="2">
          <div className="tab-content">
<div className="text-center">
<p><b>Please Enter Date Range To Search Early Check out older then 30 Days</b></p>
<h6 className="mb-3">Early Check out REPORT</h6>
</div>



    <Grid container spacing={3}>
        <Grid item xs={6}>
            <form >
                <TextField className="w-100"
                    id="date"
                    label="From"
                    type="date"
                    defaultValue="2017-05-24"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </form>
        </Grid>

        <Grid item xs={6}>
            <form >
                <TextField className="w-100"
                    id="date"
                    label="To"
                    type="date"
                    defaultValue="2017-05-24"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </form>
        </Grid>

        <Grid item xs={12}>
        <div className="text-center m-auto w-100 mt-4">
            <Button variant="contained" color="primary" className="mr-3 mt-4">
                {" "}
                View Report{" "}
            </Button>
            {/* <Button variant="contained" color="secondary">
                Reset{" "}
            </Button> */}
        </div>
        </Grid>

        <Grid item xs={12}>

        <table class="table table-bordered">
<thead>
<tr>
<th>SR.NO</th>
<th>BOOKING ID</th>
<th>OLD CHECK OUT DATE</th>
<th>NEW CHECK OUT DATE</th>

</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>4553</td>
<td>09-05-2021</td>
<td>10-05-2021</td>

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
