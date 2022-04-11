import React from "react";
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
//import RoomManagementNav from "./RoomManagementNav";
import AddInventory from "./AddInventory";

export default class ViewInventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInventoryPop: false,
    };
  }

  closeInventoryPop = () => {
    this.setState({ isInventoryPop: false });
  };

  render() {
    return (
      <Box className="addinventory">
        <div>
          <Tooltip title="Add">
            <IconButton
              aria-label="add"
              onClick={() => this.setState({ isInventoryPop: true })}
            >
              <AddCircleOutlineTwoToneIcon />
            </IconButton>
          </Tooltip>

          {this.state.isInventoryPop ? (
            <AddInventory closeInventoryPop={this.closeInventoryPop} />
          ) : null}

          <Grid container spacing={3}>
            <Grid item xs={6}>
              <FormControl className="float-left" style={{ width: "15%" }}>
                <InputLabel id="demo-simple-select-label">Master</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                >
                  <MenuItem value={10}>Standard</MenuItem>
                  <MenuItem value={20}>Deluxe</MenuItem>
                  <MenuItem value={30}>Royal</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl className="float-right" style={{ width: "15%" }}>
                <InputLabel id="demo-simple-select-label">Month</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                >
                  <MenuItem value={10}>Jan</MenuItem>
                  <MenuItem value={20}>Feb</MenuItem>
                  <MenuItem value={30}>Mar</MenuItem>
                  <MenuItem value={30}>Apr</MenuItem>
                  <MenuItem value={30}>May</MenuItem>
                  <MenuItem value={30}>Jun</MenuItem>
                  <MenuItem value={30}>Jul</MenuItem>
                  <MenuItem value={30}>Aug</MenuItem>
                  <MenuItem value={30}>Sep</MenuItem>
                  <MenuItem value={30}>Oct</MenuItem>
                  <MenuItem value={30}>Nov</MenuItem>
                  <MenuItem value={30}>Dec</MenuItem>
                </Select>
              </FormControl>
              <div className="clearfix"></div>
            </Grid>

            {/* ============TABLE CODE START========= */}

            <div className="scroll-table mt-3">
              <h5 className="mb-3">Inventory List</h5>
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th colspan="2">Room Category</th>
                    <th colspan="2">1 April</th>
                    <th colspan="2">2 April</th>
                    <th colspan="2">3 April</th>
                    <th colspan="2">4 April</th>
                    <th colspan="2">5 April</th>
                    <th colspan="2">6 April</th>
                    <th colspan="2">7 April</th>
                    <th colspan="2">8 April</th>
                    <th colspan="2">9 April</th>
                    <th colspan="2">10 April</th>
                    <th colspan="2">11 April</th>
                    <th colspan="2">12 April</th>
                    <th colspan="2">13 April</th>
                    <th colspan="2">14 April</th>
                    <th colspan="2">15 April</th>
                    <th colspan="2">16 April</th>
                    <th colspan="2">17 April</th>
                    <th colspan="2">18 April</th>
                    <th colspan="2">19 April</th>
                    <th colspan="2">20 April</th>
                    <th colspan="2">21 April</th>
                    <th colspan="2">22 April</th>
                    <th colspan="2">23 April</th>
                    <th colspan="2">24 April</th>
                    <th colspan="2">25 April</th>
                    <th colspan="2">26 April</th>
                    <th colspan="2">27 April</th>
                    <th colspan="2">28 April</th>
                    <th colspan="2">29 April</th>
                    <th colspan="2">30 April</th>
                    <th>Action</th>
                  </tr>
                  <tr>
                    <th>Name</th>
                    <th>No.</th>
                    <th>VACANT</th>
                    <th>CM</th>
                    <th>VACANT</th>
                    <th>CM</th>
                    <th>VACANT</th>
                    <th>CM</th>
                    <th>VACANT</th>
                    <th>CM</th>
                    <th>VACANT</th>
                    <th>CM</th>
                    <th>VACANT</th>
                    <th>CM</th>
                    <th>VACANT</th>
                    <th>CM</th>
                    <th>VACANT</th>
                    <th>CM</th>
                    <th>VACANT</th>
                    <th>CM</th>
                    <th>VACANT</th>
                    <th>CM</th>
                    <th>VACANT</th>
                    <th>CM</th>
                    <th>VACANT</th>
                    <th>CM</th>
                    <th>VACANT</th>
                    <th>CM</th>
                    <th>VACANT</th>
                    <th>CM</th>
                    <th>VACANT</th>
                    <th>CM</th>
                    <th>VACANT</th>
                    <th>CM</th>
                    <th>VACANT</th>
                    <th>CM</th>
                    <th>VACANT</th>
                    <th>CM</th>
                    <th>VACANT</th>
                    <th>CM</th>
                    <th>VACANT</th>
                    <th>CM</th>
                    <th>VACANT</th>
                    <th>CM</th>
                    <th>VACANT</th>
                    <th>CM</th>
                    <th>VACANT</th>
                    <th>CM</th>
                    <th>VACANT</th>
                    <th>CM</th>
                    <th>VACANT</th>
                    <th>CM</th>
                    <th>VACANT</th>
                    <th>CM</th>
                    <th>VACANT</th>
                    <th>CM</th>
                    <th>VACANT</th>
                    <th>CM</th>
                    <th>VACANT</th>
                    <th>CM</th>
                    <th>VACANT</th>
                    <th>CM</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Standard</td>
                    <td>5</td>
                    <td>3</td>
                    <td>
                      <TextField
                        id="filled-helperText"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="outlined"
                      />
                    </td>
                    <td>8</td>
                    <td>
                      <input
                        style={{ width: "40px !important" }}
                        type="number"
                        className="form-control"
                        id="lname"
                        name="lname"
                        value="8"
                      />
                    </td>
                    <td>7</td>
                    <td>
                      <input
                        style={{ width: "40px !important" }}
                        type="number"
                        className="form-control"
                        id="lname"
                        name="lname"
                        value="8"
                      />
                    </td>
                    <td>1</td>
                    <td>
                      <input
                        style={{ width: "40px !important" }}
                        type="number"
                        className="form-control"
                        id="lname"
                        name="lname"
                        value="8"
                      />
                    </td>
                    <td>7</td>
                    <td>
                      <input
                        style={{ width: "40px !important" }}
                        type="number"
                        className="form-control"
                        id="lname"
                        name="lname"
                        value="8"
                      />
                    </td>
                    <td>8</td>
                    <td>
                      <input
                        style={{ width: "40px !important" }}
                        type="number"
                        className="form-control"
                        id="lname"
                        name="lname"
                        value="8"
                      />
                    </td>
                    <td>0</td>
                    <td>
                      <input
                        style={{ width: "40px !important" }}
                        type="number"
                        className="form-control"
                        id="lname"
                        name="lname"
                        value="8"
                      />
                    </td>
                    <td>1</td>
                    <td>
                      <input
                        style={{ width: "40px !important" }}
                        type="number"
                        className="form-control"
                        id="lname"
                        name="lname"
                        value="8"
                      />
                    </td>
                    <td>6</td>
                    <td>
                      <input
                        style={{ width: "40px !important" }}
                        type="number"
                        className="form-control"
                        id="lname"
                        name="lname"
                        value="8"
                      />
                    </td>
                    <td>3</td>
                    <td>
                      <input
                        style={{ width: "40px !important" }}
                        type="number"
                        className="form-control"
                        id="lname"
                        name="lname"
                        value="8"
                      />
                    </td>
                    <td>2</td>
                    <td>
                      <input
                        style={{ width: "40px !important" }}
                        type="number"
                        className="form-control"
                        id="lname"
                        name="lname"
                        value="8"
                      />
                    </td>
                    <td>9</td>
                    <td>
                      <input
                        style={{ width: "40px !important" }}
                        type="number"
                        className="form-control"
                        id="lname"
                        name="lname"
                        value="8"
                      />
                    </td>
                    <td>3</td>
                    <td>
                      <input
                        style={{ width: "40px !important" }}
                        type="number"
                        className="form-control"
                        id="lname"
                        name="lname"
                        value="8"
                      />
                    </td>
                    <td>4</td>
                    <td>
                      <input
                        style={{ width: "40px !important" }}
                        type="number"
                        className="form-control"
                        id="lname"
                        name="lname"
                        value="8"
                      />
                    </td>
                    <td>9</td>
                    <td>
                      <input
                        style={{ width: "40px !important" }}
                        type="number"
                        className="form-control"
                        id="lname"
                        name="lname"
                        value="8"
                      />
                    </td>
                    <td>9</td>
                    <td>
                      <input
                        style={{ width: "40px !important" }}
                        type="number"
                        className="form-control"
                        id="lname"
                        name="lname"
                        value="8"
                      />
                    </td>
                    <td>3</td>
                    <td>
                      <input
                        style={{ width: "40px !important" }}
                        type="number"
                        className="form-control"
                        id="lname"
                        name="lname"
                        value="8"
                      />
                    </td>
                    <td>4</td>
                    <td>
                      <input
                        style={{ width: "40px !important" }}
                        type="number"
                        className="form-control"
                        id="lname"
                        name="lname"
                        value="8"
                      />
                    </td>
                    <td>9</td>
                    <td>
                      <input
                        style={{ width: "40px !important" }}
                        type="number"
                        className="form-control"
                        id="lname"
                        name="lname"
                        value="8"
                      />
                    </td>
                    <td>8</td>
                    <td>
                      <input
                        style={{ width: "40px !important" }}
                        type="number"
                        className="form-control"
                        id="lname"
                        name="lname"
                        value="8"
                      />
                    </td>
                    <td>0</td>
                    <td>
                      <input
                        style={{ width: "40px !important" }}
                        type="number"
                        className="form-control"
                        id="lname"
                        name="lname"
                        value="8"
                      />
                    </td>
                    <td>1</td>
                    <td>
                      <input
                        style={{ width: "40px !important" }}
                        type="number"
                        className="form-control"
                        id="lname"
                        name="lname"
                        value="8"
                      />
                    </td>
                    <td>6</td>
                    <td>
                      <input
                        style={{ width: "40px !important" }}
                        type="number"
                        className="form-control"
                        id="lname"
                        name="lname"
                        value="8"
                      />
                    </td>
                    <td>3</td>
                    <td>
                      <input
                        style={{ width: "40px !important" }}
                        type="number"
                        className="form-control"
                        id="lname"
                        name="lname"
                        value="8"
                      />
                    </td>
                    <td>2</td>
                    <td>
                      <input
                        style={{ width: "40px !important" }}
                        type="number"
                        className="form-control"
                        id="lname"
                        name="lname"
                        value="8"
                      />
                    </td>
                    <td>9</td>
                    <td>
                      <input
                        style={{ width: "40px !important" }}
                        type="number"
                        className="form-control"
                        id="lname"
                        name="lname"
                        value="8"
                      />
                    </td>
                    <td>3</td>
                    <td>
                      <input
                        style={{ width: "40px !important" }}
                        type="number"
                        className="form-control"
                        id="lname"
                        name="lname"
                        value="8"
                      />
                    </td>
                    <td>4</td>
                    <td>
                      <input
                        style={{ width: "40px !important" }}
                        type="number"
                        className="form-control"
                        id="lname"
                        name="lname"
                        value="8"
                      />
                    </td>
                    <td>9</td>
                    <td>
                      <input
                        style={{ width: "40px !important" }}
                        type="number"
                        className="form-control"
                        id="lname"
                        name="lname"
                        value="8"
                      />
                    </td>
                    <td>9</td>
                    <td>
                      <input
                        style={{ width: "40px !important" }}
                        type="number"
                        className="form-control"
                        id="lname"
                        name="lname"
                        value="8"
                      />
                    </td>
                    <td>
                      <Button
                        variant="contained"
                        color="primary"
                        className="mr-3"
                      >Copy
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="text-center m-auto w-100 mt-4">
              <Button variant="contained" color="primary" className="mr-3">
                {" "}
                Update{" "}
              </Button>
              <Button variant="contained" color="secondary">
                Reset{" "}
              </Button>
            </div>
          </Grid>
        </div>
      </Box>
    );
  }
}
