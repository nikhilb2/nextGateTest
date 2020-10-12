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
import { SubFund } from 'apiTypes'
import Searchbar from './searchbox'

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
  search: {
    width: '50%'
  },
  searchHolder: {
    display:'flex',
    flexDirection: 'row', 
    justifyContent: 'flex-end'
  }
})

interface Props {
  className?: string
  data?: SubFund | null
  onSelect?(id: string): void
  title?: string
  onSearch?(keyword: string): void
}
export default function SubFundTable(props: Props) {
  const classes = useStyles()
  const { className, data, onSelect, title, onSearch } = props
  return (
    <TableContainer component={Paper} className={className}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>{title}</StyledTableCell>
            <StyledTableCell align="right" className={classes.searchHolder}><Searchbar className={classes.search} onChange={(text) => {
              if (onSearch) {
                onSearch(text)
              }
            }}/></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.subfunds.map((fund, index) => (
              <StyledTableRow
                style={{ cursor: 'pointer' }}
                key={fund.subfundId}
                onClick={() => {
                  if (onSelect) {
                    onSelect(fund.subfundId)
                  }
                }}
              >
                <StyledTableCell component="th" scope="row">
                  {fund.subfundName}
                </StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
