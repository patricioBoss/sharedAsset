import PropTypes from "prop-types";
import dashboardImg from "../../../public/img/dashboard-illustration.svg";
// @mui
import { styled } from "@mui/material/styles";
import { Typography, Button, Card, CardContent } from "@mui/material";
import { SeoIllustration } from "../../../assets";
import { useRouter } from "next/router";
import Image from "next/image";

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  backgroundColor: theme.palette.primary.lighter,
  [theme.breakpoints.up("md")]: {
    height: "100%",
    display: "flex",
    textAlign: "left",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

// ----------------------------------------------------------------------

AppWelcome.propTypes = {
  displayName: PropTypes.string,
};

export default function AppWelcome({ displayName }) {
  const router = useRouter();
  return (
    <RootStyle>
      <CardContent
        sx={{
          p: { md: 0 },
          pl: { md: 5 },
          color: "grey.800",
        }}
      >
        <Typography gutterBottom variant="h4">
          Welcome ,
          <br /> {!displayName ? "..." : displayName}!
        </Typography>

        <Typography
          variant="body2"
          sx={{ pb: { xs: 3, xl: 3 }, maxWidth: 480, mx: "auto" }}
        >
          {`Grow your funds with shared asset's best portfolio, we guarantee risk free trading.`}
        </Typography>

        <Button
          variant="contained"
          onClick={() => router.push("/dashboard/portfolio")}
        >
          View Stocks
        </Button>
      </CardContent>

      <Image
        src={dashboardImg}
        height={250}
        className=" "
        alt="dashboard-illustration"
      />
      {/* <SeoIllustration
        sx={{
          p: 3,
          width: 360,
          margin: { xs: 'auto', md: 'inherit' },
        }}
      /> */}
    </RootStyle>
  );
}
