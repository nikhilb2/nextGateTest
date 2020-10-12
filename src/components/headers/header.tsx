import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import theme from 'theme'

const useStyles = makeStyles({
  container: {
    backgroundColor: theme.palette.primary.main,
    boxShadow: 'none',
    height: theme.spacing(6),
  },
  title: {
    letterSpacing: -0.24,
    fontSize: 'calc(.1em + 2vw)',
  },
  toolBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
const Header = () => {
  const classes = useStyles()
  return (
    <AppBar className={classes.container}>
      <Toolbar className={classes.toolBar}>
        <Typography className={classes.title}>
          NextGateTech Firebase Test
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header
