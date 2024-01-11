import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Login from './routes/Login.tsx';
import Dashboard from './routes/Dashboard.tsx';
import Transactions from './routes/Transactions.tsx';
import SavingGoals from './routes/SavingGoals.tsx';
import Loading from './routes/Loading.tsx';
import FamilySettings from './routes/FamilySettings.tsx';
import Statistics from './routes/Statistics.tsx';
import MyProfile from './routes/MyProfile.tsx';
import Layout from './components/Layout.tsx';

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <BrowserRouter>
      <Routes>
        {isLoading ? (
          <Route path={'/*'} element={<Loading />} />
        ) : isAuthenticated ? (
          <Route element={<Layout />}>
            <Route path={'/:id/dashboard'} element={<Dashboard />} />
            <Route path={'/:id/statistics'} element={<Statistics />} />
            <Route path={'/:id/transactions'} element={<Transactions />} />
            <Route path={'/:id/saving-goals'} element={<SavingGoals />} />
            <Route path={'/:id/settings'} element={<FamilySettings />} />
            <Route path={'/me'} element={<MyProfile />} />
            <Route path={'/*'} element={<Navigate to={`/${undefined}/dashboard`} />} />
          </Route>
        ) : (
          <Route path={'/*'} element={<Login />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
