import React from 'react'
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core/styles'
import { FundName } from 'apiTypes'
import Accordion from './accordion'

const useStyles = makeStyles({
  table: {
    //minWidth: 700,
  },
})

interface Props {
  className?: string
  funds?: FundName[] | null
  onSelect?(id: string, subfund: string): void
}
export default function CustomizedTables(props: Props) {
  const classes = useStyles()
  const { className, funds, onSelect } = props
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
    return date
  }
  return (
    <div className={className}>
      {funds?.map((fund) => (
        <div key={fund.id}>
          <Accordion fund={fund} />
        </div>
      ))}
    </div>
  )
}
