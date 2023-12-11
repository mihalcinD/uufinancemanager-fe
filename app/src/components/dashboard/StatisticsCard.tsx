import { Box, Paper, Skeleton, Typography, Button } from '@mui/material';

type Props = {
  isLoading?: boolean;
};
const StatisticsCard = ({ isLoading }: Props) => {
  return (
    <>
      {isLoading ? (
        <Skeleton variant="rounded" sx={{ display: 'flex', flex: 4 }} />
      ) : (
        <Paper
          elevation={8}
          sx={{
            display: 'flex',
            flex: 4,
            bgcolor: '#6000C0',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            px: 4,
            py: 2,
          }}>
          <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
            <Typography variant="h4" color="rgba(255,255,255,0.5)" fontWeight={700}>
              Statistics
            </Typography>
            <Button variant={'text'} color={'inherit'}>
              <Typography color="inherit" fontWeight={700}>
                Show more
              </Typography>
            </Button>
          </Box>
        </Paper>
      )}
    </>
  );
};

export default StatisticsCard;
