import { CircularProgress, Box } from '@mui/material';
const Loading = () => {
  return (
    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100vh'}>
      <CircularProgress size={150} />
    </Box>
  );
};

export default Loading;
