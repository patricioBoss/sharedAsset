import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { LoadingButton } from "@mui/lab";
import {
  Typography,
  TextField,
  MenuItem,
  Card,
  Box,
  CardContent,
  Stack,
  Grid,
} from "@mui/material";
import { useSWRConfig } from "swr";
import axios from "axios";
import { toast } from "react-toastify";
const RootStyle = styled(Card)(() => ({
  height: "100%",
  width: "100%",
  textAlign: "left",
  alignItems: "center",
}));

WithDrawCard.propTypes = {
  user: PropTypes.object,
  url: PropTypes.string,
};

function WithDrawCard({ user, url }) {
  const [details, setDetails] = useState({
    currency: "usdt",
    amount: "",
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { mutate } = useSWRConfig();
  const handleChange = (e) => {
    const { value, name } = e.target;
    setDetails({
      ...details,
      [name]: value,
    });
  };
  const handleError = (e) => {
    const { value, name } = e.target;
    if (value && name === "amount") {
      if (Number(value) > Number(user.accountBalance)) {
        toast.error("cannot withdraw more than active balance");
        setError(true);
      } else {
        setError(false);
      }
    } else {
      setError(false);
    }
  };
  const makeWithdrawal = () => {
    if (error) return;
    if (Number(details.amount) > Number(user.accountBalance)) {
      toast.error("cannot withdraw more than active balance");
      return;
    }
    mutate(url);
    setLoading(true);
    axios
      .post(`/api/user/${user._id}/withdraw`, details)
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
    <>
      {" "}
      <RootStyle>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6}>
              <Box>
                <Box sx={{ display: "flex", marginTop: ".5rem" }}>
                  <Typography
                    paddingLeft={2}
                    align={"center"}
                    variant="subtitle2"
                  >
                    Select wallet
                  </Typography>
                </Box>

                <TextField
                  fullWidth
                  select
                  sx={{ mt: 2 }}
                  size="small"
                  value={details.currency}
                  onChange={handleChange}
                  name="currency"
                  variant="outlined"
                  placeholder={"Enter wallet address"}
                >
                  <MenuItem value="usdt">Tether(USDT)</MenuItem>
                </TextField>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box>
                <Box sx={{ display: "flex", marginTop: ".5rem" }}>
                  <Typography
                    paddingLeft={2}
                    align={"center"}
                    variant="subtitle2"
                  >
                    Enter Amount
                  </Typography>
                </Box>

                <TextField
                  fullWidth
                  sx={{ mt: 2 }}
                  size="small"
                  value={details.amount}
                  type="number"
                  name="amount"
                  onChange={handleChange}
                  variant="outlined"
                  onKeyUp={handleError}
                  placeholder={"Enter Amount"}
                  error={error}
                  helperText={
                    error && "amount must not be greater than account balance"
                  }
                />
              </Box>
            </Grid>
            <Stack p={4} alignItems={"center"} direction={"row"}>
              <LoadingButton
                size="large"
                type="submit"
                variant="contained"
                loading={loading}
                disabled={error}
                onClick={makeWithdrawal}
              >
                initiate withdrawal
              </LoadingButton>
            </Stack>
          </Grid>
        </CardContent>
      </RootStyle>
    </>
  );
}

export default WithDrawCard;
