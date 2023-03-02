import PropTypes from "prop-types";
import { forwardRef } from "react";
import Link from "next/link";
// @mui
import { Box, Typography } from "@mui/material";

// ----------------------------------------------------------------------

// eslint-disable-next-line react/display-name
const Logo = forwardRef(({ disabledLink = false, sx, size = "large" }, ref) => {
  // const theme = useTheme();
  // const PRIMARY_LIGHT = theme.palette.primary.light;
  // const PRIMARY_MAIN = theme.palette.primary.main;
  // const PRIMARY_DARK = theme.palette.primary.dark;

  const logo = (
    <Box
      ref={ref}
      sx={{
        width: 40,
        height: 40,
        cursor: "pointer",
        display: "flex",
        alignItems: "end",
        ...sx,
      }}
    >
      <img
        style={
          size === "large"
            ? { width: "100%", height: "100%" }
            : { width: "70%", height: "70%" }
        }
        src="/logo/sharedasset.svg"
        alt="logo img"
      />
      <h3
        className={` font-extrabold ${
          size === "large" ? " text-3xl" : " text-xl"
        }  ml-3`}
      >
        SHAREDASSET
      </h3>
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <Link href="/">{logo}</Link>;
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
  size: PropTypes.oneOf(["small", "large"]),
};

export default Logo;
