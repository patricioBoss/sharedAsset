import { Box, Button, Container, Grid, Modal, Typography } from "@mui/material";
import { useState } from "react";
// layouts
import Layout from "../../layouts";
// hooks
import { useTheme } from "@mui/material/styles";
//ironSession
import pageAuth from "../../middleware/pageAuthAccess";
import useSettings from "../../hooks/useSettings";
// components
import Page from "../../components/Page";
// sections
import PortfolioTable from "../../components/PortfolioTable";
import { AppWelcome, AppWidgetSummary } from "../../sections/@dashboard/app";
import serializeFields from "../../helpers/serialize";
import PropTypes from "prop-types";
import Withdrawal from "../../models/withdrawal.model";
import Transaction from "../../models/transaction.model";
import { getUserById } from "../../helpers/fetchers";
import useSWR from "swr";
import axios from "axios";
import StocksCarousel from "../../components/stocksCarousel/StocksCarousel";
import CustomAccountSummary from "../../components/CustomAccountSummary";
import stocks from "../../helpers/stocks";
import { fCurrency } from "../../utils/formatNumber";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

// ----------------------------------------------------------------------
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "40rem",
  bgcolor: "background.paper",
  border: "1px solid #cdcdcd",
  borderRadius: ".8rem",
  boxShadow: 24,
};

Home.getLayout = function getLayout(page) {
  return <Layout user={page.props?.user}>{page}</Layout>;
};

// ----------------------------------------------------------------------
async function handler({ req }) {
  const user = serializeFields(req.user);
  console.log("this is user", user);
  const totalEarnings = await Transaction.aggregate([
    {
      $match: {
        $and: [
          { userId: req.user._id },
          { $or: [{ type: "daily" }, { type: "bonus" }] },
        ],
      },
    },
    { $group: { _id: "$userId", totalEarnings: { $sum: "$amount" } } },
  ]);
  const allApprovedInvestment = await Transaction.aggregate([
    { $match: { $and: [{ userId: req.user._id }, { type: "investment" }] } },
    { $group: { _id: "$userId", totalInvestment: { $sum: "$amount" } } },
  ]);
  const totalWithdrawal = await Withdrawal.aggregate([
    {
      $match: {
        $and: [{ userId: req.user._id }, { approvedDate: { $exists: true } }],
      },
    },
    { $group: { _id: "$userId", totalWithdrawal: { $sum: "$amount" } } },
  ]);
  const withdrawalList = serializeFields(
    await Withdrawal.find({ userId: user._id }).lean()
  );
  console.log(totalEarnings, allApprovedInvestment, withdrawalList);
  // withdrawalList.map(list=>())
  const stocksListString = Object.keys(stocks).join(",");
  const stocksResponse = await axios.get(
    `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${stocksListString}`
  );
  const stocksData = await stocksResponse.data;

  return {
    props: {
      user,
      stocksData: stocksData.quoteResponse.result,
      withdrawalList,
      totalWithdrawal: totalWithdrawal.length
        ? totalWithdrawal[0].totalWithdrawal
        : 0,
      totalEarnings: totalEarnings.length ? totalEarnings[0].totalEarnings : 0,
      totalInvestment: allApprovedInvestment.length
        ? allApprovedInvestment[0].totalInvestment
        : 0,
      fallback: {
        [`/api/user/${user._id}`]: user,
      },
    },
  };
}
Home.propTypes = {
  user: PropTypes.object,
  totalWithdrawal: PropTypes.number,
  withdrawalList: PropTypes.array,
  totalEarnings: PropTypes.number,
  totalInvestment: PropTypes.number,
};
export const getServerSideProps = pageAuth(handler);

