// @mui
import { styled } from "@mui/material/styles";
import { Card, Container, Typography } from "@mui/material";
import NextLink from "next/link";

// hooks
import useResponsive from "../hooks/useResponsive";
// components
import Page from "../components/Page";
import Logo from "../components/Logo";

//layout
import Layout from "../layouts";

// sections
import { LoginForm } from "../sections/auth/login";
// import AuthSocial from '../sections/auth/AuthSocial';

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

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

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

const SpanStyle = styled("span")(({ theme }) => ({
  color: theme.palette.primary.main,
}));
const LoginImg = styled("img")(() => ({
  width: "100%",
}));

// ----------------------------------------------------------------------
Login.getLayout = function getLayout(page) {
  return <Layout variant="logoOnly">{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function Login() {
  const smUp = useResponsive("up", "sm");

  const mdUp = useResponsive("up", "md");

  return (
    <Page title="Login">
      <RootStyle>
        <HeaderStyle>
          <Logo size="small" />
          {smUp && (
            <Typography variant="body2" sx={{ mt: { md: -2 } }}>
              {"Don’t have an account? "}
              <NextLink
                href={"/register"}
                className=" cursor-pointer hover:underline"
              >
                Get started
              </NextLink>
            </Typography>
          )}
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <Typography
              variant="h3"
              sx={[
                { px: 5, mt: 12, mb: 2, width: 350 },
                (theme) => ({
                  color: theme.palette.primary.main,
                }),
              ]}
            >
              Welcome Back Champ.
            </Typography>
            <LoginImg src="/img/login-illustration.svg" />
          </SectionStyle>
        )}

        <Container maxWidth="sm">
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              Sign in to <SpanStyle>Shared Asset</SpanStyle>
            </Typography>

            <Typography sx={{ color: "text.secondary", mb: 10 }}>
              Enter your details below.
            </Typography>

            {/* <AuthSocial /> */}

            <LoginForm />

            {!smUp && (
              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Don’t have an account?{" "}
                <NextLink href="/register" className=" cursor-pointer">
                  Get started
                </NextLink>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
