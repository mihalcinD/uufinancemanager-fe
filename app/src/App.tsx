import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <BrowserRouter>
      <Routes>
        {isLoading ? (
          <Route path={'/*'} element={<></>} />
        ) : isAuthenticated ? (
          <Route element={<></>}>
            <Route path={'/dashboard/:id'} element={<></>} />
            <Route path={'/statistics/:id'} element={<></>} />
            <Route path={'/transactions/:id'} element={<></>} />
            <Route path={'/saving-goals/:id'} element={<></>} />
            <Route path={'/family/:id'} element={<></>} />
            <Route path={'/profile'} element={<></>} />
          </Route>
        ) : (
          <Route path={'/*'} element={<></>} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
