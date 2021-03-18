import GlobalStyles from '../styles/GlobalStyles';
import { ThemeProvider } from '@material-ui/core';
import theme from '../theme';
function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
