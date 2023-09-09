import { sentenceCase } from "change-case";
// @mui
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Card,
  Table,
  Button,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  CardHeader,
  TableContainer,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// utils
import { fDate } from "../utils/formatTime";
import { fCurrency } from "../utils/formatNumber";
import Scrollbar from "./Scrollbar";
import PropTypes from "prop-types";
import Link from "next/link";
import Label from "./Label";
import { useState } from "react";
// _mock_
// import { _appInvoices } from '../../.../_mock';
// components
WithdrawalTable.propTypes = {
  row: PropTypes.array,
};
// ----------------------------------------------------------------------

export default function WithdrawalTable({ row }) {
  const theme = useTheme();
  const [viewAll, setViewAll] = useState(false);

  return (
    <Card>
      <CardHeader title="Withdrawal Request" sx={{ mb: 3 }} />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date Requested</TableCell>
                <TableCell>Status</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {(viewAll ? row : row.slice(0, 6)).map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row._id}</TableCell>
                  <TableCell>{row.stock}</TableCell>
                  <TableCell>{fCurrency(row.amount)}</TableCell>
                  <TableCell>{fDate(row.createdAt)}</TableCell>
                  <TableCell>
                    <Label
                      variant={
                        theme.palette.mode === "light" ? "ghost" : "filled"
                      }
                      color={
                        (row.status === "pending" && "warning") ||
                        (row.status === "paid" && "success")
                      }
                    >
                      {sentenceCase(row.status)}
                    </Label>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <Divider />

      <Box sx={{ p: 2, textAlign: "right" }}>
        <Button
          size="small"
          color="inherit"
          onClick={() => setViewAll(true)}
          endIcon={<ArrowForwardIosIcon />}
        >
          View All
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------
