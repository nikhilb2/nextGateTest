import React from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Fund } from 'apiTypes'
import moment from 'moment'
const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);



const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});


interface Props {
    className?: string
    data: Fund[] | null
  }

  const convertDate = (date: string) => {
    const manipulatedDate = date.split('')
    if (manipulatedDate.length) {
      manipulatedDate.splice(4, 0, '-')
      manipulatedDate.splice(7, 0, '-')
    }
    date = ''
    manipulatedDate.forEach((item) => {
      date = date + item.toString()
    })
    console.log(date)
    return date
  }

export default function CustomizedTables(props: Props) {
  const classes = useStyles();
    const { className, data } = props
  return (
    <TableContainer component={Paper} className={className}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Fund name</StyledTableCell>
            <StyledTableCell align="right">Sub fund</StyledTableCell>
            <StyledTableCell align="right">Class name</StyledTableCell>
            <StyledTableCell align="right">Date</StyledTableCell>
            <StyledTableCell align="right">Report status</StyledTableCell>
            <StyledTableCell align="right">Alerts</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row, i) => (
            <StyledTableRow key={row.id + i}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.subfund}</StyledTableCell>
              <StyledTableCell align="right">{row.class}</StyledTableCell>
              <StyledTableCell align="right">{moment(convertDate(row.date.toString())).format("MMM Do YYYY")}</StyledTableCell>
              <StyledTableCell align="right" style={{color: row.report_status ? 'green' : 'red'}}>{row.report_status ? 'Ready' : 'Not ready'}</StyledTableCell>
              <StyledTableCell align="right">{row.nb_alerts}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}