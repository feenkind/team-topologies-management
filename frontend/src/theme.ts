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
      light: '#ffffff',
      main: '#eceff1',
      dark: '#90a4ae',
      contrastText: '#000',
    },
    info: {
      light: '#39796b',
      main: '#004d40',
      dark: '#39796b',
      contrastText: '#000',
    },
  },
});

export default theme;
