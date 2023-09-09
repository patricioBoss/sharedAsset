import { m } from "framer-motion";
// next
import NextLink from "next/link";
// @mui
import { styled } from "@mui/material/styles";
import { Box, Button, Typography, Container } from "@mui/material";
// layouts
import Layout from "../layouts";
// components
import Page from "../components/Page";
import { MotionContainer, varBounce } from "../components/animate";
// assets
import { PageNotFoundIllustration } from "../assets";
import Image from "next/image";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  display: "flex",
  height: "100%",
  alignItems: "center",
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

Page404.getLayout = function getLayout(page) {
  return <Layout variant="logoOnly">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <Page title="404 Page Not Found" sx={{ height: 1 }}>
      <div>
        <div className=" h-screen flex flex-col  space-y-20 pt-10 items-center justify-center text-center">
          <p className="text-2xl">
            ...Sorry resource could not be found, <br />
            Please try again
          </p>
          <Image
            src={"/img/404-landscape.svg"}
            alt="unknown"
            width={395}
            height={395}
          />
        </div>
      </div>
    </Page>
  );
}
