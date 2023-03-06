import { useState } from "react";
import PropTypes from "prop-types";
// @mui
import { styled } from "@mui/material/styles";
import {
  Typography,
  TextField,
  Button,
  Card,
  Box,
  CardContent,
} from "@mui/material";
import { FaChevronLeft } from "react-icons/fa";
import { LoadingButton } from "@mui/lab";
import { capitalCase } from "change-case";
import numeral from "numeral";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(() => ({
  height: "100%",
  width: "100%",
  textAlign: "left",
  alignItems: "center",
}));

// ----------------------------------------------------------------------
//{ plan: { minimum, maximum, name, id, interest }}
PlanCards.propTypes = {
  plan: PropTypes.object,
  currency: PropTypes.string,
  user: PropTypes.object,
};
function PlanCards({
  plan: { minimum, maximum, name, id, interest },
  user,
  currency,
}) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [isSubmitting, setisSubmitting] = useState(false);
  const router = useRouter();
  const handleToggle = () => setOpen((x) => !x);
  const handleAmtChange = (e) => {
    const { value } = e.target;
    setAmount(value);
  };
  const handleInvest = () => {
    setisSubmitting(true);
    axios
      .post(`/api/user/${user._id}/invest`, {
        capital: amount,
        currency,
        planId: id,
      })
      .then((res) => {
        setisSubmitting(false);
        router.push("/dashboard/invest/pend");
      })
      .catch(() => {
        setisSubmitting(false);
        toast.error("error try again");
      });
  };
  return (
    <RootStyle>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4">{`${capitalCase(name)} Plan`}</Typography>
        <Box
          sx={{
            display: "flex",
            marginTop: "1.5rem",
            alignItems: "center",
          }}
        >
          <Box>
            <img
              style={{
                width: 32,
                height: 32,
              }}
              src={`/icons/${currency}.svg`}
              alt="coin icon"
            />
          </Box>

          {currency === "btc" && (
            <Typography paddingLeft={2} align={"center"} variant="subtitle1">
              {` Bitcoin (BTC)(24h)`}
            </Typography>
          )}
          {currency === "usdt" && (
            <Typography paddingLeft={2} align={"center"} variant="subtitle1">
              {` Tether (USDT)(24h)`}
            </Typography>
          )}
        </Box>
        <Box>
          <Typography
            marginTop={3}
            color={(theme) => theme.palette.primary.main}
            variant="body2"
          >
            Daily Bonus
          </Typography>
          <Typography variant="h5">{`${numeral(interest).format(
            "0.00"
          )}%`}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              marginTop={3}
              color={(theme) => theme.palette.primary.main}
              variant="body2"
            >
              Minimum Deposit
            </Typography>
            <Typography variant="subtitle2">{`${numeral(minimum).format(
              "0,0.00"
            )}USD`}</Typography>
          </Box>

          <Box>
            <Typography
              marginTop={3}
              color={(theme) => theme.palette.primary.main}
              variant="body2"
            >
              Maximum Deposit
            </Typography>
            <Typography variant="subtitle2">{`${numeral(maximum).format(
              "0,0.00"
            )}USD`}</Typography>
          </Box>
        </Box>
        <Box marginTop={3}>
          <Button
            sx={{
              boxShadow: "none",
              ...(open ? { margin: "0 auto", display: "block" } : {}),
              ".MuiButton-startIcon": {
                margin: 0,
                svg: {
                  margin: 0,
                },
              },
            }}
            fullWidth={!open}
            size="medium"
            variant={open ? "outlined" : "contained"}
            onClick={handleToggle}
            startIcon={open && <FaChevronLeft />}
          >
            {!open && "Invest"}
          </Button>
          {open && (
            <>
              <TextField
                fullWidth
                sx={{ mt: 2 }}
                size="small"
                variant="outlined"
                type="number"
                placeholder="Enter Amount"
                value={amount}
                onChange={handleAmtChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <LoadingButton
                fullWidth
                size="medium"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
                onClick={handleInvest}
                disabled={
                  !(parseInt(amount) >= minimum && parseInt(amount) <= maximum)
                }
                loading={isSubmitting}
              >
                Proceed
              </LoadingButton>
            </>
          )}
        </Box>
      </CardContent>
    </RootStyle>
  );
}

export default PlanCards;
