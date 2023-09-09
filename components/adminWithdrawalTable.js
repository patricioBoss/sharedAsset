import { sentenceCase } from 'change-case';
// @mui
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { Table, Button, TableRow, TableBody, TableCell, TableHead, TableContainer } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// utils
import { fDate } from '../utils/formatTime';
import { fCurrency } from '../utils/formatNumber';
import Scrollbar from './Scrollbar';
import PropTypes from 'prop-types';
import Label from './Label';
import axios from 'axios';
import { toast } from 'react-toastify';
// _mock_
// import { _appInvoices } from '../../.../_mock';
// components
AppNewInvoice.propTypes = {
  rows: PropTypes.object,
};
// ----------------------------------------------------------------------

export default function AppNewInvoice({ rows }) {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);

  const handleApproval = (row) => {
    const { userId, _id } = row;
    setLoading(true);
    axios
      .get(`/api/user/${userId._id}/withdraw/${_id}`)
      .then((res) => {
        setLoading(false);
        toast.success(res.data.message);
      })
      .catch((err) => {
        // console.log(err.response?.data.message);
        setLoading(false);
        if (err.response) {
          toast.error('error, pls try again');
        } else {
          toast.error(err.message);
        }
      });
  };
  return (
    <Scrollbar>
      <TableContainer sx={{ minWidth: 720 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Coin</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Date Requested</TableCell>
              <TableCell>Status</TableCell>
              <TableCell> </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row._id}>
                <TableCell>{row._id}</TableCell>
                <TableCell>{row.currency}</TableCell>
                <TableCell>{fCurrency(row.amount)}</TableCell>
                <TableCell>{row.userId.email}</TableCell>
                <TableCell>{fDate(row.createdAt)}</TableCell>
                <TableCell>
                  <Label
                    variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                    color={(row.status === 'pending' && 'warning') || (row.status === 'paid' && 'success')}
                  >
                    {sentenceCase(row.status)}
                  </Label>
                </TableCell>
                <TableCell>
                  <LoadingButton loading={loading} onClick={() => handleApproval(row)}>
                    Approve withdrawal
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Scrollbar>
  );
}

// ----------------------------------------------------------------------
