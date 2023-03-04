// import { capitalCase } from 'change-case';
// import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from "@mui/material/styles";
import { Box, Card, Container, Typography } from "@mui/material";
// hooks
// import useAuth from '../../hooks/useAuth';
import useResponsive from "../hooks/useResponsive";
// routes
// import { PATH_AUTH } from '../routes/paths';
// components
import Page from "../components/Page";
import Logo from "../components/Logo";
import Image from "../components/Image";
import Link from "next/link";
// sections
import { RegisterForm } from "../sections/auth/register";

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
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Register() {
  // const { method } = useAuth();

  const smUp = useResponsive("up", "sm");
  const mdUp = useResponsive("up", "md");

  return (
    <Page title="Register">
      <RootStyle>
        <HeaderStyle>
          <Logo size="small" />
          {smUp && (
            <Typography variant="body2" sx={{ mt: { md: -2 } }}>
              Already have an account?{" "}
              <Link href={"/login"}>
                <Typography variant="subtitle2" component={"span"}>
                  Login
                </Typography>
              </Link>
            </Typography>
          )}
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <Typography
              variant="h3"
              sx={{
                px: 5,
                mt: 10,
                mb: 5,
                fontWeight: 600,
                lineHeight: 1.2,
                // color: "text.secondary",
              }}
            >
              Create a Free Account with us
            </Typography>
            <Image alt="register" src="/img/signupIllustration-svg.svg" />
          </SectionStyle>
        )}

        <Container>
          <ContentStyle>
            <Box sx={{ mb: 5, display: "flex", alignItems: "center" }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                  Get started absolutely free.
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  Free forever. No credit card needed.
                </Typography>
              </Box>
            </Box>

            <RegisterForm />

            <Typography
              variant="body2"
              align="center"
              sx={{ color: "text.secondary", mt: 3 }}
            >
              By registering, I agree to Pipsville&nbsp;
              <br />
              <Link href="/">
                <Typography
                  underline="always"
                  color="text.primary"
                  component="span"
                  variant="body2"
                  href="#"
                >
                  Terms of Service&nbsp;
                </Typography>
              </Link>
              and
              <Link href="/">
                <Typography
                  underline="always"
                  color="text.primary"
                  component="span"
                  variant="body2"
                  href="/"
                >
                  &nbsp;Privacy Policy
                </Typography>
              </Link>
              .
            </Typography>

            {!smUp && (
              <Typography variant="body2" sx={{ mt: 3, textAlign: "center" }}>
                Already have an account? <Link href="/login">Login</Link>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
