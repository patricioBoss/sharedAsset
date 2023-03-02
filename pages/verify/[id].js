import { useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
// @mui
import { styled } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import { Box, Container, Typography } from "@mui/material";
// hooks
//import useResponsive from '../hooks/useResponsive';
// components
import Page from "../../components/Page";
import { useDropzone } from "react-dropzone";
import config from "../../config/config";
import { jwtVerify } from "../../apiUtil/jwt";
//layout

import { useRouter } from "next/router";

// sections
// import AuthSocial from '../sections/auth/AuthSocial';

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  maxWidth: 540,
  overflow: "hidden",
  border: `solid 1.2px ${theme.palette.primary.light}`,
  margin: "0 auto",
  borderRadius: "1rem",
  padding: "2rem 0",
  paddingTop: 0,
  marginTop: "5rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  textAlign: "center",
  [theme.breakpoints.down("md")]: {
    marginTop: "7rem",
  },
  [theme.breakpoints.down("sm")]: {
    marginTop: "7rem",
  },
}));

const Img = styled("img")(({ theme }) => ({
  width: "350px",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));
const Zone = styled("div")(({ theme }) => ({
  width: "500px",
  backgroundColor: theme.palette.grey[200],
  border: ".15rem dashed #8c9196",
  borderRadius: ".625rem",
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

// background-color: $gray-100;
// border: .1875rem dashed #8c9196;
// border-radius: .625rem;
// padding: 2.1875rem;
// display: flex;
// flex-direction: column;
// align-items: center;
// justify-content: center;
// cursor: pointer;

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
const baseStyle = {
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

// export async function getServerSideProps({ req, res, params }) {
//   let { id } = params;
//   console.log(id);
//   let { user } = await jwtVerify(id, config.jwtSecret);
//   console.log(user);
//   return {
//     props: { userId: user },
//   };
// }

export default function Verify({ userId = "634662eabcad66dd8eb2d7d2" }) {
  const [loading, setLoading] = useState(false);
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: { "image/png": [], "image/jpeg": [], "image/jpg": [] },
    maxFiles: 1,
    maxSize: 3 * 1024 * 1024,
  });

  //handle
  const handleSubmit = () => {
    setLoading(true);
    let photoData = new FormData();
    photoData.append("photo", acceptedFiles[0]);
    photoData.append("purpose", "verify");

    axios
      .post(
        `https://shared-asset-img-server.cyclic.app/user/verify/${userId}`,
        photoData
      )
      .then(() => {
        setLoading(false);

        toast.success(`ID card snapshoot uploaded successfully`);
      })
      .catch((err) => {
        // console.log(err.response?.data.message);
        setLoading(false);
        if (err.response) {
          toast.error("error, pls try again");
        } else {
          toast.error(err.message);
        }
      });
  };

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <Page title="verify">
      <Container>
        <RootStyle>
          <Box
            sx={{
              backgroundColor: "primary.dark",
              width: "100%",
              py: 1.5,
            }}
          >
            <Typography sx={{ color: "white" }} component="h2" variant="h3">
              Pipsville
            </Typography>
          </Box>
          <Typography mb={1} variant="h3">
            {" "}
            Identity verification
          </Typography>
          <Typography sx={{ px: 4 }} variant="body1">
            {" "}
            verify your account now using valid snapshot of personal identity
            card
          </Typography>
          <Img src="https://pipsville-bucket.s3.us-west-004.backblazeb2.com/id-verification.gif" />
          <Box
            sx={{
              width: "100%",
              px: 2,
            }}
          >
            <Zone
              {...getRootProps({
                style,
                className: `drop-zone ${
                  acceptedFiles && acceptedFiles.length ? "bg-[#AAF27F]" : ""
                }`,
              })}
            >
              <input {...getInputProps()} />
              {acceptedFiles && acceptedFiles.length ? (
                <>
                  <Typography variant="subtitle2">
                    {acceptedFiles[0].name}
                  </Typography>
                </>
              ) : (
                <>
                  <Typography variant="subtitle2">
                    Click or drop ID here
                  </Typography>
                  <Typography variant="body1">
                    (max size :3mb, *.jpeg and *.png )
                  </Typography>
                </>
              )}
            </Zone>
            <LoadingButton
              l
              sx={{ mt: 2 }}
              loading={loading}
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              size="large"
            >
              submit
            </LoadingButton>
          </Box>
        </RootStyle>
      </Container>
    </Page>
  );
}
