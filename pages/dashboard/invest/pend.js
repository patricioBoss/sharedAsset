import {
  Container,
  Typography,
  Grid,
  CircularProgress,
  Box,
} from "@mui/material";
// layouts
import Layout from "../../../layouts";
// hooks
import useSettings from "../../../hooks/useSettings";
// components
import Page from "../../../components/Page";
import useSWR from "swr";
import PendingCards from "../../../components/PendingCards";
import plans from "../../../helpers/plans";
import pageAuth from "../../../middleware/pageAuthAccess";
import PropTypes from "prop-types";
import serializeFields from "../../../helpers/serialize";
import Investment from "../../../models/investment.model";
import axios from "axios";
import { useEffect, useState } from "react";
import { getQuotes } from "../../../helpers/fetchers";

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
  return {
    props: {
      user,
      pendingInvestments,
      fallback: {
        [`/api/user/${user._id}`]: user,
      },
    },
  };
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
  const [investments, setInvestments] = useState(null);
  const { themeStretch } = useSettings();
  const { data } = useSWR(
    [...new Set(pendingInvestments.map((x) => x.stock))].join(",") ?? "NONE",
    getQuotes
  );
  console.log(data);
  useEffect(() => {
    if (data) {
      const stocksDataMap = data.reduce((acc, stock) => {
        acc[stock.symbol] = stock;
        return acc;
      }, {});
      const allPendings = pendingInvestments.map((x) => ({
        ...x,
        stock: stocksDataMap[x.stock],
        plan: plans[x.planId],
      }));
      setInvestments(allPendings);
    }

    // return () => {};
  }, [data]);

  console.log("pending", investments);
  return (
    <Page title="Pending investment">
      <Container maxWidth={themeStretch ? false : "xl"}>
        <Typography variant="h3">Pending Investment</Typography>
        {investments ? (
          <>
            <Grid container mt={3} spacing={3}>
              {!!investments.length &&
                investments.map((x) => (
                  <Grid key={x._id} item xs={12} sm={6} md={4}>
                    <PendingCards investment={x} user={user} />
                  </Grid>
                ))}
            </Grid>
            {!investments.length && (
              <Typography
                textAlign={"center"}
                mt={4}
                color={"primary"}
                variant="h3"
              >
                No Pending investments
              </Typography>
            )}
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              px: 2,
              py: 2,
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Container>
    </Page>
  );
}
