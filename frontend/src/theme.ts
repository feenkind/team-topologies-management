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
      light: '#fffffb',
      main: '#dcedc8',
      dark: '#aabb97',
      contrastText: '#000',
    },
  },
});

export default theme;
