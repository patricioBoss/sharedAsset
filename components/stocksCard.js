import Image from "next/image";
import React from "react";
import { Card, CardContent, styled, Typography, useTheme } from "@mui/material";
import numeral from "numeral";
import stocks from "../helpers/stocks";
import Iconify from "./Iconify";
import ReactApexChart, { BaseOptionChart } from "./chart";
import { merge } from "lodash";
import { fCurrency, fPercent } from "../utils/formatNumber";
import Link from "next/link";

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  height: "100%",
  width: "100%",
  textAlign: "left",
  alignItems: "center",
  border: "1px solid #cdcdcd ",
  padding: 0,
  "&:hover": {
    boxShadow: theme.shadows[12],
  },
}));

// ----------------------------------------------------------------------

const StocksCard = ({ stockData, chartData }) => {
  // console.log(stockData);
  console.log("chartdata", chartData);
  const chartOptions = merge(BaseOptionChart(), {
    colors: [stocks[stockData.symbol].bg],
    chart: { sparkline: { enabled: true } },
    xaxis: { labels: { show: false } },
    yaxis: { labels: { show: false } },
    stroke: { width: 3 },
    legend: { show: false },
    grid: { show: false },
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName) => fCurrency(seriesName),
        title: {
          formatter: () => "",
        },
      },
    },
    fill: { gradient: { opacityFrom: 0.56, opacityTo: 0.56 } },
  });
  return (
    <Link href={"/dashboard/portfolio/" + stockData.symbol}>
      <RootStyle>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: 0,
            height: "100%",
            "&:last-child": {
              padding: 0,
            },
          }}
        >
          <div className=" w-full h-full rounded-[2rem] flex flex-col justify-between cursor-pointer">
            <div className=" w-full h-full flex flex-col justify-between p-4">
              <div className=" flex justify-between mb-8">
                <Image
                  src={stocks[stockData.symbol].imgUrl}
                  className=" rounded-full"
                  width={70}
                  height={70}
                  alt="google"
                />
                <div
                  className={`border border-solid border-[#cdcdcd] rounded-full w-[60px] h-[60px] flex flex-col justify-center items-center ${
                    stockData.regularMarketChangePercent >= 0
                      ? " text-green-500"
                      : "text-red-500"
                  } p-2`}
                >
                  <Iconify
                    width={17}
                    height={17}
                    icon={
                      stockData.regularMarketChangePercent >= 0
                        ? "eva:trending-up-fill"
                        : "eva:trending-down-fill"
                    }
                  />
                  <p className="text-sm">
                    {fPercent(stockData.regularMarketChangePercent)}
                  </p>
                </div>
                {/* <divs
                style={{ background: stocks[stockData.symbol].bg }}
                className=" rounded-md text-white text-center px-1 font-medium mb-2 w-fit"
              >
                {stockData.symbol}
              </divs> */}
              </div>
              <div className="mb-6 flex justify-between">
                <div className=" flex flex-col items-start ">
                  <Typography
                    sx={{ lineHeight: 1, textAlign: "left", mb: 1 }}
                    variant="h5"
                  >
                    {stockData.shortName}
                  </Typography>
                  <p className=" text-xs">{stockData.symbol} . NASDAQ</p>
                </div>
                <div className=" flex flex-col items-start self-end">
                  <p className=" text-[10px] leading-[.5rem]">Current price</p>
                  <Typography variant="h3">
                    {`${numeral(stockData.regularMarketPrice).format(
                      "0,0.00"
                    )}`}
                    <span className="text-sm leading-[.5rem] font-normal">
                      USD
                    </span>
                  </Typography>
                </div>
              </div>
            </div>
            <div className="w-full justify-end">
              <ReactApexChart
                type="area"
                series={[{ data: chartData }]}
                options={chartOptions}
                height={120}
                width="100%"
              />
            </div>
          </div>
        </CardContent>
      </RootStyle>
    </Link>
  );
};

export default StocksCard;
