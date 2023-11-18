import { Box, Button, Typography } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';

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
      <Typography variant={'h1'} component={'h1'} fontWeight={800}>
        Welcome Back!
      </Typography>
      <Button onClick={() => loginWithRedirect()} variant={'contained'}>
        LOGIN
      </Button>
    </Box>
  );
};

export default Login;
