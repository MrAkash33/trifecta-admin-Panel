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


export default class Bill extends React.Component {

    render() {

        return (
            <Box className="addinventory">
                <div>


                    <h3 className="mb-3">Room Shfiting</h3>

                    <div className="table-section">
                        <table class="table table-bordered">

                            <tbody>
                                <tr>
                                    <td colSpan="3" rowSpan="5" style={{ verticalAlign: "middle" }}>
                                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAAA3CAYAAACrbNxuAAAACXBIWXMAAAsTAAALEwEAmpwYAAAHXGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMC0wMS0wMVQxNzoyNjozMCswNTozMCIgeG1wOk1vZGlmeURhdGU9IjIwMjAtMDEtMDhUMTY6NTQ6NTkrMDU6MzAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjAtMDEtMDhUMTY6NTQ6NTkrMDU6MzAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6YzQzNWQxOTMtNDBkOC00ODQ5LWIxNmMtY2MzZWNmMjgxOTA0IiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6N2U3OWNjYTctNGI4Yi0xMTQxLTkzYjQtMmJmMDAyYTgyZmE3IiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6RUU1NDM1MTUxQ0E0MTFFQTlBQjVGMzcwRTgwMjlENjAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFRTU0MzUxMjFDQTQxMUVBOUFCNUYzNzBFODAyOUQ2MCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFRTU0MzUxMzFDQTQxMUVBOUFCNUYzNzBFODAyOUQ2MCIvPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo4ZjYzOTA5Mi04NjQ4LTFhNGQtOGJjNC03MzZlNWFhNjU4MmMiIHN0RXZ0OndoZW49IjIwMjAtMDEtMDFUMTc6MzY6MTUrMDU6MzAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YzQzNWQxOTMtNDBkOC00ODQ5LWIxNmMtY2MzZWNmMjgxOTA0IiBzdEV2dDp3aGVuPSIyMDIwLTAxLTA4VDE2OjU0OjU5KzA1OjMwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDxwaG90b3Nob3A6RG9jdW1lbnRBbmNlc3RvcnM+IDxyZGY6QmFnPiA8cmRmOmxpPnhtcC5kaWQ6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" />

                                    </td>
                                    <td colSpan="7" rowSpan="4" style={{ verticalAlign: "middle" }}>

                                        <h3>AKSHAY NIWAS</h3>
                                    </td>
                                    <td>Invoice No.:</td>
                                    <td>161</td>
                                </tr>

                                <tr>

                                    <td>Date</td>
                                    <td>15-02-2021</td>
                                </tr>

                                <tr>

                                    <td>GSTIN</td>
                                    <td>08AAKCS4821L1ZY</td>
                                </tr>

                                <tr>

                                    <td>SAC Code</td>
                                    <td>9963</td>
                                </tr>





                                <tr>
                                    <td colSpan="9" className="text-center">
                                        <p><b>7, HARIDASJI KI MAGRI RAAJANGAN RESORT PVT.LTD OBEROI TRIDENT<br />
                                        UDAIPUR - 313002<br />
                                        Phone:09825803274 , Email:akshayniwasudaipur@gmail.com

                                        </b></p>
                                    </td>

                                </tr>
                                <tr>
                                    <td colSpan="12">Customer Details</td>

                                </tr>

                                <tr>
                                    <td><b>Name</b></td>
                                    <td colSpan="7"><b>Ms. Mayura</b></td>
                                    <td>Check In Date:</td>
                                    <td>13-02-2021</td>
                                    <td>Check Out Date:</td>
                                    <td>15-02-2021</td>

                                </tr>

                                <tr>
                                    <td rowSpan="2"><b>Address:</b></td>
                                    <td colSpan="7" rowSpan="2"><b>XYZ</b></td>
                                    <td colSpan="2">GSTIN :</td>
                                    <td colSpan="2">Company Name :</td>

                                </tr>

                                <tr>

                                    <td><b>Email:</b></td>
                                    <td>info@gmail.com</td>
                                    <td><b>Mobile:</b></td>
                                    <td>9988554411</td>

                                </tr>


                                <tr>

                                    <td rowSpan="2" style={{ verticalAlign: "middle" }}><b>Sr.No</b></td>
                                    <td rowSpan="2" style={{ verticalAlign: "middle" }}><b>Product Description</b></td>
                                    <td rowSpan="2" style={{ verticalAlign: "middle" }}><b>No. of Rooms</b></td>
                                    <td rowSpan="2" style={{ verticalAlign: "middle" }}><b>Days</b></td>
                                    <td rowSpan="2" style={{ verticalAlign: "middle" }}><b>Rate</b></td>
                                    <td rowSpan="2" style={{ verticalAlign: "middle" }}><b>Sub Total Sale</b></td>
                                    <td rowSpan="2" style={{ verticalAlign: "middle" }}><b>Disc %.</b></td>
                                    <td rowSpan="2" style={{ verticalAlign: "middle" }}><b>Taxable Value</b></td>
                                    <td colSpan="2" className="text-center"><b>CGST</b></td>
                                    <td colSpan="2" className="text-center"><b>SGST</b></td>


                                </tr>

                                <tr>


                                    <td><b>Rate %</b></td>
                                    <td className="text-center"><b>Amnt. </b></td>
                                    <td><b>Rate %</b></td>
                                    <td className="text-center"><b>Amnt. </b></td>



                                </tr>


                                <tr>
                                    <td><b>1</b></td>
                                    <td><b>royal Sweet Room</b></td>
                                    <td><b>107</b></td>
                                    <td><b>2</b></td>
                                    <td><b>5,750</b></td>
                                    <td><b>11,500</b></td>
                                    <td><b>10.715</b></td>
                                    <td><b>10,268</b></td>
                                    <td><b>6</b></td>
                                    <td className="text-center"><b>616.0665</b></td>
                                    <td><b>6</b></td>
                                    <td className="text-center"><b>616.0665</b></td>
                                </tr>

                                <tr>
                                    <td colSpan="5" className="text-right"><b>Total</b></td>
                                    <td><b>11,500</b></td>
                                    <td><b></b></td>
                                    <td><b>10,268</b></td>
                                    <td><b></b></td>
                                    <td className="text-center"><b>616.0664999999999</b></td>
                                    <td><b></b></td>
                                    <td className="text-center"><b>616.0664999999999</b></td>
                                </tr>


                                <tr>
                                    <td colSpan="6" rowSpan="2" style={{ verticalAlign: "middle" }} className="text-center"><b>Rupees in words: ELEVEN THOUSANDS<br />
                                    FIVE HUNDRED RUPEES
</b></td>

                                    <td colSpan="4" className="text-center"><b>Summary</b></td>
                                    <td colSpan="2" className="text-center"><b>Amount</b></td>

                                </tr>

                                <tr>


                                    <td colSpan="4" className="text-center"><b>Total Invoice Value</b></td>
                                    <td colSpan="2" className="text-center"><b>11,500</b></td>

                                </tr>

                                <tr>
                                    <td colSpan="6" rowSpan="3" style={{ verticalAlign: "middle" }} className="text-left">
                                        <p><b>Payment Mode:Neft</b></p>
                                        <p><b>Booking Reference : individual</b></p>
                                    </td>

                                    <td colSpan="4" className="text-center"><b>Total Discount </b></td>
                                    <td colSpan="2" className="text-center"><b>1,232.23</b></td>

                                </tr>

                                <tr>


                                    <td colSpan="4" className="text-center"><b>Total Taxable Value</b></td>
                                    <td colSpan="2" className="text-center"><b>10,267.78</b></td>

                                </tr>

                                <tr>


                                    <td colSpan="4" className="text-center"><b>Total CGST</b></td>
                                    <td colSpan="2" className="text-center"><b>616.07</b></td>

                                </tr>


                                <tr>
                                    <td colSpan="6" rowSpan="6" style={{ verticalAlign: "middle" }} className="text-left">
                                        <br />
                                        <br />
                                       
                                        <p><b>Terms & Conditions:</b></p>
                                        <p><b>- Subject to Udaipur Jurisdiction.</b></p>
                                        <p><b>- Charge 24% p.a. after 7 days of billing.</b></p>
                                        <p><b>- This is to certify that we have valid.</b></p>
                                        <p><b>registration under GST & above  <br /> information is true & correct.</b></p>
                                        <p><b>- E. & O.E</b></p>
                                    </td>

                                    <td colSpan="4" className="text-center"><b>Total SGST</b></td>
                                    <td colSpan="2" className="text-center"><b>616.07</b></td>

                                </tr>

                                <tr>


                                    <td colSpan="4" className="text-center"><b>Service Charge </b></td>
                                    <td colSpan="2" className="text-center"><b>0</b></td>

                                </tr>

                                <tr>


                                    <td colSpan="4" className="text-center"><b>Total Amount</b></td>
                                    <td colSpan="2" className="text-center"><b>11,500.00</b></td>

                                </tr>

                                <tr>


                                    <td colSpan="4" className="text-center"><b>Advance Payment</b></td>
                                    <td colSpan="2" className="text-center"><b>0</b></td>

                                </tr>

                                <tr>


                                    <td colSpan="4" className="text-center"><b>Final Payment</b></td>
                                    <td colSpan="2" className="text-center"><b>11,500</b></td>

                                </tr>

                                <tr>


                                    <td colSpan="2" className="text-center">
                                        <br />
                                        <br />
                                       
                                        <b>Customer's <br />Signature</b></td>
                                        <td colSpan="6" className="text-center">
                                        <p><b>For: AKSHAY NIWAS</b></p>
                                        <br />
                                        <br />
                                        <br />
                                        <p><b>Authorized Signatory</b></p>

                                    </td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Box>
        );
    }
}
