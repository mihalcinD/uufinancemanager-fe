import { Auth0Provider } from '@auth0/auth0-react';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ApiProvider } from './ApiContext.tsx';

type Props = {
  children: JSX.Element;
};
const ContextsContainer = ({ children }: Props) => {
  let theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  theme = responsiveFontSizes(theme);
  return (
    <ThemeProvider theme={theme}>
      <Auth0Provider
        domain="dev-ducb3de5dqthsoxl.us.auth0.com"
        clientId="CiKjNezUXehRBVq18HRPIH9skBhZTK4k"
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: 'http://uushoppinglist.com',
        }}>
        <ApiProvider>
          <CssBaseline />
          {children}
        </ApiProvider>
      </Auth0Provider>
    </ThemeProvider>
  );
};

export default ContextsContainer;
