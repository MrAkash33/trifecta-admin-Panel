import React from 'react';
import { Box, Typography } from '@material-ui/core';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import HomeIcon from '@material-ui/icons/Home';
import Link from '@material-ui/core/Link';
const AccessReport = () => {
    let data = [];
    const options = {
        filterType: 'checkbox',
    };
    const columns = ["Sr.No", "Booking ID", "User Name", "Operation Type", "Operation Time"]

    return (
        <Box>
             {/* =============BREAD CRUMBS SECTION CODE START==================== */}
          <Breadcrumbs className="bread-link-sec" aria-label="breadcrumb">
             <Link color="inherit" href="/AccessReport">Access Report</Link>
             <Link color="inherit" href="/HotelRegistration">Hotel Registration</Link>
             <Link color="inherit" href="/GSTCalculation"> GST Calculation</Link>
          </Breadcrumbs>
     {/* =============BREAD CRUMBS SECTION CODE START==================== */}
            <Typography variant="h6">Access Report</Typography>
            <MUIDataTable
                title={"Access List"}
                data={data}
                columns={columns}
                options={options}
            />
        </Box>
    )
}

export default AccessReport;