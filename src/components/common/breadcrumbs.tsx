import { Breadcrumbs, Typography } from '@material-ui/core'
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

const Bcrumbs = (props: Props) => {
  const { data, last } = props
  console.log(data)
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {data?.map((item) => (
        <Link key={item.name} color="inherit" to={item.route}>
          {item.name}
        </Link>
      ))}

      <Typography color="textPrimary">{last}</Typography>
    </Breadcrumbs>
  )
}

export default Bcrumbs
