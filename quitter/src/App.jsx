import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Root from './components/Root';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#edeef2',
    },
    secondary: {
      main: '#8e939a',
    },
    type: 'dark',
    background: {
      default: '#16181a',
      primary: '#23262b',
      secondary: '#1c1e20',
    }
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Root />
    </ThemeProvider>
  );
}
