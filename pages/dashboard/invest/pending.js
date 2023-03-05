import { Container, Typography, Grid } from "@mui/material";
// layouts
import Layout from "../../../layouts";
// hooks
import useSettings from "../../../hooks/useSettings";
// components
import Page from "../../../components/Page";
import PendingCards from "../../../components/PendingCards";
import plans from "../../../helpers/plans";
import pageAuth from "../../../middleware/pageAuthAccess";
import PropTypes from "prop-types";
import serializeFields from "../../../helpers/serialize";
import Investment from "../../../models/investment.model";
import axios from "axios";

// ----------------------------------------------------------------------

async function handler({ req }) {
  const user = serializeFields(req.user);
  console.log("this is user", user);
  const pendingInvestments = serializeFields(
    await Investment.find({
      userId: user._id,
      status: "pending",
      transactionId: { $exists: false },
    }).lean()
  );

  if (pendingInvestments.length) {
    const uniqueStockString = [
      ...new Set(pendingInvestments.map((x) => x.stock)),
    ].join(",");
    const stocksResponse = await axios.get(
      `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${uniqueStockString}`
    );
    const stocksDataList = await stocksResponse.data.quoteResponse.result;
    const stocksDataMap = stocksDataList.reduce((acc, stock) => {
      acc[stock.symbol] = stock;
      return acc;
    }, {});
    const allPendings = pendingInvestments.map((x) => ({
      ...x,
      stock: stocksDataMap[x.stock],
      plan: plans[x.planId],
    }));
    console.log(pendingInvestments);
    return {
      props: {
        user,
        pendingInvestments: allPendings,
        fallback: {
          [`/api/user/${user._id}`]: user,
        },
      },
    };
  } else {
    return {
      props: {
        user,
        pendingInvestments,
        fallback: {
          [`/api/user/${user._id}`]: user,
        },
      },
    };
  }

  // return {
  //   props: { user },
  // };
}
export const getServerSideProps = pageAuth(handler);
Pending.getLayout = function getLayout(page) {
  return <Layout user={page.props?.user}>{page}</Layout>;
};

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
Pending.propTypes = {
  user: PropTypes.object,
  pendingInvestments: PropTypes.array,
  stocksDataList: PropTypes.array,
};
export default function Pending({ user, pendingInvestments }) {
  const { themeStretch } = useSettings();

  console.log("pending", pendingInvestments);
  return (
    <Page title="Pending investment">
      <Container maxWidth={themeStretch ? false : "xl"}>
        <Typography variant="h3">Pending Investment</Typography>
        <Grid container mt={3} spacing={3}>
          {!!pendingInvestments.length &&
            pendingInvestments.map((x) => (
              <Grid key={x._id} item xs={12} sm={6} md={4}>
                <PendingCards investment={x} user={user} />
              </Grid>
            ))}
        </Grid>
        {!pendingInvestments.length && (
          <Typography
            textAlign={"center"}
            mt={4}
            color={"primary"}
            variant="h3"
          >
            No Pending investments
          </Typography>
        )}
      </Container>
    </Page>
  );
}
