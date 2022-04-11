import React from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import { Typography, Grid, Container } from "@material-ui/core";
import GaugeChart from "react-gauge-chart";

export default class RoomsDashboard extends React.Component {
  render() {
    const data = {
      labels: ["VACANT", "RESERVED", "OCCUPIED", "HOUSEKEEPING", "BLOCK"],
      datasets: [
        {
          label: "# of Rooms",
          data: [12, 10, 25, 2, 56],
          backgroundColor: [
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 99, 132, 0.2)",
          ],
          borderColor: [
            "rgba(75, 192, 192, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 99, 132, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    const options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };

    return (
      <>
        <Container>
          <Grid className="" container>
            <Grid className="chartgraph" lg={6} container>
             <Grid container className="chartgraph_bxer">
              <Grid lg={6}>
                <Grid container item xs>
                  <Typography gutterBottom>
                    <Doughnut data={data} />
                    <Typography variant="h6">Total Record : 100</Typography>
                  </Typography>
                </Grid>
              </Grid>
              <Grid className="accurat_bx" lg={6}>
                <Grid container item xs>
                  <Typography gutterBottom>
                    <GaugeChart
                      id="gauge-chart2"
                      nrOfLevels={20}
                      percent={0.35}
                      colors={["#4bc0c0", "#ffce56", "#ff6384"]}
                      textColor={"#000"}
                      formatTextValue={value => "Occupancy " + value + "%"}
                    />
                  </Typography>
                </Grid>
              </Grid>
             </Grid>
            </Grid>
            <Grid className="chartgraph" lg={6}>
              <Grid className="chartgraph_bxer">
               <Grid container>
                <Bar
                  data={data}
                  options={options}
                  style={{ width: "360", height: "240" }}
                />
              </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
        <Grid container spacing={2}></Grid>
      </>
    );
  }
}
