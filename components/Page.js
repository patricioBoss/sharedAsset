import { forwardRef } from "react";
import PropTypes from "prop-types";
// next
import Head from "next/head";
// @mui
import { Box } from "@mui/material";
import { SWRConfig } from "swr";
// ----------------------------------------------------------------------
// eslint-disable-next-line react/display-name
const Page = forwardRef(
  ({ children, title = "", meta, fallback, ...other }, ref) => (
    <>
      <Head>
        <title>{`${title} | SharedAsset (Buy,Trade Stocks)`}</title>
        {meta}
      </Head>
      <SWRConfig value={{ fallback }}>
        <Box ref={ref} {...other}>
          {children}
        </Box>
      </SWRConfig>
    </>
  )
);

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  fallback: PropTypes.string,
  meta: PropTypes.node,
};

export default Page;
