import { Box, Paper, Skeleton, Typography, Button } from '@mui/material';
import Graph from '../../assets/img/graph_mock.png';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

type Props = {
  isLoading?: boolean;
  overall?: number;
};
const StatisticsCard = ({ isLoading, overall }: Props) => {
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
          <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={1}>
              <Typography variant={'h5'} fontWeight={600}>
                {'CZK ' + overall}
              </Typography>
              <ArrowCircleLeftIcon
                sx={{ color: 'rgba(255,255,255,0.5)', rotate: overall && overall > 0 ? '90deg' : '-90deg' }}
                fontSize={'large'}
              />
            </Box>

            <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={1}>
              <Box px={2} py={1} bgcolor={'rgba(255,255,255,0.2)'} borderRadius={4}>
                <Typography color="inherit" fontWeight={700}>
                  Week
                </Typography>
              </Box>
              <Box px={2} py={1} borderRadius={4}>
                <Typography color="inherit" fontWeight={700}>
                  Month
                </Typography>
              </Box>
            </Box>
          </Box>
          <img src={Graph} alt={'graph'} style={{ width: '100%', marginBottom: 20 }} />
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
