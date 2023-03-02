import { merge } from "lodash";
// @mui
import { Box } from "@mui/material";
// components
import ReactApexChart, { BaseOptionChart } from "../../../../components/chart";

// ----------------------------------------------------------------------

const CHART_DATA = [
  {
    name: "Team A",
    type: "column",
    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
  },
  {
    name: "Team B",
    type: "area",
    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
  },
  {
    name: "Team C",
    type: "line",
    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
  },
];

export default function SingleStockChart({ stockQuote }) {
  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: 3 },
    fill: { type: ["solid", "gradient", "solid"] },
    labels: stockQuote.timestamp,
    xaxis: { type: "datetime" },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== "undefined") {
            return `${y.toFixed(0)} visits`;
          }
          return y;
        },
      },
    },
  });

  return (
    <Box sx={{ p: 3, pb: 1 }} dir="ltr">
      <ReactApexChart
        type="line"
        series={[{ data: stockQuote.quotes.open }]}
        options={chartOptions}
        height={364}
      />
    </Box>
  );
}
