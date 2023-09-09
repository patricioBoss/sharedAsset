import { Container, Grid } from "@mui/material";

// layouts
import Layout from "../../layouts";
// hooks
import useSettings from "../../hooks/useSettings";
// components
import Page from "../../components/Page";
import ProfileBlock from "../../components/ProfileBlock";
import PasswordBlock from "../../components/PasswordBlock";
import PictureUpdateBlock from "../../components/PictureUpdateBlock";
import NotificationBlock from "../../components/NotificationBlock";
import serializeFields from "../../helpers/serialize";
import { getUserById } from "../../helpers/fetchers";
import useSWR from "swr";
import PropTypes from "prop-types";

// ----------------------------------------------------------------------
import pageAuth from "../../middleware/pageAuthAccess";
import AccValidationBlock from "../../components/AccValidationBlock";
import { useState } from "react";
import ValidationModal from "../../components/ValidationModal";
// ----------------------------------------------------------------------

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
Profile.propTypes = {
  user: PropTypes.object,
};
export const getServerSideProps = pageAuth(handler);

Profile.getLayout = function getLayout(page) {
  return <Layout user={page.props?.user}>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Profile({ user }) {
  const [open, setOpen] = useState(false);
  const { themeStretch } = useSettings();
  const url = `/api/user/${user._id}`;
  const { data } = useSWR(url, getUserById);
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <Page title="Profile">
      <Container maxWidth={themeStretch ? false : "xl"}>
        <Grid container spacing={3}>
          <Grid item sm={12} md={3}>
            <PictureUpdateBlock user={data ? data : user} url={url} />
          </Grid>
          <Grid item sm={12} md={4.5}>
            <ProfileBlock user={data ? data : user} url={url} />
          </Grid>
          <Grid item sm={12} md={4.5}>
            <PasswordBlock user={data ? data : user} url={url} />
          </Grid>
          <Grid item sm={12} md={6}>
            <AccValidationBlock
              handleOpen={handleOpen}
              user={data ? data : user}
            />
          </Grid>
          <Grid item sm={12} md={6}>
            <NotificationBlock />
          </Grid>
        </Grid>
      </Container>
      <ValidationModal
        open={open}
        setOpen={setOpen}
        user={data ? data : user}
        url={url}
      />
    </Page>
  );
}
