import { Box, Paper, Skeleton, Typography, Button } from '@mui/material';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { useNavigate } from 'react-router-dom';
import { useHouseholdsContext } from '../../context/HouseholdsContext';
import { LineChart } from '@mui/x-charts';
import useAnalytics from '../../hooks/api/useAnalytics';

type Props = {
  isLoading?: boolean;
  overall?: number;
  householdId?: string;
};
const StatisticsCard = ({ isLoading, overall, householdId }: Props) => {
  const navigate = useNavigate();
  const { active } = useHouseholdsContext();
  const { data: balanceData } = useAnalytics({ parentId: active, period: -1 });
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

            <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={1}></Box>
          </Box>
          <LineChart
            xAxis={
              [{
                data: balanceData?.map(datum => (String(datum.x))),
                scaleType: 'point'
              }]
            }
            series={
              [{
                data: balanceData?.map(datum => (datum.y)),
              }]
            }
            height={200}
          />
          <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
            <Typography variant="h4" color="rgba(255,255,255,0.5)" fontWeight={700}>
              Statistics
            </Typography>
            <Button
              variant={'text'}
              color={'inherit'}
              onClick={() => {
                navigate('/' + active + '/statistics');
              }}>
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
