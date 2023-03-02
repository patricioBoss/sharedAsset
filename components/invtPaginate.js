import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { daysFromNow, fDate, fDateShort } from "../utils/formatTime";
import { fCurrency } from "../utils/formatNumber";
import Label from "./Label";
import { sentenceCase } from "change-case";
import { Typography, useTheme } from "@mui/material";
import plans from "../helpers/plans";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useImmer } from "use-immer";
import stocks from "../helpers/stocks";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "ID",
  },
  {
    id: "plan",
    numeric: false,
    disablePadding: false,
    label: "Plan",
  },
  {
    id: "stock",
    numeric: false,
    disablePadding: false,
    label: "Stock",
  },
  {
    id: "transactionId",
    numeric: false,
    disablePadding: false,
    label: "Txn ID",
  },
  {
    id: "depositAmount",
    numeric: true,
    disablePadding: false,
    label: "Amount",
  },
  {
    id: "approvalDate",
    numeric: false,
    disablePadding: false,
    label: "Approval Date",
  },
  {
    id: "withDrawalDate",
    numeric: false,
    disablePadding: false,
    label: "WithDrawal Date",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "add",
    numeric: false,
    disablePadding: false,
    label: "",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};
EnhancedTable.propTypes = {
  rows: PropTypes.array.isRequired,
  handleConfirmShow: PropTypes.func,
};

export default function EnhancedTable({ rows, handleConfirmShow }) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  // const [investments, setInvestments] = useState(rows.map((row) => ({ loading: false, ...row })));
  // const [topUpIvt, setTopUpIvt] = useState({});
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const theme = useTheme();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover tabIndex={-1} key={row._id}>
                    <TableCell align="left">{row._id?.slice(0, 7)}</TableCell>
                    <TableCell align="left">{plans[row.planId].name}</TableCell>
                    <TableCell align="left">
                      <Typography
                        component={"p"}
                        sx={{
                          fontWeight: 600,
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <img
                          style={{
                            width: 38,
                            height: 38,
                          }}
                          src={stocks[row.stock.symbol].imgUrl}
                          className=" rounded-full"
                          alt="stock icon"
                        />
                        {row.stock.displayName}
                      </Typography>{" "}
                    </TableCell>
                    <TableCell align="left">
                      {row.transactionId?.length > 12
                        ? row.transactionId.slice(0, 12) + "..."
                        : row.transactionId}
                    </TableCell>
                    <TableCell align="right">
                      {fCurrency(row.capital)}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={
                        daysFromNow(row.updatedAt) >= 1 &&
                        row.status === "pending"
                          ? { color: "error.main" }
                          : {}
                      }
                    >
                      {row.approvedDate
                        ? fDateShort(row.approvedDate)
                        : daysFromNow(row.updatedAt) >= 1
                        ? "failed"
                        : "Not Approved"}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={
                        daysFromNow(row.updatedAt) >= 1 &&
                        row.status === "pending"
                          ? { color: "error.main" }
                          : {}
                      }
                    >
                      {row.withDrawalDate
                        ? fDateShort(row.withDrawalDate)
                        : daysFromNow(row.updatedAt) >= 1
                        ? "failed"
                        : "Not Approved"}
                    </TableCell>
                    <TableCell align="left">
                      {" "}
                      <Label
                        variant={
                          theme.palette.mode === "light" ? "ghost" : "filled"
                        }
                        color={
                          (row.status === "pending" &&
                            daysFromNow(row.updatedAt) >= 1 &&
                            "error") ||
                          (row.status === "pending" && "warning") ||
                          (row.status === "ended" && "default") ||
                          "success"
                        }
                      >
                        {daysFromNow(row.updatedAt) >= 1 &&
                        row.status === "pending"
                          ? "failed"
                          : sentenceCase(row.status)}
                      </Label>
                    </TableCell>
                    <TableCell align="left">
                      {row.status === "active" && (
                        <Button
                          variant="contained"
                          onClick={() => handleConfirmShow(row)}
                        >
                          {" "}
                          Top Up
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
