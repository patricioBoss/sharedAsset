// material
import * as Yup from "yup";
import { useState } from "react";
// @mui
import { styled } from "@mui/material/styles";
import {
  Stack,
  Typography,
  Container,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { HiChevronLeft } from "react-icons/hi";
import Link from "next/link";

// hooks
import useResponsive from "../../hooks/useResponsive";

import axios from "axios";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useFormik, Form, FormikProvider } from "formik";
import { jwtVerify } from "../../apiUtil/jwt";
import config from "../../config/config";
// components
import Page from "../../components/Page";
import Iconify from "../../components/Iconify";
import Layout from "../../layouts";

// ----------------------------------------------------------------------
ResetPassword.getLayout = function getLayout(page) {
  return <Layout variant="logoOnly">{page}</Layout>;
};
// ----------------------------------------------------------------------
const HeaderStyle = styled("header")(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  position: "absolute",
  padding: theme.spacing(3),
  justifyContent: "space-between",
  [theme.breakpoints.up("md")]: {
    alignItems: "flex-start",
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

export async function getServerSideProps({ req, res, params }) {
  let { id } = params;
  console.log(id);
  let { user } = await jwtVerify(id, config.jwtSecret);
  console.log(user);
  if (user) {
    return {
      props: { userId: user },
    };
  }

  return {
    redirect: {
      permanent: false,
      destination: "/login",
    },
    props: {},
  };
}

export default function ResetPassword({ userId }) {
  const smUp = useResponsive("up", "sm");
  // const mdUp = useResponsive('up', 'md');
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const changePasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(5, "must have atleast 5 char long")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required(),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: changePasswordSchema,
    onSubmit: (values) => {
      axios
        .post(`/api/user/${userId}/reset`, values)
        .then(function (res) {
          toast.success(res.data.message);
          router.push("/login");
        })
        .catch(function (err) {
          if (err.response) {
            toast.error(err.response.data.message);
          } else {
            toast.error(err.message);
          }
        });
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Page title="Reset Password">
      <HeaderStyle>
        <div />

        {smUp && (
          <Typography variant="body2" sx={{ mt: { md: -2 } }}>
            <a
              rel="noreferrer"
              href="https://t.me/PipsvilleCrypto_support"
              target="_blank"
              style={{ cursor: "pointer" }}
            >
              Need Help?
            </a>
          </Typography>
        )}
      </HeaderStyle>
      <Container maxWidth="sm">
        <Stack
          spacing={2}
          sx={{ minHeight: "100vh", justifyContent: "center" }}
        >
          <img
            src={"/img/lock.png"}
            className=" self-center w-[50px]"
            alt="lock illustration"
          />
          <Typography variant="h3" align="center" gutterBottom>
            Reset your password?
          </Typography>
          <Typography align="center" sx={{ color: "text.secondary", mb: 15 }}>
            {" "}
            Please enter the email address associated with your account and We
            will email you a link to reset your password.
          </Typography>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  autoComplete="current-password"
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  {...getFieldProps("password")}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          <Iconify
                            icon={
                              showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                            }
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />
                <TextField
                  fullWidth
                  autoComplete="current-password"
                  type={showConfirmPassword ? "text" : "password"}
                  label="Confirm Password"
                  {...getFieldProps("confirmPassword")}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={() =>
                            setShowConfirmPassword((prev) => !prev)
                          }
                        >
                          <Iconify
                            icon={
                              showConfirmPassword
                                ? "eva:eye-fill"
                                : "eva:eye-off-fill"
                            }
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(
                    touched.confirmPassword && errors.confirmPassword
                  )}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                />

                <LoadingButton
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  Update Password
                </LoadingButton>
              </Stack>
            </Form>
          </FormikProvider>

          <Link href={"/login"} style={{ width: "100%" }}>
            <Typography
              underline="always"
              variant="body2"
              color={"#000"}
              className=" cursor-pointer"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {" "}
              <HiChevronLeft /> Return to login
            </Typography>
          </Link>
        </Stack>
      </Container>
    </Page>
  );
}