export default function Home({
  totalInvestment,
  stocksData,
  user,
  totalWithdrawal,
  totalEarnings,
  withdrawalList,
}) {
  const { themeStretch } = useSettings();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const url = `/api/user/${user._id}`;
  const { data } = useSWR(url, getUserById);
  const profile = data ? data : user;

  const handleReInvest = () => {
    setLoading(true);
    axios
      .post(`/api/user/${user._id}/invest/reinvest`, {
        capital: user.accountBalance,
      })
      .then((res) => {
        setLoading(false);
        toast.success(res.data.message);
        router.push("/dashboard/invest/pending");
      })
      .catch((err) => {
        // console.log(err.response?.data.message);
        setLoading(false);

        if (err.response) {
          toast.error("error, pls try again");
        } else {
          toast.error(err.message);
        }
      });
  };

  // const handleOpen = (investment) => {
  //   setOpen(true);
  // };

  const handleClose = () => setOpen(false);
  const totalBalance = profile.accountBalance + totalInvestment;
  return (
    <Page title="Dashboard">
      <Container maxWidth={themeStretch ? false : "xl"}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <AppWelcome displayName={user?.firstName} />
          </Grid>
          <Grid item xs={12} md={4}>
            <StocksCarousel stocks={stocksData} />
          </Grid>

          <Grid item xs={12} md={4}>
            <CustomAccountSummary
              reinvest={() => setOpen(true)}
              title="Total Active Balance"
              icon={"eva:diagonal-arrow-left-down-fill"}
              color="info"
              percent={profile.accountBalance > 0 ? 0.1 : 0.0}
              total={totalBalance}
            />
            {/* <AppWidgetSummary
              title="Total Active Balance"
              percent={profile.accountBalance > 0 ? 0.1 : 0.0}
              total={totalBalance}
              chartColor={theme.palette.primary.main}
            /> */}
          </Grid>

          <Grid item xs={12} md={4}>
            <CustomAccountSummary
              title="Total Withdrawal"
              icon={"eva:diagonal-arrow-right-up-fill"}
              color="warning"
              percent={user.accountBalance > 0 ? 0.1 : 0.0}
              total={totalWithdrawal}
            />
            {/* <AppWidgetSummary
              title="Total Withdrawal"
              percent={user.accountBalance > 0 ? 0.1 : 0.0}
              total={totalWithdrawal}
              chartColor={theme.palette.chart.blue[0]}
            /> */}
          </Grid>

          <Grid item xs={12} md={4}>
            <CustomAccountSummary
              title="Total Earnings"
              percent={user.accountBalance > 0 ? 0.1 : 0.0}
              icon={"eva:diagonal-arrow-left-down-fill"}
              total={totalEarnings}
              color="secondary"
            />
            {/* <AppWidgetSummary
              title="Total Earnings"
              percent={user.accountBalance > 0 ? 0.1 : 0.0}
              total={totalEarnings}
              chartColor={theme.palette.chart.red[0]}
            /> */}
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <PortfolioTable row={stocksData.slice(0, 5)} />
          </Grid>
        </Grid>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              sx={{ mt: 2, px: 4, pb: 1, borderBottom: "1px solid #cacaca" }}
              variant="h6"
              component="h2"
            >
              Top Up Investment
            </Typography>
            {profile.accountBalance > 0 ? (
              <Typography id="modal-modal-description" sx={{ mt: 2, px: 4 }}>
                Glad you choose to take this step, You are about to Reinvest
                your current withdrawable balance which is
                <Typography component={"span"} sx={{ fontWeight: 600 }}>
                  {fCurrency(profile.accountBalance)}
                </Typography>
                .
              </Typography>
            ) : (
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2, px: 4, pb: 2 }}
              >
                Glad you choose to take this step but your current balance is
                not high enough to invest, try again later when your balance is
                up to it.
              </Typography>
            )}
            <Box
              className="flex justify-end"
              sx={{ mt: 2, px: 4, py: 2, borderTop: "1px solid #cacaca" }}
            >
              <Button
                variant="outlined"
                onClick={handleClose}
                color="error"
                sx={{ mx: 2 }}
              >
                Close
              </Button>
              {profile.accountBalance > 0 && (
                <LoadingButton
                  variant="contained"
                  loading={loading}
                  onClick={() => handleReInvest()}
                >
                  Accept
                </LoadingButton>
              )}
            </Box>
          </Box>
        </Modal>
      </Container>
    </Page>
  );
}
