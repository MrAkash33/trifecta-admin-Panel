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


export default class BookingModification extends React.Component {
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


<h3 className="mb-3">Booking Modification</h3>

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
          <TabPane tab="Add/Remove Room List" key="1">
              <div className="tab-content">
<div className="text-center">
<p><b>Please Enter Date Range To Search Booking Modifiction older then 30 Days</b></p>
<h6 className="mb-3">ADD/REMOVE ROOM REPORT</h6>
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
<th>Sr.no</th>
<th>B.Id</th>
<th>Name</th>
<th>Old Room</th>
<th>New Room</th>
<th>C.I.D.</th>
<th>B.Amo.</th>
<th>Ex.Bed</th>
<th>Adv. Pay</th>
<th>Cancellation Charge</th>
<th>Due Amo.</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>4553</td>
<td>Doe</td>
<td>rx</td>
<td>ds</td>
<td>233</td>
<td>2500</td>
<td>2</td>
<td>2111</td>
<td>500</td>
<td>5000</td>
</tr>

</tbody>
</table>

        </Grid>


    </Grid>

            </div>


          </TabPane>
          <TabPane tab="Update Check-Out Date List" key="2">
          <div className="tab-content">
<div className="text-center">
<p><b>Please Enter Date Range To Search Booking Modifiction older then 30 Days</b></p>
<h6 className="mb-3">UPDATED CHECK-OUT DATE REPORT</h6>
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
<th>Sr.no</th>
<th>B.Id</th>
<th>Name</th>
<th>Room No.</th>
<th>C.I.D.</th>
<th>O.C.O.D.</th>
<th>N.C.O.D.</th>
<th>B.Amo.</th>
<th>Ex.Bed</th>
<th>Adv. Pay</th>
<th>Cancellation Charge</th>
<th>Due Amo.</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>4553</td>
<td>Doe</td>
<td>rx</td>
<td>ds</td>
<td>233</td>
<td>2500</td>
<td>2</td>
<td>2111</td>
<td>500</td>
<td>5000</td>
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
