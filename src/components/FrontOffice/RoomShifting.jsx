import React from "react";
import Link from '@material-ui/core/Link';
import { Tabs, Radio } from 'antd';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import AddCircleOutlineTwoToneIcon from "@material-ui/icons/AddCircleOutlineTwoTone";
import {
  Select,
  InputLabel,
  MenuItem,
  Tooltip,
  Box,
  Button,
  Grid,
  FormControl,
  TextField,
  IconButton
} from "@material-ui/core/";


export default class ViewInventory extends React.Component {
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



            <Grid container spacing={3}>
              <Grid item xs={6}>
                <InputLabel id="demo-simple-select-label">Date</InputLabel>
                <FormControl className="mb-3">
                  <TextField id="outlined-search" type="date" variant="outlined" />
                </FormControl>
              </Grid>


              <Grid item xs={12}>
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th>B_ID</th>
                      <th>Old ROom</th>
                      <th>New Room</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>101</td>
                      <td><select className="w-100">
                        <option>Select</option>
                        <option>Same</option>
                        <option>Upgrade</option>
                        </select></td>
                    </tr>

                  </tbody>
                </table>
              </Grid>








<Grid item xs={12}>
              <div className="text-center m-auto w-100 mt-4">
                <Button variant="contained" color="primary" className="mr-3">
                  {" "}
                Submit {" "}
                </Button>
                <Button variant="contained" color="secondary">
                  Reset{" "}
                </Button>
              </div>
              </Grid>


              <Grid item xs={12}>
                <table class="table table-bordered mt-4">
                  <thead>
                    <tr>
                      <th>B_ID</th>
                      <th>Old ROom</th>
                      <th>New Room</th>
                      <th>Charges</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>101</td>
                      <td>201</td>
                      <td>50,00</td>
                    </tr>

                  </tbody>
                </table>
              </Grid>


              <Grid item xs={12}>
              <div className="text-center m-auto w-100 mt-4">
                <Button variant="contained" color="primary" className="mr-3">
                  {" "}
                Ok {" "}
                </Button>
                <Button variant="contained" color="secondary">
                  Cancel{" "}
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
