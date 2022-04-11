import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import {
  Box,
  Typography,
  Button,
  Tooltip,
  Dialog,
  TextField,
  RadioGroup,
  FormControlLabel,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineTwoToneIcon from "@material-ui/icons/AddCircleOutlineTwoTone";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import HomeIcon from "@material-ui/icons/Home";
import Link from "@material-ui/core/Link";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Radio from "@material-ui/core/Radio";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function UserAccessFeature() {
  return (
    <Box>
      <Typography variant="h6">User Role Access Features</Typography>
      <table class="table table-bordered mt-4">
        <thead>
          <tr>
            <th rowSpan="2" style={{ verticalAlign: "middle" }}>
              Task
            </th>
            <th colSpan="5" className="text-center">
              User Roll
            </th>
          </tr>
          <tr>
            <th>Reservation</th>
            <th>Front Office</th>
            <th>House Keeping</th>
            <th>Store</th>
            <th>Account</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Room Category</td>
            <td>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" class="form-check-input" value="" />
                  Yes
                </label>
              </div>
            </td>
            <td>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" class="form-check-input" value="" />
                  Yes
                </label>
              </div>
            </td>
            <td>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" class="form-check-input" value="" />
                  Yes
                </label>
              </div>
            </td>
            <td>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" class="form-check-input" value="" />
                  Yes
                </label>
              </div>
            </td>
            <td>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" class="form-check-input" value="" />
                  Yes
                </label>
              </div>
            </td>
          </tr>

          <tr>
            <td>Floor</td>
            <td>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" class="form-check-input" value="" />
                  Yes
                </label>
              </div>
            </td>
            <td>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" class="form-check-input" value="" />
                  Yes
                </label>
              </div>
            </td>
            <td>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" class="form-check-input" value="" />
                  Yes
                </label>
              </div>
            </td>
            <td>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" class="form-check-input" value="" />
                  Yes
                </label>
              </div>
            </td>
            <td>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" class="form-check-input" value="" />
                  Yes
                </label>
              </div>
            </td>
          </tr>

          <tr>
            <td>Room No</td>
            <td>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" class="form-check-input" value="" />
                  Yes
                </label>
              </div>
            </td>
            <td>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" class="form-check-input" value="" />
                  Yes
                </label>
              </div>
            </td>
            <td>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" class="form-check-input" value="" />
                  Yes
                </label>
              </div>
            </td>
            <td>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" class="form-check-input" value="" />
                  Yes
                </label>
              </div>
            </td>
            <td>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" class="form-check-input" value="" />
                  Yes
                </label>
              </div>
            </td>
          </tr>

          <tr>
            <td>Tariff Plan</td>
            <td>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" class="form-check-input" value="" />
                  Yes
                </label>
              </div>
            </td>
            <td>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" class="form-check-input" value="" />
                  Yes
                </label>
              </div>
            </td>
            <td>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" class="form-check-input" value="" />
                  Yes
                </label>
              </div>
            </td>
            <td>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" class="form-check-input" value="" />
                  Yes
                </label>
              </div>
            </td>
            <td>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" class="form-check-input" value="" />
                  Yes
                </label>
              </div>
            </td>
          </tr>

          <tr>
            <td>Inventory</td>
            <td>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" class="form-check-input" value="" />
                  Yes
                </label>
              </div>
            </td>
            <td>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" class="form-check-input" value="" />
                  Yes
                </label>
              </div>
            </td>
            <td>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" class="form-check-input" value="" />
                  Yes
                </label>
              </div>
            </td>
            <td>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" class="form-check-input" value="" />
                  Yes
                </label>
              </div>
            </td>
            <td>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" class="form-check-input" value="" />
                  Yes
                </label>
              </div>
            </td>
          </tr>

          <tr>
            <td>Reservation</td>
            <td>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" class="form-check-input" value="" />
                  Yes
                </label>
              </div>
            </td>
            <td>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" class="form-check-input" value="" />
                  Yes
                </label>
              </div>
            </td>
            <td>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" class="form-check-input" value="" />
                  Yes
                </label>
              </div>
            </td>
            <td>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" class="form-check-input" value="" />
                  Yes
                </label>
              </div>
            </td>
            <td>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" class="form-check-input" value="" />
                  Yes
                </label>
              </div>
            </td>
          </tr>

          <tr>
            <td>Booking Reference</td>
            <td>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" class="form-check-input" value="" />
                  Yes
                </label>
              </div>
            </td>
            <td>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" class="form-check-input" value="" />
                  Yes
                </label>
              </div>
            </td>
            <td>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" class="form-check-input" value="" />
                  Yes
                </label>
              </div>
            </td>
            <td>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" class="form-check-input" value="" />
                  Yes
                </label>
              </div>
            </td>
            <td>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" class="form-check-input" value="" />
                  Yes
                </label>
              </div>
            </td>
          </tr>

          <tr>
            <td>User</td>
            <td>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" class="form-check-input" value="" />
                  Yes
                </label>
              </div>
            </td>
            <td>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" class="form-check-input" value="" />
                  Yes
                </label>
              </div>
            </td>
            <td>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" class="form-check-input" value="" />
                  Yes
                </label>
              </div>
            </td>
            <td>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" class="form-check-input" value="" />
                  Yes
                </label>
              </div>
            </td>
            <td>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" class="form-check-input" value="" />
                  Yes
                </label>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </Box>
  );
}
export default UserAccessFeature;
