import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles'
import Searchbox from 'components/common/searchbox'
import theme from 'theme';


const useStyles = makeStyles({
    container: {
        backgroundColor: theme.palette.primary.main,
        boxShadow: 'none'
    },
    title: {
        letterSpacing: -.24,
        fontSize: 'calc(.1em + 2vw)',
    },
    toolBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'

    }
})
const Header = () => {
    const classes = useStyles()
    return(
        <AppBar className={classes.container} >
        <Toolbar className={classes.toolBar}>
          <Typography variant="h5" className={classes.title}>NextGateTech Firebase Test</Typography>
        </Toolbar>
      </AppBar>
    )
}


export default Header