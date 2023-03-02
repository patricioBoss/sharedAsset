// @mui
import { styled } from '@mui/material/styles';
import { Button, Container, Typography } from '@mui/material';
import { useRouter } from 'next/router';

// hooks
//import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';

//layout
import Layout from '../layouts';

// sections
// import AuthSocial from '../sections/auth/AuthSocial';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  margin: '0 auto',
  marginTop: '5rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  textAlign: 'center',
  [theme.breakpoints.down('md')]: {
    marginTop: '7rem',
  },
}));

const Img = styled('img')(({ theme }) => ({
  maxWidth: '520px',
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
  },
}));

// ----------------------------------------------------------------------
Unathorized.getLayout = function getLayout(page) {
  return <Layout variant="logoOnly">{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function Unathorized() {
  const router = useRouter();
  //   const smUp = useResponsive('up', 'sm');

  //   const mdUp = useResponsive('up', 'md');
  const handleClick = () => {
    router.push('/login');
  };

  return (
    <Page title="unathorized">
      <Container>
        <RootStyle>
          <Typography mb={3} variant="h3">
            {' '}
            You have not been verified
          </Typography>
          <Typography variant="body1"> Check your mail for the verification link</Typography>
          <Img src="/img/notVerified.png" alt="no verify" />
          <Button onClick={handleClick}>back to login</Button>
        </RootStyle>
      </Container>
    </Page>
  );
}
