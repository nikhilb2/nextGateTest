import { createMuiTheme } from '@material-ui/core/styles'
import red from '@material-ui/core/colors/red'

const theme = createMuiTheme({
  typography: {
    h1: {
      fontSize: '4rem',
      fontWeight: 500,
    },
    button: {
      fontWeight: 500,
    },
  },
  palette: {
    primary: {
      main: '#f9f9f9',
      contrastText: '#ffe0ac',
    },
    secondary: {
      main: '#ffacb7',
      contrastText: '#6886c5',
    },
    background: {
      paper: '#FFFFFF',
    },
    text: {
      primary: '#545871',
      secondary: '#9597A6',
    },
    action: {
      hover: '#efebe915',
    },

    error: {
      main: red.A400,
    },
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 25,
      },
    },
  },
})
export default theme
