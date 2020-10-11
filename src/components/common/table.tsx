import React from 'react'
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { FundName, SubFundClasses } from 'apiTypes'
import Accordion from './accordion'

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell)

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow)

const useStyles = makeStyles({
  table: {
    //minWidth: 700,
  },
})

interface Props {
  className?: string
  funds?: FundName[] | SubFundClasses[] | null
  onSelect?(id: string): void
  title?: string
}
export default function CustomizedTables(props: Props) {
  const classes = useStyles()
  const { className, funds, onSelect, title } = props
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
  return (
    <TableContainer component={Paper} className={className}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>{title}</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {funds &&
            funds.map((fund: FundName, index: number) => (
              <StyledTableRow
                style={{ cursor: 'pointer' }}
                key={fund.name}
                onClick={() => {
                  if (onSelect) {
                    onSelect(fund.id)
                  }
                }}
              >
                <StyledTableCell component="th" scope="row">
                  {fund.name}
                </StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
