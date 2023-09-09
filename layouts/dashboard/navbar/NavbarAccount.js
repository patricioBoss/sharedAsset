import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, Typography, Avatar } from '@mui/material';
import useSWR from 'swr';
import { getUserById } from '../../../helpers/fetchers';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

NavbarAccount.propTypes = {
  isCollapse: PropTypes.bool,
  user: PropTypes.object,
};

export default function NavbarAccount({ isCollapse, user }) {
  const url = `/api/user/${user._id}`;
  const { data } = useSWR(url, getUserById);
  let profile = data ? data : user;
  return (
    <Link underline="none" color="inherit">
      <RootStyle
        sx={{
          ...(isCollapse && {
            bgcolor: 'transparent',
          }),
        }}
      >
        <Avatar src={profile.imageUrl} alt={`${profile.firstName} ${profile.lastName}`} />

        <Box
          sx={{
            ml: 2,
            transition: (theme) =>
              theme.transitions.create('width', {
                duration: theme.transitions.duration.shorter,
              }),
            ...(isCollapse && {
              ml: 0,
              width: 0,
            }),
          }}
        >
          <Typography variant="subtitle2" noWrap>
            {`${profile.firstName} ${profile.lastName}`}
          </Typography>
          <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
            user
          </Typography>
        </Box>
      </RootStyle>
    </Link>
  );
}
