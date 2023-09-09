import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Typography, Card, Box, CardContent } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import numeral from 'numeral';
import { toast } from 'react-toastify';
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(() => ({
  height: '100%',
  textAlign: 'left',
  alignItems: 'center',
}));

// ----------------------------------------------------------------------

StatusCard.propTypes = {
  isWalletEmpty: PropTypes.bool,
  isVerified: PropTypes.bool,
  user: PropTypes.object,
  loading: PropTypes.bool,
  handleBonus: PropTypes.func,
};

export default function StatusCard({ isWalletEmpty, isVerified, user, handleBonus, loading }) {
  return (
    <RootStyle>
      <CardContent
        sx={{
          color: 'grey.800',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="subtitle2">Account Status</Typography>
        <Typography variant="body2" sx={{ pb: 1 }}>
          {isWalletEmpty
            ? `pls add a btc and usdt address as this is needed for withdrawal and verification.`
            : `congrats you can now enjoy the full features of pipsville investment.`}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              width: 50,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {!isVerified ? (
              <AiOutlineCheck style={{ color: '#33d06d', strokeWidth: 2 }} />
            ) : (
              <AiOutlineClose style={{ color: '#ff4842', strokeWidth: 2 }} />
            )}
          </Box>

          <Typography variant="body2">Verified Account</Typography>
        </Box>

        {isWalletEmpty && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                width: 50,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <AiOutlineClose style={{ color: '#ff4842', strokeWidth: 2 }} />
            </Box>

            <Typography variant="body2">No Wallet Address</Typography>
          </Box>
        )}
        <Typography variant="h5" my={1}>
          Total Bonus: {numeral(user?.bonus).format('0.00')} USD
        </Typography>
        <LoadingButton
          loading={loading}
          sx={{
            justifySelf: 'end',
          }}
          variant="contained"
          onClick={() => (user.bonus ? handleBonus(user.bonus) : toast.warning('no available bonus'))}
        >
          Withdraw bonus
        </LoadingButton>
      </CardContent>
    </RootStyle>
  );
}
