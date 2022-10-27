import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#428e92',
      main: '#006064',
      dark: '#00363a',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffffce',
      main: '#e6ee9c',
      dark: '#b3bc6d',
      contrastText: '#000',
    },
  },
});

export default theme;
