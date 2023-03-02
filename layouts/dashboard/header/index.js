import PropTypes from "prop-types";
// @mui
import { styled } from "@mui/material/styles";
import { Box, Stack, AppBar, Toolbar, Badge } from "@mui/material";
// hooks
import useOffSetTop from "../../../hooks/useOffSetTop";
import useResponsive from "../../../hooks/useResponsive";
// utils
import cssStyles from "../../../utils/cssStyles";
// config
import { HEADER, NAVBAR } from "../../../config";
import useSWR from "swr";
// components
import Logo from "../../../components/Logo";
import Iconify from "../../../components/Iconify";
import { IconButtonAnimate } from "../../../components/animate";
import IconButton from "@mui/material/IconButton";
import { GifIcon, GiftIcon } from "@heroicons/react/24/solid";
//
import AccountPopover from "./AccountPopover";
// import LanguagePopover from './LanguagePopover';
import NotificationsPopover from "./NotificationsPopover";
import Label from "../../../components/Label";
import ComingSoonModal from "../../../components/CommingSoonModal";
import { useState } from "react";
import { getUserById } from "../../../helpers/fetchers";

// ----------------------------------------------------------------------

const RootStyle = styled(AppBar, {
  shouldForwardProp: (prop) =>
    prop !== "isCollapse" && prop !== "isOffset" && prop !== "verticalLayout",
})(({ isCollapse, isOffset, verticalLayout, theme }) => ({
  ...cssStyles(theme).bgBlur(),
  boxShadow: "none",
  height: HEADER.MOBILE_HEIGHT,
  zIndex: theme.zIndex.appBar + 1,
  transition: theme.transitions.create(["width", "height"], {
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up("lg")]: {
    height: HEADER.DASHBOARD_DESKTOP_HEIGHT,
    width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH + 1}px)`,
    ...(isCollapse && {
      width: `calc(100% - ${NAVBAR.DASHBOARD_COLLAPSE_WIDTH}px)`,
    }),
    ...(isOffset && {
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
    }),
    ...(verticalLayout && {
      width: "100%",
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
      backgroundColor: theme.palette.background.default,
    }),
  },
}));

// ----------------------------------------------------------------------

DashboardHeader.propTypes = {
  isCollapse: PropTypes.bool,
  onOpenSidebar: PropTypes.func,
  verticalLayout: PropTypes.bool,
  user: PropTypes.object,
};

export default function DashboardHeader({
  onOpenSidebar,
  isCollapse = false,
  verticalLayout = false,
  user,
}) {
  const [open, setOpen] = useState(false);
  const isOffset =
    useOffSetTop(HEADER.DASHBOARD_DESKTOP_HEIGHT) && !verticalLayout;
  const url = `/api/user/${user._id}`;
  const { data } = useSWR(url, getUserById);
  let userData = data ? data : user;
  const isDesktop = useResponsive("up", "lg");

  return (
    <RootStyle
      isCollapse={isCollapse}
      isOffset={isOffset}
      verticalLayout={verticalLayout}
    >
      <Toolbar
        sx={{
          minHeight: "100% !important",
          px: { lg: 5 },
        }}
      >
        {isDesktop && verticalLayout && <Logo sx={{ mr: 2.5 }} />}

        {!isDesktop && (
          <IconButtonAnimate
            onClick={onOpenSidebar}
            sx={{ mr: 1, color: "text.primary" }}
          >
            <Iconify icon="eva:menu-2-fill" />
          </IconButtonAnimate>
        )}

        <Box sx={{ flexGrow: 1 }} />

        <div className="mr-3 sm:mr-6">
          <IconButton
            aria-label="delete"
            size="large"
            className=" !border !border-[#e33784]"
            onClick={() => setOpen((x) => !x)}
          >
            <Badge color="error" variant="dot" invisible={!userData.bonus}>
              <GiftIcon
                height={24}
                width={24}
                className={userData.bonus ? "text-[#e33784]" : "text-[#dc7ea8]"}
              />
            </Badge>
          </IconButton>
        </div>

        <div className="mr-4 sm:mr-12">
          <Label
            variant="outlined"
            color={userData.isVerified ? "success" : "error"}
          >
            {userData.isVerified ? "Account Verified" : "Account Unverified"}{" "}
          </Label>
        </div>

        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 1.5 }}
        >
          {/* <NotificationsPopover /> */}
          <AccountPopover user={userData} />
        </Stack>
      </Toolbar>
      <ComingSoonModal open={open} setOpen={setOpen} user={userData} />
    </RootStyle>
  );
}
