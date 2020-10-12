import { Box, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import theme from 'theme'

const useStyles = makeStyles({
  container: {
    minHeight: theme.spacing(10),
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    color: theme.palette.primary.contrastText,
    fontSize: 'calc(.5rem + 2.7vw)',
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(4),
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(7),
    },

    letterSpacing: -0.2,
    fontWeight: 100,
  },
  title2: {
    textAlign: 'center',
    color: theme.palette.primary.contrastText,
    fontSize: 'calc(.3rem + 1.5vw)',
    paddingBottom: theme.spacing(2),
    // paddingTop: theme.spacing(10),
    letterSpacing: -0.2,
    fontWeight: 100,
  },
})

interface Props {
  title?: string
  title2?: string
  className?: string
}
const Title = (props: Props) => {
  const classes = useStyles()
  const { title, className, title2 } = props
  return (
    <Box boxShadow="none" className={`${className} ${classes.container}`}>
      <Typography className={classes.title}>{title}</Typography>
      <Typography className={classes.title2}>{title2}</Typography>
    </Box>
  )
}

export default Title
