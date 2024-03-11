import { createTheme } from '@mui/material/styles';
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#32C832',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#32C832',
        },
      },
    },
  },
});
