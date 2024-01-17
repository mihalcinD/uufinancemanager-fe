import { Auth0Provider } from '@auth0/auth0-react';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ApiProvider } from './ApiContext.tsx';
import { DrawerProvider } from './DrawerContext.tsx';
import { JSX } from 'react';
import { SnackbarProvider } from 'notistack';

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
      <DrawerProvider>
        <Auth0Provider
          domain="dev-ducb3de5dqthsoxl.us.auth0.com"
          clientId="CiKjNezUXehRBVq18HRPIH9skBhZTK4k"
          authorizationParams={{
            redirect_uri: window.location.origin,
            audience: 'http://uushoppinglist.com',
          }}>
          <SnackbarProvider>
            <ApiProvider>
              <CssBaseline />
              {children}
            </ApiProvider>
          </SnackbarProvider>
        </Auth0Provider>
      </DrawerProvider>
    </ThemeProvider>
  );
};

export default ContextsContainer;
