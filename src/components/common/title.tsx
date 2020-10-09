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
        padding: theme.spacing(2),
        paddingTop: theme.spacing(10),
        letterSpacing: -1.5,
        fontWeight: 100
    }
})

interface Props {
    title?: string
    className?: string
}
const Title = (props: Props) => {
    const classes = useStyles()
    const { title, className } = props
    return(
        <Box boxShadow='none' className={`${className} ${classes.container}`}>
            <Typography className={classes.title}>
                {title}
            </Typography>
        </Box>
    )
}


export default Title