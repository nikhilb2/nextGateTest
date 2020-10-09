import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles'
import theme from 'theme'

const useStyles = makeStyles({
    container: {
        backgroundColor: 'transparent',
        boxShadow: 'none'
    }
})
const Header = () => {
    const classes = useStyles()
    return(
        <AppBar className={classes.container} >
        <Toolbar>
          <Typography variant="h6">Scroll to see button</Typography>
        </Toolbar>
      </AppBar>
    )
}


export default Header