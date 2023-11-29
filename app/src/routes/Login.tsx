import { Box, Button, Typography } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import LoginIcon from '@mui/icons-material/Login';

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      height={'100vh'}
      flexDirection={'column'}
      gap={10}>
      <Box flexDirection={'column'} display={'flex'} justifyContent={'center'} alignItems={'center'} gap={2}>
        <Typography variant={'h1'} component={'h1'} fontWeight={800} textAlign={'center'}>
          uuFinanceManager
        </Typography>
        <Typography variant={'h5'} component={'h2'}>
          Please log in to continue to the application.
        </Typography>
      </Box>
      <Button onClick={() => loginWithRedirect()} variant={'outlined'} size={'large'} startIcon={<LoginIcon />}>
        LOGIN
      </Button>
    </Box>
  );
};

export default Login;
