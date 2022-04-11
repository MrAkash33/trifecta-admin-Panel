import React from 'react';
import './index.css';
import { Box, Typography, Grid, Container } from "@material-ui/core";

class Print extends React.Component {
  render() {
    return (
      <body className="main_div">
        <div className="_bx_print">
          <div class="head_print">
            <h5>GST Invoice</h5>
          </div>
          <Grid className="section_bx" container>
            <Grid lg={4} className="grid1">
              LOGO
            </Grid>
            <Grid lg={8} className="leftborder">
              <Grid container>
                <Grid lg={6} className="name_bx">
                  <h3>Trifecta Hotel Management</h3>
                </Grid>
                <Grid lg={6} className="leftborderer">
                  <ul className="left_detail">
                    <li>
                      <b>Invoice No.</b>
                    </li>
                    <li>
                      <b>Date.</b>
                    </li>
                    <li>
                      <b>GSTIN No.</b>
                    </li>
                    <li>
                      <b>Sac Code.</b>
                    </li>
                  </ul>
                  <ul className="left_detail1">
                    <li> 67</li>
                    <li>09/12/2020.</li>
                    <li>08ADTPA5001F2ZW</li>
                    <li>9963</li>
                  </ul>
                </Grid>
                <Grid lg={12} className="fullborder">
                  <span className="spaner">
                    176, Moti Magri Scheme,Near UIT Office Udaipur - 313001
                    Phone:+919414033320 , Email:udaipur@mewarts.com
                  </span>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <div class="head_print">
            <h5>Customer Details</h5>
          </div>
          <Grid container className="grid_bxer">
            <Grid lg={1} className="grid_bx_1">
              <span className="spaner">
                <b>Name :</b>
              </span>
            </Grid>
            <Grid lg={4} className="grid_bx_4">
              <span className="spaner">Harsh Taneja( Deloitte Team)</span>
            </Grid>
            <Grid lg={7} container className="grid_bx_7">
              <Grid lg={3} className="print_1">
                <span className="spaner">
                  <b>Check in Date :</b>
                </span>
              </Grid>
              <Grid lg={3} className="print_1">
                <span className="spaner">17-09-2020</span>
              </Grid>
              <Grid lg={3} className="print_1">
                <span className="spaner">
                  <b>Check Out Date:</b>
                </span>
              </Grid>
              <Grid lg={3} className="print_1">
                <span className="spaner">17-09-2020</span>
              </Grid>
            </Grid>
          </Grid>
          <Grid container>
            <Grid lg={1} className="grid_bx_2">
              <span className="spaner">
                <b>Address:</b>
              </span>
            </Grid>
            <Grid lg={4} className="grid_bx_4">
              <span className="spaner">noida sec-32 up 201201</span>
            </Grid>
            <Grid lg={7} container className="grid_bx_7">
              <Grid lg={6} className="terms_bxxer">
                <span className="spaner">
                  <b>GSTIN :</b>08AAACH7354K1ZB
                </span>
              </Grid>
              <Grid lg={6} className="terms_bxxer">
                <span className="spaner">
                  <b>Company Name :</b>HINDUSTAN
                </span>
              </Grid>
            </Grid>
            <Grid lg={12} container className="table_head_b">
              <Grid lg={5} className="print_bxer">
                <span className="spaner">
                  <b>Email Id :</b> democomapnay@gmail.com
                </span>
              </Grid>
              <Grid lg={7} className="print_bxer">
                <span className="spaner">
                  <b>Mobile No :</b>99XXX8989X8
                </span>
              </Grid>
            </Grid>
          </Grid>
          <Grid container>
            <Grid className="table_head ruppes_bx">
              <table>
                <tr>
                  <th>Sr.No.</th>
                  <th className="prod_bx">Product Description</th>
                  <th>Rooms</th>
                  <th>Days</th>
                  <th>Rate</th>
                  <th>Total Sale</th>
                  <th>Disc</th>
                  <th>Taxable Value</th>
                  <th class="tax_bxer">
                    <tr class="tax_bx">
                      <th>CGST</th>
                    </tr>
                    <tr>
                      <th>Rate %</th>
                      <th>Amnt.</th>
                    </tr>
                  </th>
                  <th class="tax_bxer">
                    <tr class="tax_bx">
                      <th>SGST</th>
                    </tr>
                    <tr>
                      <th>Rate %</th>
                      <th>Amnt.</th>
                    </tr>
                  </th>
                </tr>
                <tr className="data_bx">
                  <td>1</td>
                  <td>DELUXE with Complementary Breakfast</td>
                  <td>G1,G2,G4</td>
                  <td>15</td>
                  <td>1,600</td>
                  <td>72,000</td>
                  <td>0,000</td>
                  <td>72,000</td>
                  <td class="tax_data">
                    <tr>
                      <td>6</td>
                      <td>4320.</td>
                    </tr>
                  </td>
                  <td class="tax_data">
                    <tr>
                      <td>6</td>
                      <td>4320</td>
                    </tr>
                  </td>
                </tr>
                <tr className="data_bx">
                  <td>2</td>
                  <td>DELUXE with Complementary Breakfast</td>
                  <td>G1,G2,G4</td>
                  <td>15</td>
                  <td>1,600</td>
                  <td>72,000</td>
                  <td>0,000</td>
                  <td>72,000</td>
                  <td class="tax_data">
                    <tr>
                      <td>6</td>
                      <td>4320.</td>
                    </tr>
                  </td>
                  <td class="tax_data">
                    <tr>
                      <td>6</td>
                      <td>4320</td>
                    </tr>
                  </td>
                </tr>
                <tr className="data_bx">
                  <td>3</td>
                  <td>DELUXE with Complementary Breakfast</td>
                  <td>G1,G2,G4</td>
                  <td>15</td>
                  <td>1,600</td>
                  <td>72,000</td>
                  <td>0,000</td>
                  <td>72,000</td>
                  <td class="tax_data">
                    <tr>
                      <td>6</td>
                      <td>4320.</td>
                    </tr>
                  </td>
                  <td class="tax_data">
                    <tr>
                      <td>6</td>
                      <td>4320</td>
                    </tr>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="dat_bx">Total</td>
                  <td className="dat_bx">116,680</td>
                  <td className="dat_bx"></td>
                  <td className="dat_bx">116,680</td>
                  <td class="tax_data">
                    <tr>
                      <td className="dat_bx"></td>
                      <td>5437</td>
                    </tr>
                  </td>
                  <td class="tax_data">
                    <tr>
                      <td></td>
                      <td>5437</td>
                    </tr>
                  </td>
                </tr>
              </table>
            </Grid>
            <Grid container className="printfx">
              <Grid lg={6} className="terms_bx terms_bxxer">
                <Grid lg={12}>
                  <span className="spaner">
                    &nbsp;&nbsp;&nbsp;Rupees in words: ONE LAKH TWENTY SEVEN
                    THOUSANDS FIVE HUNDRED AND FIFTY FOUR RUPEES
                  </span>
                </Grid>
                <Grid lg={12} className="pament_bx">
                  <p>Payment Mode: Due</p>
                  <p>Booking Reference : individual</p>
                </Grid>
                <Grid lg={12} className="terms_wrap">
                  <p>Terms & Conditions:</p>
                  <span className="spaner">
                    -&gt; Subject to Udaipur Jurisdiction.
                  </span>
                  <br></br>
                  <span className="spaner">
                    -&gt; Subject to Udaipur Jurisdiction.
                  </span>
                  <br></br>
                  <span className="spaner">
                    -&gt; This is to certify that we have valid registration
                    For: Mewarts Hotel & Restaurant under GST & above
                    information is true & correct.
                  </span>
                  <br></br>
                  <span>-&gt; E. & O.E.</span>
                </Grid>
              </Grid>
              <Grid lg={6} container className="rates_bx">
                <Grid lg={6} className="summ_wrapper">
                  <ul>
                    <th>Summary</th>
                    <li>Total Invoice Value</li>
                    <li>Total Discount</li>
                    <li>Total Taxable Value</li>
                    <li>Total CGST</li>
                    <li>Total SGST</li>
                    <li>Grand Total</li>
                    <li>Advance Payment</li>
                    <li>Net Amount</li>
                  </ul>
                </Grid>
                <Grid lg={6} className="summ_wrapper">
                  <ul>
                    <th>Amount</th>
                    <li>116680</li>
                    <li>0</li>
                    <li>116,680</li>
                    <li>5437</li>
                    <li>5437</li>
                    <li>127,554</li>
                    <li>0</li>
                    <li>127,554</li>
                  </ul>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </body>
    );
  }
}


export default Print;