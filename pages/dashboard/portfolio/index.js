import { Container, Typography, Grid } from "@mui/material";
// layouts
import Layout from "../../../layouts";
// hooks
import useSettings from "../../../hooks/useSettings";
// components
import Page from "../../../components/Page";
import { useState } from "react";
import serializeFields from "../../../helpers/serialize";
import { getUserById } from "../../../helpers/fetchers";
import useSWR from "swr";
import PropTypes from "prop-types";
import pageAuth from "../../../middleware/pageAuthAccess";
import stocks from "../../../helpers/stocks";
import axios from "axios";
import StocksCard from "../../../components/stocksCard";
// ----------------------------------------------------------------------
async function handler({ req }) {
  const user = serializeFields(req.user);
  const stocksListString = Object.keys(stocks).join(",");
  const stocksResponse = await axios.get(
    `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${stocksListString}`
  );
  const stocksDataList = await stocksResponse.data.quoteResponse.result;

  const stockListArray = Object.keys(stocks).map((symbol) =>
    axios.get(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?metrics=high&interval=30m&range=1d`
    )
  );
  const stockQuoteList = await Promise.all(stockListArray);

  let stockDataQuote = stocksDataList.map((stock, idx) => {
    console.log(
      stock.symbol,
      stockQuoteList[idx].data.chart.result[0].meta.symbol
    );
    return {
      data: stock,
      quote: stockQuoteList[idx].data.chart.result[0].indicators.quote[0],
    };
  });

  // console.log(stocksDataList.length, stockQuoteList.length, stockDataQuote);
  return {
    props: {
      user,
      stockDataQuote,
      fallback: {
        [`/api/user/${user._id}`]: user,
      },
    },
  };
  // return {
  //   props: { user },
  // };
}
Plans.propTypes = {
  user: PropTypes.object,
  stockDataQuote: PropTypes.array,
};
export const getServerSideProps = pageAuth(handler);
Plans.getLayout = function getLayout(page) {
  return <Layout user={page.props?.user}>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Plans({ user, stockDataQuote }) {
  const url = `/api/user/${user._id}`;
  const { data } = useSWR(url, getUserById);
  const { themeStretch } = useSettings();

  return (
    <Page title="All Plans">
      <Container maxWidth={themeStretch ? false : "xl"}>
        <Typography variant="h4">Explore Trending Markets</Typography>
        <Grid mt={1} container spacing={3}>
          {stockDataQuote.map((stock) => (
            <Grid key={stock.data.symbol} item xs={12} sm={6} md={4}>
              <StocksCard stockData={stock.data} chartData={stock.quote.open} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Page>
  );
}
