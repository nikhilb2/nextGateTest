import { Breadcrumbs, Typography, makeStyles } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import theme from 'theme'
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
    color: theme.palette.primary.contrastText,
    fontWeight: 600,
  },
})

const Bcrumbs = (props: Props) => {
  const { data, last } = props
  console.log(data)
  const classes = useStyles()
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {data?.map((item) => (
        <Link
          key={item.name}
          color="inherit"
          to={item.route}
          className={classes.link}
        >
          {item.name}
        </Link>
      ))}

      <Typography color="textPrimary">{last}</Typography>
    </Breadcrumbs>
  )
}

export default Bcrumbs
