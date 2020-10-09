import React from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Fund } from 'apiTypes';
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

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
  table: {
    //minWidth: 700,
  }
});


interface Props {
    className?: string
    funds?: Fund[] | null
}
export default function CustomizedTables(props: Props) {
  const classes = useStyles();
    const { className, funds } = props
    const convertDate = (date: string) => {
        const manipulatedDate = date.split('')
        if (manipulatedDate.length) {
            manipulatedDate.splice(4,0, '-')
            manipulatedDate.splice(7,0, '-')
        }
        date = ''
        manipulatedDate.forEach(item => {
            date = date + item.toString()
        })
        console.log(date)
        return date
    }
  return (
    <TableContainer component={Paper} className={className}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Fund name</StyledTableCell>
            <StyledTableCell align="right">Index</StyledTableCell>
            <StyledTableCell align="right">Class name</StyledTableCell>
            <StyledTableCell align="right">Subfund Name</StyledTableCell>
            <StyledTableCell align="right">Date</StyledTableCell>
            <StyledTableCell align="right">Alerts</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {funds && funds.map((fund: Fund, index: number) => (
            <StyledTableRow key={fund.index}>
              <StyledTableCell component="th" scope="row">
                {fund.fund_name}
              </StyledTableCell>
              <StyledTableCell align="right">{fund.index}</StyledTableCell>
              <StyledTableCell align="right">{fund.share_class_name}</StyledTableCell>
              <StyledTableCell align="right">{fund.subfund_name}</StyledTableCell>
              <StyledTableCell align="right">{moment(convertDate(fund.date.toString())).format("MMM Do YYYY")}</StyledTableCell>
              <StyledTableCell align="right">{fund.nb_alerts}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}