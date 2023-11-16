import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Typography } from '@mui/material';
import Login from './routes/Login.tsx';

function App() {
  const { isAuthenticated, isLoading, logout } = useAuth0();

  return (
    <BrowserRouter>
      <Routes>
        {isLoading ? (
          <Route path={'/*'} element={<></>} />
        ) : isAuthenticated ? (
          <Route>
            <Route
              path={'/'}
              element={
                <>
                  <Typography variant={'h1'} component={'h1'}>
                    Logged in
                  </Typography>
                  <Button
                    onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                    variant={'contained'}>
                    Logout
                  </Button>
                </>
              }
            />
            <Route path={'/statistics/:id'} element={<></>} />
            <Route path={'/transactions/:id'} element={<></>} />
            <Route path={'/saving-goals/:id'} element={<></>} />
            <Route path={'/family/:id'} element={<></>} />
            <Route path={'/profile'} element={<></>} />
          </Route>
        ) : (
          <Route path={'/*'} element={<Login />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
