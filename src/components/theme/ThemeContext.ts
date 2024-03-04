import { createTheme } from '@mui/material/styles';

export const themeLight = createTheme({
  palette: {
    background: {
      default: '#fff',
    },
    text: {
      primary: '#000',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#000',
        },
      },
    },
  },
});

export const themeDark = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    // background: {
    //   default: '#1d1d1d',
    // },
    text: {
      primary: '#fff',
    },
  },
});
