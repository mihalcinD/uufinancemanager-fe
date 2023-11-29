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
      gap={10}
      sx={{bgcolor: 'primary.dark'}}
      >
      <Typography variant={'h3'} component={'h3'} fontWeight={800}>
        Welcome to the uuFinanceManager.
      </Typography>
      <Typography variant={'h4'} component={'h4'} >
        Please log in to continue to the application.      
        </Typography>
      <Button onClick={() => loginWithRedirect()} variant={'contained'}>
        LOGIN <LoginIcon/>
      </Button>
    </Box>
  );
};

export default Login;
