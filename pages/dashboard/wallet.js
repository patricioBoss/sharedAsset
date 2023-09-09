import { Container, Typography, Grid } from "@mui/material";
// layouts
import Layout from "../../layouts";
// hooks
import useSettings from "../../hooks/useSettings";
// components
import Page from "../../components/Page";
import WalletCards from "../../components/WalletCard";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import axios from "axios";
import pageAuth from "../../middleware/pageAuthAccess";
import { getUserById } from "../../helpers/fetchers";
import PropTypes from "prop-types";
import useSWR from "swr";
import serializeFields from "../../helpers/serialize";
// ----------------------------------------------------------------------

Wallet.getLayout = function getLayout(page) {
  return <Layout user={page.props?.user}>{page}</Layout>;
};

// ----------------------------------------------------------------------
async function handler({ req }) {
  const user = serializeFields(req.user);
  console.log("this is user", user);
  return {
    props: {
      user,
      fallback: {
        [`/api/user/${user._id}`]: user,
      },
    },
  };
  // return {
  //   props: { user },
  // };
}
Wallet.propTypes = {
  user: PropTypes.object,
};
export const getServerSideProps = pageAuth(handler);

export default function Wallet({ user }) {
  const url = `/api/user/${user._id}`;
  const { data } = useSWR(url, getUserById);
  const { themeStretch } = useSettings();
  const [loading, setLoading] = useState(false);
  const [btcError, setBtcError] = useState(false);
  const [addresses, setAddresses] = useState({
    usdt: "",
    btc: "",
  });

  useEffect(() => {
    if (data?.wallets) {
      const { wallets } = data;
      setAddresses(wallets);
    }
  }, [data]);

  const validateBitcoin = () => {
    const regex = /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/g;
    if (addresses.btc.match(regex)) {
      setBtcError(false);
    } else {
      setBtcError(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddresses((adrs) => ({
      ...adrs,
      [name]: value,
    }));
  };

  const updateWallet = () => {
    if (addresses.btc.trim() === "" && addresses.usdt.trim() === "") {
      toast.info("both wallets cannot be empty");
      return;
    }
    setLoading(true);
    axios
      .post(`/api/user/${user._id}/wallet`, addresses)
      .then((res) => {
        setLoading(false);
        toast.success(res.data.message);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response) {
          toast.error(err.response.data.message);
        } else {
          toast.error(err.message);
        }
      });
  };
  return (
    <Page title="wallet">
      <Container maxWidth={themeStretch ? false : "xl"}>
        <Typography variant="h4">Wallet Address</Typography>
        <Typography variant="body2" mb={3}>
          Edit wallet Addresses and save changes, Please note that we are not
          responsible if payment is being made to the wrong Wallet Address. make
          sure your wallet address is CORRECT before requesting for withdrawal.
        </Typography>
        <Typography variant="body2" mb={1}>
          Last Updated:
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6}>
            <WalletCards
              name="usdt"
              onChange={handleChange}
              price=""
              title="Tether(USDT) Wallet"
              value={addresses.usdt}
              leadIcon={
                <img
                  style={{
                    width: 24,
                    height: 24,
                  }}
                  src={`/icons/usdt.svg`}
                  alt="coin icon"
                />
              }
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <LoadingButton
              size="large"
              type="submit"
              variant="contained"
              loading={loading}
              onClick={updateWallet}
            >
              Update Wallet
            </LoadingButton>
          </Grid>
        </Grid>
        {/* <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >

        </Box> */}
      </Container>
    </Page>
  );
}
