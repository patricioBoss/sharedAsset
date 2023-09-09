import { useState } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar } from '@mui/material';
// components
import MenuPopover from '../../../components/MenuPopover';
import { IconButtonAnimate } from '../../../components/animate';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useRouter } from 'next/router';
import { getUserById } from '../../../helpers/fetchers';
import useSWR from 'swr';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    linkTo: '/dashboard/home',
  },
  {
    label: 'Settings',
    linkTo: '/dashboard/profile',
  },
];
AccountPopover.propst;
// ----------------------------------------------------------------------
AccountPopover.propTypes = {
  user: PropTypes.object,
};
export default function AccountPopover({ user }) {
  const url = `/api/user/${user._id}`;
  const { data } = useSWR(url, getUserById);
  const profile = data ? data : user;
  const [open, setOpen] = useState(null);
  const router = useRouter();

  const logout = () => {
    router.push('/login');
    axios
      .get('/api/auth/logout')
      .then(() => {
        console.log('logged out.');
      })
      .catch((err) => {});
  };
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={profile.imageUrl} alt={`${profile.firstName} ${profile.lastName}`} />
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {`${user.firstName} ${user.lastName} `}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <NextLink key={option.label} href={option.linkTo} passHref>
              <MenuItem key={option.label} onClick={handleClose}>
                {option.label}
              </MenuItem>
            </NextLink>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={logout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </MenuPopover>
    </>
  );
}
