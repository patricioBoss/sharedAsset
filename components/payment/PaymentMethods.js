import { useState } from "react";
// @mui
import { styled } from "@mui/material/styles";
import {
  Stack,
  Paper,
  Radio,
  Typography,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
// components
import Image from "../../components/Image";
import Iconify from "../../components/Iconify";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
//

// ----------------------------------------------------------------------

const PAYMENT_OPTIONS = [
  {
    value: "usdt",
    title: "Pay with USDT",
    icons: [
      "https://pipsville-bucket.s3.us-west-004.backblazeb2.com/usdt-sm0.svg",
    ],
  },
  {
    value: "paypal",
    title: "Pay with Paypal",
    icons: ["https://minimal-assets-api.vercel.app/assets/icons/ic_paypal.svg"],
  },
];

const OptionStyle = styled(Paper)(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingLeft: theme.spacing(2.5),
  paddingRight: theme.spacing(2),
  transition: theme.transitions.create("all"),
  border: `solid 1px ${theme.palette.divider}`,
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
}));

// ----------------------------------------------------------------------

export default function PaymentMethods({ details, user }) {
  const [method, setMethod] = useState(details.currency);
  const [isSubmitting, setisSubmitting] = useState(false);
  const router = useRouter();
  const handleChangeMethod = (event) => {
    setMethod(event.target.value);
  };

  const handleInvest = () => {
    // console.log("this is the finished details", {
    //   ...details,
    //   currency: method,
    // });
    setisSubmitting(true);
    console.log("the details", details);
    axios
      .post(`/api/user/${user._id}/invest`, {
        ...details,
        currency: method,
      })
      .then((res) => {
        router.push("/dashboard/invest/pend");
        setisSubmitting(false);
      })
      .catch((err) => {
        setisSubmitting(false);
        if (err.response) {
          toast.error(err.response.data.message);
        } else {
          toast.error(err.message);
        }
      });
  };

  return (
    <div className="w-full max-w-full">
      <Typography variant="subtitle1" sx={{ mb: 3 }}>
        Payment Method
      </Typography>
      <Typography variant="body2" align="left" sx={{ mb: 2 }}>
        select valid payment method below.
      </Typography>

      <RadioGroup value={method} onChange={handleChangeMethod}>
        <Stack spacing={3}>
          {PAYMENT_OPTIONS.map((option) => {
            const { value, title, icons } = option;
            const isSelected = method === value;
            return (
              <OptionStyle
                key={title}
                sx={{
                  ...(isSelected && {
                    boxShadow: (theme) => theme.customShadows.z20,
                  }),
                }}
              >
                <FormControlLabel
                  value={value}
                  control={
                    <Radio
                      checkedIcon={
                        <Iconify icon={"eva:checkmark-circle-2-fill"} />
                      }
                    />
                  }
                  label={
                    <Typography variant="subtitle2" sx={{ ml: 1 }}>
                      {title}
                    </Typography>
                  }
                  sx={{
                    py: {
                      sm: 2,
                      md: 3,
                    },
                    mx: 0,
                  }}
                />

                <Stack
                  spacing={1}
                  direction="row"
                  alignItems="center"
                  sx={{ right: 20, top: 32 }}
                >
                  {icons.map((icon) => (
                    <Image key={icon} alt="logo card" src={icon} />
                  ))}
                </Stack>
              </OptionStyle>
            );
          })}
        </Stack>
      </RadioGroup>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        onClick={handleInvest}
        sx={{ mt: 3, mb: 2 }}
      >
        Pay Now
      </LoadingButton>
    </div>
  );
}
