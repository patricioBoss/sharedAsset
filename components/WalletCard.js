import React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { Typography, TextField, Card, Box, CardContent } from '@mui/material';

const RootStyle = styled(Card)(() => ({
  height: '100%',
  width: '100%',
  textAlign: 'left',
  alignItems: 'center',
}));

WalletCard.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  title: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  leadIcon: PropTypes.node,
};

function WalletCard({ name, title, leadIcon, ...rest }) {
  return (
    <RootStyle>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            marginTop: '.5rem',
          }}
        >
          <Box
            sx={{
              color: 'primary.lighter',
            }}
          >
            {leadIcon}
          </Box>

          <Typography paddingLeft={2} align={'center'} variant="subtitle2">
            {/* Ethereum(ETH)(24h) */}
            {title}
          </Typography>
        </Box>

        <TextField
          fullWidth
          {...rest}
          sx={{ mt: 2 }}
          size="small"
          name={name}
          variant="outlined"
          placeholder={'Enter wallet address'}
        />
      </CardContent>
    </RootStyle>
  );
}

export default WalletCard;
