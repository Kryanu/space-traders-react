import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import { useToken } from './hooks';
import { router } from './router/router.jsx';
import { RouterProvider } from 'react-router-dom';
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  //Checks for token in sessionStorage
  useToken();
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
