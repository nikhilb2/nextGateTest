import { Breadcrumbs, Typography, makeStyles } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

interface Data {
  name: string
  route: string
}

interface Props {
  data: Data[]
  last: string
}

const useStyles = makeStyles({
  link: {
    textDecoration: 'none',
    color: '#000000'
  }
})

const Bcrumbs = (props: Props) => {
  const { data, last } = props
  console.log(data)
  const classes = useStyles()
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {data?.map((item) => (
        <Link key={item.name} color="inherit" to={item.route} className={classes.link}>
          {item.name}
        </Link>
      ))}

      <Typography color="textPrimary">{last}</Typography>
    </Breadcrumbs>
  )
}

export default Bcrumbs
